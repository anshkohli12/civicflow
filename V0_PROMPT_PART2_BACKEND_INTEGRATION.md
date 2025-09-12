# V0 Prompt - Part 2: Backend Integration & API Implementation

## Backend Integration Details

### **API Base Configuration**
- Backend URL: `http://localhost:8080`
- Authentication: JWT Bearer Token
- Content-Type: `application/json`
- CORS: Enabled for all origins

### **Complete API Endpoints**

#### **Authentication APIs**
```javascript
// POST /api/auth/register
{
  "username": "string",
  "email": "string", 
  "password": "string",
  "firstName": "string",
  "lastName": "string"
}

// POST /api/auth/login
{
  "username": "string",
  "password": "string"
}
// Response: { "token": "jwt_token", "username": "string", "role": "USER|ADMIN" }
```

#### **User Profile APIs**
```javascript
// GET /api/user/profile - Get current user profile
// PUT /api/user/profile - Update profile
{
  "firstName": "string",
  "lastName": "string", 
  "email": "string",
  "phoneNumber": "string", // Indian format validation
  "dateOfBirth": "YYYY-MM-DD",
  "gender": "MALE|FEMALE|OTHER",
  "address": {
    "street": "string",
    "city": "string", 
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "location": {
    "latitude": "number",
    "longitude": "number",
    "placeName": "string"
  },
  "preferences": {
    "language": "string",
    "timezone": "string",
    "notifications": "boolean"
  }
}

// POST /api/user/upload-profile-picture - File upload
// DELETE /api/user/delete-account
```

#### **Issues APIs**
```javascript
// GET /api/issues - Get all issues with filters
// Query params: page, size, category, status, priority, location

// POST /api/issues - Create new issue
{
  "title": "string",
  "description": "string", 
  "category": "ROAD|WATER|ELECTRICITY|WASTE|SAFETY|OTHER",
  "priority": "LOW|MEDIUM|HIGH|CRITICAL",
  "location": {
    "latitude": "number",
    "longitude": "number", 
    "address": "string"
  }
}

// GET /api/issues/{id} - Get issue details
// PUT /api/issues/{id} - Update issue (admin only)
// DELETE /api/issues/{id} - Delete issue

// POST /api/issues/{id}/vote - Vote on issue
// GET /api/issues/my-issues - User's issues
// GET /api/issues/search?q={query} - Search issues
```

#### **Admin APIs** 
```javascript
// GET /api/admin/dashboard - Admin dashboard stats
// Response: {
//   "totalUsers": "number",
//   "totalIssues": "number", 
//   "resolvedIssues": "number",
//   "pendingIssues": "number",
//   "totalVotes": "number",
//   "monthlyGrowth": "number"
// }

// GET /api/admin/users - Get all users with pagination
// PUT /api/admin/users/{id}/role - Change user role
// PUT /api/admin/users/{id}/status - Enable/disable user

// PUT /api/admin/issues/{id}/status - Update issue status
// GET /api/admin/statistics - Detailed statistics
```

### **Authentication Context Setup**

Create `src/context/AuthContext.jsx`:
```jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user info
      apiService.getCurrentUser()
        .then(userData => setUser(userData))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const response = await apiService.login(credentials);
    localStorage.setItem('token', response.token);
    setUser(response);
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### **API Service Usage Examples**

```jsx
// In components, use the apiService:
import { apiService } from '../services/apiService';

// Get issues
const issues = await apiService.getIssues({ page: 0, size: 10 });

// Create issue
const newIssue = await apiService.createIssue({
  title: "Broken Street Light",
  description: "Street light not working since 3 days",
  category: "ELECTRICITY",
  priority: "MEDIUM",
  location: { latitude: 28.6139, longitude: 77.2090, address: "Delhi" }
});

// Update profile
const updatedProfile = await apiService.updateProfile({
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "+91-9876543210"
});
```

### **Error Handling**
```jsx
import { useState } from 'react';

const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

