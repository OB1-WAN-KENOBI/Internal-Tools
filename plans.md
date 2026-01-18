Internal Tools + Real-Time Analytics Dashboard
Технологический стек
Core:

React 18 + TypeScript (strict mode)
Vite
React Router v6
TanStack Query v5
Zustand
Zod
UI & Styling:

Tailwind CSS
shadcn/ui (Radix UI primitives)
Recharts (графики)
TanStack Table v8
Real-time:

Server-Sent Events (SSE) для live метрик
Mock Backend:

json-server (отдельный процесс на порту 3001)
db.json с предзаполненными данными
Testing:

Playwright (e2e)
---

Архитектура проекта
src/
├── app/
│   ├── providers/        # QueryClientProvider, AuthProvider
│   ├── routes/           # Router configuration
│   ├── guards/           # ProtectedRoute, RoleGuard
│   └── layout/           # AppLayout, Sidebar, Topbar
├── features/
│   ├── auth/             # Login, Logout, useAuth
│   ├── dashboard/        # Real-time dashboard
│   ├── users/            # User management (CRUD)
│   ├── data-table/       # Advanced table engine
│   ├── feature-flags/    # Feature toggles
│   └── audit-log/        # Activity log
├── shared/
│   ├── ui/               # Button, Card, Table, Modal, etc.
│   ├── hooks/            # useDebounce, useLocalStorage
│   ├── utils/            # formatters, validators
│   ├── types/            # User, Role, AuditEvent
│   └── api/              # API client, endpoints
├── styles/
│   └── globals.css
└── main.tsx
---

Этапы реализации
1. Инициализация проекта
Создать Vite проект с React + TypeScript
Установить зависимости:
react-router-dom
@tanstack/react-query
@tanstack/react-table
zustand
zod
tailwindcss
recharts
json-server
@playwright/test
Настроить Tailwind CSS
Добавить shadcn/ui (базовые компоненты: Button, Card, Input, Table, Modal, Select)
Настроить TypeScript (strict: true)
2. Mock Backend (json-server)
Создать db.json с данными:

users: [{id, name, email, role, status, createdAt}]
auditLogs: [{id, userId, action, timestamp, details}]
featureFlags: [{id, name, description, enabled}]
Добавить скрипт в package.json:

"api": "json-server --watch db.json --port 3001"
3. Shared Layer
Types:

User, Role (admin, manager, viewer)
AuditEvent, FeatureFlag, DashboardMetrics
API Client:

src/shared/api/client.ts - fetch wrapper с error handling
src/shared/api/endpoints.ts - типизированные endpoints
UI Components (shadcn/ui):

Button, Input, Card, Modal, Table, Skeleton, Badge, Select
Hooks:

useLocalStorage - для хранения токена
useDebounce - для search/filter
4. Auth Feature
Файлы:

features/auth/store.ts - Zustand store (user, token, login, logout)
features/auth/LoginPage.tsx - форма логина (email + password)
features/auth/api.ts - mock login API
Логика:

Проверка credentials против db.json
Сохранение токена в localStorage
Redirect после логина на /dashboard
Guards:

app/guards/ProtectedRoute.tsx - проверка аутентификации
app/guards/RoleGuard.tsx - проверка роли (admin, manager, viewer)
5. Layout & Navigation
AppLayout:

Sidebar (слева, collapsible)
Topbar (user info + logout button)
Content area
Sidebar menu:

Dashboard (все роли)
Users (только Admin)
Data Table (Admin + Manager)
Feature Flags (Admin)
Audit Log (Admin + Manager)
Settings (все роли)
Роутинг:

/ → redirect to /dashboard
/login
/dashboard (protected)
/users (admin only)
/data-table (admin, manager)
/feature-flags (admin)
/audit-log (admin, manager)
/settings
/403 (Access Denied)
6. Real-Time Dashboard (КЛЮЧЕВОЙ МОДУЛЬ)
Метрики:

Active Users (число)
Events per Minute (число + trend)
Error Rate (проценты)
Revenue (mock $)
Графики:

Line chart (events over time) - Recharts LineChart
Bar chart (errors by type) - Recharts BarChart
Real-time обновления:

SSE endpoint: http://localhost:3001/metrics/stream
Создать express middleware для json-server, который генерирует SSE события каждые 2-3 секунды
Hook useRealtimeMetrics() - подключается к SSE, обновляет state
UI States:

Loading: Skeleton loaders
Error: Error message + retry button
Empty: "No data available"
Компоненты:

MetricCard.tsx - карточка с числом + иконкой + trend
MetricsChart.tsx - обертка для Recharts
DateRangeSelector.tsx - выбор периода (не влияет на real-time, но фильтрует историю)
7. Users Management (Admin Panel)
Таблица:

TanStack Table v8
Колонки: id, name, email, role, status, actions
Функционал:

Create User (modal с формой + Zod validation)
Edit User (inline editing или modal)
Delete User (confirm dialog)
Change Role (dropdown в строке)
Search по name/email (debounced)
Sorting (по всем колонкам)
Pagination (10/20/50 per page)
API:

