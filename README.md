# Smarters Freight — Admin Dashboard (Vue 3)

Admin web dashboard for the Smarters Freight platform, per the SRS: monitors
users, trucks, drivers, cargo, matches, bookings, shipments, commissions and
reports.

## Stack
- Vue 3 (`<script setup>`) + Vite
- Vue Router 4
- Pinia (auth state)
- Axios (API client)

## Getting started
```bash
npm install
cp .env.example .env   # point VITE_API_BASE_URL at your Laravel API
npm run dev
```

## Connecting to the Laravel backend
All calls go through `src/services/api.js`. It expects a Laravel API
(Sanctum-style bearer token auth) exposing routes like:

```
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

GET  /api/admin/dashboard/summary

GET  /api/admin/users
PUT  /api/admin/users/{id}
POST /api/admin/users/{id}/suspend

GET  /api/admin/trucks
POST /api/admin/trucks/{id}/verify
POST /api/admin/trucks/{id}/reject

GET  /api/admin/drivers
GET  /api/admin/cargo
GET  /api/admin/matches
GET  /api/admin/bookings

GET  /api/admin/shipments
POST /api/admin/shipments/{id}/status

GET  /api/admin/commissions
PUT  /api/admin/settings/commission-rate

GET  /api/admin/reports/overview
```

Every view currently ships with small sample rows so the UI is inspectable
before the backend exists — swap them out as the real endpoints come online
(each `onMounted` already calls the endpoint and falls back to the sample
data on error).

## Structure
```
src/
  components/   Sidebar, Topbar, StatCard, DataTable, StatusBadge, MatchScore, RouteMark
  views/        Login, Dashboard, Users, Trucks, Drivers, Cargo, Matches,
                Bookings, Shipments, Commissions, Reports
  services/     api.js — axios instance + endpoint groups
  stores/       auth.js — Pinia auth store (token in localStorage)
  styles/       theme.css — design tokens (colors, type, spacing)
  router/       route table + auth guard
```

## Design direction
Dark "dispatch office" theme: asphalt-dark surfaces, route-amber for primary
actions and active states, signal-green for available/completed, warn-red for
rejected/cancelled. Identifiers (registration numbers, IDs, match scores) are
set in monospace so tables read like a waybill rather than a generic
admin template.

## Role-based access note
This dashboard is for the **Admin** role only, per the SRS permissions table.
Truck owners and cargo owners use the separate Flutter mobile app
(`../flutter-mobile-app`).
