import DetailPresenter from "./mvp/presenter/detail-presenter";

export default class DetailPage {
  async render() {
    return `
            <section class="section-detail" id="sectionDetail">
            <a class="back-button" href="#/">kembali</a>
                <div id="storyDetail"></div>
            </section>
        `;
  }

  async afterRender() {
    const container = document.getElementById("storyDetail");
    const presenter = new DetailPresenter(container);
    await presenter.init();
  }
}
