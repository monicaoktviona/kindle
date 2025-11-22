import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/upload-dictionary.tsx"),
  route("flashcards", "routes/flashcards.tsx"),
] satisfies RouteConfig;
