dhinote-poc/
 ├─ app/
 │   ├─ (auth)/
 │   │   ├─ login/
 │   │   │   └─ page.tsx
 │   │   └─ signup/
 │   │       └─ page.tsx
 │   │
 │   ├─ api/
 │   │   └─ upload/
 │   │       └─ route.ts
 │   │
 │   ├─ dashboard/
 │   │   ├─ layout.tsx
 │   │   └─ page.tsx
 │   │
 │   ├─ layout.tsx
 │   └─ page.tsx
 │
 ├─ components/
 │   ├─ ui/
 │   │   ├─ button.tsx
 │   │   └─ input.tsx
 │   │
 │   ├─ layout/
 │   │   ├─ Navbar.tsx
 │   │   └─ Footer.tsx
 │   │
 │   ├─ auth/
 │   │   └─ SignOutButton.tsx
 │   │
 │   └─ forms/
 │       ├─ LoginForm.tsx
 │       └─ SignUpForm.tsx
 │
 ├─ config/
 │
 ├── firebase/
 │   └── config.ts
 │
 ├─ lib/
 │   ├─ redux/
 │   │   ├─ auth/
 │   │   │   ├─ authSlice.ts
 │   │   │   └─ authApi.ts 
 │   │   └─ index.ts
 │   │
 │   ├─ StoreProvider.tsx
 │   └─ store.ts
 │
 ├─ hooks/
 │   └─ useAuth.ts
 │
 ├─ services/
 │   └─ auth.service.ts
 │
 ├─ store/
 │   └─ user.store.ts
 │
 ├─ schemas/
 │   ├─ login.schema.ts ---------------> YUP validation for login
 │   └─ signup.schema.ts ---------------> YUP validation for sign up
 │
 ├─ utils/
 │   ├─ date.ts
 │   ├─ validators.ts
 │   └─ constants.ts
 │
 ├─ types/
 │   └─ user.ts
 │
 ├─ styles/
 │   └─ globals.css
 │
 ├─ middleware.ts
 ├─ .env
