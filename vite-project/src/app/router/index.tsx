import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";

import Favorites from "@/pages/Favorites";
import MovieDetails from "@/pages/MovieDetails";
import { isAuthenticated } from "@/services/auth";
import Home from "../../pages/Home";
import Login from "../../pages/Login";

const rootRoute = createRootRoute();

function requireAuth() {
  if (!isAuthenticated()) {
    throw redirect({ to: "/" });
  }
}

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Login,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  beforeLoad: requireAuth,
  component: Home,
});

const movieRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movie/$id",
  beforeLoad: requireAuth,
  component: MovieDetails,
});

const favoritesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/favorites",
  beforeLoad: requireAuth,
  component: Favorites,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  homeRoute,
  movieRoute,
  favoritesRoute,
]);

export const router = createRouter({
  routeTree,
});
