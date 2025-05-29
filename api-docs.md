# API Documentation

## GET /api/users

Retrieves a paginated list of users with optional filtering by role.

### Endpoint
```
GET /api/users
```

### Query Parameters

| Parameter | Type    | Required | Default | Description                                    |
|-----------|---------|----------|---------|------------------------------------------------|
| page      | integer | No       | 1       | Page number for pagination                     |
| limit     | integer | No       | 10      | Number of results per page (max: 100)          |
| role      | string  | No       | null    | Filter users by role (e.g., "admin", "user")   |

### Request Examples

#### Basic Request
```bash
curl -X GET "https://api.example.com/api/users"
```

#### With Pagination
```bash
curl -X GET "https://api.example.com/api/users?page=2&limit=20"
```

#### With Role Filter
```bash
curl -X GET "https://api.example.com/api/users?role=admin"
```

### Response

#### Success Response (200 OK)
```json
{
  "data": [
    {
      "id": "123",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00Z",
      "lastLogin": "2024-03-20T15:45:00Z"
    },
    // ... more users
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 48,
    "itemsPerPage": 10
  }
}
```

#### Error Responses

##### Invalid Page Number (400 Bad Request)
```json
{
  "error": {
    "code": "INVALID_PAGE",
    "message": "Page number must be greater than 0"
  }
}
```

##### Invalid Limit (400 Bad Request)
```json
{
  "error": {
    "code": "INVALID_LIMIT",
    "message": "Limit must be between 1 and 100"
  }
}
```

##### Invalid Role (400 Bad Request)
```json
{
  "error": {
    "code": "INVALID_ROLE",
    "message": "Invalid role specified"
  }
}
```

### Notes

- The response is paginated to prevent large data transfers
- Results are sorted by creation date (newest first)
- The `role` parameter is case-insensitive
- Rate limiting applies: 100 requests per minute per IP

### Rate Limits

| Limit Type | Value |
|------------|-------|
| Requests   | 100/minute |
| IP-based   | Yes   |

### Authentication

This endpoint requires authentication. Include the API key in the request header:

```bash
Authorization: Bearer your-api-key-here
```
