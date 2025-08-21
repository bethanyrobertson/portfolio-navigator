// src/hooks/useChat.ts

import { useState, useCallback, useRef, useEffect } from 'react';

// Declare gtag for Google Analytics
declare global {
  function gtag(...args: any[]): void;
}

// Types
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  images?: string[];
  isLoading?: boolean;
  mode?: 'casestudies' | 'resume' | 'about' | 'default';
}

type ChatMode = 'casestudies' | 'resume' | 'about' | 'default';

interface ChatError extends Error {
  code?: string;
  details?: any;
}

interface UseChatOptions {
  maxMessages?: number;
  autoScroll?: boolean;
  enableAnalytics?: boolean;
  onError?: (error: ChatError) => void;
  onMessageSent?: (message: ChatMessage) => void;
  onMessageReceived?: (message: ChatMessage) => void;
}

interface ChatContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (content: string, files?: File[]) => Promise<void>;
  clearMessages: () => void;
  isInitialized: boolean;
  error: string | null;
  retryLastMessage: () => void;
  retryAssistant: () => void;
  currentMode: ChatMode;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export const useChat = (options: UseChatOptions = {}): ChatContextType => {
  const {
    maxMessages = 100,
    autoScroll = true,
    enableAnalytics = false,
    onError,
    onMessageSent,
    onMessageReceived
  } = options;

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Bethany's AI assistant. I can help you explore her case studies, download her resume, or learn more about her background. What would you like to know?",
      timestamp: new Date(),
      mode: 'default'
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<ChatMode>('default');
  const [isInitialized, setIsInitialized] = useState(true); // Mock as initialized
  const [error, setError] = useState<string | null>(null);
  
  // Refs for auto-scroll and cleanup
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, autoScroll]);

  // Parse mode from message content
  const parseMessageMode = useCallback((content: string): { mode: ChatMode; cleanContent: string } => {
    if (content.startsWith('[Case Studies:')) {
      return {
        mode: 'casestudies',
        cleanContent: content.replace(/^\[Case Studies:\s*/, '').replace(/\]$/, '')
      };
    } else if (content.startsWith('[Resume:')) {
      return {
        mode: 'resume', 
        cleanContent: content.replace(/^\[Resume:\s*/, '').replace(/\]$/, '')
      };
    } else if (content.startsWith('[About Bethany:')) {
      return {
        mode: 'about',
        cleanContent: content.replace(/^\[About Bethany:\s*/, '').replace(/\]$/, '')
      };
    }
    
    return { mode: 'default', cleanContent: content };
  }, []);

  // Analytics tracking
  const trackEvent = useCallback((eventType: string, data: any = {}) => {
    if (!enableAnalytics) return;

    try {
      // Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', eventType, {
          event_category: 'chat',
          ...data
        });
      }

      // Console logging for debugging
      console.log('📊 Chat Analytics:', { eventType, data });
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }, [enableAnalytics]);

  // Add message to chat
  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };

    setMessages(prev => {
      const updated = [...prev, newMessage];
      // Limit message history
      if (updated.length > maxMessages) {
        return updated.slice(-maxMessages);
      }
      return updated;
    });

    return newMessage;
  }, [maxMessages]);

  // Update existing message
  const updateMessage = useCallback((messageId: string, updates: Partial<ChatMessage>) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, ...updates } : msg
      )
    );
  }, []);

  // Mock AI response based on mode
  const getMockResponse = useCallback((mode: ChatMode, content: string): string => {
    if (mode === 'casestudies') {
      if (content.toLowerCase().includes('process') || content.toLowerCase().includes('methodology')) {
        return "Bethany follows a user-centered design process:\n\n1. **Research & Discovery** - User interviews, competitive analysis, stakeholder alignment\n2. **Define & Ideate** - Problem framing, user personas, journey mapping\n3. **Design & Prototype** - Wireframes, visual design, interactive prototypes\n4. **Test & Iterate** - Usability testing, A/B testing, feedback integration\n5. **Launch & Measure** - Implementation support, success metrics tracking\n\nShe emphasizes collaboration with engineering teams and always starts with understanding the user's real needs, not just what they say they want.";
      }
      return "Here are some of Bethany's most impactful projects:\n\n**1. FinTech Mobile Banking Redesign**\n• 40% increase in user satisfaction\n• 25% reduction in support tickets\n• Led design for 100K+ users\n\n**2. E-commerce Checkout Optimization**\n• 35% increase in conversion rate\n• Generated $2M additional revenue\n• Simplified from 5 steps to 2 steps\n\n**3. SaaS Dashboard Design System**\n• 60% faster design-to-dev handoff\n• Adopted by 50+ teams\n• Built comprehensive component library\n\nWould you like me to dive deeper into any specific project?";
    } else if (mode === 'resume') {
      if (content.toLowerCase().includes('download')) {
        // Simulate resume download
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = '/assets/BethanyRobertson_Designer_Resume_2025.pdf'; // This would be your actual resume file
          link.download = 'Bethany_Designer_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 1000);
        
        return "✅ Starting resume download! The PDF should begin downloading shortly.\n\n**Bethany's Experience Summary:**\n• 7+ years in product design and development\n• Senior Product Designer at TechCorp (2021-Present)\n• Led design for 3 major product launches\n• Built design systems used by 15+ teams\n• Strong background in both design and frontend development\n\nThe resume includes detailed project descriptions, technical skills, and contact information.";
      }
      return "**Bethany's Technical Skills:**\n\n**Design Tools:**\n• Figma, Adobe Creative Suite, Sketch\n• Miro, Notion, Linear\n• Prototyping tools (Framer, Principle)\n\n**Development:**\n• React, TypeScript, JavaScript\n• CSS/SCSS, Tailwind\n• HTML5, responsive design\n\n**Research & Testing:**\n• User interviews, usability testing\n• A/B testing, analytics\n• Hotjar, Maze, Optimizely\n\n**Methodologies:**\n• Design Thinking, Agile/Scrum\n• User-Centered Design\n• Accessibility (WCAG compliance)\n\nHer unique combination of design and development skills allows her to bridge the gap between design vision and technical implementation.";
    } else if (mode === 'about') {
      if (content.toLowerCase().includes('available') || content.toLowerCase().includes('projects')) {
        return "Bethany is currently open to new opportunities! She's particularly interested in:\n\n**Types of Projects:**\n• Product design leadership roles\n• Design system initiatives\n• Early-stage startup opportunities\n• Accessibility-focused projects\n\n**What She's Looking For:**\n• Collaborative, user-focused teams\n• Opportunities to mentor other designers\n• Complex design challenges\n• Companies that value both design and development skills\n\n**Contact Information:**\n📧 bethany@example.com\n💼 linkedin.com/in/bethany-designer\n🌐 bethanydesigns.com\n\nFeel free to reach out to discuss potential collaborations or just chat about design!";
      }
      return "Bethany discovered her passion for design while studying computer science in college. She became fascinated by the intersection of technology and human psychology, which led her to transition into UX design while maintaining her technical development skills.\n\n**Her Design Philosophy:**\n*\"Great design is invisible - it solves problems so elegantly that users don't have to think about it. I believe in designing with empathy, testing with real users, and building with accessibility in mind from day one.\"*\n\n**Personal Interests:**\n• Accessibility and inclusive design\n• Mentoring aspiring designers (ADPList)\n• Hiking in the Bay Area\n• Contributing to open-source design tools\n• Sustainable design practices\n\n**What Colleagues Say:**\n*\"Bethany brings a unique combination of design thinking and technical expertise that makes her an invaluable collaborator.\"* - Sarah Chen, Engineering Manager";
    }
    
    return "Thanks for your message! I can help you learn about Bethany's case studies, experience, or background. You can ask about:\n\n• Her design projects and process\n• Technical skills and experience\n• Background and interests\n• Availability for new projects\n\nWhat would you like to explore?";
  }, []);

  // Process uploaded files
  const processFiles = useCallback(async (files: File[]): Promise<Array<{ file: File; dataUrl: string }>> => {
    const processed = [];
    
    for (const file of files) {
      try {
        // Validate file
        if (!file.type.startsWith('image/')) {
          throw new Error(`Unsupported file type: ${file.type}. Only images are supported.`);
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          throw new Error(`File too large: ${file.name}. Maximum size is 10MB.`);
        }

        // Convert to data URL
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(file);
        });

        processed.push({ file, dataUrl });
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        throw error;
      }
    }

    return processed;
  }, []);

  // Send message
  const sendMessage = useCallback(async (content: string, files?: File[]) => {
    if (!content.trim() && (!files || files.length === 0)) {
      return;
    }

    if (!isInitialized) {
      const chatError: ChatError = new Error('Assistant not initialized. Please wait or try refreshing the page.');
      onError?.(chatError);
      return;
    }

    // Cancel any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      setIsLoading(true);
      setError(null);

      // Parse mode and content
      const { mode, cleanContent } = parseMessageMode(content);
      setCurrentMode(mode);

      // Handle file uploads (if any)
      const processedFiles = files ? await processFiles(files) : undefined;

      // Add user message
      const userMessage = addMessage({
        role: 'user',
        content: cleanContent,
        mode,
        images: processedFiles?.map(f => f.dataUrl)
      });

      // Track event
      trackEvent('message_sent', {
        mode,
        contentLength: cleanContent.length,
        hasFiles: !!files?.length
      });

      // Callback
      onMessageSent?.(userMessage);

      // Add placeholder for assistant response
      const assistantMessage = addMessage({
        role: 'assistant',
        content: '',
        isLoading: true,
        mode: 'default'
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      // Get mock response
      const response = getMockResponse(mode, cleanContent);

      // Update the assistant message
      const finalMessage = {
        ...assistantMessage,
        content: response,
        isLoading: false,
        timestamp: new Date()
      };

      updateMessage(assistantMessage.id, {
        content: response,
        isLoading: false,
        timestamp: new Date()
      });

      // Track event
      trackEvent('message_received', {
        mode,
        responseLength: response.length
      });

      // Callback
      onMessageReceived?.(finalMessage);

    } catch (error) {
      console.error('Error sending message:', error);
      
      const chatError: ChatError = error instanceof Error ? error : new Error(
        'Failed to send message. Please try again.'
      );
      chatError.code = 'SEND_ERROR';

      // Track error
      trackEvent('error_occurred', {
        errorType: 'send_error',
        errorMessage: chatError.message
      });

      setError(chatError.message);
      onError?.(chatError);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [
    isInitialized,
    parseMessageMode,
    addMessage,
    updateMessage,
    getMockResponse,
    processFiles,
    trackEvent,
    onError,
    onMessageSent,
    onMessageReceived
  ]);

  // Clear messages
  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Hi! I'm Bethany's AI assistant. How can I help you today?",
        timestamp: new Date(),
        mode: 'default'
      }
    ]);
    
    trackEvent('chat_cleared');
  }, [trackEvent]);

  // Retry failed message
  const retryLastMessage = useCallback(() => {
    const lastUserMessage = messages.slice().reverse().find(m => m.role === 'user');
    if (lastUserMessage && !isLoading) {
      sendMessage(lastUserMessage.content);
    }
  }, [messages, isLoading, sendMessage]);

  // Retry assistant initialization (mock)
  const retryAssistant = useCallback(() => {
    setError(null);
    setIsInitialized(true);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    isInitialized,
    error,
    retryLastMessage,
    retryAssistant,
    currentMode,
    messagesEndRef
  };
};

