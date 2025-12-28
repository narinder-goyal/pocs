dhinote-poc/
├─ app/
│  ├─ (auth)/
│  │  ├─ login/
│  │  │  └─ page.tsx
│  │  └─ signup/
│  │     └─ page.tsx
│  │
│  ├─ api/
│  │  └─ auth/
│  │     └─ [...nextauth]/
│  │        └─ route.ts
│  │
│  ├─ dashboard/
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  │
│  ├─ layout.tsx
│  └─ page.tsx
│
├─ components/
│  ├─ ui/
│  │  ├─ input.tsx
│  │  └─ button.tsx
│  │
│  ├─ forms/
│  │  ├─ LoginForm.tsx
│  │  └─ SignUpForm.tsx
│  │
│  └─ auth/
│     └─ SignOutButton.tsx
│
├─ lib/
│  ├─ redux/
│  │  ├─ auth/
│  │  │  ├─ authApi.ts
│  │  │  └─ authSlice.ts
│  │  └─ store.ts
│  │
│  └─ StoreProvider.tsx
│
├─ services/
│  └─ auth.service.ts
│
├─ schemas/
│  ├─ login.schema.ts
│  └─ signup.schema.ts
│
├─ types/
│  └─ user.ts
│
├─ styles/
│  └─ globals.css
│
├─ proxy.ts
├─ middleware.d.ts
├─ .env
├─ next.config.js
└─ tsconfig.json
--------------------------



My mentor give me project.
first now create project in react nextjs 16 (login , register , logout, dashboard), use next auth, store, rtk Query, api, api token to login, yap for validation, middleware, .env, toast for server Error msg like(invalid email or password, login Failed, Susscess Login) is there any toast in Nextjs use that. 
*after this done we will continue our dashboard page please do as professional way. 
 
1.-> this is my folder structure, add or remove extra folder & file's as per code need. 

dhinote-poc/
├─ app/
│  ├─ (auth)/
│  │  ├─ login/
│  │  │  └─ page.tsx
│  │  └─ signup/
│  │     └─ page.tsx
│  │
│  ├─ api/
│  │  └─ auth/
│  │     └─ [...nextauth]/
│  │        └─ route.ts
│  │
│  ├─ dashboard/
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  │
│  ├─ layout.tsx
│  └─ page.tsx
│
├─ components/
│  ├─ ui/
│  │  ├─ input.tsx
│  │  └─ button.tsx
│  │
│  ├─ forms/
│  │  ├─ LoginForm.tsx
│  │  └─ SignUpForm.tsx
│  │
│  └─ auth/
│     └─ SignOutButton.tsx
│
├─ lib/
│  ├─ redux/
│  │  ├─ auth/
│  │  │  ├─ authApi.ts
│  │  │  └─ authSlice.ts
│  │  └─ store.ts
│  │
│  └─ StoreProvider.tsx
│
├─ services/
│  └─ auth.service.ts
│
├─ schemas/
│  ├─ login.schema.ts
│  └─ signup.schema.ts
│
├─ types/
│  └─ user.ts
│
├─ styles/
│  └─ globals.css
│
├─ proxy.ts
├─ middleware.d.ts
├─ .env
├─ next.config.js
└─ tsconfig.json

2.-> for api https://gop-dev-api-dhinotem.agilecollab.com/api-docs/#/

-> for Register:- 
/api/v1/auth/register
{
  "first_name": "string",
  "last_name": "string",
  "email": "user@example.com",
  "password": "string",
  "phone": "string",
  "timezone": "string"
}

-> for login:-
/api/v1/auth/login
{
  "email": "user@example.com",
  "password": "string"
}

-> for logout
/api/v1/auth/logout
{
  "device_token": "string",
  "logout_all": true
}

3.-> Ganrate token and use token in my code when login or register
/api/v1/auth/public-api/token 
{
 "client_id": "fhA9cTe71kQ2bMw8rYs", 
"client_secret": "kA7r2mQw91BdE4sT8ntX6cV3yuPpL0rGhJ" 
}

4.-> and the story is attach screenshort use that snares , For Login use image_login.jpg and for SignUp use image_signup.jpg



