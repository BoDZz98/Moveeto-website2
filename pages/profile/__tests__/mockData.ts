export const mockFavMovies = [
  {
    id: "929590",
    title: "Civil War",
    release_date: "2024-04-10",
    backdrop_path: "/z121dSTR7PY9KxKuvwiIFSYW8cf.jpg",
    genres: ["War", "Action", "Drama"],
    vote_count: 1260,
    _id: "666194ba5b5f88fd0348a1dd",
  },
  {
    id: "653346",
    title: "Kingdom of the Planet of the Apes",
    release_date: "2024-05-08",
    backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
    genres: ["Science Fiction", "Adventure", "Action"],
    vote_count: 794,
    _id: "666189f25b5f88fd0348a108",
  },
  {
    id: "872585",
    title: "Oppenheimer",
    release_date: "2023-07-19",
    backdrop_path: "/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg",
    genres: ["Drama", "History"],
    vote_count: 8117,
    _id: "6655d36156987b903c315f41",
  },
];
export const mockWishlistMovies = [
  {
    id: "872585",
    title: "Oppenheimer",
    release_date: "2023-07-19",
    backdrop_path: "/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg",
    genres: ["Drama", "History"],
    vote_count: 8117,
    _id: "6655d36156987b903c315f41",
  },
  {
    id: "614933",
    title: "Atlas",
    release_date: "2024-05-23",
    backdrop_path: "/3TNSoa0UHGEzEz5ndXGjJVKo8RJ.jpg",
    genres: ["Science Fiction", "Action"],
    vote_count: 571,
    _id: "666194d25b5f88fd0348a244",
  },
];

export const mockReviews = [
  {
    _id: "66ab90ca6bbc879194a71316",
    username: "bodzz",
    movieId: "519182",
    movieName: "Despicable Me 4",
    rating: 5,
    description: "nice movie",
    createdAt: "2024-08-01T13:42:34.455Z",
  },
  {
    _id: "6662bfc0ec72026c19764c4e",
    username: "bodzz",
    movieId: "929590",
    movieName: "Civil War",
    rating: 2,
    description: "not so bad",
    createdAt: "2024-06-07T08:07:28.008Z",
  },
];

export const mockCollectionMovies = [
  {
    id: "653346",
    title: "Kingdom of the Planet of the Apes",
    release_date: "2024-05-08",
    backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
    genres: ["Science Fiction", "Adventure", "Action"],
    vote_count: 636,
    _id: "66570b89a9437bb5f7e6d91f",
  },
  {
    id: "872585",
    title: "Oppenheimer",
    release_date: "2023-07-19",
    backdrop_path: "/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg",
    genres: ["Drama", "History"],
    vote_count: 8142,
    _id: "66586ed4b8d6d66ec3c4d5db",
  },
  {
    id: "1011985",
    title: "Kung Fu Panda 4",
    release_date: "2024-03-02",
    backdrop_path: "/kYgQzzjNis5jJalYtIHgrom0gOx.jpg",
    genres: ["Animation", "Action", "Family", "Comedy"],
    vote_count: 1892,
    _id: "6662f34076a2083a7e71c0bc",
  },
];

export const mockCollections = [
  {
    _id: "id1",
    name: "coll 1",
    description: "first coll",
    movies: mockCollectionMovies,
    createdAt: "1-8-2024",
  },
  {
    _id: "id2",
    name: "coll 2",
    description: "second coll",
    movies: mockCollectionMovies.slice(0, 1),
    createdAt: "1-8-2024",
  },
];
