# V0 Prompt - Part 1: Design Foundation & Theme

## Project Overview
Create a **professional civic engagement platform** called **CivicFlow** - a modern, responsive React.js application for citizens to report civic issues and administrators to manage them efficiently.

## Design Requirements

### **Color Theme & Aesthetics**
- **Primary Theme**: Clean White & Blue Professional Design
- **Color Palette**:
  - Primary Blue: `#2563eb` (Blue-600)
  - Light Blue: `#dbeafe` (Blue-100) 
  - Accent Blue: `#1d4ed8` (Blue-700)
  - Background: `#ffffff` (Pure White)
  - Secondary Background: `#f8fafc` (Slate-50)
  - Text Primary: `#1e293b` (Slate-800)
  - Text Secondary: `#64748b` (Slate-500)
  - Success: `#10b981` (Emerald-500)
  - Warning: `#f59e0b` (Amber-500)
  - Error: `#ef4444` (Red-500)

### **Design Inspiration**
Look at these modern platforms for inspiration:
- **Notion** (clean, minimal interface)
- **Linear** (professional, blue-themed)
- **Vercel Dashboard** (modern, responsive)
- **GitHub** (clean, organized layout)

### **Framework & Styling**
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS (mandatory for responsiveness)
- **Icons**: Lucide React or Heroicons
- **Fonts**: Inter or system fonts for readability

## Complete File Structure to Create

**IMPORTANT**: Create this EXACT folder structure in the frontend/src directory so we can import the ZIP directly:

