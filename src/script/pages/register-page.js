import { getModel } from "./mvp/model";
import RegisterPresenter from "./mvp/presenter/register-presenter";
import RegisterView from "./mvp/view/register-view";

export default class RegisterPage {
  async render() {
    return `
          <a href="#konten" class="skip-link">Lewati ke konten utama</a>
          <section tabindex="0" class="register-con"></section>
        `;
  }

  async afterRender() {
    const container = document.querySelector(".register-con");
    const model = new getModel();
    const view = new RegisterView(container);
    const presenter = new RegisterPresenter(view, model);

    presenter.init();
  }
}
