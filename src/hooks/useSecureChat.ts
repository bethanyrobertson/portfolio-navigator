import { useState, useCallback, useRef, useEffect } from 'react';

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

interface UseSecureChatOptions {
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

export const useSecureChat = (options: UseSecureChatOptions = {}): ChatContextType => {
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
      content: "Hi! I'm Bethany. What would you like to know?",
      timestamp: new Date(),
      mode: 'default'
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<ChatMode>('default');
  const [isInitialized, setIsInitialized] = useState(false);
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

  // Initialize the assistant
  const initializeAssistant = useCallback(async () => {
    try {
      setIsInitialized(false);
      setError(null);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'initialize',
          message: 'init'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to initialize assistant');
      }

      const data = await response.json();
      
      if (data.success) {
        setIsInitialized(true);
        console.log('✅ Assistant initialized successfully');
      } else {
        throw new Error(data.error || 'Initialization failed');
      }
    } catch (error) {
      console.error('❌ Failed to initialize assistant:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      onError?.(new Error(errorMessage));
    }
  }, [onError]);

  // Auto-initialize when component mounts
  useEffect(() => {
    initializeAssistant();
  }, [initializeAssistant]);

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

  // Send message securely via API
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

      // Send message to secure API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'send_message',
          message: cleanContent,
          mode
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Update the assistant message with the response
        updateMessage(assistantMessage.id, {
          content: data.response,
          isLoading: false,
          timestamp: new Date()
        });

        // Track event
        trackEvent('message_received', {
          mode,
          responseLength: data.response.length
        });

        // Callback
        onMessageReceived?.({
          ...assistantMessage,
          content: data.response,
          isLoading: false,
          timestamp: new Date()
        });
      } else {
        throw new Error(data.error || 'Failed to get response');
      }

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

  // Retry assistant initialization
  const retryAssistant = useCallback(() => {
    setError(null);
    initializeAssistant();
  }, [initializeAssistant]);

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
      text: "Show me yourwork",
      message: "[Case Studies: Show me your most impactful projects and the results you achieved]",
      mode: 'casestudies' as ChatMode,
      category: 'casestudies' as const,
      description: "Explore case studies and design work"
    },
    {
      id: 'case-studies-process',
      text: "What's your design process?",
      message: "[Case Studies: Walk me through your design process and methodology]",
      mode: 'casestudies' as ChatMode,
      category: 'casestudies' as const,
      description: "Learn about approach and methods"
    },
    {
      id: 'resume-download',
      text: "Download resume",
      message: "[Resume: I'd like to download your resume to learn more about your experience]",
      mode: 'resume' as ChatMode,
      category: 'resume' as const,
      description: "Get resume and experience details"
    },
    {
      id: 'resume-skills',
      text: "What technologies do you use?",
      message: "[Resume: What technologies, tools, and skills do you work with?]",
      mode: 'resume' as ChatMode,
      category: 'resume' as const,
      description: "Explore technical skills and tools"
    },
    {
      id: 'about-background',
      text: "Tell me about your background",
      message: "[About Bethany: Tell me about your background and what got you into design]",
      mode: 'about' as ChatMode,
      category: 'about' as const,
      description: "Learn about your story and interests"
    },
    {
      id: 'about-availability',
      text: "Are you available for new projects?",
      message: "[About Bethany: Are youcurrently available for new projects or opportunities?]",
      mode: 'about' as ChatMode,
      category: 'about' as const,
      description: "Inquire about availability"
    }
  ];

  return { quickActions };
}; 
