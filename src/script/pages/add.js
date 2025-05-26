import AddPresenter from "./mvp/presenter/add-presenter";

export default class AddPage {
  async render() {
    return `<section tabindex="0" class="container-add-page" id="addContainer"></section>`;
  }

  async afterRender() {
    const container = document.getElementById("addContainer");
    const presenter = new AddPresenter({ container });
    await presenter.init();
  }
}
