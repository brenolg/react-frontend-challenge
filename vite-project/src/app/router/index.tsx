import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

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

const routeTree = rootRoute.addChildren([loginRoute, homeRoute]);

export const router = createRouter({
  routeTree,
});
