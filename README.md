# Sahayak - AI Powered Companion for Senior Citizens

Sahayak is a compassionate AI-powered companion designed specifically for senior citizens, helping them navigate daily life with ease and confidence.

## Features

- **Religious Companion Mode**: Engage in meaningful discussions about religious topics, stories, and teachings
- **Wellness Mode**: Health tracking, medication management, and exercise guidance
- **One-Click Order & Travel**: Simplified ordering and travel booking experience
- **Emergency Support**: Quick access to emergency contacts with location sharing
- **Family Connection**: Secure access for family members to monitor and assist

## Tech Stack

- Frontend: React.js
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: Clerk
- AI Integration: Google Gemini API
- Voice Recognition: Web Speech API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
4. Set up environment variables (see .env.example files)
5. Start the development servers:
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd frontend
   npm start
   ```
## live preview
 ![Desk top view](https://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22destopview.png%22%2C%22type%22%3A%22image%2Fpng%22%2C%22signedurl_expire%22%3A%222028-04-04T13%3A52%3A12.106Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2F8d2b309c8fdd4378%2Fdestopview.png%3FExpires%3D1838469132%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3DuvwEa3RPdOnBZHeom0ZcIAn9Y2CZVJiheGVBOoLP3FAe~KuDqSu15cQGLu~Spu5wXQUfg2LxVkInDDMtHyhUo13moNiAFFG84aBmtKFSrTM0P8VO86gUxDJacG9IYzYgMj2wIBYiApOjSLFDIfbLtL3ZkdyMYi3Il2KUacQyqaBlS9ZsLaaVBenbDcSc2hFa1ufcc8wiXZQvb9rr79qFVLVxFrnDjc1o3PTo8Y-5-ud8dB7uv9SIyU0l-uA6wf5WEtwVr41JG0cSqvVoF~G3-fPmOl~zMApyZw2qCPyCLs53kz3u4UHH0MKBcNs7GBpmj890k4KKRXno~QsZojNIZA__%22%7D)
 ![mobile view](mobile-view.png)
 
## Security and Privacy

- End-to-end encryption for sensitive data
- Secure authentication via Clerk
- Role-based access control for family members/caretakers
- HIPAA-compliant data storage for health information
