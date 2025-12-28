import { API_BASE_URL } from "@/utils/constants";

export async function generatePublicToken() {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/public-api/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }),
  });

  if (!res.ok) throw new Error("Public token failed");
  return res.json();
}


export async function registerUser(payload: any) {
  const token = await generatePublicToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Registration failed");
  }

  return data;
}
