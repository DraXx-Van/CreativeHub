const castImage =
  "https://in.bmscdn.com/iedb/artist/images/website/poster/large/tom-holland-33741-15-12-2021-05-05-50.jpg";

const movies = [
  {
    title: "Project Hail Mary",
    description:
      "A lone astronaut awakens on a spacecraft with no memory and discovers he may be humanity's last hope.",
    poster: "/images/movies/hailmary-poster.jpg",
    banner: "/images/movies/hailmary-banner.jpg",
    genres: ["Sci-Fi", "Adventure"],
    rating: 8.9,
    releaseDate: "2026-03-20",
    ageRating: "PG-13",
    formats: ["2D", "3D", "IMAX"],
    comingSoon: false,
    cast: [
      {
        name: "Ryan Gosling",
        role: "Ryland Grace",
        image: castImage,
      },
      {
        name: "Sandra Hüller",
        role: "Eva Stratt",
        image: castImage,
      },
    ],
  },

  {
    title: "Spider-Man: Brand New Day",
    description:
      "Peter Parker faces a new chapter in his life as Spider-Man.",
    poster: "/images/movies/spiderman-poster.jpg",
    banner: "/images/movies/spiderman-banner.jpg",
    genres: ["Action", "Adventure"],
    rating: 8.8,
    releaseDate: "2026-07-31",
    ageRating: "PG-13",
    formats: ["2D", "3D", "IMAX"],
    comingSoon: true,
    cast: [
      {
        name: "Tom Holland",
        role: "Peter Parker",
        image: castImage,
      },
      {
        name: "Zendaya",
        role: "MJ",
        image: castImage,
      },
    ],
  },

  {
    title: "The Odyssey",
    description:
      "Christopher Nolan's adaptation of Homer's legendary epic.",
    poster: "/images/movies/odyssey-poster.jpg",
    banner: "/images/movies/odyssey-banner.jpg",
    genres: ["Adventure", "Fantasy"],
    rating: 9.1,
    releaseDate: "2026-07-17",
    ageRating: "PG-13",
    formats: ["2D", "IMAX"],
    comingSoon: true,
    cast: [
      {
        name: "Matt Damon",
        role: "Odysseus",
        image: castImage,
      },
      {
        name: "Tom Holland",
        role: "Telemachus",
        image: castImage,
      },
    ],
  },

  {
    title: "Toy Story 5",
    description:
      "Woody, Buzz and friends return for another adventure.",
    poster: "/images/movies/toystory-poster.jpg",
    banner: "/images/movies/toystory-banner.jpg",
    genres: ["Animation", "Family"],
    rating: 8.5,
    releaseDate: "2026-06-19",
    ageRating: "U",
    formats: ["2D", "3D", "IMAX"],
    comingSoon: false,
    cast: [
      {
        name: "Tom Hanks",
        role: "Woody",
        image: castImage,
      },
      {
        name: "Tim Allen",
        role: "Buzz Lightyear",
        image: castImage,
      },
    ],
  },

  {
    title: "Backrooms",
    description:
      "A found-footage horror experience inside endless liminal spaces.",
    poster: "/images/movies/backrooms-poster.jpg",
    banner: "/images/movies/backrooms-banner.jpg",
    genres: ["Horror"],
    rating: 8.1,
    releaseDate: "2026-01-10",
    ageRating: "A",
    formats: ["2D"],
    comingSoon: false,
    cast: [
      {
        name: "Kane Parsons",
        role: "Creator",
        image: castImage,
      },
      {
        name: "Unknown Actor",
        role: "Explorer",
        image: castImage,
      },
    ],
  },

  {
    title: "Hoppers",
    description:
      "A Pixar adventure where technology and nature collide.",
    poster: "/images/movies/hoppers-poster.jpg",
    banner: "/images/movies/hoppers-banner.jpg",
    genres: ["Animation", "Comedy"],
    rating: 8.2,
    releaseDate: "2026-03-06",
    ageRating: "U",
    formats: ["2D", "3D"],
    comingSoon: false,
    cast: [
      {
        name: "Jon Hamm",
        role: "Lead Character",
        image: castImage,
      },
      {
        name: "Bobby Moynihan",
        role: "Supporting Character",
        image: castImage,
      },
    ],
  },

  {
    title: "Zootopia 2",
    description:
      "Judy Hopps and Nick Wilde return for a brand new mystery.",
    poster: "/images/movies/zootopia-poster.jpg",
    banner: "/images/movies/zootopia-banner.jpg",
    genres: ["Animation", "Adventure"],
    rating: 8.7,
    releaseDate: "2026-11-26",
    ageRating: "U",
    formats: ["2D", "3D", "IMAX"],
    comingSoon: false,
    cast: [
      {
        name: "Ginnifer Goodwin",
        role: "Judy Hopps",
        image: castImage,
      },
      {
        name: "Jason Bateman",
        role: "Nick Wilde",
        image: castImage,
      },
    ],
  },

  {
    title: "Obsession",
    description:
      "A psychological thriller exploring desire and identity.",
    poster: "/images/movies/obsession-poster.jpg",
    banner: "/images/movies/obsession-banner.jpg",
    genres: ["Thriller"],
    rating: 7.9,
    releaseDate: "2026-02-14",
    ageRating: "A",
    formats: ["2D"],
    comingSoon: false,
    cast: [
      {
        name: "Jake Gyllenhaal",
        role: "Lead",
        image: castImage,
      },
      {
        name: "Ana de Armas",
        role: "Supporting Lead",
        image: castImage,
      },
    ],
  },
];

module.exports = movies;