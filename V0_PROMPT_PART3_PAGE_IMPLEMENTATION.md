# V0 Prompt - Part 3: Complete Implementation Guide & Components

## Essential Component Implementations

### **Core Layout Components**

#### **MainLayout Component** (`src/components/layout/MainLayout.jsx`)
```jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default MainLayout;
```

#### **Header Component** (`src/components/common/Header.jsx`)
```jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">CivicFlow</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`font-medium transition-colors ${
                    isActiveRoute('/dashboard') 
                      ? 'text-blue-600' 
                      : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/issues" 
                  className={`font-medium transition-colors ${
                    isActiveRoute('/issues') 
                      ? 'text-blue-600' 
                      : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  Issues
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className={`font-medium transition-colors ${
                      isActiveRoute('/admin') 
                        ? 'text-blue-600' 
                        : 'text-slate-700 hover:text-blue-600'
                    }`}
                  >
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/issues" className="text-slate-700 hover:text-blue-600 font-medium">
                  Browse Issues
                </Link>
                <Link to="/login" className="text-slate-700 hover:text-blue-600 font-medium">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* User Menu */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <span className="hidden md:block text-sm font-medium text-slate-700">
                  {user?.firstName || user?.username}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Profile Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : null}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <nav className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-slate-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/issues" 
                    className="text-slate-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Issues
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-slate-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="text-slate-700 hover:text-blue-600 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-600 hover:text-red-700 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/issues" 
                    className="text-slate-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse Issues
                  </Link>
                  <Link 
                    to="/login" 
                    className="text-slate-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
```

### **Complete App.jsx with Routing** (`src/App.jsx`)
```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import IssuesPage from './pages/IssuesPage';
import IssueDetailsPage from './pages/IssueDetailsPage';
import CreateIssuePage from './pages/CreateIssuePage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminIssuesPage from './pages/AdminIssuesPage';
import NotFoundPage from './pages/NotFoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

// Styles
import './styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="issues" element={<IssuesPage />} />
              <Route path="issues/:id" element={<IssueDetailsPage />} />
              <Route path="unauthorized" element={<UnauthorizedPage />} />
              <Route path="404" element={<NotFoundPage />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="issues/new" element={<CreateIssuePage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="issues" element={<AdminIssuesPage />} />
            </Route>

            {/* Redirects */}
            <Route path="/login" element={<Navigate to="/auth/login" replace />} />
            <Route path="/register" element={<Navigate to="/auth/register" replace />} />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
```

### **Essential Reusable Components**

#### **Button Component** (`src/components/common/Button.jsx`)
```jsx
import React from 'react';
import { cn } from '../../utils/helpers';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    ghost: 'text-slate-700 hover:bg-slate-100 focus:ring-slate-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        loading && 'cursor-wait',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
```

#### **Input Component** (`src/components/common/Input.jsx`)
```jsx
import React, { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

const Input = forwardRef(({ 
  label, 
  error, 
  type = 'text', 
  className = '',
  required = false,
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={cn(
          'w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
```

### **Required Package Installations**
```bash
# Navigation and routing
npm install react-router-dom

# Icons
npm install lucide-react

# Notifications
npm install react-toastify

# Date handling
npm install date-fns

# Utility functions
npm install clsx

# Form handling
npm install react-hook-form

# Charts for admin dashboard
npm install recharts

# Map integration (optional)
npm install @react-google-maps/api
```

**Continue implementation with all pages and advanced features as specified in Parts 1 & 2. This provides the complete foundation for a professional CivicFlow application that can be directly imported into your frontend directory!**
- Responsive grid layout

**Layout Structure:**
```jsx
<div className="min-h-screen bg-slate-50">
  <Header />
  <div className="max-w-7xl mx-auto px-4 py-8">
    {/* Welcome Section */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-slate-900">
        Welcome back, {user?.firstName}!
      </h1>
      <p className="text-slate-600">Here's what's happening in your community</p>
    </div>
    
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard title="My Issues" value="12" icon={FileText} />
      <StatsCard title="Votes Cast" value="28" icon={ThumbsUp} />
      <StatsCard title="Resolved" value="8" icon={CheckCircle} />
    </div>
    
    {/* Quick Actions & Recent Activity */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <QuickActions />
      <RecentActivity />
    </div>
  </div>
</div>
```

### **4. Issues Page**
File: `src/pages/IssuesPage.jsx`

**Features:**
- Advanced filtering (category, status, priority, location)
- Search functionality
- Issue cards with thumbnails
- Pagination
- Map view toggle
- Sort options (newest, most voted, priority)

**Key Components:**
- `IssueCard.jsx` - Individual issue display
- `IssueFilters.jsx` - Filter sidebar
- `IssueForm.jsx` - Create/edit issue modal

### **5. Profile Page** 
File: `src/pages/ProfilePage.jsx`

**Features:**
- Complete profile management
- Profile picture upload
- Address management with location picker
- Contact information with Indian phone validation
- Preferences settings
- Account deletion option

**Sections:**
```jsx
<div className="max-w-4xl mx-auto px-4 py-8">
  {/* Profile Header */}
  <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
    <ProfilePicture />
    <BasicInfo />
  </div>
  
  {/* Contact & Address */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <ContactInfo />
    <AddressInfo />
  </div>
  
  {/* Preferences & Security */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Preferences />
    <SecuritySettings />
  </div>
</div>
```

### **6. Admin Page**
File: `src/pages/AdminPage.jsx`

**Features:**
- Admin dashboard with real statistics
- User management table
- Issue management with status updates
- Role assignment functionality
- Bulk operations
- Data export capabilities

## Professional UI Components

### **Header Component**
File: `src/components/common/Header.jsx`

```jsx
<header className="bg-white border-b border-slate-200 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">C</span>
        </div>
        <span className="text-xl font-bold text-slate-900">CivicFlow</span>
      </div>
      
      {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/issues">Issues</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
      
      {/* User Menu */}
      <UserDropdown />
    </div>
  </div>
</header>
```

### **Loading Components**
File: `src/components/common/LoadingSpinner.jsx`

```jsx
const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };
  
  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`} />
    </div>
  );
};
```

## Advanced Features to Implement

### **1. Real-time Updates**
- WebSocket integration for live issue updates
- Real-time notification system
- Live voting updates

### **2. Interactive Maps**
- Google Maps or OpenStreetMap integration
- Issue location markers
- Click-to-report functionality
- Location-based filtering

### **3. Mobile Responsiveness**
- Progressive Web App (PWA) capabilities
- Touch-friendly interactions
- Mobile-optimized forms
- Swipe gestures for navigation

### **4. Performance Optimizations**
- Lazy loading for components
- Image optimization
- API response caching
- Infinite scrolling for issue lists

## File Dependencies & Imports

Make sure to install these packages:
```bash
npm install react-router-dom lucide-react date-fns clsx
```

**Key Imports for Components:**
```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, 
  ThumbsUp, 
  CheckCircle, 
  MapPin, 
  Calendar,
  User,
  Settings,
  LogOut 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
```

## Final Implementation Notes

### **Professional Standards:**
1. **Consistent spacing** - Use Tailwind's spacing scale (4, 6, 8, 12, 16, 24)
2. **Typography hierarchy** - text-3xl for headings, text-lg for subheadings, text-base for body
3. **Color consistency** - Stick to the defined blue/slate color palette
4. **Interactive states** - Proper hover, focus, and active states for all interactive elements
5. **Error boundaries** - Implement error boundaries for robust error handling

### **Accessibility:**
- Proper semantic HTML
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast colors (minimum 4.5:1 ratio)

**Create this professional, modern, and fully functional CivicFlow application with excellent user experience and seamless backend integration!**
