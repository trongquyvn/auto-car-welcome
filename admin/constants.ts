export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://auto-car-welcome.vercel.app";

export const cars = [
  {
    id: 1,
    name: "Bin",
    value: "bin",
  },
  {
    id: 2,
    name: "Thắng",
    value: "thang",
  },
];
