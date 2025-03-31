import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory (Vite build output)
app.use(express.static(join(__dirname, 'dist')));

// Routes
app.post('/connect-api', (req, res) => {
  const { apiUrl } = req.body;
  
  if (!apiUrl) {
    return res.status(400).json({
      success: false,
      message: 'API URL is required'
    });
  }

  // Log the received API URL (will be used for Prometheus configuration later)
  console.log('Received API URL:', apiUrl);

  res.json({
    success: true,
    message: 'API connected'
  });
});

app.get('/dashboard', (req, res) => {
  // For now, serve a simple HTML page with an iframe
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Monitoring Dashboard</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      </style>
    </head>
    <body>
      <iframe src="http://localhost:3000/" title="Grafana Dashboard"></iframe>
    </body>
    </html>
  `;
  
  res.send(html);
});

// Catch-all route to serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});