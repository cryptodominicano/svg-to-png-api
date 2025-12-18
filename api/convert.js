const { createCanvas, GlobalFonts, loadImage } = require('@napi-rs/canvas');

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
    const { 
      imageBase64,
      imageMimeType = 'image/png',
      word1 = '',
      word2 = '',
      color1 = '#000000',
      color2 = '#000000',
      width = 600,
      height = 600
    } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'imageBase64 is required' });
    }

    // Create canvas
    const canvas = createCanvas(parseInt(width), parseInt(height));
    const ctx = canvas.getContext('2d');

    // White background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    // Load and draw the icon
    const iconBuffer = Buffer.from(imageBase64, 'base64');
    const icon = await loadImage(iconBuffer);
    
    // Icon settings
    const iconSize = 200;
    const iconX = (width - iconSize) / 2;
    const iconY = 100;
    
    ctx.drawImage(icon, iconX, iconY, iconSize, iconSize);

    // Draw text
    const fontSize = 48;
    const textY = 400;
    
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Measure text to position tspans
    const text1Width = ctx.measureText(word1).width;
    const text2Width = ctx.measureText(word2).width;
    const totalWidth = text1Width + text2Width;
    const startX = (width - totalWidth) / 2;

    // Draw word1
    ctx.fillStyle = color1;
    ctx.textAlign = 'left';
    ctx.fillText(word1, startX, textY);

    // Draw word2
    ctx.fillStyle = color2;
    ctx.fillText(word2, startX + text1Width, textY);

    // Convert to PNG
    const pngBuffer = canvas.toBuffer('image/png');

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
      error: 'Failed to create PNG', 
      details: error.message 
    });
  }
};
