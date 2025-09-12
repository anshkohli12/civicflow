# 🚀 CivicFlow Backend - Complete API Test Data

## 📋 **Thunder Client Test Collection**

### **🔐 Step 1: User Registration & Authentication**

#### **1.1 Register User #1 (Regular Citizen)**
```
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "username": "john_citizen",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER"
}
```
**Expected Response:** `201 Created`
```json
{
  "message": "User registered successfully"
}
```

#### **1.2 Register User #2 (NGO)**
```
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "username": "green_ngo", 
  "email": "contact@greenngo.org",
  "password": "ngo123",
  "role": "NGO",
  "areaCode": "NORTH_DELHI"
}
```

#### **1.3 Register User #3 (Another Citizen)**
```
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "username": "sara_activist",
  "email": "sara@activist.com", 
  "password": "activist123",
  "role": "USER"
}
```

---

### **🔑 Step 2: Login & Get JWT Tokens**

#### **2.1 Login as John (Save this JWT!)**
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "john_citizen",
  "password": "password123"
}
```
**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "expiresIn": 3600,
  "role": "USER"
}
```
**🔥 COPY THE TOKEN! You'll need it for authenticated requests.**

#### **2.2 Login as Sara (Save this JWT too!)**
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "sara_activist", 
  "password": "activist123"
}
```

---

### **📍 Step 3: Create Issues (User-Tracked)**

#### **3.1 John Creates Issue #1**
```
POST http://localhost:8080/api/issues
Authorization: Bearer <JOHN_JWT_TOKEN_HERE>
Content-Type: application/json

{
  "title": "Broken Street Light on MG Road",
  "description": "The street light near Metro Station has been out for 5 days, creating safety concerns",
  "category": "Infrastructure",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "critical": true
}
```

#### **3.2 John Creates Issue #2**
```
POST http://localhost:8080/api/issues  
Authorization: Bearer <JOHN_JWT_TOKEN_HERE>
Content-Type: application/json

{
  "title": "Garbage Pile Up in Sector 15",
  "description": "Large amount of uncollected garbage for over a week",
  "category": "Sanitation", 
  "latitude": 28.4595,
  "longitude": 77.0266,
  "critical": false
}
```

#### **3.3 Sara Creates Issue #3**
```
POST http://localhost:8080/api/issues
Authorization: Bearer <SARA_JWT_TOKEN_HERE>
Content-Type: application/json

{
  "title": "Pothole on Ring Road",
  "description": "Large pothole causing accidents near bus stop",
  "category": "Roads",
  "latitude": 28.5355,
  "longitude": 77.3910, 
  "critical": true
}
```

#### **3.4 Sara Creates Issue #4**
```
POST http://localhost:8080/api/issues
Authorization: Bearer <SARA_JWT_TOKEN_HERE>
Content-Type: application/json

{
  "title": "Water Logging in Park Area",
  "description": "Rainwater not draining, creating mosquito breeding ground",
  "category": "Drainage",
  "latitude": 28.6304,
  "longitude": 77.2177,
  "critical": false
}
```

---

### **📖 Step 4: Public Endpoints (No Authentication)**

#### **4.1 Get All Issues (Public)**
```
GET http://localhost:8080/api/issues
```
**Should return:** All 4 issues with creator information

#### **4.2 Get Specific Issue (Public)**
```
GET http://localhost:8080/api/issues/1
```
**Should return:** John's first issue with creator details

---

### **👤 Step 5: User-Specific Endpoints (Authenticated)**

#### **5.1 Get John's Issues Only**
```
GET http://localhost:8080/api/issues/my-issues
Authorization: Bearer <JOHN_JWT_TOKEN_HERE>
```
**Should return:** Only Issues #1 and #2 (created by John)

#### **5.2 Get Sara's Issues Only**
```
GET http://localhost:8080/api/issues/my-issues
Authorization: Bearer <SARA_JWT_TOKEN_HERE>
```
**Should return:** Only Issues #3 and #4 (created by Sara)

---

### **✏️ Step 6: Update Issues (Owner Only)**

#### **6.1 John Updates His Issue**
```
PUT http://localhost:8080/api/issues/1
Authorization: Bearer <JOHN_JWT_TOKEN_HERE>
Content-Type: application/json