```
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx              # Main navigation header with user menu
│   │   ├── Sidebar.jsx             # Side navigation for dashboard
│   │   ├── LoadingSpinner.jsx      # Reusable loading component
│   │   ├── Modal.jsx               # Reusable modal component
│   │   ├── Button.jsx              # Standardized button component
│   │   ├── Card.jsx                # Reusable card component
│   │   ├── Input.jsx               # Standardized input component
│   │   ├── Select.jsx              # Standardized select component
│   │   ├── Toast.jsx               # Notification toast component
│   │   ├── Pagination.jsx          # Pagination component for lists
│   │   ├── SearchBar.jsx           # Search input component
│   │   ├── FilterDropdown.jsx      # Filter dropdown component
│   │   └── ConfirmDialog.jsx       # Confirmation dialog component
│   ├── auth/
│   │   ├── LoginForm.jsx           # Login form with validation
│   │   ├── RegisterForm.jsx        # Registration form with validation
│   │   ├── AuthLayout.jsx          # Layout wrapper for auth pages
│   │   ├── ProtectedRoute.jsx      # Route protection component
│   │   └── ForgotPassword.jsx      # Password reset form
│   ├── dashboard/
│   │   ├── DashboardStats.jsx      # Statistics cards display
│   │   ├── RecentIssues.jsx        # Recent issues widget
│   │   ├── QuickActions.jsx        # Quick action buttons
│   │   ├── ActivityFeed.jsx        # User activity timeline
│   │   ├── WelcomeSection.jsx      # Welcome message section
│   │   └── StatsCard.jsx           # Individual stat card component
│   ├── issues/
│   │   ├── IssueCard.jsx           # Individual issue display card
│   │   ├── IssueList.jsx           # List of issues with pagination
│   │   ├── IssueForm.jsx           # Create/edit issue form
│   │   ├── IssueDetails.jsx        # Detailed issue view
│   │   ├── IssueFilters.jsx        # Advanced filtering sidebar
│   │   ├── IssueMap.jsx            # Map view of issues
│   │   ├── VoteButton.jsx          # Issue voting component
│   │   ├── CommentSection.jsx      # Comments on issues
│   │   ├── StatusBadge.jsx         # Issue status indicator
│   │   ├── PriorityBadge.jsx       # Priority level indicator
│   │   └── CategoryIcon.jsx        # Category icon component
│   ├── profile/
│   │   ├── ProfileHeader.jsx       # Profile picture and basic info
│   │   ├── PersonalInfo.jsx        # Personal information form
│   │   ├── ContactInfo.jsx         # Contact details form
│   │   ├── AddressInfo.jsx         # Address information form
│   │   ├── LocationPicker.jsx      # Interactive location picker
│   │   ├── PreferencesSettings.jsx # User preferences
│   │   ├── SecuritySettings.jsx    # Password and security
│   │   ├── ProfilePicture.jsx      # Profile picture upload
│   │   └── AccountDeletion.jsx     # Account deletion component
│   ├── admin/
│   │   ├── AdminDashboard.jsx      # Admin dashboard overview
│   │   ├── UserManagement.jsx      # User management table
│   │   ├── IssueManagement.jsx     # Admin issue management
│   │   ├── AdminStats.jsx          # Comprehensive admin statistics
│   │   ├── UserTable.jsx           # Users data table
│   │   ├── IssueTable.jsx          # Issues data table
│   │   ├── RoleManager.jsx         # User role assignment
│   │   ├── BulkActions.jsx         # Bulk operations component
│   │   └── ExportData.jsx          # Data export functionality
│   └── layout/
│       ├── MainLayout.jsx          # Main app layout wrapper
│       ├── AuthLayout.jsx          # Authentication pages layout
│       ├── DashboardLayout.jsx     # Dashboard layout with sidebar
│       ├── Footer.jsx              # Site footer
│       └── Navigation.jsx          # Mobile navigation component
├── pages/
│   ├── HomePage.jsx                # Landing page with hero section
│   ├── LoginPage.jsx               # User login page
│   ├── RegisterPage.jsx            # User registration page
│   ├── DashboardPage.jsx           # User dashboard page
│   ├── IssuesPage.jsx              # All issues listing page
│   ├── IssueDetailsPage.jsx        # Individual issue details page
│   ├── CreateIssuePage.jsx         # Create new issue page
│   ├── ProfilePage.jsx             # User profile management page
│   ├── AdminPage.jsx               # Admin dashboard page
│   ├── AdminUsersPage.jsx          # Admin user management page
│   ├── AdminIssuesPage.jsx         # Admin issue management page
│   ├── NotFoundPage.jsx            # 404 error page
│   └── UnauthorizedPage.jsx        # 403 unauthorized page
├── hooks/
│   ├── useAuth.js                  # Authentication hook
│   ├── useIssues.js                # Issues management hook
│   ├── useLocalStorage.js          # Local storage hook
│   ├── useDebounce.js              # Debounce hook for search
│   ├── usePagination.js            # Pagination logic hook
│   ├── useFilters.js               # Filtering logic hook
│   ├── useGeolocation.js           # Geolocation hook
│   └── useToast.js                 # Toast notifications hook
├── context/
│   ├── AuthContext.jsx             # Authentication context
│   ├── ThemeContext.jsx            # Theme context
│   └── ToastContext.jsx            # Toast notifications context
├── utils/
│   ├── constants.js                # App constants and enums
│   ├── validators.js               # Form validation functions
│   ├── formatters.js               # Data formatting utilities
│   ├── helpers.js                  # General helper functions
│   ├── dateUtils.js                # Date manipulation utilities
│   └── locationUtils.js            # Location/map utilities
├── services/
│   ├── apiService.js               # Main API service (already exists)
│   ├── authService.js              # Authentication specific API calls
│   ├── issueService.js             # Issue specific API calls
│   ├── userService.js              # User profile specific API calls
│   ├── adminService.js             # Admin specific API calls
│   └── uploadService.js            # File upload service
├── styles/
│   ├── globals.css                 # Global styles and Tailwind imports
│   ├── components.css              # Component-specific styles
│   └── animations.css              # Custom animations
└── assets/
    ├── images/
    │   ├── logo.svg                # CivicFlow logo
    │   ├── hero-bg.jpg             # Hero section background
    │   └── placeholder-avatar.png  # Default avatar image
    └── icons/
        ├── categories/             # Category specific icons
        ├── status/                 # Status indicator icons
        └── ui/                     # General UI icons
```

## Key Design Principles

### **1. Professional & Clean**
- Minimal, uncluttered interface
- Consistent spacing and typography
- Clear visual hierarchy
- Professional business application feel

### **2. Responsive Design**
- Mobile-first approach
- Tailwind's responsive utilities
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly buttons and interactions

### **3. Accessibility**
- WCAG 2.1 compliant
- Proper color contrast ratios
- Keyboard navigation support
- Screen reader friendly

### **4. User Experience**
- Intuitive navigation
- Clear call-to-action buttons
- Loading states and feedback
- Error handling with helpful messages

## Component Design Standards

### **Buttons**
```jsx
// Primary Button
className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"

// Secondary Button  
className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-3 rounded-lg font-medium transition-colors"
```

### **Cards**
```jsx
className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
```

### **Forms**
```jsx
// Input Fields
className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"

// Labels
className="block text-sm font-medium text-slate-700 mb-2"
```

## Complete Pages to Implement

### **📄 Page 1: HomePage.jsx** - Landing Page
**Route**: `/`
**Features**:
- Hero section with CivicFlow branding and call-to-action
- Statistics showcase (total issues, resolved issues, active users)
- Featured recent issues carousel
- How it works section (3-step process)
- Community testimonials
- Footer with links and contact info
- Responsive design for all devices