GET /users
POST /users
PATCH /users/:id
DELETE /users/:id
State:

TanStack Query для кэширования и mutations
8. Data Table Engine
Задача:

Демонстрация виртуализации больших таблиц
Mock dataset: 1000+ строк
Функции:

Column visibility toggle (чекбоксы в меню)
Inline editing (double-click на ячейку)
Saved views (сохранение конфигурации колонок в localStorage)
Export to CSV (функция exportToCSV)
TanStack Table features:

useReactTable + getCoreRowModel
getSortedRowModel
getFilteredRowModel
getPaginationRowModel
Column resizing
9. Feature Flags
UI:

Список фич с Toggle switches
Описание каждой фичи
Live update (при изменении - мгновенно влияет на UI)
Примеры флагов:

enableAnalytics - показывать/скрывать dashboard
enableUserEdit - разрешить/запретить редактирование пользователей
enableExport - показывать кнопку Export CSV
Store:

Zustand store для feature flags
Hook useFeatureFlag(flagName)
10. Audit Log
Данные:

Все действия пользователей (create, update, delete)
Timestamp, user, action, details
UI:

Таблица (read-only)
Сортировка по дате (desc по умолчанию)
Фильтр по пользователю (dropdown)
Фильтр по типу действия (select)
Mock data:

Генерировать записи при каждом действии (через interceptor или mock API)
11. Error Handling
Централизованный обработчик:

src/shared/api/errorHandler.ts
Обработка 401, 403, 404, 500
UI States:

Error Boundary для глобальных ошибок
Toast notifications для API ошибок (можно использовать react-hot-toast)
Компоненты:

ErrorState.tsx - показывается при ошибке загрузки
EmptyState.tsx - нет данных
AccessDenied.tsx - страница 403
12. Settings Page
Разделы:

Profile (имя, email) - read-only
Preferences (theme - light/dark, timezone)
Notifications (email alerts on/off)
13. Тестирование (Playwright)
E2E тесты:

tests/auth.spec.ts:

Логин как Admin
Проверка redirect на /dashboard
Logout
tests/role-access.spec.ts:

Admin видит Users
Manager НЕ видит Users
Viewer видит только Dashboard
tests/dashboard.spec.ts:

Загрузка метрик
Проверка real-time обновлений (ждем изменения значения)
tests/users.spec.ts:

Create user
Edit user
Delete user
14. Design System
Цвета (Tailwind config):

colors: {
  primary: colors.blue,
  success: colors.green,
  error: colors.red,
  background: colors.gray[50],  // light mode
  backgroundDark: colors.gray[900],  // dark mode
}
Компоненты:

Округленные углы: 8-12px (rounded-lg, rounded-xl)
Тени: shadow-sm, shadow-md
Transitions: transition-colors duration-200
Typography:

Inter font (через Google Fonts)
15. Документация
README.md:

Описание проекта
Стек технологий
Ключевые фичи
User roles таблица
Архитектура (FSD-style)
Установка и запуск
Демо credentials
Скриншоты (можно использовать placeholders)
package.json scripts:

{
  "dev": "vite",
  "api": "json-server --watch db.json --port 3001 --middlewares ./mock-api/sse-middleware.js",
  "dev:all": "concurrently \"npm run dev\" \"npm run api\"",
  "test": "playwright test",
  "build": "tsc && vite build"
}
---

Ключевые технические детали
Real-time Implementation (SSE)
Создать mock-api/sse-middleware.js:

module.exports = (req, res, next) => {
  if (req.path === "/metrics/stream") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    const interval = setInterval(() => {
      const data = {
        activeUsers: Math.floor(Math.random() * 1000),
        eventsPerMinute: Math.floor(Math.random() * 500),
        errorRate: Math.random() * 5,
        revenue: Math.floor(Math.random() * 10000),
      };
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    }, 3000);

    req.on("close", () => clearInterval(interval));
  } else {
    next();
  }
};
Zustand Stores
authStore:

user: User | null
token: string | null
login(email, password)
logout()
featureFlagsStore:

flags: Record<string, boolean>
toggleFlag(name)
isEnabled(name)
React Query Setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});
---

Проверка требований
✅ React 18+ TypeScript
✅ Vite
✅ React Router (роуты + guards)
✅ TanStack Query (data fetching)
✅ Zustand (auth + feature flags)
✅ Tailwind CSS + shadcn/ui
✅ TanStack Table (users, data-table)
✅ Zod (валидация форм)
✅ SSE (real-time dashboard)
✅ json-server (mock backend)
✅ Роли: Admin, Manager, Viewer
✅ Protected routes + role-based access
✅ Playwright e2e тесты
✅ Структура проекта по FSD
✅ Modern SaaS design
✅ README с полным описанием
---

Демо credentials
Admin:
email: admin@company.com
password: admin123

Manager:
email: manager@company.com
password: manager123

Viewer:
email: viewer@company.com
password: viewer123
Данные прописываются в db.json при инициализации.

