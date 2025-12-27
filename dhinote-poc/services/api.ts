// import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseQuery = fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
//     prepareHeaders: (headers) => {
//         const token = document.cookie
//             .split("; ")
//             .find((row) => row.startsWith("user_token="))
//             ?.split("=")[1];

//         if (token) {
//             headers.set("authorization", `Bearer ${token}`);
//         }

//         headers.set("Content-Type", "application/json");
//         return headers;
//     },
// });
