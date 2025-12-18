const sharp = require('sharp');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { svg, width = 600, height = 600 } = req.body;

    if (!svg) {
      return res.status(400).json({ error: 'SVG string is required in request body' });
    }

    // Convert SVG string to PNG buffer using sharp
    const pngBuffer = await sharp(Buffer.from(svg))
      .resize(parseInt(width), parseInt(height), {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toBuffer();

    // Return as base64 for easy n8n consumption
    res.status(200).json({
      success: true,
      png: pngBuffer.toString('base64'),
      mimeType: 'image/png',
      width: width,
      height: height
    });

  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ 
      error: 'Failed to convert SVG to PNG', 
      details: error.message 
    });
  }
};
