import HomePage from "../pages/home-page";
import AddPage from "../pages/add.js";
import DetailPage from "../pages/detail-page.js";
import not_foundPage from "../pages/not-found.js";

import RegisterPage from "../pages/register-page.js";
import LoginPage from "../pages/login-page.js";

import MapPage from "../pages/map.js";

const routes = {
  "/": HomePage,
  "/add": AddPage,
  "/register": RegisterPage,
  "/login": LoginPage,
  "/detail/:id": DetailPage,
  "/map": MapPage,
  "/notfound": not_foundPage,
};

export default routes;
