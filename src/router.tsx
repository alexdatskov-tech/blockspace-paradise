import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Matches Vite's `base`, so the router keeps working when the app is
    // served from a subpath (GitHub Pages project sites) as well as from root.
    basepath: import.meta.env.BASE_URL,
  });

  return router;
};
