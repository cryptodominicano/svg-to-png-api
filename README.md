# SVG to PNG Converter API v2

A Vercel serverless function that converts SVG strings to PNG images using Resvg for better font support.

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
