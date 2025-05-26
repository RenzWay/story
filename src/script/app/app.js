import routes from "../routes/route";
import { getActiveRoute } from "../utils/url-parse";
import not_foundPage from "../pages/not-found";

export default class App {
  #content;
  constructor({ content }) {
    this.#content = content;
  }

  async renderPage() {
    const activeRoute = getActiveRoute();
    const route = routes[activeRoute];

    if (!route) {
      const notfound = new not_foundPage();
      this.#content.innerHTML = await notfound.render();
      await notfound.afterRender();
      return;
    }

    const page = new route();
    const content = this.#content;

    if (!document.startViewTransition) {
      content.innerHTML = await page.render();
      await page.afterRender();
      return;
    }

    document.startViewTransition(async function () {
      content.innerHTML = await page.render();
      await page.afterRender();
    });
  }
}