{
  "title": "URGENT: Broken Street Light on MG Road - FIXED",
  "description": "Street light has been repaired by municipal team",
  "category": "Infrastructure",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "critical": false
}
```

#### **6.2 Update Issue Status**
```
PUT http://localhost:8080/api/issues/1/status/RESOLVED
Authorization: Bearer <JOHN_JWT_TOKEN_HERE>
```

---

### **🗑️ Step 7: Delete Issues (Owner Only)**

#### **7.1 John Deletes His Own Issue (Should Work)**
```
DELETE http://localhost:8080/api/issues/2
Authorization: Bearer <JOHN_JWT_TOKEN_HERE>
```
**Expected:** `200 OK` - Issue deleted successfully

#### **7.2 Sara Tries to Delete John's Issue (Should Fail)**
```
DELETE http://localhost:8080/api/issues/1
Authorization: Bearer <SARA_JWT_TOKEN_HERE>
```
**Expected:** `403 Forbidden` - "You can only delete issues you created"

---

### **❌ Step 8: Error Testing**

#### **8.1 Unauthenticated Issue Creation (Should Fail)**
```
POST http://localhost:8080/api/issues
Content-Type: application/json

{
  "title": "Test Issue",
  "description": "This should fail"
}
```
**Expected:** `403 Forbidden`

#### **8.2 Invalid JWT Token (Should Fail)**
```
GET http://localhost:8080/api/issues/my-issues
Authorization: Bearer invalid_token_here
```
**Expected:** `401 Unauthorized`

#### **8.3 Get Non-Existent Issue**
```
GET http://localhost:8080/api/issues/999
```
**Expected:** `Empty Optional` or `404 Not Found`

---

## 🎯 **Expected Database State After Testing**

### **Users Table:**
| ID | Username | Email | Role | Area Code |
|----|----------|-------|------|-----------|
| 1 | john_citizen | john@example.com | USER | null |
| 2 | green_ngo | contact@greenngo.org | NGO | NORTH_DELHI |
| 3 | sara_activist | sara@activist.com | USER | null |

### **Issues Table:**
| ID | Title | Creator (created_by_user_id) | Status | Critical |
|----|-------|------------------------------|--------|-----------|
| 1 | URGENT: Broken Street Light... | 1 (john_citizen) | RESOLVED | false |
| ~~2~~ | ~~Garbage Pile Up...~~ | ~~Deleted~~ | ~~Deleted~~ | ~~Deleted~~ |
| 3 | Pothole on Ring Road | 3 (sara_activist) | OPEN | true |
| 4 | Water Logging in Park Area | 3 (sara_activist) | OPEN | false |

---

## ✅ **Success Criteria Checklist**

- [ ] ✅ All users can register successfully
- [ ] ✅ All users can login and receive JWT tokens
- [ ] ✅ Authenticated users can create issues (auto-assigned as creator)
- [ ] ✅ Public can view all issues without authentication
- [ ] ✅ Users can view only their own issues via `/my-issues`
- [ ] ✅ Users can update their own issues
- [ ] ✅ Users can delete only their own issues
- [ ] ✅ Users cannot delete other users' issues
- [ ] ✅ Unauthenticated requests to protected endpoints fail
- [ ] ✅ Invalid JWT tokens are rejected
- [ ] ✅ Database properly tracks issue creators via foreign keys

---

## 🔥 **Quick Test Commands (Copy-Paste Ready)**

```bash
# 1. Register John
curl -X POST http://localhost:8080/api/auth/register -H "Content-Type: application/json" -d '{"username":"john_citizen","email":"john@example.com","password":"password123","role":"USER"}'

# 2. Login John (Save the token!)
curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d '{"username":"john_citizen","password":"password123"}'

# 3. Create Issue (Replace <TOKEN> with actual JWT)
curl -X POST http://localhost:8080/api/issues -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"title":"Test Issue","description":"Test Description","category":"Infrastructure","latitude":28.6139,"longitude":77.2090,"critical":true}'

# 4. Get My Issues
curl -X GET http://localhost:8080/api/issues/my-issues -H "Authorization: Bearer <TOKEN>"

# 5. Get All Issues (Public)
curl -X GET http://localhost:8080/api/issues
```

**🎯 Ready to test! Your user-issue tracking system is fully functional!** 🚀
