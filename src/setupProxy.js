const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://xchange.booknest.com.ng',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '', // remove /api prefix when forwarding to target
      },
      onProxyReq: function(proxyReq, req, res) {
        // Add CORS headers
        proxyReq.setHeader('Origin', 'https://xchange.booknest.com.ng');
        
        // Log the outgoing request
        console.log('Proxying request to:', proxyReq.path);
        console.log('Request method:', proxyReq.method);
        console.log('Request headers:', proxyReq.getHeaders());

        const { createProxyMiddleware } = require('http-proxy-middleware');
        module.exports = function(app) {
           app.use(
            '/api', // You can specify a base path for your API
            createProxyMiddleware({
              target: 'https://xchange.booknest.com.ng',
              changeOrigin: true,
              secure: false, // Set to false if the server uses self-signed certificates
              })
            )
          };

        // If this is a POST request with a body
        if (req.body) {
          const bodyData = JSON.stringify(req.body);
          // Update header
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
          // Write body data
          proxyReq.write(bodyData);
        }
      },
      onProxyRes: function(proxyRes, req, res) {
        // Log the response
        console.log('Proxy response status:', proxyRes.statusCode);
        console.log('Proxy response headers:', proxyRes.headers);
        
        // Check if the response is HTML when we expect JSON
        const contentType = proxyRes.headers['content-type'];
        if (contentType && contentType.includes('text/html')) {
          console.error('Warning: Received HTML response when expecting JSON');
          // Log more details about the response
          let body = '';
          proxyRes.on('data', function(chunk) {
            body += chunk;
          });
          proxyRes.on('end', function() {
            console.log('Response body preview:', body.substring(0, 500));
          });
        }
      },
      onError: function(err, req, res) {
        console.error('Proxy error:', err);
        res.writeHead(500, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ 
          error: 'Error connecting to the server: ' + err.message
        }));
      }
    })
  );
};
