# Learning System - Web-based Learning Management System

## Project Overview
A simplified web-based learning system developed for CT050-3-2-WAPP (Web Applications) assignment. This system demonstrates the implementation of HTML5, CSS, client/server-side scripting, and database integration concepts.

## Features

### Visitor Module
- Browse learning resources without registration
- View resource categories and descriptions
- Access to public learning materials

### Registered Member Module
- User registration and login system
- Personal dashboard with bookmarks and notes
- Goal setting and tracking
- Resource bookmarking functionality

### Administrator Module
- User management (CRUD operations)
- Resource management (CRUD operations)
- System statistics and monitoring
- Admin-only access controls

## Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic markup and modern elements
- **CSS3**: External stylesheets, internal styles, responsive design
- **JavaScript**: Client-side validation, dynamic content, localStorage
- **Responsive Design**: Mobile-friendly interface

### Backend Technologies (Prepared)
- **PHP**: Server-side scripting for authentication and data processing
- **MySQL**: Database schema for users and resources
- **Security**: Password hashing, SQL injection prevention

### Key Features
- Form validation (client-side and server-side)
- CRUD operations for users and resources
- Session management and authentication
- Data persistence using localStorage
- Responsive design for all devices

## File Structure
```
learning_system/
├── index.html              # Homepage
├── login.html              # User login page
├── register.html           # User registration page
├── resources.html          # Learning resources page
├── dashboard.html          # User dashboard
├── admin.html              # Administrator panel
├── quick_test.html         # System testing page
├── css/
│   └── style.css           # External CSS styles
├── js/
│   ├── main.js             # Main JavaScript functions
│   ├── validation.js       # Form validation
│   └── admin.js            # Admin-specific functions
├── php/
│   ├── config.php          # Database configuration
│   ├── auth.php            # Authentication logic
│   ├── register.php        # Registration handling
│   ├── logout.php          # Logout functionality
│   ├── user_management.php # User CRUD operations
│   └── resource_management.php # Resource CRUD operations
├── database/
│   └── schema.sql          # Database schema
└── README.md               # This file
```

## Setup Instructions

### Option 1: Local Development (Recommended)
1. Install XAMPP or WAMP
2. Copy project folder to `htdocs` directory
3. Start Apache and MySQL services
4. Access via `http://localhost/learning_system/`

### Option 2: Direct File Access
1. Open `index.html` directly in web browser
2. Note: Some features may be limited without server environment

## Authentication System

### Security Features
- **No Hardcoded Credentials**: All authentication is handled through secure database storage
- **Password Hashing**: Passwords are securely hashed using PHP's password_hash() function
- **SQL Injection Prevention**: All database queries use prepared statements
- **Input Validation**: Both client-side and server-side validation
- **Session Management**: Secure session handling with proper security headers

### Demo Accounts (Firebase/Database Authentication)
- **Admin**: admin@example.com / admin123
- **User**: user@example.com / user123
- **Access**: These accounts are created through the secure authentication system

### New User Registration
- Create new account via registration page
- All new users have member-level access
- Passwords are securely hashed and stored in the database

## System Requirements

### Minimum Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Local storage support

### For Full Functionality
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache web server

## Features Demonstration

### User Registration & Login
- Form validation with real-time feedback
- Password strength checking
- Email format validation
- Username availability checking

### Resource Management
- Browse learning resources by category
- Search and filter functionality
- Bookmark resources for later access
- Responsive grid layout

### Personal Dashboard
- View bookmarked resources
- Create and manage personal notes
- Set and track learning goals
- Quick statistics overview

### Admin Panel
- User management (view, edit, delete)
- Resource management (CRUD operations)
- System statistics and monitoring
- Bulk operations support

## Technical Highlights

### HTML5 Features
- Semantic elements (header, nav, main, section, article)
- Form validation attributes
- Accessibility features
- Modern markup structure

### CSS3 Features
- Flexbox and Grid layouts
- CSS animations and transitions
- Responsive design with media queries
- Custom properties (CSS variables)

### JavaScript Features
- ES6+ syntax and features
- DOM manipulation and event handling
- Local storage for data persistence
- Form validation and user feedback
- Dynamic content generation

### Security Features
- **No Hardcoded Credentials**: All authentication through secure database storage
- **Password Hashing**: Secure password hashing using PHP's password_hash()
- **SQL Injection Prevention**: All database queries use prepared statements
- **Input Sanitization**: Comprehensive input validation and sanitization
- **Session Management**: Secure session handling with proper security headers
- **CORS Protection**: Proper CORS headers for API security

## Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Assignment Compliance

This project fulfills all requirements for CT050-3-2-WAPP:

✅ **Website Structure**: 6+ interlinked webpages
✅ **HTML5 Elements**: Proper and varied use of semantic elements
✅ **CSS Styling**: External CSS + internal styles
✅ **Navigation System**: Clear and usable navigation
✅ **Database Integration**: CRUD operations with two tables (Users, Resources)
✅ **Form Validation**: Client-side and server-side validation
✅ **User Roles**: Visitor, Member, Administrator modules
✅ **Responsive Design**: Mobile-friendly interface

## Future Enhancements
- Real-time notifications
- Advanced search functionality
- Progress tracking and analytics
- File upload capabilities
- Email notifications
- Social learning features

## Contact
For questions or issues, please refer to the assignment documentation or contact the development team.

---
**Assignment**: CT050-3-2-WAPP - Web Applications  
**Level**: 2  
**Intake**: 2025



