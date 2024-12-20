const routes = [
  {
    path: "/",
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "login", component: () => import("components/LoginPage.vue") }, // Ruta para Login
      { path: "movies", component: () => import("components/MoviesPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
