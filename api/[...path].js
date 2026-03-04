// Vercel Serverless Function - Catch-all proxy for AWS backend
const AWS_BACKEND = 'http://event-management-service-env.eba-qrma82w3.us-east-1.elasticbeanstalk.com/api/events';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Extract the path after /api/
    const apiPath = req.url.replace(/^\/api/, '');
    const url = `${AWS_BACKEND}${apiPath}`;
    
    console.log(`Proxying ${req.method} ${url}`);
    
    // Prepare fetch options
    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add body for POST, PUT, PATCH methods
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(url, fetchOptions);

    // Handle empty responses (DELETE often returns no content)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return res.status(response.status).end();
    }

    const response = await fetch(url, fetchOptions);

    // Handle empty responses (DELETE often returns no content)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return res.status(response.status).end();
    }

    // Handle different response types
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return res.status(response.status).json(data);
    } else {
      const text = await response.text();
      return res.status(response.status).send(text);
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to connect to backend', 
      details: error.message,
      backend: AWS_BACKEND,
      method: req.method,
      url: req.url
    });
  }
}
