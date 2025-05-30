/**
 * Environment configuration settings for different environments
 * @type {Object}
 */
const ENV_CONFIGS = {
    development: {
      apiUrl: 'http://localhost:3000/api',
      debug: true,
      timeout: 5000
    },
    testing: {
      apiUrl: 'http://test-server:3000/api',
      debug: true,
      timeout: 5000
    },
    staging: {
      apiUrl: 'https://staging.example.com/api',
      debug: false,
      timeout: 10000
    },
    production: {
      apiUrl: 'https://api.example.com',
      debug: false,
      timeout: 15000
    }
  };
  
  /**
   * Default configuration to use when environment is not specified
   * @type {Object}
   */
  const DEFAULT_CONFIG = ENV_CONFIGS.development;
  
  /**
   * Gets the configuration for the specified environment
   * @param {string} env - The environment name ('development', 'testing', 'staging', 'production')
   * @returns {Object} The configuration object for the specified environment
   * @throws {Error} If the environment is invalid
   */
  function getEnvironmentConfig(env) {
    if (!env) {
      console.warn('No environment specified, using development configuration');
      return DEFAULT_CONFIG;
    }
  
    const config = ENV_CONFIGS[env.toLowerCase()];
    
    if (!config) {
      throw new Error(`Invalid environment: ${env}. Valid environments are: ${Object.keys(ENV_CONFIGS).join(', ')}`);
    }
  
    return config;
  }
  
  // Example usage:
  try {
    const devConfig = getEnvironmentConfig('development');
    console.log('Development config:', devConfig);
  
    const prodConfig = getEnvironmentConfig('production');
    console.log('Production config:', prodConfig);
  
    // This will throw an error
    const invalidConfig = getEnvironmentConfig('invalid');
  } catch (error) {
    console.error('Error:', error.message);
  }
  