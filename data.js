const siteName = "Exhumanize";
const siteURL = "exhumanize.com";
const siteDescription = "Portfolio of Street Photographer David Jack Sorensen";
const GTag = "G-NXV0KGQHF7";

const pages = [
  { title: "portfolio", href: "/portfolio" },
  { title: "about", href: "/about" },
  { title: "contact", href: "/contact" },
];

const projects = [
  {
    title: "shadows",
    backgroundColor: "#064789",
    href: "/portfolio/shadows",
    image: {
      src: "/images/shadeLady.webp",
      alt: "",
      orientation: "landscape",
    },
  },
  {
    title: "radiance",
    backgroundColor: "#662C91",
    href: "/portfolio/radiance",
    image: {
      src: "/images/orangeWig.webp",
      alt: "",
      orientation: "portrait",
    },
  },
  {
    title: "angles",
    backgroundColor: "#792359",
    href: "/portfolio/angles",
    image: {
      src: "/images/kiddo.webp",
      alt: "",
      orientation: "landscape",
    },
  },
  {
    title: "currency",
    backgroundColor: "#3F7D20",
    href: "/portfolio/currency",
    image: {
      src: "/images/dollaBills.webp",
      alt: "",
      orientation: "landscape",
    },
  },
  {
    title: "graffiti",
    backgroundColor: "#a30000",
    href: "/portfolio/graffiti",
    image: {
      src: "/images/cokeWall.webp",
      alt: "Man walking by graffiti",
      orientation: "portrait",
    },
  },
  {
    title: "crosswalks",
    backgroundColor: "#1F271B",
    href: "/portfolio/crosswalks",
    image: {
      src: "/images/crosswalkDresses.webp",
      alt: "",
      orientation: "portrait",
    },
  },
  {
    title: "limbo",
    backgroundColor: "#007EA7",
    href: "/portfolio/limbo",
    image: {
      src: "/images/gardenSitter.webp",
      alt: "",
      orientation: "landscape",
    },
  },
  // {
  //   title: "transportation",
  //   backgroundColor: "#F21B3F",
  //   href: "/portfolio/transportation",
  //   image: {
  //     src: "/images/bikeLady.webp",
  //     alt: "",
  //     orientation: "landscape",
  //   },
  // },
  // {
  //   title: "preparations",
  //   backgroundColor: "#6B2B06",
  //   href: "/portfolio/preparations",
  //   image: {
  //     src: "/images/circusLady.webp",
  //     alt: "",
  //     orientation: "landscape",
  //   },
  // },
  // {
  //   title: "characters",
  //   backgroundColor: "#AD343E",
  //   href: "/portfolio/characters",
  //   image: {
  //     src: "/images/stoolShirts.webp",
  //     alt: "",
  //     orientation: "landscape",
  //   },
  // },
];

const socialMediaLinks = [
  { title: "Instagram", href: "https://Instagram.com" },
];

const telephone = "4348255038";

export {
  GTag,
  siteName,
  siteDescription,
  siteURL,
  pages,
  projects,
  socialMediaLinks,
  telephone,
};
