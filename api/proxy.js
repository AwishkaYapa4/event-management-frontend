// Simple proxy for all event management API requests
const AWS_BACKEND = 'http://event-management-service-env.eba-qrma82w3.us-east-1.elasticbeanstalk.com/api/events';

export default async function handler(req, res) {
  // Enable CORS for all methods
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get the full path from query parameter
    const targetPath = req.query.path || '';
    // Build URL - if path is empty, it points to root /api/events endpoint
    const url = targetPath ? `${AWS_BACKEND}/${targetPath}` : AWS_BACKEND;
    
    console.log(`[PROXY] ${req.method} → ${url}`);
    
    // Build fetch options
    const options = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add body for POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    // Make the request
    const response = await fetch(url, options);
    
    console.log(`[PROXY] Response: ${response.status}`);

    // Handle 204 No Content (common for DELETE)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return res.status(204).end();
    }

    // Handle errors
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ 
        error: `Backend error: ${response.status}`,
        details: errorText 
      });
    }

    // Return JSON response
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // Return text response
    const text = await response.text();
    return res.status(response.status).send(text);
    
  } catch (error) {
    console.error('[PROXY] Error:', error);
    return res.status(500).json({ 
      error: 'Proxy failed',
      details: error.message 
    });
  }
}
