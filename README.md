# Internal Tools + Real-Time Analytics Dashboard

A modern, production-ready internal tools platform built with React 18, TypeScript, and real-time analytics capabilities. This project showcases advanced frontend architecture patterns, role-based access control, and enterprise-level features.

## 🎯 Project Overview

This is a comprehensive internal corporate web platform designed for:
- User management and role administration
- Real-time analytics dashboard with live metrics
- Advanced data table operations
- Feature flag management
- Audit logging
- Role-based access control

## 🛠 Technology Stack

### Core
- **React 18** - Modern React with hooks
- **TypeScript** - Strict type safety
- **Vite** - Fast build tool
- **React Router v6** - Client-side routing
- **TanStack Query v5** - Data fetching and caching
- **Zustand** - Global state management
- **Zod** - Schema validation

### UI & Styling
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - High-quality React components (Radix UI primitives)
- **Recharts** - Data visualization
- **TanStack Table v8** - Advanced table features
- **Lucide React** - Icon library

### Real-time
- **Server-Sent Events (SSE)** - Live metrics streaming

### Mock Backend
- **json-server** - REST API mock
- Custom SSE middleware for real-time data

### Testing
- **Playwright** - End-to-end testing

## 📋 Key Features

### 1. Authentication & Authorization
- Email/password authentication (mock)
- JWT-style token storage
- Protected routes
- Role-based access control (RBAC)

### 2. Role Management
Three user roles with different permissions:

| Feature | Admin | Manager | Viewer |
|---------|-------|---------|--------|
| Dashboard | ✅ | ✅ | ✅ |
| Users Management | ✅ | ❌ | ❌ |
| Data Table | ✅ | ✅ | ❌ |
| Feature Flags | ✅ | ❌ | ❌ |
| Audit Log | ✅ | ✅ | ❌ |
| Settings | ✅ | ✅ | ✅ |

### 3. Real-Time Dashboard
- Live metrics updating every 3 seconds
- Active Users count
- Events per Minute
- Error Rate percentage
- Revenue tracking
- Interactive charts (Line & Bar)
- Historical data visualization

### 4. Users Management
- Full CRUD operations
- Search functionality (debounced)
- Column sorting
- Pagination (10/20/50 rows per page)
- Role assignment
- Status management (active/disabled)
- Modal-based forms with validation

### 5. Advanced Data Table
- 1000+ rows with optimized rendering
- Column visibility toggle
- Persistent column configuration (localStorage)
- Multi-column sorting
- Global search/filter
- CSV export functionality
- Configurable page sizes
- Sticky headers

### 6. Feature Flags
- Enable/disable application features
- Live UI updates on toggle
- Persistent flag state
- Available flags:
  - `enableAnalytics` - Dashboard visibility
  - `enableUserEdit` - User editing permissions
  - `enableExport` - CSV export functionality
  - `enableNotifications` - Push notifications

### 7. Audit Log
- Complete activity tracking
- Filter by user
- Filter by action type
- Timestamp sorting
- Action badges (create/update/delete)
- Read-only table

### 8. Settings Page
- User profile information
- Theme preferences (Light/Dark)
- Timezone selection
- Email notification toggles

## 🏗 Architecture

```
src/
├── app/
│   ├── guards/           # Route protection (ProtectedRoute, RoleGuard)
│   ├── layout/           # Main layout components (AppLayout, Sidebar, Topbar)
│   └── routes/           # Route configuration
├── features/
│   ├── auth/             # Authentication (login, logout, store)
│   ├── dashboard/        # Real-time dashboard with SSE
│   ├── users/            # User management CRUD
│   ├── data-table/       # Advanced table engine
│   ├── feature-flags/    # Feature toggle system
│   ├── audit-log/        # Activity logging
│   └── settings/         # User preferences
├── shared/
│   ├── ui/               # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   └── api/              # API client and endpoints
└── styles/               # Global styles
```

### Architecture Principles
- **Feature-Sliced Design (FSD)** - Modular architecture
- **Separation of Concerns** - Clear boundaries between layers
- **Type Safety** - Strict TypeScript throughout
- **Composition over Inheritance** - Reusable components
- **Smart/Dumb Components** - Container/Presentational pattern

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd "Internal Tools"
```

2. Install dependencies
```bash
npm install
```

3. Start development servers
```bash
npm run dev:all
```

This command starts both:
- Frontend (Vite) on `http://localhost:5173`
- Mock API (json-server) on `http://localhost:3001`

### Available Scripts

```bash
npm run dev          # Start frontend only
npm run api          # Start mock API only
npm run dev:all      # Start both frontend and API
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run Playwright tests
npm run lint         # Run ESLint
```

## 🔑 Demo Credentials

### Admin Account
```
Email: admin@company.com
Password: admin123
```
Full access to all features

### Manager Account
```
Email: manager@company.com
Password: manager123
```
Access to Dashboard, Data Table, Audit Log, Settings

### Viewer Account
```
Email: viewer@company.com
Password: viewer123
```
Access to Dashboard and Settings only (read-only)

## 🧪 Testing

### Run E2E Tests
```bash
npm run test
```

### Test Coverage
- Authentication flow (login/logout)
- Role-based access control
- Dashboard real-time updates
- User CRUD operations
- Protected route access

## 📊 Mock Data

The application includes:
- 5 pre-configured users
- 3 audit log entries
- 4 feature flags
- 1000 mock data table rows

All data is stored in `db.json` and persists during the session.

## 🎨 Design System

### Colors
- **Primary**: Blue (hsl(221.2 83.2% 53.3%))
- **Success**: Green
- **Error**: Red
- **Background**: Light gray (light) / Dark gray (dark)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 400, 500, 600, 700

### Components
- **Border Radius**: 8-12px (rounded-lg, rounded-xl)
- **Shadows**: shadow-sm, shadow-md
- **Transitions**: 200ms ease-in-out

## 🔒 Security Features

- Token-based authentication
- Protected routes with redirects
- Role-based access control
- 403 Access Denied page
- Input validation with Zod
- XSS protection (React built-in)

## 📱 Responsive Design

- Mobile-first approach
- Collapsible sidebar on mobile
- Responsive tables
- Touch-friendly interactions
- Breakpoints: sm, md, lg, xl

## 🚧 Error Handling

- Global Error Boundary
- API error states
- Loading skeletons
- Empty states
- Toast notifications
- 403 Access Denied page

## 🔄 Real-Time Features

### Server-Sent Events (SSE)
- Endpoint: `http://localhost:3001/metrics/stream`
- Update interval: 3 seconds
- Automatic reconnection
- Historical data tracking (30 points)

## 🎯 Future Enhancements

Potential features for expansion:
- WebSocket support for bi-directional communication
- Advanced charting (candlestick, heatmaps)
- Data export in multiple formats (Excel, PDF)
- Advanced filtering and saved views
- User profile avatars
- Dark mode full implementation
- Internationalization (i18n)
- Advanced audit log analytics

## 📄 License

This project is for demonstration purposes.

## 🤝 Contributing

This is a showcase project. Feel free to fork and modify for your own use.

---

**Built with ❤️ using modern React ecosystem (2026)**
