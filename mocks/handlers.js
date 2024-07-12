import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:3000/login", () => {
    return HttpResponse.json([
      { name: "Vanilla", imagePath: "/images/vanilla.png" },
      { name: "Chocolate", imagePath: "/images/chocolate.png" },
    ]);
  }),

  // I used this handler just to remove the warnings, This was actually mocked in layout.test.tsx
  http.get("/api/auth/session", async () => {
    await delay(500);
    return HttpResponse.json({}, { status: 201 });
  }),

  http.post("http://localhost:3030/order", async () => {
    await delay(400);
    return HttpResponse.json({ orderNumber: 12345 }, { status: 201 });
  }),
];
