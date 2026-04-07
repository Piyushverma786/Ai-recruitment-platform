# Aptiview - AI-Powered Interview Platform

Aptiview is a comprehensive interview platform that leverages AI to conduct voice-based interviews, providing recruiters with detailed insights and candidates with a seamless interview experience.

## 🌟 Features

- **AI Voice Interviews**: Conduct natural, conversational interviews using OpenAI's advanced voice models
- **Real-time Transcription**: Automatic speech-to-text conversion with intelligent processing
- **Smart Analytics**: Detailed interview scoring and candidate assessment
- **Recruiter Dashboard**: Comprehensive job management and candidate tracking
- **Seamless Deployment**: Fully deployed on Vercel and Render for production use
- **Custom AI Templates**: Pre-built interview contexts for different roles and industries
- **Screen Recording**: Automatic screenshot capture during interviews
- **Audio Recording**: Complete interview audio recording for review
- **Role-based Access**: Separate interfaces for recruiters and candidates

## 🏗️ Architecture

This project consists of two main components:

- **Frontend**: Next.js 14 application with TypeScript, Tailwind CSS, and Shadcn/ui
- **Backend**: Node.js/Express API with WebSocket support, Prisma ORM, and PostgreSQL

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- OpenAI API key
- Clerk account for authentication

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sahnik0/Aptiview.git
   cd Aptiview
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your environment variables
   npx prisma generate
   npx prisma db push
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Configure your environment variables
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - WebSocket: ws://localhost:4000

## 🌐 Deployment

### Production Deployment

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render
- **Database**: PostgreSQL with Prisma Accelerate

### Environment Variables

See individual README files in `/backend` and `/frontend` for detailed environment variable configuration.

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui, Radix UI
- **Authentication**: Clerk
- **State Management**: React Hooks

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Real-time**: WebSocket (ws)
- **Authentication**: Clerk
- **AI**: OpenAI API (GPT-4, Whisper, TTS)

## 📁 Project Structure

```
Aptiview/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Express middleware
│   │   └── types/         # TypeScript types
│   ├── prisma/            # Database schema and migrations
│   └── uploads/           # File uploads
├── frontend/              # Frontend Next.js app
│   ├── app/              # App router pages
│   ├── components/       # Reusable UI components
│   ├── lib/             # Utility functions
│   └── hooks/           # Custom React hooks
└── README.md            # This file
```

## 🎯 Key Features

### For Recruiters
- Create and manage job postings
- Set custom AI interview contexts
- Review candidate interviews and recordings
- Access detailed analytics and scoring
- Manage application pipeline

### For Candidates
- Browse available job opportunities
- Take AI-powered voice interviews
- View application status
- Complete profile setup

### AI Interview System
- Natural conversation flow
- Intelligent follow-up questions
- Automatic transcription and analysis
- Performance scoring across multiple criteria
- Customizable interview templates

## 🔐 Security

- JWT-based authentication via Clerk
- CORS protection
- Input validation and sanitization
- Secure file upload handling
- Environment variable protection

## 📊 Database Schema

The application uses PostgreSQL with Prisma ORM. Key entities include:
- Users (Recruiters & Candidates)
- Jobs and Applications
- Interviews and Recordings
- Scoring and Analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation in `/backend/README.md` and `/frontend/README.md`
- Review the troubleshooting guides

## 🔮 Future Enhancements

- Video interview support
- Advanced analytics dashboard
- Integration with ATS systems
- Mobile application
- Multi-language support
- Advanced AI interview customization

---

Built with ❤️ by the Aptiview team
