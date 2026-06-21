const theatres = [
  {
    name: "PVR Infiniti",
    location: "Andheri West, Mumbai",
    logo: "/images/theatres/PVR Infiniti.png",
    minPrice: 250,
    maxPrice: 900,
    screens: [
      {
        screenNumber: 1,
        formats: ["2D", "3D"]
      },
      {
        screenNumber: 2,
        formats: ["2D"]
      },
      {
        screenNumber: 3,
        formats: ["IMAX"]
      },
      {
        screenNumber: 4,
        formats: ["2D"]
      },
      {
        screenNumber: 5,
        formats: ["3D"]
      }
    ]
  },

  {
    name: "INOX Megaplex",
    location: "Malad West, Mumbai",
    logo: "/images/theatres/inox.jpg",
    minPrice: 220,
    maxPrice: 850,
    screens: [
      {
        screenNumber: 1,
        formats: ["2D"]
      },
      {
        screenNumber: 2,
        formats: ["3D"]
      },
      {
        screenNumber: 3,
        formats: ["IMAX"]
      },
      {
        screenNumber: 4,
        formats: ["2D"]
      },
      {
        screenNumber: 5,
        formats: ["2D", "3D"]
      },
      {
        screenNumber: 6,
        formats: ["IMAX"]
      }
    ]
  },

  {
    name: "Cinepolis Fun Republic",
    location: "Andheri West, Mumbai",
    logo: "/images/theatres/cinepolis.png",
    minPrice: 230,
    maxPrice: 700,
    screens: [
      {
        screenNumber: 1,
        formats: ["2D"]
      },
      {
        screenNumber: 2,
        formats: ["2D", "3D"]
      },
      {
        screenNumber: 3,
        formats: ["3D"]
      },
      {
        screenNumber: 4,
        formats: ["2D"]
      }
    ]
  },

  {
    name: "MovieMax",
    location: "Thane West, Mumbai",
    logo: "/images/theatres/moviemax.png",
    minPrice: 180,
    maxPrice: 600,
    screens: [
      {
        screenNumber: 1,
        formats: ["2D"]
      },
      {
        screenNumber: 2,
        formats: ["3D"]
      },
      {
        screenNumber: 3,
        formats: ["2D"]
      }
    ]
  },

  {
    name: "Maison PVR",
    location: "Bandra Kurla Complex, Mumbai",
    logo: "/images/theatres/PVR Infiniti.png",
    minPrice: 500,
    maxPrice: 1800,
    screens: [
      {
        screenNumber: 1,
        formats: ["IMAX"]
      },
      {
        screenNumber: 2,
        formats: ["2D"]
      },
      {
        screenNumber: 3,
        formats: ["2D"]
      },
      {
        screenNumber: 4,
        formats: ["IMAX"]
      }
    ]
  }
];

module.exports = theatres;