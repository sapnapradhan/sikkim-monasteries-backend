# Sacred Sikkim Backend API Documentation

## Server Details
- **URL**: http://localhost:3001
- **Status**: ✅ Working
- **Data**: 3 Complete Monasteries Ready

## Available Endpoints

### 1. Welcome & Info
GET http://localhost:3001/
- Returns: API overview and available endpoints

### 2. Test Endpoint  
GET http://localhost:3001/test
- Returns: Server status check

### 3. All Monasteries
GET http://localhost:3001/monasteries
- Returns: All 3 monasteries with full details
- **Use this for homepage monastery grid**

### 4. Individual Monasteries
- GET http://localhost:3001/monastery/1 (Rumtek Monastery)
- GET http://localhost:3001/monastery/2 (Pemayangtse Monastery)  
- GET http://localhost:3001/monastery/3 (Enchey Monastery)
- **Use these for monastery detail pages**

### 5. Search Functionality
- GET http://localhost:3001/search/rumtek
- GET http://localhost:3001/search/kagyu
- GET http://localhost:3001/search/nyingma
- **Use these for search features**

### 6. Filter by District
- GET http://localhost:3001/district/east
- GET http://localhost:3001/district/west
- **Use these for map filtering**

## Sample Response Format
```json
{
  "success": true,
  "count": 3,
  "message": "Found 3 monasteries",
  "data": [
    {
      "id": 1,
      "name": "Rumtek Monastery",
      "description": "The Dharma Chakra Centre...",
      "location": {
        "district": "East Sikkim",
        "coordinates": {
          "latitude": 27.3389,
          "longitude": 88.5583
        }
      },
      "features": {
        "hasVR": true,
        "hasAudio": true
      }
    }
  ]
}