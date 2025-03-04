# Next.js TypeScript Template with AI Integration

This is a modern Next.js 14 template with TypeScript, Tailwind CSS, and various AI service integrations. The template is designed to provide a robust starting point for building AI-powered web applications.

## 🚀 Project Structure

```
src/
├── app/                    # Next.js App Router directory
│   ├── api/               # API routes for various services
│   │   ├── anthropic/     # Anthropic API integration
│   │   ├── deepgram/      # Deepgram API for audio transcription
│   │   ├── openai/        # OpenAI API integration
│   │   └── replicate/     # Replicate API for image generation
│   ├── components/        # React components
│   ├── editor/           # Editor-related components
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page component
├── lib/                   # Utility functions and configurations
│   ├── contexts/         # React contexts (Auth, Deepgram)
│   ├── firebase/         # Firebase configuration and utilities
│   ├── hooks/            # Custom React hooks
│   ├── uploadthing.ts    # File upload configuration
│   └── utils.ts          # General utility functions
```

## 🛠️ Pre-configured Services

### 1. Firebase Integration
- Complete authentication setup with AuthContext
- Database and Storage utilities
- Custom useAuth hook for authentication state

### 2. AI Services
- **OpenAI**: Text generation and chat capabilities
- **Anthropic**: Alternative AI model integration
- **Replicate**: Image generation using Stable Diffusion
- **Deepgram**: Real-time audio transcription

## 🔧 Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   ```env
   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=

   # OpenAI
   OPENAI_API_KEY=

   # Anthropic
   ANTHROPIC_API_KEY=

   # Replicate
   REPLICATE_API_KEY=

   # Deepgram
   DEEPGRAM_API_KEY=
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🔐 Authentication

The template uses Firebase Authentication with the following features:
- Email/Password authentication
- Social authentication (configurable)
- Protected routes
- Authentication state management

## 📦 Key Features

1. **Modern Stack**
   - Next.js 14 with App Router
   - TypeScript for type safety
   - Tailwind CSS for styling

2. **AI Integration**
   - Multiple AI service providers
   - Streaming responses
   - Real-time audio transcription

3. **Developer Experience**
   - Organized project structure
   - Pre-configured contexts and hooks
   - Type-safe API routes

## 🤝 Contributing

Feel free to contribute to this template by creating issues or submitting pull requests.

## 📄 License

MIT License - feel free to use this template for any project.