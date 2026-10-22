import { http, HttpResponse } from "msw";

// Det är allt vi behöver
// Mål: mocka applikationen.
const products = [
  {
    id: 1,
    name: "Cykel",
    description: "En cykel",
    price: 1200,
    stock: 5,
    category: "Fordon",
    imgUrl: "https://example.com/cykel.jpg",
  },
  {
    id: 2,
    name: "Hjälm",
    description: "En cykelhjäml",
    price: 300,
    stock: 100,
    category: "Tillbehör",
    imgUrl: "https://example.com/hjalm.jpg",
  },
];

export const handlers = [
  http.get("*/auth/me", () => {
      return HttpResponse.json({
          expiresIn: 3600,
          subject: "mock-user",
          roles: ["USER"],
      });
  }),
  http.get("*/products", () => {
      return HttpResponse.json(products);
  }),
];
