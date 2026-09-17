export type Photo = {
  id: number;
  src: string;
  title: string;
  category: string;
  year: string;
  ratio: "portrait" | "landscape";
};

export const works: Photo[] = [
  // — Portrait
  {
    id: 1,
    src: "https://images.pexels.com/photos/34921744/pexels-photo-34921744.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    title: "Vespera",
    category: "Portrait",
    year: "2025",
    ratio: "portrait",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/12997442/pexels-photo-12997442.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    title: "Shadowplay",
    category: "Portrait",
    year: "2024",
    ratio: "portrait",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/36378236/pexels-photo-36378236.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    title: "Quiet Hours",
    category: "Portrait",
    year: "2025",
    ratio: "portrait",
  },

  // — Landscape
  {
    id: 4,
    src: "https://images.pexels.com/photos/37911514/pexels-photo-37911514.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Sligo Mist",
    category: "Landscape",
    year: "2024",
    ratio: "landscape",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/30186383/pexels-photo-30186383.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Silent Ridges",
    category: "Landscape",
    year: "2023",
    ratio: "landscape",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/14590273/pexels-photo-14590273.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Gathering Storm",
    category: "Landscape",
    year: "2022",
    ratio: "landscape",
  },

  // — Editorial
  {
    id: 7,
    src: "https://images.pexels.com/photos/28863302/pexels-photo-28863302.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    title: "Umbra",
    category: "Editorial",
    year: "2025",
    ratio: "portrait",
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/10483258/pexels-photo-10483258.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    title: "Noir Study",
    category: "Editorial",
    year: "2024",
    ratio: "portrait",
  },
  {
    id: 9,
    src: "https://images.pexels.com/photos/23911182/pexels-photo-23911182.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    title: "Spotlight",
    category: "Editorial",
    year: "2024",
    ratio: "portrait",
  },

  // — Architecture
  {
    id: 10,
    src: "https://images.pexels.com/photos/34434151/pexels-photo-34434151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Concrete Poetry",
    category: "Architecture",
    year: "2023",
    ratio: "landscape",
  },
  {
    id: 11,
    src: "https://images.pexels.com/photos/9276243/pexels-photo-9276243.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Long Shadows",
    category: "Architecture",
    year: "2024",
    ratio: "landscape",
  },
  {
    id: 12,
    src: "https://images.pexels.com/photos/39205556/pexels-photo-39205556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Facade Study",
    category: "Architecture",
    year: "2025",
    ratio: "landscape",
  },
];

export const heroImage = "https://i.ibb.co/CpThgGL1/hero-cinematic.jpg";

export const aboutImage =
  "https://images.pexels.com/photos/31000150/pexels-photo-31000150.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800";

export const contactImage =
  "https://images.pexels.com/photos/18324078/pexels-photo-18324078.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800";

export const studioImage =
  "https://images.pexels.com/photos/6154323/pexels-photo-6154323.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800";

export const darkroomImage =
  "https://images.pexels.com/photos/11446104/pexels-photo-11446104.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800";

export const fieldImage =
  "https://images.pexels.com/photos/18714727/pexels-photo-18714727.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800";
