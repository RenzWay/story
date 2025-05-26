import HomePresenter from "./mvp/presenter/home-presenter";
import { storyView } from "./mvp/view/home-view";
import { getModel } from "./mvp/model";

export default class HomePage {
  async render() {
    const view = new storyView();
    return await view.renderPage();
  }

  async afterRender() {
    try {
      const presenter = new HomePresenter(new getModel(), new storyView());
      await presenter.init();
    } catch (er) {
      console.error(er);
    }
  }
}
