import { delay, http, HttpResponse } from "msw";

export const handlers = [
  // http.post("/api/auth/callback/credentials", async () => {
  //   return HttpResponse.json({}, { status: 201 });
  // }),

  // I used this handler just to remove the warnings, This was actually mocked in layout.test.tsx
  http.get("/api/auth/session", async () => {
    return HttpResponse.json({}, { status: 201 });
  }),
  // For the login testing
  http.get("/api/auth/providers", async () => {
    await delay(500); // We wrote this delay bec we return data, and we want the test case to wait for this returned data
    return HttpResponse.json({
      error: null,
      ok: true,
      status: 200,
    });
  }),

  http.post("http://localhost:3030/order", async () => {
    await delay(400);
    return HttpResponse.json({ orderNumber: 12345 }, { status: 201 });
  }),
];
