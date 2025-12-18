# SVG to PNG Converter API v3

A Vercel serverless function that converts SVG strings to PNG images using Resvg with bundled Inter font.

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
  "mimeType": "image/png"
}
```

## Font

Uses Inter Bold font bundled with the deployment.
