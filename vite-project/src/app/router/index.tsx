import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import MovieDetails from "@/pages/MovieDetails";
import Home from "../../pages/Home";
import Login from "../../pages/Login";

const rootRoute = createRootRoute();

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Login,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: Home,
});

const movieRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movie/$id",
  component: MovieDetails,
});
const routeTree = rootRoute.addChildren([loginRoute, homeRoute, movieRoute]);

export const router = createRouter({
  routeTree,
});
