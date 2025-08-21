import { NextRequest, NextResponse } from 'next/server';
import { PORTFOLIO_KNOWLEDGE, CONVERSATION_GUIDANCE } from '../../../src/data/portfolio-knowledge';
import { ASSISTANT_INSTRUCTIONS, PROGRESSIVE_CONTENT, CONTACT_INFO } from '../../../src/data/assistant-config';

export async function POST(request: NextRequest) {
  try {
    const { message, messages, instructions } = await request.json();
    
    // Use the assistant instructions from config
    const systemInstructions = ASSISTANT_INSTRUCTIONS || instructions;
    
    let response = '';
    const lowerMessage = message.toLowerCase();

    // Check if we have actual portfolio data or placeholders
    const hasRealData = !PORTFOLIO_KNOWLEDGE.personal.name.includes('[') && 
                       !PORTFOLIO_KNOWLEDGE.personal.name.includes('Your');

    if (hasRealData) {
      // Use actual portfolio data
      if (lowerMessage.includes('work') || lowerMessage.includes('project')) {
        response = formatProjectsResponse();
      } else if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
        response = formatExperienceResponse();
      } else if (lowerMessage.includes('skill') || lowerMessage.includes('tool')) {
        response = formatSkillsResponse();
      } else if (lowerMessage.includes('about') || lowerMessage.includes('personal')) {
        response = formatAboutResponse();
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('available')) {
        response = formatContactResponse();
      } else if (lowerMessage.includes('resume') || lowerMessage.includes('download')) {
        response = formatResumeResponse();
      } else {
        response = formatWelcomeResponse();
      }
    } else {
      // Use sample data when portfolio knowledge contains placeholders
      if (lowerMessage.includes('work') || lowerMessage.includes('project')) {
        response = getSampleResponse('project');
      } else if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
        response = getSampleResponse('experience');
      } else if (lowerMessage.includes('skill') || lowerMessage.includes('tool')) {
        response = getSampleResponse('skills');
      } else if (lowerMessage.includes('about') || lowerMessage.includes('personal')) {
        response = getSampleResponse('about');
      } else {
        response = getSampleResponse('about');
      }
    }

    // Check if response should include portfolio carousel
    const shouldShowPortfolio = lowerMessage.includes('work') || lowerMessage.includes('project') || lowerMessage.includes('portfolio');
    
    return NextResponse.json({
      message: {
        message: response,
        portfolio: shouldShowPortfolio
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}

// Functions to format responses using portfolio data
function formatProjectsResponse(): string {
  const projects = PORTFOLIO_KNOWLEDGE.projects.featured;
  if (projects && projects.length > 0) {
    let response = "Here are some of my featured projects:\n\n";
    
    projects.slice(0, 3).forEach((project, index) => {
      if (project.name && !project.name.includes('[')) {
        response += `**${project.name}**\n`;
        response += `${project.overview || project.challenge || 'Innovative project showcasing my skills'}\n`;
        if (project.results && project.results.metrics) {
          project.results.metrics.slice(0, 2).forEach(metric => {
            if (!metric.includes('[')) response += `• ${metric}\n`;
          });
        }
        response += '\n';
      }
    });
    
    response += "Would you like to learn more about any specific project?";
    return response;
  }
  
  return getSampleResponse('project');
}

function formatExperienceResponse(): string {
  const experience = PORTFOLIO_KNOWLEDGE.experience;
  if (experience && experience.current_role && !experience.current_role.title.includes('[')) {
    let response = `I'm a ${experience.current_role.title} with expertise in ${PORTFOLIO_KNOWLEDGE.personal.title || 'my field'}.\n\n`;
    
    response += `**Current Role:**\n`;
    response += `• ${experience.current_role.title} at ${experience.current_role.company}\n`;
    response += `• ${experience.current_role.duration}\n`;
    if (experience.current_role.description && !experience.current_role.description.includes('[')) {
      response += `• ${experience.current_role.description.substring(0, 200)}...\n`;
    }
    
    if (experience.current_role.key_achievements) {
      response += `\n**Key Achievements:**\n`;
      experience.current_role.key_achievements.slice(0, 3).forEach(achievement => {
        if (!achievement.includes('[')) response += `• ${achievement}\n`;
      });
    }
    
    return response;
  }
  
  return getSampleResponse('experience');
}

function formatSkillsResponse(): string {
  const skills = PORTFOLIO_KNOWLEDGE.skills;
  let response = "Here are my core skills and expertise:\n\n";
  
  if (skills.technical && skills.technical.programming_languages) {
    response += "**Technical Skills:**\n";
    skills.technical.programming_languages.slice(0, 3).forEach(lang => {
      if (!lang.name.includes('[')) {
        response += `• ${lang.name} (${lang.proficiency}) - ${lang.years_experience}\n`;
      }
    });
  }
  
  if (skills.domain_expertise) {
    response += "\n**Domain Expertise:**\n";
    skills.domain_expertise.slice(0, 3).forEach(area => {
      if (!area.area.includes('[')) {
        response += `• ${area.area}: ${area.description.substring(0, 100)}...\n`;
      }
    });
  }
  
  if (response === "Here are my core skills and expertise:\n\n") {
    return getSampleResponse('skills');
  }
  
  return response;
}

function formatAboutResponse(): string {
  const personal = PORTFOLIO_KNOWLEDGE.personal;
  if (personal && personal.elevator_pitch && !personal.elevator_pitch.includes('[')) {
    let response = personal.elevator_pitch + "\n\n";
    
    if (personal.values && personal.values.length > 0) {
      response += "**My Values:**\n";
      personal.values.forEach(value => {
        if (!value.includes('[')) response += `• ${value}\n`;
      });
    }
    
    if (personal.passions && personal.passions.length > 0) {
      response += "\n**What I'm Passionate About:**\n";
      personal.passions.forEach(passion => {
        if (!passion.includes('[')) response += `• ${passion}\n`;
      });
    }
    
    return response;
  }
  
  return getSampleResponse('about');
}

function formatContactResponse(): string {
  const contact = CONTACT_INFO;
  const personal = PORTFOLIO_KNOWLEDGE.personal;
  
  let response = "I'm always open to new opportunities and interesting conversations!\n\n";
  
  if (personal.email && !personal.email.includes('[')) {
    response += `📧 Email: ${personal.email}\n`;
  }
  if (personal.linkedin && !personal.linkedin.includes('[')) {
    response += `💼 LinkedIn: ${personal.linkedin}\n`;
  }
  if (personal.portfolio && !personal.portfolio.includes('[')) {
    response += `🌐 Portfolio: ${personal.portfolio}\n`;
  }
  
  response += "\nFeel free to reach out to discuss potential collaborations, projects, or just to chat!";
  
  return response;
}

function formatResumeResponse(): string {
  const resumePath = CONTACT_INFO.resume || '/assets/my-resume.pdf';
  
  return `I'd be happy to share my resume with you!

**Download Link:** [Resume PDF](${resumePath})

My resume includes:
• Detailed project descriptions and outcomes
• Complete work history and achievements  
• Technical skills and certifications
• Education and professional development

The resume provides a comprehensive overview of my experience and expertise.`;
}

function formatWelcomeResponse(): string {
  const name = PORTFOLIO_KNOWLEDGE.personal.name;
  const displayName = (name && !name.includes('[')) ? name.split(' ')[0] : 'my';
  
  return `Thanks for your message! I'm here to help you learn more about ${displayName} work and experience. You can ask me about:

• **Projects** - Featured work and case studies
• **Experience** - Background and career journey  
• **Skills** - Technical abilities and expertise
• **About** - Personal interests and philosophy
• **Contact** - How to get in touch

What would you like to explore?`;
}

// Fallback sample responses when portfolio data contains placeholders
function getSampleResponse(type: string): string {
  const responses: Record<string, string> = {
    project: `Here are some sample projects to demonstrate the chat functionality:

**E-commerce Platform Redesign**
• Increased conversion rate by 35%
• Improved user satisfaction scores by 40%
• Led design for 50K+ daily active users

**Mobile App Development**
• Built from concept to launch in 4 months
• Achieved 4.8/5 star rating in app stores
• Featured in "New and Noteworthy" section

**Design System Implementation**
• Created comprehensive component library
• Reduced design-to-dev handoff time by 60%
• Adopted across 15+ product teams

Would you like to learn more about any specific project?`,

    experience: `Here's an overview of my professional background:

**Current Role:**
• Senior Product Designer at TechCorp (2021-Present)
• Leading design for core product features
• Managing design system and component library

**Previous Experience:**
• Product Designer at StartupCo (2019-2021)
• UX Designer at AgencyCorp (2017-2019)
• Frontend Developer background

**Key Strengths:**
• User-centered design approach
• Strong collaboration with engineering teams
• Experience with design systems at scale`,

    skills: `Here are my core skills and expertise:

**Design Tools:**
• Figma (expert level)
• Adobe Creative Suite
• Sketch, Miro, Notion

**Development:**
• React, TypeScript, JavaScript
• CSS/SCSS, Tailwind CSS
• HTML5, responsive design

**Research & Testing:**
• User interviews and usability testing
• A/B testing and analytics
• Prototyping and wireframing

**Methodologies:**
• Design Thinking
• Agile/Scrum workflows
• Accessibility (WCAG compliance)`,

    about: `I'm passionate about creating digital experiences that truly serve users' needs. My journey started in computer science, but I discovered my love for the intersection of technology and human psychology.

**My Philosophy:**
"Great design is invisible - it solves problems so elegantly that users don't have to think about it."

**Personal Interests:**
• Accessibility and inclusive design
• Mentoring aspiring designers
• Contributing to open-source projects
• Hiking and outdoor activities

I believe in designing with empathy, testing with real users, and building with accessibility in mind from day one.`
  };

  return responses[type] || responses.about;
}

export async function GET() {
  return NextResponse.json({
    status: 'Chat API is running',
    timestamp: new Date().toISOString(),
    hasPortfolioData: !PORTFOLIO_KNOWLEDGE.personal.name.includes('[')
  });
}
