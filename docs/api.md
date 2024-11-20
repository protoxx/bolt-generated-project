# AI Tools Hub API Documentation

## Base URL
```
/api
```

## Authentication
All API endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Tools

#### GET /api/tools
Get all tools with optional filtering.

Query Parameters:
- `category` (optional): Filter by category
- `search` (optional): Search in name and description
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page

Response:
```json
{
  "tools": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "website": "string",
      "category": "string",
      "pricing": "string",
      "imageUrl": "string",
      "features": ["string"]
    }
  ],
  "total": "number",
  "page": "number",
  "totalPages": "number"
}
```

#### GET /api/tools/:id
Get a specific tool by ID.

Response:
```json
{
  "tool": {
    "id": "string",
    "name": "string",
    "description": "string",
    "website": "string",
    "category": "string",
    "pricing": "string",
    "imageUrl": "string",
    "features": ["string"]
  }
}
```

#### POST /api/tools
Create a new tool. Requires admin authentication.

Request Body:
```json
{
  "name": "string",
  "description": "string",
  "website": "string",
  "category": "string",
  "pricing": "string",
  "imageUrl": "string",
  "features": ["string"]
}
```

### Reviews

#### GET /api/reviews
Get reviews for a tool.

Query Parameters:
- `toolId` (required): Tool ID
- `page` (optional): Page number
- `limit` (optional): Items per page

Response:
```json
{
  "reviews": [
    {
      "id": "string",
      "rating": "number",
      "comment": "string",
      "userId": "string",
      "toolId": "string",
      "createdAt": "string"
    }
  ]
}
```

#### POST /api/reviews
Create a new review. Requires authentication.

Request Body:
```json
{
  "toolId": "string",
  "rating": "number",
  "comment": "string"
}
```

### Users

#### GET /api/users
Get all users. Requires admin authentication.

Query Parameters:
- `page` (optional): Page number
- `limit` (optional): Items per page

Response:
```json
{
  "users": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string",
      "createdAt": "string"
    }
  ]
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid request data"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error message"
}
```
