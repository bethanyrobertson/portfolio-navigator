// =============================================================================
// PORTFOLIO KNOWLEDGE BASE TEMPLATE
// =============================================================================
// This file contains detailed information about your experience, projects, and skills
// that the AI assistant will reference during conversations.
// Replace ALL PLACEHOLDER TEXT with your actual information.

export const PORTFOLIO_KNOWLEDGE = {
  
  // =============================================================================
  // PERSONAL INFORMATION
  // =============================================================================
  personal: {
    name: "[Your Full Name]",
    title: "[Your Professional Title]", // e.g., "Senior UX Designer", "Full-Stack Developer"
    location: "[Your City, State/Country]",
    email: "[your.email@example.com]",
    linkedin: "[linkedin.com/in/your-profile]",
    github: "[github.com/your-username]", // if applicable
    portfolio: "[your-portfolio-website.com]", // if applicable
    
    // Brief elevator pitch - 2-3 sentences about who you are
    elevator_pitch: `
    [Write a compelling 2-3 sentence summary of who you are professionally. 
    Example: "I'm a product designer with 6+ years of experience creating user-centered 
    digital experiences for fintech and healthcare companies. I specialize in design 
    systems and have led cross-functional teams to deliver award-winning mobile and web applications."]
    `,
    
    // Your professional values and what drives you
    values: [
      "[Core value 1 - e.g., 'User-centered design']",
      "[Core value 2 - e.g., 'Continuous learning']", 
      "[Core value 3 - e.g., 'Collaborative leadership']"
    ],
    
    // What you're passionate about in your field
    passions: [
      "[Passion 1 - e.g., 'Accessibility in design']",
      "[Passion 2 - e.g., 'Mentoring junior developers']",
      "[Passion 3 - e.g., 'Sustainable technology solutions']"
    ]
  },

  // =============================================================================
  // WORK EXPERIENCE
  // =============================================================================
  experience: {
    current_role: {
      title: "[Your Current Job Title]",
      company: "[Company Name]", 
      duration: "[Start Date] - Present", // e.g., "Jan 2022 - Present"
      location: "[City, State/Remote]",
      
      description: `
      [Write a comprehensive description of your current role. Include:
      - What the company does and your role in it
      - Key responsibilities and daily tasks
      - Team size and structure you work with
      - Notable projects or initiatives you've led
      - Technologies, tools, or methodologies you use]
      `,
      
      key_achievements: [
        "[Achievement 1 with specific metrics - e.g., 'Increased user engagement by 35% through redesign of core product features']",
        "[Achievement 2 with impact - e.g., 'Led migration to new tech stack, reducing build times by 50%']",
        "[Achievement 3 with recognition - e.g., 'Mentored 5 junior designers, 3 of whom were promoted within 18 months']"
      ],
      
      technologies: [
        // List relevant technologies, tools, or methodologies
        "[Tool/Technology 1]",
        "[Tool/Technology 2]", 
        "[Tool/Technology 3]"
      ]
    },
    
    previous_roles: [
      {
        title: "[Previous Job Title]",
        company: "[Company Name]",
        duration: "[Start Date] - [End Date]",
        location: "[City, State/Remote]",
        
        description: `
        [Description of this role and why it was important for your career growth]
        `,
        
        key_achievements: [
          "[Achievement 1]",
          "[Achievement 2]"
        ],
        
        technologies: [
          "[Technology 1]",
          "[Technology 2]"
        ]
      },
      // Add more previous roles as needed
      {
        title: "[Another Previous Role]",
        company: "[Company Name]", 
        duration: "[Start Date] - [End Date]",
        location: "[City, State/Remote]",
        description: "[Brief description]",
        key_achievements: ["[Achievement]"],
        technologies: ["[Technology]"]
      }
    ]
  },

  // =============================================================================
  // FEATURED PROJECTS
  // =============================================================================
  projects: {
    featured: [
      {
        name: "[Project Name 1]",
        type: "[Project Type - e.g., 'Mobile App', 'Web Platform', 'Design System']",
        company: "[Company/Client Name or 'Personal Project']",
        duration: "[Timeline - e.g., '3 months', 'Q2 2023']",
        team_size: "[Number of team members and your role]",
        
        overview: `
        [2-3 sentence overview of what this project was and why it was important]
        `,
        
        challenge: `
        [Describe the problem or challenge this project addressed. Be specific about:
        - What was broken or missing?
        - Who was affected and how?
        - Why was this important to solve?]
        `,
        
        solution: `
        [Describe your approach and solution. Include:
        - Your methodology or process
        - Key decisions you made and why
        - How you collaborated with others
        - Unique or innovative aspects of your solution]
        `,
        
        your_role: `
        [Specifically what YOU did on this project:
        - Your responsibilities
        - Parts you owned end-to-end
        - Leadership or mentoring aspects
        - Cross-functional collaboration]
        `,
        
        technologies: [
          "[Technology/Tool 1]",
          "[Technology/Tool 2]",
          "[Technology/Tool 3]"
        ],
        
        results: {
          metrics: [
            "[Quantifiable result 1 - e.g., '40% increase in user conversion']",
            "[Quantifiable result 2 - e.g., 'Reduced loading time by 2.3 seconds']",
            "[Quantifiable result 3 - e.g., '95% positive user feedback score']"
          ],
          
          impact: `
          [Describe the broader impact:
          - How it affected users
          - Business outcomes
          - Team or organizational benefits
          - Long-term effects]
          `,
          
          learnings: [
            "[Key learning 1]",
            "[Key learning 2]",
            "[Key learning 3]"
          ]
        },
        
        links: {
          live_site: "[URL if publicly accessible]",
          case_study: "[URL to detailed case study if available]", 
          github: "[GitHub repo if applicable]"
        }
      },
      
      // Add 2-3 more featured projects following the same structure
      {
        name: "[Project Name 2]",
        type: "[Project Type]",
        company: "[Company/Client]",
        duration: "[Timeline]",
        team_size: "[Team info]",
        overview: "[Overview]",
        challenge: "[Challenge description]",
        solution: "[Solution description]", 
        your_role: "[Your specific role]",
        technologies: ["[Tech 1]", "[Tech 2]"],
        results: {
          metrics: ["[Metric 1]", "[Metric 2]"],
          impact: "[Impact description]",
          learnings: ["[Learning 1]", "[Learning 2]"]
        },
        links: {
          live_site: "[URL]",
          case_study: "[URL]"
        }
      }
    ],
    
    side_projects: [
      {
        name: "[Side Project Name]",
        description: "[Brief description of personal project, open source contribution, or experiment]",
        technologies: ["[Tech 1]", "[Tech 2]"],
        motivation: "[Why you built this]",
        outcome: "[What you learned or achieved]",
        link: "[GitHub or live site URL]"
      }
      // Add more side projects as needed
    ]
  },

  // =============================================================================
  // SKILLS & EXPERTISE
  // =============================================================================
  skills: {
    technical: {
      // Customize these categories based on your field
      programming_languages: [
        {
          name: "[Language 1 - e.g., 'JavaScript']",
          proficiency: "[Proficiency level - e.g., 'Expert', 'Advanced', 'Intermediate']",
          years_experience: "[Number] years",
          context: "[Where/how you use it]"
        },
        {
          name: "[Language 2]",
          proficiency: "[Level]", 
          years_experience: "[Number] years",
          context: "[Context]"
        }
      ],
      
      frameworks_tools: [
        {
          category: "[Category - e.g., 'Frontend Frameworks']",
          items: [
            {
              name: "[Tool/Framework 1]",
              proficiency: "[Level]",
              context: "[Usage context]"
            },
            {
              name: "[Tool/Framework 2]", 
              proficiency: "[Level]",
              context: "[Usage context]"
            }
          ]
        }
      ],
      
      // For designers, you might have:
      design_tools: [
        {
          name: "[Design Tool - e.g., 'Figma']",
          proficiency: "[Level]",
          years_experience: "[Number] years",
          specialization: "[What you use it for]"
        }
      ],
      
      // For other fields, add relevant categories:
      methodologies: [
        "[Methodology 1 - e.g., 'Agile/Scrum']",
        "[Methodology 2 - e.g., 'Design Thinking']",
        "[Methodology 3 - e.g., 'Test-Driven Development']"
      ]
    },
    
    domain_expertise: [
      {
        area: "[Expertise Area 1 - e.g., 'User Research']",
        description: "[What this expertise entails and your experience with it]",
        techniques: ["[Technique 1]", "[Technique 2]"]
      },
      {
        area: "[Expertise Area 2 - e.g., 'Performance Optimization']", 
        description: "[Description]",
        techniques: ["[Technique 1]", "[Technique 2]"]
      }
    ],
    
    soft_skills: [
      {
        skill: "[Soft Skill 1 - e.g., 'Cross-functional Collaboration']",
        evidence: "[Specific example of how you've demonstrated this skill]"
      },
      {
        skill: "[Soft Skill 2 - e.g., 'Mentoring & Teaching']",
        evidence: "[Example]"
      },
      {
        skill: "[Soft Skill 3 - e.g., 'Strategic Thinking']", 
        evidence: "[Example]"
      }
    ]
  },

  // =============================================================================
  // EDUCATION & BACKGROUND
  // =============================================================================
  education: {
    formal: [
      {
        degree: "[Degree Type and Major - e.g., 'Bachelor of Science in Computer Science']",
        school: "[University/College Name]",
        graduation_year: "[Year]",
        location: "[City, State]",
        relevant_coursework: [
          "[Relevant Course 1]",
          "[Relevant Course 2]"
        ],
        achievements: [
          "[Academic achievement - e.g., 'Magna Cum Laude', 'Dean's List']"
        ]
      }
    ],
    
    certifications: [
      {
        name: "[Certification Name]",
        issuer: "[Issuing Organization]", 
        date: "[Date Earned]",
        status: "[Active/Expires Date]"
      }
    ],
    
    continuous_learning: [
      "[Recent course, workshop, or conference you attended]",
      "[Book or resource that influenced your work]",
      "[Skill you're currently developing]"
    ]
  },

  // =============================================================================
  // CAREER NARRATIVE
  // =============================================================================
  career_story: {
    origin: `
    [How did you get started in your field? What sparked your interest?
    This should be a personal story that shows your motivation and passion.]
    `,
    
    key_transitions: [
      {
        from: "[Previous role/field]",
        to: "[New role/field]", 
        reason: "[Why you made this change]",
        outcome: "[What you gained from this transition]"
      }
    ],
    
    current_focus: `
    [What are you focused on in your career right now? 
    What problems are you most excited to solve?]
    `,
    
    future_goals: `
    [Where do you see yourself heading? What impact do you want to make?]
    `
  },

  // =============================================================================
  // WORKING STYLE & PREFERENCES
  // =============================================================================
  working_style: {
    collaboration_approach: `
    [How do you prefer to work with others? What makes you effective in teams?]
    `,
    
    problem_solving_process: `
    [Describe your approach to tackling complex problems]
    `,
    
    communication_style: `
    [How do you communicate with different stakeholders?]
    `,
    
    ideal_work_environment: `
    [What type of work environment brings out your best work?]
    `
  },

  // =============================================================================
  // INTERESTS & PERSONAL TOUCHES
  // =============================================================================
  personal_interests: {
    professional_interests: [
      "[Professional interest 1 - e.g., 'AI ethics in design']",
      "[Professional interest 2 - e.g., 'Open source contributions']"
    ],
    
    hobbies: [
      "[Hobby 1 that might be relevant to your work or personality]",
      "[Hobby 2]"
    ],
    
    fun_facts: [
      "[Interesting fact about you that humanizes your professional persona]",
      "[Another fun fact]"
    ]
  }
};

