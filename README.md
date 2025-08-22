# AI Portfolio Chatbot

An intelligent, conversational portfolio website powered by progressive disclosure and OpenAI. Let visitors explore your experience through natural conversations instead of traditional navigation.
![Scene-1 (19)](https://github.com/user-attachments/assets/b2df7b0e-eaa2-4dcb-b8f4-34635bacd9b1)


## ✨ Features

- ** AI-Powered Conversations** - OpenAI integration for dynamic, personalized responses
- ** Progressive Disclosure** - 4-level conversation system (Overview → Details → Deep Dive → Granular)
- ** Mobile-Responsive** - Optimized chat interface for all devices
- ** Lightning Fast** - Built with Next.js 15 and React 19
- ** Easy Customization** - Single configuration file for all content
- ** One-Click Deploy** - Ready for Vercel deployment

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **AI**: OpenAI GPT-4
- **Deployment**: Vercel (recommended)

##  Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Git installed

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/bethanyrobertson/portfolio-navigator.git
cd ai-portfolio-chatbot

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Add your OpenAI API key to .env.local
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Customize Your Content

#### Configure Your Assistant Personality
```bash
# Copy the template
cp src/data/examples/example-assistant-config.ts src/data/assistant-config.ts

# Edit with your information
# Update ASSISTANT_INSTRUCTIONS, PROGRESSIVE_CONTENT, and CONTACT_INFO
```

#### Add Your Portfolio Knowledge
```bash
# Copy the template  
cp src/data/portfolio-knowledge.ts

# Fill in your projects, experience, and skills
# This is where all your portfolio content lives
```

![Scene-1 (18)](https://github.com/user-attachments/assets/a7fb67c2-ea28-466d-9316-34c79e898fd9)

<img width="230" height="98" alt="Screenshot 2025-08-21 at 6 14 39 PM" src="https://github.com/user-attachments/assets/e3df67bb-c317-4f8b-af9e-39179e1f303a" />

#### Add Your Assets
```bash
# Replace avatar image
cp your-photo.jpg public/assets/avatar.jpg

# Add your resume
cp your-resume.pdf public/assets/YourName_Resume.pdf
```

### 4. Run Locally

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### 5. Test Your Configuration

```bash
# Validate your content structure
npm run validate

# Check for any configuration issues
curl http://localhost:3000/api/chat
```

## Customization Guide

### Content Structure

The chatbot uses a **4-level progressive disclosure system**:

1. **Overview** - High-level topics (Experience, Projects, Skills)
2. **Details** - Specific areas with more depth  
3. **Deep Dive** - Project specifics and methodologies
4. **Granular** - Implementation details and metrics

### Configuration Files

#### `src/data/assistant-config.ts`
- **ASSISTANT_INSTRUCTIONS**: Define your AI's personality and communication style
- **PROGRESSIVE_CONTENT**: Structure your conversation flow and content hierarchy
- **CONTACT_INFO**: Your contact details and social links
- **ACTION_BUTTONS**: Configure resume download and contact actions

#### `src/data/portfolio-knowledge.ts`
- **personal**: Your basic info, elevator pitch, values
- **experience**: Current and previous roles with achievements
- **projects**: Detailed project case studies with metrics
- **skills**: Technical skills, domain expertise, soft skills
- **education**: Formal education, certifications, continuous learning
- **career_story**: Your origin story, transitions, goals

### Customization Examples

#### Change AI Personality
```typescript
// In assistant-config.ts
export const ASSISTANT_INSTRUCTIONS = `
You are Sarah's AI assistant. You help visitors explore Sarah's 
UX design experience through friendly, enthusiastic conversations.

PERSONALITY & TONE:
- Warm and approachable, but professional
- Passionate about human-centered design
- Detail-oriented when discussing design processes
- Always eager to share specific examples and outcomes
`;
```

#### Add New Progressive Content Level
```typescript
// In assistant-config.ts
project_1_details: {
  technical_approach: {
    title: "Technical Implementation",
    description: "Deep dive into the technical decisions and architecture",
    buttonText: "Technical details",
    nextLevel: "technical_specifics"
  }
}
```

#### Customize Styling
```typescript
// In tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-brand-color',
        secondary: '#your-accent-color'
      }
    }
  }
}
```

#### Change Background SVG
Replace the background with your own custom SVG:

1. **Add your SVG file** to `public/assets/background.svg`
2. **Update the CSS** in `app/globals.css`:
```css
html {
  background: url('/assets/your-background.svg') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
}
```

#### Customize Avatar Colors
Change the avatar circle colors throughout the interface:

1. **Header Avatar** - In `src/components/chat/ChatInterface.tsx`:
```typescript
backgroundColor: '#YOUR_COLOR' // Line ~756
```

2. **Message Avatars** - In the same file:
```typescript
backgroundColor: '#YOUR_COLOR' // Lines ~555 and ~585
```

3. **Button Colors** - In `app/globals.css`:
```css
.btn-primary {
  background-color: #YOUR_COLOR;
}
```

#### Add Your Resume
Set up resume download functionality:

1. **Add your resume file** to `public/assets/` folder:
   - Replace `public/assets/my-resume.pdf` with your resume
   - Or keep the same filename for no code changes

2. **If using a different filename**, update the references in `src/components/chat/ChatInterface.tsx`:
```typescript
// Update the download path (lines ~713, ~714)
link.href = '/assets/YOUR-RESUME-NAME.pdf';
link.download = 'YOUR-RESUME-NAME.pdf';

// Update button text (line ~855)
text: "YOUR-RESUME-NAME.pdf",

// Update other references (lines ~521, ~523, etc.)
// Search for 'my-resume.pdf' and replace with your filename
```

3. **Update contact info** in `src/data/assistant-config.ts`:
```typescript
export const CONTACT_INFO = {
  // ... other fields
  resume: "/assets/YOUR-RESUME-NAME.pdf"
};
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial setup"
git push origin main
```

2. **Deploy to Vercel**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Or use the Vercel dashboard to import your GitHub repo
```

3. **Configure Environment Variables**
   - Go to your Vercel dashboard
   - Navigate to Settings → Environment Variables
   - Add `OPENAI_API_KEY` with your API key

### Deploy to Other Platforms

#### Netlify
```bash
# Build the project
npm run build

# Deploy the 'out' folder to Netlify
```

#### Custom Server
```bash
# Build for production
npm run build

# Start production server
npm start
```

##  Development

### Project Structure
```
ai-portfolio-chatbot/
├── app/
│   ├── api/chat/route.ts         # OpenAI integration
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page
├── src/
│   ├── components/
│   │   ├── chat/                # Chat interface components
│   │   ├── ui/                  # Reusable UI components
│   │   └── layout/              # Layout components
│   ├── data/
│   │   ├── assistant-config.ts  # AI personality & content structure
│   │   ├── portfolio-knowledge.ts # Your portfolio content
│   │   └── examples/            # Template files
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions
│   └── types/                   # TypeScript type definitions
├── public/
│   ├── assets/                  # Images, resume, etc.
├── scripts/
│   ├── quick-setup.js           # Setup automation
│   └── validate-content.js      # Content validation
└── docs/                        # Additional documentation
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
npm run validate     # Validate content structure
npm run setup        # Interactive setup wizard
npm run deploy       # Deploy to Vercel
```

### Content Validation

The project includes built-in validation to ensure your content structure is correct:

```bash
# Validate your configuration
npm run validate

# Check API health
curl http://localhost:3000/api/chat
```

Common validation issues:
- Missing `nextLevel` references in progressive content
- Incorrect file paths for assets
- Missing required fields in portfolio knowledge

## Use Cases

Perfect for:
- **UX/UI Designers** - Showcase design process and case studies
- **Software Developers** - Present technical projects and skills
- **Product Managers** - Highlight product strategy and outcomes  
- **Startup Founders** - Share entrepreneurial journey and ventures
- **Creative Professionals** - Display portfolio work interactively

## Advanced Features

### Custom Integrations

#### Analytics
```typescript
// Add to your chat component
useEffect(() => {
  // Track chat interactions
  analytics.track('chat_message_sent', {
    message_type: 'user_question',
    progressive_level: currentLevel
  });
}, [messages]);
```

#### Custom Actions
```typescript
// In assistant-config.ts
export const ACTION_BUTTONS = {
  schedule_call: {
    text: "Schedule a Call",
    action: "external_calendar"
  },
  view_case_study: {
    text: "View Detailed Case Study", 
    action: "external_link"
  }
};
```

#### Multi-language Support
```typescript
// Create locale-specific config files
// assistant-config.en.ts, assistant-config.es.ts
export const LOCALIZED_CONTENT = {
  en: englishContent,
  es: spanishContent
};
```

## Troubleshooting

### Common Issues

#### OpenAI API Errors
```bash
# Check your API key
echo $OPENAI_API_KEY

# Test API connectivity
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
     https://api.openai.com/v1/models
```

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Content Structure Issues
```bash
# Validate your content
npm run validate

# Check browser console for detailed errors
```

### Performance Optimization

#### Reduce Bundle Size
```typescript
// Use dynamic imports for heavy components
const ChatInterface = dynamic(() => import('@/components/chat/ChatInterface'), {
  loading: () => <ChatSkeleton />
});
```

#### Optimize OpenAI Calls
```typescript
// Implement response caching
const cachedResponse = await redis.get(`chat:${messageHash}`);
if (cachedResponse) return cachedResponse;
```

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for the GPT-4 API
- [Vercel](https://vercel.com) for seamless deployment
- [Tailwind CSS](https://tailwindcss.com) for the styling system
- [Radix UI](https://radix-ui.com) for accessible components

## 📞 Support
- 📧 **Email**: bethany@bethanyrobertson.com

---

**Made with ❤️ for developers, designers, and creators who want to stand out**
