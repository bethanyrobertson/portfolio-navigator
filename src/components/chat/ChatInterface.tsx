import React, { useState, useRef, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { ASSISTANT_INSTRUCTIONS, PROGRESSIVE_CONTENT } from '@/data/assistant-config';
import { MotionGridDemo } from '@/components/sections/motion-grid-demo';
import { useQuickActions } from '@/hooks/useChat';
import ThumbnailCarousel from '@/components/chat/thumbnailcasestudy';

import Link from 'next/link';

interface ChatButton {
  id: string;
  text: string;
  icon?: string;
  action: string;
  variant: 'primary' | 'secondary' | 'outline';
  linkType: 'internal' | 'external';
  url?: string;
  context?: any;
}

interface MessageContent {
  message: string;
  buttons?: ChatButton[];
  portfolio?: boolean;
  contact?: boolean;
  resume?: boolean;
  work?: boolean;
  metadata?: {
    level: number;
    section: string;
  };
}

interface Message {
  type: 'assistant' | 'user';
  content: MessageContent | string;
  isButtonAction?: boolean;
}

// Message formatting utility
const formatMessage = (message: string): string => {
  if (!message) return '';
  
  // Clean up markdown symbols and formatting
  const cleanedMessage = message
    // Remove markdown headers (###, ##, #)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic markers (**text**, *text*)
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    // Remove code blocks (```text```)
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code (`text`)
    .replace(/`([^`]+)`/g, '$1')
    // Remove links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove horizontal rules (---, ***)
    .replace(/^[-*_]{3,}$/gm, '')
    // Remove blockquotes (> text)
    .replace(/^>\s*/gm, '')
    // Clean up extra whitespace
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
  
  // Split by double newlines to preserve paragraph breaks
  const paragraphs = cleanedMessage.split('\n\n');
  
  return paragraphs.map(paragraph => {
    // Check if paragraph starts with bullet points or numbered lists
    if (paragraph.trim().match(/^[\-\*•]\s/)) {
      // Handle bullet points
      const lines = paragraph.split('\n');
      return lines.map(line => {
        if (line.trim().match(/^[\-\*•]\s/)) {
          return `• ${line.trim().replace(/^[\-\*•]\s/, '')}`;
        }
        return line;
      }).join('\n');
    } else if (paragraph.trim().match(/^\d+\.\s/)) {
      // Handle numbered lists
      const lines = paragraph.split('\n');
      let counter = 1;
      return lines.map(line => {
        if (line.trim().match(/^\d+\.\s/)) {
          return `${counter++}. ${line.trim().replace(/^\d+\.\s/, '')}`;
        }
        return line;
      }).join('\n');
    }
    
    return paragraph;
  }).join('\n\n');
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant',
      content: {
        message: "Hi! I'm here to help you explore my work and experience. Click 'My Work' to see my projects!",
        buttons: []
      }
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { quickActions } = useQuickActions();

  // Progressive disclosure handler
  const handleProgressiveDisclosure = (action: string): Message => {
    console.log('Progressive disclosure called with action:', action);
    console.log('PROGRESSIVE_CONTENT.overview keys:', Object.keys(PROGRESSIVE_CONTENT.overview));
    
    try {
      // Check which level and content to return
      if (action in PROGRESSIVE_CONTENT.overview) {
        const content = PROGRESSIVE_CONTENT.overview[action as keyof typeof PROGRESSIVE_CONTENT.overview];
        console.log('Found content:', content);
        
        return {
          type: 'assistant',
          content: {
            message: `**${content.title}**\n\n${content.description}`,
            buttons: [], // For now, no additional buttons
            // Include portfolio carousel for work-related actions
            portfolio: action === 'work'
          }
        };
      }
    } catch (error) {
      console.error('Error in progressive disclosure:', error);
      return {
        type: 'assistant',
        content: {
          message: "I'd be happy to help you learn more! What specific aspect interests you?",
          portfolio: action === 'work'
        }
      };
    }
    
    // Check if action exists in any of the progressive content sections
    const allSections = {
      ...PROGRESSIVE_CONTENT.overview,
      ...PROGRESSIVE_CONTENT.experience_details,
      ...PROGRESSIVE_CONTENT.about_details,
      ...PROGRESSIVE_CONTENT.project_categories,
      ...PROGRESSIVE_CONTENT.skills_breakdown,
      ...PROGRESSIVE_CONTENT.current_role_deep,
      ...PROGRESSIVE_CONTENT.project_1_details,
      ...PROGRESSIVE_CONTENT.project_1_solution,
      ...PROGRESSIVE_CONTENT.responsibility_examples
    };
    
    if (action in allSections) {
      const content = allSections[action as keyof typeof allSections];
      return {
        type: 'assistant',
        content: {
          message: `**${content.title}**\n\n${content.description}`,
          buttons: [] // For now, no additional buttons
        }
      };
    }
    
    // Fallback for unknown actions
    return {
      type: 'assistant',
      content: "I'd be happy to help you learn more! What specific aspect interests you?"
    };
  };



  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUserInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userInputText = userInput.trim();
    const userMessage: Message = {
      type: 'user',
      content: userInputText
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    // Check if user typed "resume" and offer download
    if (userInputText.toLowerCase().includes('resume')) {
      const resumeResponse: Message = {
        type: 'assistant',
        content: {
          message: "I'd be happy to share my resume with you! Here's a download link:",
          resume: true
        }
      };
      setMessages(prev => [...prev, resumeResponse]);
      setIsLoading(false);
      return;
    }

    // Check if user typed "contact" and show contact form
    if (userInputText.toLowerCase().includes('contact')) {
      const contactResponse: Message = {
        type: 'assistant',
        content: {
          message: "Here's how you can get in touch with me:",
          contact: true
        }
      };
      setMessages(prev => [...prev, contactResponse]);
      setIsLoading(false);
      return;
    }

    // Check if user typed "case study" or "case studies" and show portfolio carousel
    if (userInputText.toLowerCase().includes('case study') || userInputText.toLowerCase().includes('case studies')) {
      console.log('Case study detected! Input was:', userInputText);
      const portfolioResponse: Message = {
        type: 'assistant',
        content: {
          message: "Here are my case studies. Click on any thumbnail to explore the full project:",
          portfolio: true
        }
      };
      console.log('Portfolio response created:', portfolioResponse);
      setMessages(prev => [...prev, portfolioResponse]);
      setIsLoading(false);
      return;
    }

    // Check if user typed "work" and show work information with portfolio carousel
    if (userInputText.toLowerCase().includes('work')) {
      console.log('Work detected! Input was:', userInputText);
      const workResponse: Message = {
        type: 'assistant',
        content: {
          message: "Here's information about my work experience:",
          work: true,
          portfolio: true
        }
      };
      console.log('Work response created:', workResponse);
      setMessages(prev => [...prev, workResponse]);
      setIsLoading(false);
      return;
    }

    // Check if user typed "skills" and show inline skills list
    if (userInputText.toLowerCase().includes('skills')) {
      const skillsResponse: Message = {
        type: 'assistant',
        content: {
          message: "Here are my core skills and competencies:\n\nProduct Design: visual design, AI-driven concepting, technical and tooling audience design, frontend dev & rapid prototyping, UX research, usability testing, information architecture, interaction & responsive design.\n\nDesign Systems: Design tokens, developer collaboration, API design collaboration, design system documentation.\n\nLeadership: React & frontend prototyping, stakeholder communication, design critique facilitation, mentoring & team culture.\n\nTechnical Skills:\n• Design & Prototyping: Figma, Adobe Creative Suite, Lottie, Jitter, Framer, Webflow, Cursor, Claude, V0\n• Frontend Development: React, TypeScript, Storybook, JavaScript, HTML/CSS, Next.js, GitHub, MongoDB, Vercel\n• AI / LLMs: Cursor, Claude, Midjourney, Sora, Suno, ElevenLabs"
        }
      };
      setMessages(prev => [...prev, skillsResponse]);
      setIsLoading(false);
      return;
    }

    // Check if user typed "work" and show work overview
    if (userInputText.toLowerCase().includes('work')) {
      const workResponse: Message = {
        type: 'assistant',
        content: {
          message: "I'd be happy to tell you about my work! I have experience across several areas:\n\n• Current Role: Senior UX/UI Designer at MoCaFi, a fintech serving underbanked populations\n• Contract Work: Google/Waze, Aptos Labs, design leadership and systems work\n• Previous Experience: Coinbase (100M+ users), independent practice (30+ clients)\n• Technical Skills: React, TypeScript, AI-assisted design workflows\n• Leadership: Mentoring 20+ designers, teaching experience\n\nWhat specific aspect would you like to know more about?",
          buttons: [
            {
              id: "btn_work",
              text: "My Work",
              action: "work",
              variant: "primary" as const,
              linkType: "internal" as const
            },
            {
              id: "btn_experience",
              text: "Experience",
              action: "experience",
              variant: "secondary" as const,
              linkType: "internal" as const
            },
            {
              id: "btn_skills",
              text: "Skills",
              action: "skills",
              variant: "secondary" as const,
              linkType: "internal" as const
            },
            {
              id: "btn_about",
              text: "About Me",
              action: "about",
              variant: "outline" as const,
              linkType: "internal" as const
            }
          ]
        }
      };
      setMessages(prev => [...prev, workResponse]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput.trim(),
          messages: [...messages, userMessage],
          instructions: ASSISTANT_INSTRUCTIONS
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      if (data.message) {
        // Check if the API returned a structured response or just a string
        if (typeof data.message === 'string') {
          // Simple string response
          const assistantMessage: Message = {
            type: 'assistant',
            content: data.message
          };
          setMessages(prev => [...prev, assistantMessage]);
        } else {
          // Structured response with message, buttons, metadata
          const assistantMessage: Message = {
            type: 'assistant',
            content: {
              message: data.message.message || 'No message content',
              buttons: data.message.buttons,
              metadata: data.message.metadata,
              portfolio: data.message.portfolio,
              work: data.message.work,
              contact: data.message.contact,
              resume: data.message.resume
            }
          };
          setMessages(prev => [...prev, assistantMessage]);
        }
        
        // Handle resume download if present
        if (data.message.downloadUrl && data.message.downloadUrl.includes('my-resume.pdf')) {
          const link = document.createElement('a');
          link.href = data.message.downloadUrl;
          link.download = 'my-resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        type: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = async (button: ChatButton) => {
    console.log('Button clicked:', button.action);
    if (isLoading) return;

    const buttonMessage: Message = {
      type: 'user',
      content: button.text,
      isButtonAction: true
    };

    setMessages(prev => [...prev, buttonMessage]);

    // Progressive disclosure actions
    const progressiveActions = [
      // Level 1: Overview
      'work', 'experience', 'skills', 'about',
      
      // Level 2: Details  
      'work_current', 'work_contract', 'work_crypto', 'work_process',
      'exp_current', 'exp_contract', 'exp_coinbase', 'exp_teaching',
      'skills_design', 'skills_tech', 'skills_ai', 'skills_systems',
      'about_background', 'about_teaching', 'about_current', 'about_philosophy',
      
      // Level 3: Deep dive
      'mocafi_challenge', 'mocafi_system', 'contract_google', 'contract_aptos', 'contract_leadership',
      'coinbase_chat', 'coinbase_education', 'ai_workflow', 'about_teaching', 'about_current', 'teaching_independent',
      'process_research', 'process_ai', 'process_prototyping', 'process_collaboration',
      
      // Level 4: Granular details  
      'mocafi_workflows', 'mocafi_underbanked', 'system_handoff', 'aptos_wallet', 'aptos_ai',
      'coinbase_scale', 'coinbase_metrics', 'education_infographics', 'google_waze', 'google_privacy', 'google_store',
      'teaching_adplist', 'teaching_92y', 'teaching_independent', 'js_certificate',
      'workflows_onboarding', 'workflows_users', 'underbanked_accessibility', 'underbanked_literacy',
      'handoff_wcag', 'handoff_documentation', 'aptos_icons', 'aptos_components',
      'ai_assets', 'ai_efficiency', 'scale_patterns', 'scale_architecture',
      'metrics_64', 'metrics_96', 'infographics_crypto', 'infographics_accessibility',
      'adplist_guidance', 'adplist_portfolio', '92y_curriculum', '92y_students',
      'independent_clients', 'independent_systems', 'independent_process',
      'js_fullstack', 'js_bridge', 'leadership_waze', 'leadership_consistency',
      'clients_diversity', 'clients_management', 'systems_identity', 'systems_consistency',
      'process_discovery', 'process_guidelines', 'bridge_frontend', 'bridge_collaboration',
      'research_usability', 'research_stakeholders', 'research_accessibility',
      'ai_concepting', 'ai_iteration', 'ai_tools_process',
      'prototyping_react', 'prototyping_tokens', 'prototyping_testing',
      'collab_critique', 'collab_specs', 'collab_documentation',
      'guidelines_interactive', 'guidelines_efficiency', 'usability_diverse', 'usability_methods',
      'concepting_visual', 'concepting_content', 'react_functional', 'react_production',
      'critique_facilitation', 'critique_balance'
    ];

    if (progressiveActions.includes(button.action.toLowerCase())) {
      const response = handleProgressiveDisclosure(button.action.toLowerCase());
      setMessages(prev => [...prev, response]);
      return;
    }

    // Handle portfolio display
    if (button.action === "VIEW_PORTFOLIO") {
      const portfolioResponse: Message = {
        type: 'assistant',
        content: {
          message: "Here are my case studies. Click on any thumbnail to explore the full project:",
          portfolio: true
        }
      };
      
      setMessages(prev => [...prev, portfolioResponse]);
      return;
    }

    // Handle contact form display
    if (button.action === "CONTACT_ME") {
      const contactResponse: Message = {
        type: 'assistant',
        content: {
          message: "Here's how you can get in touch with me:",
          contact: true
        }
      };
      
      setMessages(prev => [...prev, contactResponse]);
      setShowContactForm(true);
      return;
    }

    // Handle resume download
    if (button.action === "DOWNLOAD_RESUME") {
      const resumeResponse: Message = {
        type: 'assistant',
        content: {
          message: "Here's my resume download:",
          resume: true
        }
      };
      
      setMessages(prev => [...prev, resumeResponse]);
      return;
    }

    // For any other actions, use API
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `[BUTTON_ACTION: ${button.action}]`,
          messages: [...messages, buttonMessage],
          instructions: ASSISTANT_INSTRUCTIONS,
          buttonAction: button.action
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      if (data.message) {
        // Check if the API returned a structured response or just a string
        if (typeof data.message === 'string') {
          // Simple string response
          const assistantMessage: Message = {
            type: 'assistant',
            content: data.message
          };
          setMessages(prev => [...prev, assistantMessage]);
        } else {
          // Structured response with message, buttons, metadata
          const assistantMessage: Message = {
            type: 'assistant',
            content: {
              message: data.message.message || 'No message content',
              buttons: data.message.buttons,
              metadata: data.message.metadata,
              portfolio: data.message.portfolio,
              work: data.message.work,
              contact: data.message.contact,
              resume: data.message.resume
            }
          };
          setMessages(prev => [...prev, assistantMessage]);
        }
        
        // Handle resume download if present
        if (data.message.downloadUrl && data.message.downloadUrl.includes('my-resume.pdf')) {
          const link = document.createElement('a');
          link.href = data.message.downloadUrl;
          link.download = 'my-resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        type: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<any>;
    return IconComponent ? <IconComponent size={16} /> : null;
  };

  const renderMessage = (message: Message, index: number) => {
    if (typeof message.content === 'string') {
      return (
        <div key={index} className={`message ${message.type}-message`}>
          {message.type === 'assistant' && (
            <div className="flex items-start gap-4">
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#DAC4E1',
                  flexShrink: 0,
                  marginTop: '4px'
                }}
              />
              
              <div className="message-content flex-1">
                {formatMessage(message.content)}
              </div>
            </div>
          )}
          {message.type === 'user' && (
            <div className="message-content">
              {formatMessage(message.content)}
            </div>
          )}
        </div>
      );
    }

    const content = message.content as MessageContent;
    return (
      <div key={index} className={`message ${message.type}-message`}>
        {message.type === 'assistant' && (
          <div className="flex items-start gap-4">
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#DAC4E1',
                flexShrink: 0,
                marginTop: '4px'
              }}
            />
            
            <div className="message-content flex-1">
              {formatMessage(content.message)}
              
              {/* Buttons - Aligned with avatar left edge */}
              {content.buttons && content.buttons.length > 0 && (
                <div className="message-buttons flex flex-wrap gap-3 mt-4 justify-start" style={{ marginLeft: '-24px' }}>
                  {content.buttons
                    .filter(button => button.text && button.text.trim() !== '')
                    .map((button) => (
                      <button
                        key={button.id}
                        className={`btn btn-${button.variant} flex-shrink-0`}
                        onClick={() => handleButtonClick(button)}
                        disabled={isLoading}
                        style={{ fontFamily: 'var(--font-mono), "GeistMonoVF", "SF Mono", monospace' }}
                      >
                        {button.text}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
        {message.type === 'user' && (
          <div className="message-content">
            {formatMessage(content.message)}
          </div>
        )}
        
        {/* Portfolio Carousel */}
        {content.portfolio && (
          <div className="portfolio-display">
            <ThumbnailCarousel />
          </div>
        )}

        {/* Work Information Display */}
        {content.work && (
          <div className="work-display mt-6">
            <div className="work-info space-y-4">
              <p className="work-description text-white/70 text-sm leading-relaxed">
                I'm currently a Senior UX/UI Designer at MoCaFi, a fintech serving underbanked populations. I specialize in design systems, AI integrations, and bridging design-development gaps.
              </p>
              <div className="work-highlights space-y-3">
                <div className="highlight-item flex items-start gap-2">
                  <span className="text-white/70 font-medium text-xs">Current Role:</span>
                  <span className="text-white/70 text-xs">Senior UX/UI Designer at MoCaFi</span>
                </div>
                <div className="highlight-item flex items-start gap-2">
                  <span className="text-white/70 font-medium text-xs">Specialization:</span>
                  <span className="text-white/70 text-xs">Design systems, AI integrations, design-development collaboration</span>
                </div>
                <div className="highlight-item flex items-start gap-2">
                  <span className="text-white/70 font-medium text-xs">Recent Impact:</span>
                  <span className="text-white/70 text-xs">Reduced design-to-dev handoff time by 50%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form */}
        {content.contact && (
          <div className="contact-display">
            <div className="contact-info">
              <div className="contact-item">
                <strong>Email:</strong> 
                <a 
                  href="mailto:hello@yourname.com" 
                  className="contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hello@yourname.com
                </a>
              </div>
              <div className="contact-item">
                <strong>Phone:</strong> 
                <span className="contact-text">+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <strong>Location:</strong> 
                <span className="contact-text">San Francisco, CA</span>
              </div>
              <div className="contact-item">
                <strong>LinkedIn:</strong> 
                <a 
                  href="https://linkedin.com/in/your-linkedin-username" 
                  className="contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/your-linkedin-username
                </a>
              </div>
              <div className="contact-item">
                <strong>Portfolio:</strong> 
                <a 
                  href="https://yourportfolio.com" 
                  className="contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  yourportfolio.com
                </a>
              </div>
              <div className="contact-item">
                <strong>Website:</strong> 
                <a 
                  href="https://yourwebsite.com" 
                  className="contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  yourwebsite.com
                </a>
              </div>
            </div>
            <div className="contact-note">
              I'm always interested in discussing new opportunities, design challenges, or just connecting with fellow professionals. Feel free to reach out!
            </div>
          </div>
        )}

        {/* Resume Download */}
        {content.resume && (
          <div className="resume-display">
            <div className="resume-download">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/assets/my-resume.pdf';
                  link.download = 'my-resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="resume-download-btn"
              >
                my-resume.pdf
              </button>
            </div>
            <div className="resume-note">
              Click the button above to download my resume. Feel free to reach out if you have any questions!
            </div>
          </div>
        )}


      </div>
    );
  };

  return (
    <div className="chat-interface">
      {/* Header */}
      <div className="chat-header">
        <div className="header-left">
          <div className="avatar-container">
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#DAC4E1'
              }}
            />
          </div>
          <div className="chat-title">Name</div>
        </div>
        
        <Link href="#" className="more-about-link" onClick={(e) => {
          e.preventDefault();
          // TODO: Replace with your actual portfolio URL
          // Example: window.open('https://yourportfolio.com', '_blank');
          console.log('Add your portfolio link here');
        }}>
          More about me →
        </Link>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((message, index) => renderMessage(message, index))}
        
        {/* Loading Animation */}
        {isLoading && (
          <div className="thinking-animation">
            <MotionGridDemo />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Combined Input and Buttons Container */}
      <div className="chat-input-and-buttons-container">
        {/* User Input Form */}
        <div className="chat-input-container">
          <form onSubmit={handleUserInputSubmit} className="chat-input-form">
            <div className="input-wrapper">
              <input
                type="text"
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
                placeholder="Type your question here..."
                className="chat-input"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="send-button"
                disabled={!userInput.trim() || isLoading}
                onClick={() => {
                  if (userInput.trim() && !isLoading) {
                    handleUserInputSubmit(new Event('submit') as any);
                  }
                }}
              >
                <LucideIcons.Send size={16} />
              </button>
            </div>
          </form>
        </div>

        {/* Main Menu Buttons - Permanently positioned below input */}
        <div className="button-grid main-menu-buttons flex flex-wrap gap-3 mt-4 justify-start">
          {([
            {
              id: "btn_work",
              text: "My Work",
              action: "work",
              variant: "primary" as const,
              linkType: "internal" as const
            },
            {
              id: "btn_experience", 
              text: "Experience",
              action: "experience",
              variant: "primary" as const,
              linkType: "internal" as const
            },
            {
              id: "btn_skills",
              text: "Skills",
              action: "skills",
              variant: "primary" as const,
              linkType: "internal" as const
            },
            {
              id: "btn_about",
              text: "About Me",
              action: "about",
              variant: "primary" as const,
              linkType: "internal" as const
            },
            {
              id: "btn_contact",
              text: "Contact Me",
              action: "CONTACT_ME",
              variant: "primary" as const,
              linkType: "internal" as const
            },
            {
              id: "btn_resume",
              text: "my-resume.pdf",
              action: "DOWNLOAD_RESUME",
              variant: "primary" as const,
              linkType: "internal" as const
            }
          ] as ChatButton[]).map((button) => (
            <button
              key={button.id}
              className={`btn btn-${button.variant} flex-shrink-0`}
              onClick={() => handleButtonClick(button)}
              disabled={isLoading}
              style={{ fontFamily: 'var(--font-mono), "GeistMonoVF", "SF Mono", monospace' }}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
