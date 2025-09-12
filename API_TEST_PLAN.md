# CivicFlow Backend API Test Plan

## 🎯 **User-Issue Relationship Testing**

### **Updated Schema Features**
✅ **Users Table**: id, username, email, password, role, area_code, created_at, updated_at  
✅ **Issues Table**: id, title, description, category, latitude, longitude, image_url, vote_count, critical, status, **created_by_user_id**, **assigned_ngo_id**, created_at, updated_at  
✅ **Foreign Keys**: issue.created_by_user_id → users.id, issue.assigned_ngo_id → users.id

---

## 📋 **Test Sequence**

### **1. Authentication Setup**
```bash
# Register a new user
POST http://localhost:8080/api/auth/register
{
  "username": "john_citizen",
  "email": "john@example.com", 
  "password": "password123",
  "role": "USER"
}

# Login to get JWT token
POST http://localhost:8080/api/auth/login
{
  "username": "john_citizen",
  "password": "password123"
}
# Save the JWT token for Authorization: Bearer <token>
```

### **2. Issue Creation (🔒 AUTHENTICATED)**
```bash
# Create issue - should auto-assign current user as creator
POST http://localhost:8080/api/issues
Authorization: Bearer <jwt_token>
{
  "title": "Broken Street Light on Main St",
  "description": "The street light near the park has been out for 3 days",
  "category": "Infrastructure", 
  "latitude": 40.7128,
  "longitude": -74.0060,
  "critical": false
}
```

### **3. Issue Retrieval**
```bash
# Get all issues (📖 PUBLIC)
GET http://localhost:8080/api/issues

# Get my created issues (🔒 AUTHENTICATED) 
GET http://localhost:8080/api/issues/my-issues
Authorization: Bearer <jwt_token>

# Get specific issue (📖 PUBLIC)
GET http://localhost:8080/api/issues/1
```

### **4. Issue Management (🔒 AUTHENTICATED)**
```bash
# Update issue (🔒 AUTHENTICATED)
PUT http://localhost:8080/api/issues/1
Authorization: Bearer <jwt_token>
{
  "title": "Broken Street Light on Main St - URGENT",
  "description": "The street light near the park has been out for 3 days - creating safety hazard",
  "category": "Infrastructure",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "critical": true
}

# Delete issue - only creator can delete (🔒 AUTHENTICATED)
DELETE http://localhost:8080/api/issues/1
Authorization: Bearer <jwt_token>
```

---

## 🔍 **Expected Results**

### **✅ Issue Creation Should:**
- Automatically set `created_by_user_id` to current authenticated user
- Return 201 Created with issue details including creator info
- Reject unauthenticated requests with 403 Forbidden

### **✅ My Issues Endpoint Should:**
- Return only issues created by the current authenticated user
- Return empty array for new users
- Reject unauthenticated requests

### **✅ Issue Deletion Should:**
- Allow deletion only by the issue creator
- Return 403 if different user tries to delete
- Return 404 if issue doesn't exist

### **✅ Public Endpoints Should:**
- Allow anyone to view all issues
- Allow anyone to view specific issue details
- Work without authentication

---

## 🚨 **Edge Cases to Test**

1. **Invalid JWT**: Should return 401 Unauthorized
2. **Expired JWT**: Should return 401 Unauthorized  
3. **Missing Authorization**: Should return 403 Forbidden (for protected routes)
4. **Non-existent issue ID**: Should return 404 Not Found
5. **Malformed request body**: Should return 400 Bad Request

---

## 📊 **Success Criteria**

✅ All authenticated users can create issues  
✅ Issues are properly linked to their creators  
✅ Users can only delete their own issues  
✅ Public can view all issues without authentication  
✅ My-issues endpoint returns user-specific results  
✅ Proper error handling for edge cases  

---

## 🎯 **Next Phase Features**
- Image upload for issues
- Location-based issue queries
- NGO assignment algorithms
- Emergency detection keywords
- Voting system for issue resolution
