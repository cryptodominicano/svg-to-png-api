const { Resvg } = require('@resvg/resvg-js');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
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

    // Get the font file path
    const fontPath = path.join(__dirname, '..', 'fonts', 'Inter-Bold.ttf');
    
    // Check if font exists
    let fontFiles = [];
    if (fs.existsSync(fontPath)) {
      fontFiles = [fontPath];
    }

    // Use resvg for better font and SVG support
    const opts = {
      background: 'white',
      fitTo: {
        mode: 'width',
        value: parseInt(width),
      },
      font: {
        fontFiles: fontFiles,
        loadSystemFonts: false,
        defaultFontFamily: 'Inter',
      },
    };

    const resvg = new Resvg(svg, opts);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

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
