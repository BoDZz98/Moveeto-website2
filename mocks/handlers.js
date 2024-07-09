import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:3000/login", () => {
    return HttpResponse.json([
      { name: "Vanilla", imagePath: "/images/vanilla.png" },
      { name: "Chocolate", imagePath: "/images/chocolate.png" },
    ]);
  }),

  // Doesn't work
  http.post("/api/auth/session", async () => {
    await delay(500);
    return HttpResponse.json(
      {
        data: {},
        status: "unauthenticated",
        update: () => {},
      },
      { status: 201 }
    );
  }),

  http.post("http://localhost:3030/order", async () => {
    await delay(400);
    return HttpResponse.json({ orderNumber: 12345 }, { status: 201 });
  }),
];
