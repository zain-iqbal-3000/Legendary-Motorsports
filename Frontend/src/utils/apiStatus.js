import axios from 'axios';

/**
 * Utility to check backend API connectivity
 * @returns {Promise<object>} status object
 */
export const checkApiStatus = async () => {
  try {
    console.log("Testing API connection...");
    const start = Date.now();
    
    // First try a dedicated health endpoint
    try {
      const response = await axios.get('/api/health', { timeout: 5000 });
      const elapsed = Date.now() - start;
      
      console.log(`API responded in ${elapsed}ms:`, response.data);
      return {
        isConnected: true,
        responseTime: elapsed,
        message: 'Connected to API successfully'
      };
    } catch (healthError) {
      // If health endpoint fails, try any other available endpoint
      console.log("Health endpoint not available, trying users endpoint...");
      const usersResponse = await axios.get('/api/users/test-connection', { timeout: 5000 });
      const elapsed = Date.now() - start;
      
      return {
        isConnected: true,
        responseTime: elapsed,
        message: 'Connected to API successfully (via fallback endpoint)'
      };
    }
  } catch (error) {
    console.error("API connectivity test failed:", error);
    
    let message = "Failed to connect to API";
    if (error.response) {
      message = `API returned error: ${error.response.status} ${error.response.statusText}`;
    } else if (error.request) {
      message = "No response received from API. Server may be down.";
    } else {
      message = `Request failed: ${error.message}`;
    }
    
    return {
      isConnected: false,
      error: error,
      message: message
    };
  }
};

// Run an immediate check when this module loads
checkApiStatus()
  .then(result => {
    if (result.isConnected) {
      console.log(`✅ API connectivity check: Connected (${result.responseTime}ms)`);
    } else {
      console.warn(`⚠️ API connectivity check: ${result.message}`);
    }
  });
