import { delay, http, HttpResponse } from "msw";

const mockSearchData = [
  {
    id: 519182,
    title: "Despicable Me 4",
    vote_average: 7.5,
    release_date: "2024-06-20",
    poster_path: "/3w84hCFJATpiCO5g8hpdWVPBbmq.jpg",
  },
  {
    id: 20352,
    title: "Despicable Me",
    vote_average: 7.2,
    release_date: "2010-07-08",
    poster_path: "/9lOloREsAhBu0pEtU0BgeR1rHyo.jpg",
  },
];

export const handlers = [
  // http.post("/api/auth/callback/credentials", async () => {
  //   return HttpResponse.json({}, { status: 201 });
  // }),

  // I used this handler just to remove the warnings, This was actually mocked in layout.test.tsx
  http.get("/api/auth/session", async () => {
    return HttpResponse.json({}, { status: 201 });
  }),

  http.get(
    "https://api.themoviedb.org/3/search/movie?query=despic",
    async () => {
      await delay();
      return HttpResponse.json(
        {
          results: mockSearchData,
        },
        { status: 201 }
      );
    }
  ),
  // I used this handler just to remove the warnings,
  http.post("/api/addMovies", async () => {
    // await delay(400);
    return HttpResponse.json({}, { status: 201 });
  }),

  

  http.post("http://localhost:3030/order", async () => {
    await delay(400);
    return HttpResponse.json({ orderNumber: 12345 }, { status: 201 });
  }),
];
