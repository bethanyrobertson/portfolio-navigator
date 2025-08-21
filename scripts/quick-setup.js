#!/usr/bin/env node

/**
 * Quick Setup Script for AI Portfolio Chatbot
 * This interactive helper is commonly missing but very useful
 * Guides users through the essential setup steps
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

class QuickSetup {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  async ask(question, defaultValue = '') {
    return new Promise((resolve) => {
      const prompt = defaultValue 
        ? `${question} ${colors.cyan}(${defaultValue})${colors.reset}: `
        : `${question}: `;
      
      this.rl.question(prompt, (answer) => {
        resolve(answer.trim() || defaultValue);
      });
    });
  }

  async run() {
    try {
      this.showWelcome();
      await this.checkPrerequisites();
      await this.setupEnvironment();
      await this.setupConfigFiles();
      await this.finalInstructions();
    } catch (error) {
      this.log(`\n❌ Setup failed: ${error.message}`, 'red');
      process.exit(1);
    } finally {
      this.rl.close();
    }
  }

  showWelcome() {
    console.clear();
    this.log('\n🤖 AI Portfolio Chatbot - Quick Setup', 'bright');
    this.log('=====================================', 'cyan');
    this.log('This wizard will help you get your portfolio chatbot running quickly.\n', 'blue');
    this.log('What we\'ll do:', 'bright');
    this.log('✓ Check your system requirements', 'green');
    this.log('✓ Set up your OpenAI API key', 'green');
    this.log('✓ Copy configuration templates', 'green');
    this.log('✓ Guide you through customization', 'green');
    this.log('\nThis should take about 5 minutes. Let\'s get started!\n', 'cyan');
  }

  async checkPrerequisites() {
    this.log('🔍 Checking prerequisites...', 'blue');
    
    // Check Node.js version
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    if (majorVersion >= 18) {
      this.log(`✅ Node.js ${nodeVersion} (Good!)`, 'green');
    } else {
      throw new Error(`Node.js 18+ required. Current: ${nodeVersion}. Please upgrade.`);
    }

    // Check if we're in the right directory
    if (!fs.existsSync('package.json')) {
      throw new Error('Not in a valid project directory. Please run this from the project root.');
    }

    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    this.log(`✅ Project: ${packageJson.name}`, 'green');

    // Check if dependencies are installed
    if (!fs.existsSync('node_modules')) {
      this.log('\n⚠️  Dependencies not installed yet.', 'yellow');
      const install = await this.ask('Run npm install now? (y/n)', 'y');
      
      if (install.toLowerCase() === 'y') {
        this.log('📦 Installing dependencies...', 'blue');
        const { execSync } = require('child_process');
        try {
          execSync('npm install', { stdio: 'inherit' });
          this.log('✅ Dependencies installed!', 'green');
        } catch (error) {
          throw new Error('Failed to install dependencies. Please run npm install manually.');
        }
      }
    } else {
      this.log('✅ Dependencies installed', 'green');
    }
  }

  async setupEnvironment() {
    this.log('\n🔧 Setting up environment...', 'blue');
    
    // Check if .env.local already exists
    if (fs.existsSync('.env.local')) {
      const overwrite = await this.ask('.env.local already exists. Overwrite? (y/n)', 'n');
      if (overwrite.toLowerCase() !== 'y') {
        this.log('✅ Keeping existing .env.local', 'green');
        return;
      }
    }

    // Copy .env.example if it exists
    if (fs.existsSync('.env.example')) {
      fs.copyFileSync('.env.example', '.env.local');
      this.log('✅ Created .env.local from template', 'green');
    } else {
      // Create basic .env.local
      const envContent = `# AI Portfolio Chatbot Environment
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
`;
      fs.writeFileSync('.env.local', envContent);
      this.log('✅ Created basic .env.local', 'green');
    }

    // Get OpenAI API key
    this.log('\n🔑 OpenAI API Key Setup', 'cyan');
    this.log('You need an OpenAI API key to power the AI chatbot.', 'blue');
    this.log('Get one at: https://platform.openai.com/api-keys', 'cyan');
    
    const hasKey = await this.ask('Do you have an OpenAI API key? (y/n)', 'n');
    
    if (hasKey.toLowerCase() === 'y') {
      const apiKey = await this.ask('Enter your OpenAI API key');
      
      if (apiKey && apiKey !== 'your_openai_api_key_here') {
        // Update .env.local with the API key
        let envContent = fs.readFileSync('.env.local', 'utf8');
        envContent = envContent.replace(
          /OPENAI_API_KEY=.*/,
          `OPENAI_API_KEY=${apiKey}`
        );
        fs.writeFileSync('.env.local', envContent);
        this.log('✅ OpenAI API key configured!', 'green');
      } else {
        this.log('⚠️  API key looks invalid. You can update it later in .env.local', 'yellow');
      }
    } else {
      this.log('⚠️  You\'ll need to add your API key to .env.local before the chatbot will work.', 'yellow');
      this.log('   Open .env.local and replace "your_openai_api_key_here" with your actual key.', 'cyan');
    }
  }

  async setupConfigFiles() {
    this.log('\n📝 Setting up configuration files...', 'blue');
    
    const configFiles = [
      {
        target: 'src/data/assistant-config.ts',
        example: 'src/data/examples/example-assistant-config.ts',
        name: 'Assistant Configuration'
      },
      {
        target: 'src/data/portfolio-knowledge.ts',
        example: 'src/data/examples/example-portfolio-knowledge.ts',
        name: 'Portfolio Knowledge'
      }
    ];

    for (const config of configFiles) {
      if (fs.existsSync(config.target)) {
        this.log(`✅ ${config.name} already exists`, 'green');
        continue;
      }

      if (fs.existsSync(config.example)) {
        const copy = await this.ask(`Copy ${config.name} template? (y/n)`, 'y');
        if (copy.toLowerCase() === 'y') {
          fs.copyFileSync(config.example, config.target);
          this.log(`✅ Created ${config.target}`, 'green');
        }
      } else {
        this.log(`⚠️  Template ${config.example} not found`, 'yellow');
      }
    }

    // Remind about customization
    this.log('\n💡 Important: These configuration files contain placeholder content.', 'cyan');
    this.log('   You\'ll need to customize them with your information:', 'blue');
    this.log('   - Replace [YOUR NAME] with your actual name', 'blue');
    this.log('   - Add your projects, experience, and skills', 'blue');
    this.log('   - Update contact information', 'blue');
  }

  async finalInstructions() {
    this.log('\n🎉 Setup Complete!', 'green');
    this.log('================', 'cyan');
    
    this.log('\nWhat\'s been set up:', 'bright');
    this.log('✅ Environment variables (.env.local)', 'green');
    this.log('✅ Configuration templates', 'green');
    this.log('✅ Dependencies installed', 'green');

    this.log('\nNext steps:', 'bright');
    this.log('1. Customize your configuration files:', 'cyan');
    this.log('   - src/data/assistant-config.ts', 'blue');
    this.log('   - src/data/portfolio-knowledge.ts', 'blue');
    
    this.log('\n2. Add your assets:', 'cyan');
    this.log('   - Profile photo: public/assets/avatar.jpg', 'blue');
    this.log('   - Resume: public/assets/YourName_Resume.pdf', 'blue');
    
    this.log('\n3. Start the development server:', 'cyan');
    this.log('   npm run dev', 'blue');
    
    this.log('\n4. Open your browser:', 'cyan');
    this.log('   http://localhost:3000', 'blue');

    this.log('\n🛠️  Additional commands:', 'bright');
    this.log('   npm run validate  - Check your configuration', 'blue');
    this.log('   npm run build     - Build for production', 'blue');
    this.log('   npm run deploy    - Deploy to Vercel', 'blue');

    const startNow = await this.ask('\nStart the development server now? (y/n)', 'y');
    
    if (startNow.toLowerCase() === 'y') {
      this.log('\n🚀 Starting development server...', 'green');
      this.log('Press Ctrl+C to stop the server when you\'re done.\n', 'cyan');
      
      // Start the dev server
      const { spawn } = require('child_process');
      const devServer = spawn('npm', ['run', 'dev'], {
        stdio: 'inherit',
        shell: true
      });
      
      // Handle cleanup
      process.on('SIGINT', () => {
        devServer.kill();
        process.exit();
      });
    } else {
      this.log('\nHappy coding! 🤖✨', 'magenta');
      this.log('Run "npm run dev" when you\'re ready to start.', 'cyan');
    }
  }
}

// Run the setup
if (require.main === module) {
  const setup = new QuickSetup();
  setup.run().catch(error => {
    console.error('\nSetup failed:', error.message);
    process.exit(1);
  });
}

module.exports = QuickSetup;
