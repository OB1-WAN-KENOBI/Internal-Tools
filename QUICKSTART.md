# Quick Start Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Start the Application
```bash
npm run dev:all
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 3. Login

Open http://localhost:5173 and use one of these accounts:

**Admin** (Full Access):
- Email: `admin@company.com`
- Password: `admin123`

**Manager** (Limited Access):
- Email: `manager@company.com`
- Password: `manager123`

**Viewer** (Read-Only):
- Email: `viewer@company.com`
- Password: `viewer123`

## 4. Run Tests
```bash
npm run test
```

## Available Features

### Admin Role
✅ Dashboard (Real-time metrics)
✅ Users Management (CRUD)
✅ Data Table (1000+ rows)
✅ Feature Flags
✅ Audit Log
✅ Settings

### Manager Role
✅ Dashboard
✅ Data Table
✅ Audit Log
✅ Settings
❌ Users Management
❌ Feature Flags

### Viewer Role
✅ Dashboard
✅ Settings
❌ All other features

## Troubleshooting

### Port Already in Use
If port 5173 or 3001 is already in use:
```bash
# Kill existing processes
pkill -f vite
pkill -f json-server
```

### API Not Responding
Ensure json-server is running:
```bash
npm run api
```

### Build Issues
Clean and reinstall:
```bash
rm -rf node_modules dist
npm install
npm run build
```

## Project Structure Highlights

```
src/
├── features/           # Feature modules
│   ├── dashboard/      # Real-time SSE dashboard
│   ├── users/          # User CRUD
│   ├── data-table/     # Advanced table (1000+ rows)
│   └── ...
├── shared/             # Reusable components & utils
└── app/                # App setup, routes, guards
```

## Key Technologies

- React 18 + TypeScript
- Vite
- TanStack Query & Table
- Zustand (State)
- Tailwind CSS + shadcn/ui
- Recharts
- Server-Sent Events (SSE)
- json-server (Mock API)
- Playwright (E2E Tests)

---

**Happy coding! 🚀**
