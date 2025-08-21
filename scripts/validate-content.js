#!/usr/bin/env node

/**
 * Content validation script for AI Portfolio Chatbot
 * This appears to be missing from the current repo structure
 * Helps users validate their configuration and catch common setup errors
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

class ConfigValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passed = [];
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  addError(message) {
    this.errors.push(message);
    this.log(`❌ ERROR: ${message}`, 'red');
  }

  addWarning(message) {
    this.warnings.push(message);
    this.log(`⚠️  WARNING: ${message}`, 'yellow');
  }

  addPass(message) {
    this.passed.push(message);
    this.log(`✅ ${message}`, 'green');
  }

  async validate() {
    this.log('\n🔍 Validating AI Portfolio Chatbot Configuration\n', 'cyan');

    // Check environment setup
    this.validateEnvironment();
    
    // Check configuration files
    this.validateConfigFiles();
    
    // Check progressive content structure
    this.validateProgressiveContent();
    
    // Check assets
    this.validateAssets();
    
    // Print summary
    this.printSummary();
    
    return this.errors.length === 0;
  }

  validateEnvironment() {
    this.log('🔧 Checking environment setup...', 'blue');
    
    if (fs.existsSync('.env.local')) {
      this.addPass('Found .env.local file');
      
      const envContent = fs.readFileSync('.env.local', 'utf8');
      
      if (envContent.includes('OPENAI_API_KEY=') && 
          !envContent.includes('your_openai_api_key_here')) {
        this.addPass('OpenAI API key is configured');
      } else {
        this.addError('OpenAI API key not properly set in .env.local');
      }
    } else {
      this.addError('Missing .env.local file - copy from .env.example');
    }
  }

  validateConfigFiles() {
    this.log('\n⚙️  Checking configuration files...', 'blue');
    
    // Check if user has created actual config files from examples
    const configChecks = [
      {
        path: 'src/data/assistant-config.ts',
        example: 'src/data/examples/example-assistant-config.ts'
      },
      {
        path: 'src/data/portfolio-knowledge.ts',
        example: 'src/data/examples/example-portfolio-knowledge.ts'
      }
    ];

    configChecks.forEach(check => {
      if (fs.existsSync(check.path)) {
        this.addPass(`Found ${path.basename(check.path)}`);
        this.validateConfigContent(check.path);
      } else if (fs.existsSync(check.example)) {
        this.addError(`Missing ${check.path} - copy from ${check.example} and customize`);
      } else {
        this.addError(`Missing both ${check.path} and ${check.example}`);
      }
    });
  }

  validateConfigContent(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for placeholder content that needs customization
      const placeholders = [
        '[YOUR NAME]',
        '[Your Field]',
        '[Project Name',
        '[Achievement',
        'your.email@example.com',
        'your-linkedin-username'
      ];

      const foundPlaceholders = placeholders.filter(p => content.includes(p));
      
      if (foundPlaceholders.length > 0) {
        this.addWarning(`${path.basename(filePath)} contains ${foundPlaceholders.length} placeholder(s) that need customization`);
      } else {
        this.addPass(`${path.basename(filePath)} appears to be customized`);
      }
    } catch (error) {
      this.addError(`Error reading ${filePath}: ${error.message}`);
    }
  }

  validateProgressiveContent() {
    this.log('\n📚 Checking progressive content structure...', 'blue');
    
    const configPath = 'src/data/assistant-config.ts';
    if (!fs.existsSync(configPath)) return;

    try {
      const content = fs.readFileSync(configPath, 'utf8');
      
      // Check for progressive content structure
      if (content.includes('PROGRESSIVE_CONTENT')) {
        this.addPass('Found PROGRESSIVE_CONTENT structure');
        
        // Check for proper levels
        const levels = ['overview', 'experience_details', 'project_categories'];
        levels.forEach(level => {
          if (content.includes(`${level}:`)) {
            this.addPass(`Found progressive level: ${level}`);
          } else {
            this.addWarning(`Missing recommended level: ${level}`);
          }
        });
        
        // Check for nextLevel references
        const nextLevelMatches = content.match(/nextLevel:\s*["'][^"']+["']/g);
        if (nextLevelMatches && nextLevelMatches.length > 0) {
          this.addPass(`Found ${nextLevelMatches.length} progressive disclosure levels`);
        } else {
          this.addWarning('Limited progressive disclosure structure detected');
        }
      } else {
        this.addError('PROGRESSIVE_CONTENT not found in assistant-config.ts');
      }
    } catch (error) {
      this.addError(`Error validating progressive content: ${error.message}`);
    }
  }

  validateAssets() {
    this.log('\n🖼️  Checking assets...', 'blue');
    
    // Check for avatar/profile image
    const avatarPaths = [
      'public/assets/avatar.jpg',
      'public/assets/avatar.png', 
      'public/examples/example-avatar.png'
    ];
    
    let hasAvatar = false;
    avatarPaths.forEach(path => {
      if (fs.existsSync(path)) {
        this.addPass(`Found profile image: ${path}`);
        hasAvatar = true;
      }
    });
    
    if (!hasAvatar) {
      this.addWarning('No profile image found - add to public/assets/');
    }

    // Check for resume
    if (fs.existsSync('public/assets') && fs.statSync('public/assets').isDirectory()) {
      const files = fs.readdirSync('public/assets/');
      const resumeFiles = files.filter(f => 
        f.toLowerCase().includes('resume') && f.endsWith('.pdf')
      );
      
      if (resumeFiles.length > 0) {
        this.addPass(`Found resume: ${resumeFiles[0]}`);
      } else {
        this.addWarning('No resume PDF found in public/assets/');
      }
    }
  }

  printSummary() {
    this.log('\n' + '='.repeat(60), 'cyan');
    this.log('📊 VALIDATION SUMMARY', 'bright');
    this.log('='.repeat(60), 'cyan');
    
    this.log(`✅ Passed: ${this.passed.length}`, 'green');
    this.log(`⚠️  Warnings: ${this.warnings.length}`, 'yellow');
    this.log(`❌ Errors: ${this.errors.length}`, 'red');
    
    if (this.errors.length === 0) {
      this.log('\n🎉 Configuration validation passed!', 'green');
      this.log('Your portfolio chatbot should be ready to run.', 'cyan');
      
      if (this.warnings.length > 0) {
        this.log('\n💡 Consider addressing warnings for the best experience.', 'yellow');
      }
      
      this.log('\nNext steps:', 'bright');
      this.log('1. Run: npm run dev', 'blue');
      this.log('2. Visit: http://localhost:3000', 'blue');
      this.log('3. Test your chatbot interactions!', 'blue');
      
    } else {
      this.log('\n🚨 Please fix the errors above before proceeding.', 'red');
      this.log('\nCommon fixes:', 'bright');
      this.log('1. Copy example files and customize them', 'blue');
      this.log('2. Add your OpenAI API key to .env.local', 'blue');
      this.log('3. Replace placeholder content with your info', 'blue');
    }
  }
}

// Run validation
if (require.main === module) {
  const validator = new ConfigValidator();
  validator.validate().then(isValid => {
    process.exit(isValid ? 0 : 1);
  }).catch(error => {
    console.error('Validation failed:', error);
    process.exit(1);
  });
}

module.exports = ConfigValidator;
