export type Calculator = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: "green" | "blue" | "orange" | "purple" | "teal";
  status: "daily" | "ready" | "soon";
  cta?: string;
};

export const calculators: Calculator[] = [
  {
    slug: "feriepenger",
    title: "Feriepenger",
    description: "Se hvor mye du får utbetalt i juni, med 10,2 % eller 12 %.",
    icon: "kr",
    color: "green",
    status: "ready",
  },
  {
    slug: "prosent",
    title: "Prosent",
    description: "Hvor mange prosent er X av Y? Rabatt, økning og nedgang.",
    icon: "%",
    color: "blue",
    status: "ready",
  },
  {
    slug: "strompris",
    title: "Strømpris nå",
    description: "Timepris i ditt prisområde i dag.",
    icon: "kWh",
    color: "purple",
    status: "daily",
    cta: "Se prisene",
  },
  {
    slug: "overtid",
    title: "Overtid",
    description: "Hva får du for overtidstimer med 50% eller 100% tillegg?",
    icon: "Ot",
    color: "orange",
    status: "ready",
  },
  {
    slug: "kilometergodtgjorelse",
    title: "Kilometergodtgjørelse",
    description: "",
    icon: "",
    color: "green",
    status: "soon",
  },
];
