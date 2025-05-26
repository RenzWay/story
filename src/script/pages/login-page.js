import Swal from "sweetalert2";
import { getModel } from "./mvp/model";
import LoginView from "./mvp/view/login-view";
import LoginPresenter from "./mvp/presenter/login-presenter";

export default class LoginPage {
  async render() {
    return `
    <a href="#konten" class="skip-link">Lewati ke konten utama</a>
    <section tabindex="0" class="login-page"></section>
    `;
  }

  async afterRender() {
    const container = document.querySelector(".login-page");
    const model = new getModel();
    const view = new LoginView(container);
    const presenter = new LoginPresenter(view, model);

    presenter.init();
  }
}
