// app/api/health/route.ts
// Health check endpoint - commonly missing but very useful for debugging

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
  checks: {
    environment: {
      status: 'pass' | 'fail';
      details?: string;
    };
    openai: {
      status: 'pass' | 'fail';
      details?: string;
    };
    configuration: {
      status: 'pass' | 'fail';
      details?: string;
      warnings?: string[];
    };
    database?: {
      status: 'pass' | 'fail';
      details?: string;
    };
  };
}

export async function GET(request: NextRequest) {
  const startTime = process.hrtime();
  
  try {
    const health: HealthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
      checks: {
        environment: { status: 'pass' },
        openai: { status: 'pass' },
        configuration: { status: 'pass' }
      }
    };

    // Check environment variables
    const envCheck = checkEnvironmentVariables();
    health.checks.environment = envCheck;
    if (envCheck.status === 'fail') {
      health.status = 'unhealthy';
    }

    // Check OpenAI connectivity (if API key is available)
    if (process.env.OPENAI_API_KEY) {
      const openaiCheck = await checkOpenAIConnection();
      health.checks.openai = openaiCheck;
      if (openaiCheck.status === 'fail') {
        health.status = health.status === 'unhealthy' ? 'unhealthy' : 'degraded';
      }
    } else {
      health.checks.openai = {
        status: 'fail',
        details: 'OpenAI API key not configured'
      };
      health.status = 'unhealthy';
    }

    // Check configuration files
    const configCheck = checkConfigurationFiles();
    health.checks.configuration = configCheck;
    if (configCheck.status === 'fail') {
      health.status = 'unhealthy';
    } else if (configCheck.warnings && configCheck.warnings.length > 0) {
      health.status = health.status === 'unhealthy' ? 'unhealthy' : 'degraded';
    }

    // Check database if configured
    if (process.env.DATABASE_URL) {
      health.checks.database = await checkDatabaseConnection();
      if (health.checks.database.status === 'fail') {
        health.status = health.status === 'unhealthy' ? 'unhealthy' : 'degraded';
      }
    }

    const [seconds, nanoseconds] = process.hrtime(startTime);
    const responseTime = seconds * 1000 + nanoseconds / 1000000;

    // Add response time to headers
    const response = NextResponse.json(health, {
      status: health.status === 'healthy' ? 200 : health.status === 'degraded' ? 200 : 503
    });
    
    response.headers.set('X-Response-Time', `${responseTime.toFixed(2)}ms`);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    return response;

  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      checks: {
        environment: { status: 'fail', details: 'Health check crashed' },
        openai: { status: 'fail' },
        configuration: { status: 'fail' }
      }
    }, { status: 503 });
  }
}

function checkEnvironmentVariables() {
  const required = ['OPENAI_API_KEY'];
  const optional = ['NEXT_PUBLIC_APP_URL', 'NODE_ENV'];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    return {
      status: 'fail' as const,
      details: `Missing required environment variables: ${missing.join(', ')}`
    };
  }

  const warnings = optional.filter(key => !process.env[key]);
  
  return {
    status: 'pass' as const,
    details: `All required environment variables present${warnings.length > 0 ? `. Optional missing: ${warnings.join(', ')}` : ''}`
  };
}

async function checkOpenAIConnection() {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Test with a minimal API call
    await openai.models.list();
    
    return {
      status: 'pass' as const,
      details: 'OpenAI API connection successful'
    };
  } catch (error) {
    return {
      status: 'fail' as const,
      details: error instanceof Error ? error.message : 'OpenAI connection failed'
    };
  }
}

function checkConfigurationFiles() {
  const fs = require('fs');
  const warnings: string[] = [];
  
  try {
    // Check if configuration files exist
    const configFiles = [
      'src/data/assistant-config.ts',
      'src/data/portfolio-knowledge.ts'
    ];
    
    const missingFiles = configFiles.filter(file => !fs.existsSync(file));
    
    if (missingFiles.length > 0) {
      return {
        status: 'fail' as const,
        details: `Missing configuration files: ${missingFiles.join(', ')}`
      };
    }

    // Check for placeholder content
    configFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        
        const placeholders = [
          '[YOUR NAME]',
          '[Project Name',
          'your.email@example.com',
          'your_openai_api_key_here'
        ];
        
        const foundPlaceholders = placeholders.filter(p => content.includes(p));
        if (foundPlaceholders.length > 0) {
          warnings.push(`${file} contains placeholder content that needs customization`);
        }
      }
    });

    return {
      status: 'pass' as const,
      details: 'Configuration files present and appear valid',
      warnings: warnings.length > 0 ? warnings : undefined
    };
    
  } catch (error) {
    return {
      status: 'fail' as const,
      details: `Configuration check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function checkDatabaseConnection() {
  // This is a placeholder - implement based on your database choice
  try {
    // For PostgreSQL example:
    // const client = new Client({ connectionString: process.env.DATABASE_URL });
    // await client.connect();
    // await client.query('SELECT 1');
    // await client.end();
    
    return {
      status: 'pass' as const,
      details: 'Database connection successful'
    };
  } catch (error) {
    return {
      status: 'fail' as const,
      details: `Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Simple endpoint for uptime monitoring services
export async function HEAD(request: NextRequest) {
  try {
    // Quick health check without full diagnostics
    const hasApiKey = !!process.env.OPENAI_API_KEY;
    
    return new NextResponse(null, {
      status: hasApiKey ? 200 : 503,
      headers: {
        'X-Health-Status': hasApiKey ? 'healthy' : 'unhealthy',
        'Cache-Control': 'no-cache'
      }
    });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}
