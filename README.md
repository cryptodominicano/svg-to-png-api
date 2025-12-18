# SVG to PNG Converter API

A simple Vercel serverless function that converts SVG strings to PNG images.

## Endpoint

`POST /api/convert`

## Request Body

```json
{
  "svg": "<svg>...</svg>",
  "width": 600,
  "height": 600
}
```

## Response

```json
{
  "success": true,
  "png": "base64-encoded-png-data",
  "mimeType": "image/png",
  "width": 600,
  "height": 600
}
```

## Usage in n8n

Use an HTTP Request node with:
- Method: POST
- URL: https://your-vercel-url.vercel.app/api/convert
- Body Type: JSON
- Body: `{ "svg": "your-svg-string", "width": 600, "height": 600 }`
