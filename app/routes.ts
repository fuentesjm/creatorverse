import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/ShowCreators.jsx"),
  route("creator/:id", "pages/ViewCreator.jsx"),
  route("creator/:id/edit", "pages/EditCreator.jsx"),
  route("add", "pages/AddCreator.jsx"),
] satisfies RouteConfig;
