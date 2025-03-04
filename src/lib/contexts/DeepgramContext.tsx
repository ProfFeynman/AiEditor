/**
 * Deepgram Context Module
 * 
 * This module provides real-time speech-to-text functionality using Deepgram's WebSocket API.
 * It manages the WebSocket connection, audio recording, and transcription state.
 * 
 * Features:
 * - Real-time audio transcription
 * - WebSocket connection management
 * - Error handling
 * - Audio recording controls
 * 
 * Required Environment Variables:
 * - DEEPGRAM_API_KEY: Your Deepgram API key (accessed via API route)
 */

"use client";

import {
  createClient,
  LiveClient,
  SOCKET_STATES,
  LiveTranscriptionEvents,
  type LiveSchema,
  type LiveTranscriptionEvent,
} from "@deepgram/sdk";

import { createContext, useContext, useState, ReactNode, FunctionComponent, useRef } from "react";

/**
 * Interface defining the shape of the Deepgram context
 */
interface DeepgramContextType {
  /** Function to establish WebSocket connection and start recording */
  connectToDeepgram: () => Promise<void>;
  /** Function to close WebSocket connection and stop recording */
  disconnectFromDeepgram: () => void;
  /** Current state of the WebSocket connection */
  connectionState: SOCKET_STATES;
  /** Accumulated transcription text */
  realtimeTranscript: string;
  /** Error message if any error occurs */
  error: string | null;
}

const DeepgramContext = createContext<DeepgramContextType | undefined>(undefined);

interface DeepgramContextProviderProps {
  children: ReactNode;
}

/**
 * Fetches the Deepgram API key from the server
 * @returns {Promise<string>} The Deepgram API key
 */
const getApiKey = async (): Promise<string> => {
  const response = await fetch("/api/deepgram", { cache: "no-store" });
  const result = await response.json();
  return result.key;
};

/**
 * Deepgram Context Provider Component
 * 
 * Manages the state and functionality for real-time speech-to-text transcription
 */
const DeepgramContextProvider: FunctionComponent<DeepgramContextProviderProps> = ({ children }) => {
  const [connection, setConnection] = useState<WebSocket | null>(null);
  const [connectionState, setConnectionState] = useState<SOCKET_STATES>(SOCKET_STATES.closed);
  const [realtimeTranscript, setRealtimeTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<MediaRecorder | null>(null);

  /**
   * Establishes WebSocket connection to Deepgram and starts audio recording
   */
  const connectToDeepgram = async () => {
    try {
      setError(null);
      setRealtimeTranscript("");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioRef.current = new MediaRecorder(stream);

      const apiKey = await getApiKey();

      console.log("Opening WebSocket connection...");
      const socket = new WebSocket("wss://api.deepgram.com/v1/listen", ["token", apiKey]);

      socket.onopen = () => {
        setConnectionState(SOCKET_STATES.open);
        console.log("WebSocket connection opened");
        audioRef.current!.addEventListener("dataavailable", (event) => {
          if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
            socket.send(event.data);
          }
        });

        audioRef.current!.start(250);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.channel && data.channel.alternatives && data.channel.alternatives[0]) {
          const newTranscript = data.channel.alternatives[0].transcript;
          setRealtimeTranscript((prev) => prev + " " + newTranscript);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError("Error connecting to Deepgram. Please try again.");
        disconnectFromDeepgram();
      };

      socket.onclose = (event) => {
        setConnectionState(SOCKET_STATES.closed);
        console.log("WebSocket connection closed:", event.code, event.reason);
      };

      setConnection(socket);
    } catch (error) {
      console.error("Error starting voice recognition:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      setConnectionState(SOCKET_STATES.closed);
    }
  };

  /**
   * Closes WebSocket connection and stops audio recording
   */
  const disconnectFromDeepgram = () => {
    if (connection) {
      connection.close();
      setConnection(null);
    }
    if (audioRef.current) {
      audioRef.current.stop();
    }
    setRealtimeTranscript("");
    setConnectionState(SOCKET_STATES.closed);
  };

  return (
    <DeepgramContext.Provider
      value={{
        connectToDeepgram,
        disconnectFromDeepgram,
        connectionState,
        realtimeTranscript,
        error,
      }}
    >
      {children}
    </DeepgramContext.Provider>
  );
};

/**
 * Custom hook for accessing Deepgram context
 * 
 * @example
 * ```tsx
 * const { connectToDeepgram, disconnectFromDeepgram, realtimeTranscript } = useDeepgram();
 * 
 * return (
 *   <div>
 *     <button onClick={connectToDeepgram}>Start Recording</button>
 *     <button onClick={disconnectFromDeepgram}>Stop Recording</button>
 *     <p>{realtimeTranscript}</p>
 *   </div>
 * );
 * ```
 * 
 * @throws {Error} If used outside of DeepgramContextProvider
 * @returns {DeepgramContextType} The Deepgram context object
 */
function useDeepgram(): DeepgramContextType {
  const context = useContext(DeepgramContext);
  if (context === undefined) {
    throw new Error("useDeepgram must be used within a DeepgramContextProvider");
  }
  return context;
}

export {
  DeepgramContextProvider,
  useDeepgram,
  SOCKET_STATES,
  LiveTranscriptionEvents,
  type LiveTranscriptionEvent,
};
