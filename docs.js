// routes/docs.js - Auto-generated API documentation

const express = require('express');
const router = express.Router();

// GET /api/docs - Complete API documentation
router.get('/', (req, res) => {
  const documentation = {
    title: "Sacred Sikkim API Documentation",
    version: "2.0",
    baseUrl: `${req.protocol}://${req.get('host')}`,
    lastUpdated: new Date().toISOString(),
    
    authentication: {
      type: "JWT Bearer Token",
      header: "Authorization: Bearer <token>",
      endpoints: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        profile: "GET /api/auth/profile (protected)"
      }
    },
    
    endpoints: {
      monasteries: {
        getAll: {
          method: "GET",
          url: "/api/monasteries",
          description: "Get all monasteries with optional filtering",
          parameters: {
            district: "Filter by district (east, west, north, south)",
            tradition: "Filter by tradition (kagyu, nyingma, gelug)",
            features: "Filter by features (vr, audio, live)"
          },
          example: "/api/monasteries?district=east&features=vr"
        },
        getById: {
          method: "GET",
          url: "/api/monasteries/:id",
          description: "Get detailed monastery information",
          example: "/api/monasteries/1"
        },
        search: {
          method: "GET",
          url: "/api/search/:query",
          description: "Search monasteries by name, description, or location",
          example: "/api/search/rumtek"
        }
      },
      
      festivals: {
        getAll: {
          method: "GET",
          url: "/api/festivals",
          description: "Get all festivals"
        },
        upcoming: {
          method: "GET",
          url: "/api/festivals/upcoming",
          description: "Get next 3 upcoming festivals"
        }
      },
      
      users: {
        register: {
          method: "POST",
          url: "/api/auth/register",
          description: "Register new user",
          body: {
            name: "string (required)",
            email: "string (required)",
            password: "string (required, min 6 chars)"
          }
        },
        login: {
          method: "POST",
          url: "/api/auth/login",
          description: "User login",
          body: {
            email: "string (required)",
            password: "string (required)"
          }
        },
        profile: {
          method: "GET",
          url: "/api/auth/profile",
          description: "Get user profile (requires authentication)",
          headers: {
            Authorization: "Bearer <jwt_token>"
          }
        },
        recordVisit: {
          method: "POST",
          url: "/api/auth/visit/:monasteryId",
          description: "Record monastery visit (requires authentication)"
        }
      },
      
      admin: {
        dashboard: {
          method: "GET",
          url: "/api/admin/dashboard",
          description: "Admin dashboard stats (requires admin auth)"
        },
        users: {
          method: "GET",
          url: "/api/admin/users",
          description: "User management (requires admin auth)"
        }
      },
      
      upload: {
        single: {
          method: "POST",
          url: "/api/upload/monastery-image",
          description: "Upload single image (requires auth)",
          contentType: "multipart/form-data"
        },
        multiple: {
          method: "POST", 
          url: "/api/upload/multiple",
          description: "Upload multiple files (requires auth)"
        }
      }
    },
    
    responseFormat: {
      success: {
        success: true,
        message: "Success message",
        data: "Response data",
        count: "Number of items (for lists)"
      },
      error: {
        success: false,
        message: "Error message",
        error: "Error details"
      }
    },
    
    statusCodes: {
      200: "Success",
      201: "Created",
      400: "Bad Request",
      401: "Unauthorized", 
      403: "Forbidden",
      404: "Not Found",
      429: "Too Many Requests",
      500: "Internal Server Error"
    }
  };
  
  res.json(documentation);
});

// GET /api/docs/postman - Postman collection
router.get('/postman', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  const postmanCollection = {
    info: {
      name: "Sacred Sikkim API",
      description: "Complete API collection for Sacred Sikkim platform",
      version: "2.0"
    },
    variable: [
      {
        key: "baseUrl",
        value: baseUrl,
        type: "string"
      }
    ],
    item: [
      {
        name: "Authentication",
        item: [
          {
            name: "Register User",
            request: {
              method: "POST",
              url: "{{baseUrl}}/api/auth/register",
              body: {
                mode: "raw",
                raw: JSON.stringify({
                  name: "Test User",
                  email: "test@example.com", 
                  password: "password123"
                })
              }
            }
          },
          {
            name: "Login User",
            request: {
              method: "POST",
              url: "{{baseUrl}}/api/auth/login",
              body: {
                mode: "raw",
                raw: JSON.stringify({
                  email: "test@example.com",
                  password: "password123"
                })
              }
            }
          }
        ]
      },
      {
        name: "Monasteries",
        item: [
          {
            name: "Get All Monasteries",
            request: {
              method: "GET",
              url: "{{baseUrl}}/api/monasteries"
            }
          },
          {
            name: "Get Monastery Details",
            request: {
              method: "GET",
              url: "{{baseUrl}}/api/monasteries/1"
            }
          },
          {
            name: "Search Monasteries",
            request: {
              method: "GET",
              url: "{{baseUrl}}/api/search/rumtek"
            }
          }
        ]
      }
    ]
  };
  
  res.json(postmanCollection);
});

module.exports = router;