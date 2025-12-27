// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// let cachedToken: string | null = null;

// export async function getPublicToken() {
//     if (cachedToken) return cachedToken;

//     const res = await fetch(
//         `${BASE_URL}/api/v1/auth/public-api/token`,
//         {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
//                 client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
//             }),
//         }
//     );

//     const data = await res.json();
//     cachedToken = data.access_token;
//     return cachedToken;
// }
