// WhatsApp Webhook Handler for Vercel
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET request (for webhook verification)
  if (req.method === 'GET') {
    console.log('GET request received - webhook verification');
    return res.status(200).json({ 
      status: 'success', 
      message: 'Webhook is active and ready to receive messages',
      timestamp: new Date().toISOString()
    });
  }

  // Handle POST request (incoming WhatsApp messages)
  if (req.method === 'POST') {
    try {
      console.log('POST request received:', JSON.stringify(req.body, null, 2));
      
      // Log the incoming webhook data
      const webhookData = req.body;
      
      // Here you can add your custom logic to process the webhook
      // For example: save to database, send auto-replies, etc.
      
      return res.status(200).json({
        status: 'success',
        message: 'Webhook received successfully',
        timestamp: new Date().toISOString(),
        receivedData: webhookData
      });
      
    } catch (error) {
      console.error('Error processing webhook:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Handle unsupported methods
  return res.status(405).json({
    status: 'error',
    message: 'Method not allowed'
  });
}