const handleSubmit = async (data) => {
  setLoading(true);
  setError('');
  
  try {
    await apiService.createIssue(data);
    // Success handling
  } catch (err) {
    setError(err.response?.data?.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};
```

## Complete Service Layer Implementation

### **Authentication Service** (`src/services/authService.js`)
```javascript
import { apiService } from './apiService';

export const authService = {
  async login(credentials) {
    const response = await apiService.post('/api/auth/login', credentials);
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
    }
    return response;
  },

  async register(userData) {
    const response = await apiService.post('/api/auth/register', userData);
    return response;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  isAdmin() {
    const user = this.getCurrentUser();
    return user?.role === 'ADMIN';
  }
};
```

### **Issue Service** (`src/services/issueService.js`)
```javascript
import { apiService } from './apiService';

export const issueService = {
  // Get all issues with advanced filtering
  async getIssues(params = {}) {
    const queryParams = new URLSearchParams();
    
    // Add pagination
    queryParams.append('page', params.page || 0);
    queryParams.append('size', params.size || 20);
    
    // Add filters
    if (params.category) queryParams.append('category', params.category);
    if (params.status) queryParams.append('status', params.status);
    if (params.priority) queryParams.append('priority', params.priority);
    if (params.location) queryParams.append('location', params.location);
    if (params.search) queryParams.append('search', params.search);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortDirection) queryParams.append('sortDirection', params.sortDirection);
    
    return await apiService.get(`/api/issues?${queryParams.toString()}`);
  },

  async getIssueById(id) {
    return await apiService.get(`/api/issues/${id}`);
  },

  async createIssue(issueData) {
    return await apiService.post('/api/issues', issueData);
  },

  async updateIssue(id, issueData) {
    return await apiService.put(`/api/issues/${id}`, issueData);
  },

  async deleteIssue(id) {
    return await apiService.delete(`/api/issues/${id}`);
  },

  async voteOnIssue(id, voteType = 'UPVOTE') {
    return await apiService.post(`/api/issues/${id}/vote`, { voteType });
  },

  async getMyIssues(page = 0, size = 20) {
    return await apiService.get(`/api/issues/my-issues?page=${page}&size=${size}`);
  },

  async searchIssues(query, page = 0, size = 20) {
    return await apiService.get(`/api/issues/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}`);
  },

  async getIssuesByLocation(lat, lng, radius = 5) {
    return await apiService.get(`/api/issues/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
  }
};
```

### **User Service** (`src/services/userService.js`)
```javascript
import { apiService } from './apiService';

export const userService = {
  async getProfile() {
    return await apiService.get('/api/user/profile');
  },

  async updateProfile(profileData) {
    return await apiService.put('/api/user/profile', profileData);
  },

  async uploadProfilePicture(file) {
    const formData = new FormData();
    formData.append('file', file);
    return await apiService.post('/api/user/upload-profile-picture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  async changePassword(passwordData) {
    return await apiService.put('/api/user/change-password', passwordData);
  },

  async deleteAccount() {
    return await apiService.delete('/api/user/delete-account');
  },

  async updatePreferences(preferences) {
    return await apiService.put('/api/user/preferences', preferences);
  },

  async getNotificationSettings() {
    return await apiService.get('/api/user/notification-settings');
  },

  async updateNotificationSettings(settings) {
    return await apiService.put('/api/user/notification-settings', settings);
  }
};
```

### **Admin Service** (`src/services/adminService.js`)
```javascript
import { apiService } from './apiService';

export const adminService = {
  // Dashboard Statistics
  async getDashboardStats() {
    return await apiService.get('/api/admin/dashboard');
  },

  async getDetailedStatistics() {
    return await apiService.get('/api/admin/statistics');
  },

  // User Management
  async getAllUsers(page = 0, size = 20, search = '') {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('size', size);
    if (search) params.append('search', search);
    return await apiService.get(`/api/admin/users?${params.toString()}`);
  },

  async changeUserRole(userId, newRole) {
    return await apiService.put(`/api/admin/users/${userId}/role`, { role: newRole });
  },

  async toggleUserStatus(userId, enabled) {
    return await apiService.put(`/api/admin/users/${userId}/status`, { enabled });
  },

  async deleteUser(userId) {
    return await apiService.delete(`/api/admin/users/${userId}`);
  },

  // Issue Management
  async updateIssueStatus(issueId, status) {
    return await apiService.put(`/api/admin/issues/${issueId}/status`, { status });
  },

  async bulkUpdateIssueStatus(issueIds, status) {
    return await apiService.put('/api/admin/issues/bulk-status', { 
      issueIds, 
      status 
    });
  },

  async assignIssue(issueId, assigneeId) {
    return await apiService.put(`/api/admin/issues/${issueId}/assign`, { 
      assigneeId 
    });
  },

  // Analytics & Reports
  async getIssueAnalytics(timeRange = '30d') {
    return await apiService.get(`/api/admin/analytics/issues?range=${timeRange}`);
  },

  async getUserAnalytics(timeRange = '30d') {
    return await apiService.get(`/api/admin/analytics/users?range=${timeRange}`);
  },

  async exportData(type = 'issues', format = 'csv') {
    return await apiService.get(`/api/admin/export/${type}?format=${format}`, {
      responseType: 'blob'
    });
  }
};
```

### **Enhanced API Service Configuration**
Update existing `src/services/apiService.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    if (error.response?.status === 403) {
      window.location.href = '/unauthorized';
    }
    
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'An unexpected error occurred';
    
    return Promise.reject(new Error(errorMessage));
  }
);

export const apiService = {
  // HTTP Methods
  get: (url, config = {}) => apiClient.get(url, config),
  post: (url, data = {}, config = {}) => apiClient.post(url, data, config),
  put: (url, data = {}, config = {}) => apiClient.put(url, data, config),
  delete: (url, config = {}) => apiClient.delete(url, config),
  patch: (url, data = {}, config = {}) => apiClient.patch(url, data, config),

  // File Upload Helper
  uploadFile: (url, file, onProgress = null) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiClient.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
  },

  // Helper for downloading files
  downloadFile: async (url, filename) => {
    const response = await apiClient.get(url, { responseType: 'blob' });
    const blob = new Blob([response]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  }
};
```