// =============================================================================
// CONVERSATION CONTEXT
// =============================================================================
// This section helps the AI understand how to talk about your experience

export const CONVERSATION_GUIDANCE = {
  // Tone and personality guidelines
  communication_style: {
    tone: "[Describe how you want the AI to represent you - e.g., 'Professional but approachable', 'Enthusiastic and curious']",
    voice: "[Describe your communication voice - e.g., 'Direct and clear', 'Thoughtful and detailed']",
    avoid: "[Things to avoid - e.g., 'Overly technical jargon', 'Being too modest about achievements']"
  },
  
  // Key messages you want to convey
  key_messages: [
    "[Message 1 - e.g., 'I'm passionate about creating inclusive design solutions']",
    "[Message 2 - e.g., 'I believe in data-driven decision making']", 
    "[Message 3 - e.g., 'I love mentoring and growing teams']"
  ],
  
  // Common questions and how to handle them
  frequently_asked: {
    "Tell me about yourself": `Reference the elevator pitch and expand with current role context`,
    "What's your biggest achievement?": `Focus on [specific project/achievement] with metrics and impact`,
    "What are you looking for?": `[How you want to answer this - current goals, ideal opportunities]`,
    "What's your weakness?": `[A thoughtful response about growth areas and how you're addressing them]`
  }
};

// =============================================================================
// CUSTOMIZATION CHECKLIST:
// =============================================================================
// □ Replace all [PLACEHOLDER TEXT] with your actual information
// □ Update the skills section to match your field (technical/design/business)
// □ Add or remove project examples based on what you want to showcase
// □ Customize the conversation guidance to match your personality
// □ Review all sections for accuracy and completeness
// □ Remove these instruction comments when done
// =============================================================================

// Instructions for updating this file:
// 1. Keep content factual and based on your actual experience
// 2. Add more detail than what's in progressive disclosure for AI context
// 3. Include project details, methodologies, and outcomes
// 4. Use markdown formatting for structure
// 5. Update as you complete new projects or gain new skills
// 6. This content helps the AI give better responses for complex questions