// Custom hook for quick actions
export const useQuickActions = () => {
  const quickActions = [
    {
      id: 'case-studies-projects',
      text: "Show me Bethany's best projects",
      message: "[Case Studies: Show me Bethany's most impactful projects and the results she achieved]",
      mode: 'casestudies' as ChatMode,
      category: 'casestudies' as const,
      description: "Explore case studies and design work",
      icon: 'star'
    },
    {
      id: 'case-studies-process',
      text: "What's Bethany's design process?",
      message: "[Case Studies: Walk me through Bethany's design process and methodology]",
      mode: 'casestudies' as ChatMode,
      category: 'casestudies' as const,
      description: "Learn about her approach and methods",
      icon: 'workflow'
    },
    {
      id: 'resume-download',
      text: "Download her resume",
      message: "[Resume: I'd like to download Bethany's resume to learn more about her experience]",
      mode: 'resume' as ChatMode,
      category: 'resume' as const,
      description: "Get resume and experience details",
      icon: 'download'
    },
    {
      id: 'resume-skills',
      text: "What technologies does she use?",
      message: "[Resume: What technologies, tools, and skills does Bethany work with?]",
      mode: 'resume' as ChatMode,
      category: 'resume' as const,
      description: "Explore technical skills and tools",
      icon: 'code'
    },
    {
      id: 'about-background',
      text: "Tell me about Bethany's background",
      message: "[About Bethany: Tell me about Bethany's background and what got her into design]",
      mode: 'about' as ChatMode,
      category: 'about' as const,
      description: "Learn about her story and interests",
      icon: 'user'
    },
    {
      id: 'about-availability',
      text: "Is Bethany available for new projects?",
      message: "[About Bethany: Is Bethany currently available for new projects or opportunities?]",
      mode: 'about' as ChatMode,
      category: 'about' as const,
      description: "Inquire about availability",
      icon: 'calendar'
    }
  ];

  return { quickActions };
};