### **📄 Page 2: LoginPage.jsx** - User Authentication
**Route**: `/login`
**Features**:
- Clean login form (username/email + password)
- "Remember me" checkbox
- "Forgot password" link
- Registration link
- Form validation with error messages
- Loading state during authentication
- Redirect to dashboard on success

### **📄 Page 3: RegisterPage.jsx** - User Registration  
**Route**: `/register`
**Features**:
- Multi-step registration form
- Step 1: Basic info (firstName, lastName, email, username)
- Step 2: Password creation with strength indicator
- Step 3: Optional profile details
- Email format validation
- Password confirmation
- Terms of service acceptance
- Account verification notice

### **📄 Page 4: DashboardPage.jsx** - User Dashboard
**Route**: `/dashboard`
**Features**:
- Personalized welcome message
- Statistics cards (My Issues: 12, Votes Cast: 28, Issues Resolved: 8)
- Quick action buttons (Report New Issue, View My Issues, Update Profile)
- Recent activity feed (recent votes, comments, issue updates)
- Community highlights (trending issues, top contributors)
- Weather widget for location-based recommendations
- Responsive grid layout

### **📄 Page 5: IssuesPage.jsx** - All Issues Listing
**Route**: `/issues`
**Features**:
- Advanced filtering sidebar (Category, Status, Priority, Location, Date Range)
- Search bar with real-time results
- Sort options (Newest, Most Voted, High Priority, Recently Updated)
- Issue cards with thumbnails, titles, descriptions, vote counts
- Pagination (20 issues per page)
- Map view toggle button
- Create new issue floating action button
- Filter by distance from user location

### **📄 Page 6: IssueDetailsPage.jsx** - Individual Issue View
**Route**: `/issues/:id`
**Features**:
- Complete issue details (title, description, images, location)
- Issue status timeline (reported → in progress → resolved)
- Voting system (upvote/downvote with count)
- Comments section with threaded replies
- Share issue functionality
- Report inappropriate content button
- Related issues suggestions
- Admin actions (if admin user)
- Edit/delete options (if issue owner)

### **📄 Page 7: CreateIssuePage.jsx** - Report New Issue
**Route**: `/issues/new`
**Features**:
- Multi-step issue creation form
- Step 1: Issue category selection with icons
- Step 2: Title and detailed description
- Step 3: Location picker (map + manual entry)
- Step 4: Photo upload (multiple images)
- Step 5: Priority level selection
- Form validation at each step
- Draft saving functionality
- Preview before submission

### **📄 Page 8: ProfilePage.jsx** - User Profile Management
**Route**: `/profile`
**Features**:
- Profile picture upload with crop functionality
- Personal information (name, email, phone with Indian validation)
- Address management with Google Maps integration
- Contact preferences (email notifications, SMS alerts)
- Privacy settings (profile visibility, data sharing)
- Language and timezone preferences
- Account security (change password, 2FA setup)
- Account deletion with confirmation process
- Export personal data option

### **📄 Page 9: AdminPage.jsx** - Admin Dashboard
**Route**: `/admin` (Admin only)
**Features**:
- Comprehensive statistics dashboard
- Real-time metrics (total users, issues, votes, growth rates)
- Charts and graphs (issue trends, user engagement, category breakdown)
- Recent activity monitoring
- System health indicators
- Quick action panels
- Export reports functionality
- User analytics overview

### **📄 Page 10: AdminUsersPage.jsx** - User Management
**Route**: `/admin/users` (Admin only)
**Features**:
- Searchable user table with pagination
- User details (name, email, join date, last active, role)
- Bulk actions (select multiple users)
- Role management (change USER ↔ ADMIN)
- Account status control (enable/disable accounts)
- User activity history
- Export user data
- Send notifications to users
- Advanced filtering (by role, status, join date)

### **📄 Page 11: AdminIssuesPage.jsx** - Issue Management
**Route**: `/admin/issues` (Admin only)
**Features**:
- Comprehensive issue management table
- Issue status updates (PENDING → IN_PROGRESS → RESOLVED → CLOSED)
- Bulk status updates
- Issue assignment to departments
- Priority level adjustments
- Issue categorization management
- Analytics per issue (views, votes, comments)
- Export issue reports
- Merge duplicate issues functionality

### **📄 Page 12: NotFoundPage.jsx** - 404 Error
**Route**: `*` (catch-all)
**Features**:
- Professional 404 design
- Navigation back to home
- Search suggestions
- Popular pages links

### **📄 Page 13: UnauthorizedPage.jsx** - 403 Error
**Route**: `/unauthorized`
**Features**:
- Access denied message
- Login prompt for unauthorized users
- Role upgrade request for insufficient permissions

**Continue to Part 2 for complete backend integration details...**
