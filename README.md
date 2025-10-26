# Ticket Manager - React Implementation

A modern, full-featured ticket management web application built with React, Vite, and React Router. This is the React version of the multi-framework ticket management system.

## 🚀 Features

- **Landing Page**: Attractive hero section with wavy SVG background and decorative elements
- **Authentication System**: Secure login/signup with form validation and session management
- **Protected Routes**: Dashboard and ticket pages accessible only to authenticated users
- **Dashboard**: Real-time statistics showing total, open, in-progress, and closed tickets
- **Full CRUD Operations**: Create, read, update, and delete tickets with validation
- **Toast Notifications**: Real-time feedback for all user actions
- **Responsive Design**: Mobile-first approach with tablet and desktop optimizations
- **Accessibility**: WCAG compliant with semantic HTML, ARIA labels, and keyboard navigation

## 🛠️ Technologies Used

- **React 18.2** - UI library
- **React Router DOM 6.20** - Client-side routing
- **Vite 5.0** - Build tool and dev server
- **LocalStorage** - Data persistence and session management
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🔧 Setup Instructions

1. **Navigate to the project directory:**

   ```bash
   cd "c:\Users\Al-ameen\Desktop\web app"
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 🎮 Usage

### Demo Credentials

- **Email**: demo@ticket.com
- **Password**: demo123

Or create a new account using the signup page.

### Creating a Ticket

1. Login to your account
2. Navigate to the "Tickets" page
3. Click "Create New Ticket"
4. Fill in the required fields:
   - **Title** (required, min 3 characters)
   - **Status** (required: open, in_progress, or closed)
   - **Description** (optional, max 500 characters)
   - **Priority** (optional: low, medium, high)
5. Click "Create Ticket"

### Editing a Ticket

1. Go to the Tickets page
2. Click "Edit" on any ticket card
3. Modify the fields
4. Click "Update Ticket"

### Deleting a Ticket

1. Click "Delete" on any ticket card
2. Confirm the deletion in the modal

## 📁 Project Structure

```
web app/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Footer.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/         # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── TicketContext.jsx
│   │   └── ToastContext.jsx
│   ├── pages/           # Page components
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   └── TicketManagement.jsx
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # App entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## 🎨 Design Features

### Layout Specifications

- **Max Width**: 1440px centered container on all pages
- **Hero Section**: Gradient background with wavy SVG bottom edge
- **Decorative Elements**:
  - Two circular decorative shapes in hero section
  - Card-style boxes with shadows and rounded corners
  - Responsive grid layouts

### Color Scheme

- **Primary**: Indigo (#4f46e5)
- **Secondary**: Purple (#7c3aed)
- **Status Colors**:
  - Open: Green (#10b981)
  - In Progress: Amber (#f59e0b)
  - Closed: Gray (#6b7280)

### Responsive Breakpoints

- Mobile: < 768px (stacked layout)
- Tablet: 768px - 1024px (2-column grid)
- Desktop: > 1024px (3-column grid)

## ✅ Validation Rules

### Authentication

- Email must be valid format
- Password minimum 6 characters
- Name minimum 2 characters (signup)
- Passwords must match (signup)

### Tickets

- **Title**: Required, minimum 3 characters
- **Status**: Required, must be one of: `open`, `in_progress`, `closed`
- **Description**: Optional, maximum 500 characters
- **Priority**: Optional, one of: `low`, `medium`, `high`

## 🔒 Security Features

- Session tokens stored in localStorage (`ticketapp_session`)
- Protected routes with automatic redirect to login
- Session validation on page load
- Secure logout with session cleanup

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators on interactive elements
- Color contrast compliance (WCAG AA)
- Screen reader friendly error messages

## 🐛 Known Issues

- LocalStorage is used for demo purposes; production should use a backend API
- No password encryption (use bcrypt in production)
- Session tokens are simple strings (use JWT in production)

## 📦 Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

To preview the production build:

```bash
npm run preview
```

## 🔄 Switching to Other Framework Versions

This is the React implementation. The same application is also available in:

- **Vue.js** - Located in `/vue-app` directory
- **Twig (PHP)** - Located in `/twig-app` directory

Each implementation shares the same design system, features, and validation rules but uses framework-specific patterns and best practices.

## 📝 Notes

- All data is stored in browser localStorage
- Demo user is auto-created on first login attempt
- Tickets persist across browser sessions
- Use browser DevTools to inspect localStorage data

## 🤝 Contributing

This is a demonstration project for the Frontend Stage 2 task. To modify:

1. Edit source files in `src/`
2. Styles are in `src/index.css`
3. Components follow React hooks and context patterns
4. Add new pages in `src/pages/` and update routes in `App.jsx`

## 📄 License

This project is part of a coding challenge and is for educational purposes.

---

**Built with ❤️ using React and Vite**
