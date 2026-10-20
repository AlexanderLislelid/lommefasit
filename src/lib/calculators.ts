export type Calculator = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: "green" | "blue" | "orange" | "purple";
  status: "live" | "ready" | "soon";
  cta?: string;
};

export const calculators: Calculator[] = [
  {
    slug: "feriepengar",
    title: "Feriepengar",
    description: "Sjå kor mykje du får utbetalt i juni, med 10,2 % eller 12 %.",
    icon: "kr",
    color: "green",
    status: "ready",
  },
  {
    slug: "prosent",
    title: "Prosent",
    description: "Kor mange prosent er X av Y? Rabatt, auke og nedgang.",
    icon: "%",
    color: "blue",
    status: "ready",
  },
  {
    slug: "straumpris",
    title: "Straumpris no",
    description: "Timepris i di prisområde i dag og i morgon.",
    icon: "kWh",
    color: "purple",
    status: "live",
    cta: "Sjå prisane",
  },
  {
    slug: "km-godtgjersle",
    title: "Kilometergodtgjersle",
    description: "",
    icon: "",
    color: "green",
    status: "soon",
  },
];
