import MapPresenter from "./mvp/presenter/map-presenter";

export default class MapPage {
  #lat;
  #lon;
  #desc;
  #name;

  constructor({ lat = null, lon = null, name = "", desc = "" } = {}) {
    this.#lat = lat;
    this.#lon = lon;
    this.#name = name;
    this.#desc = desc;
  }

  async render() {
    return `
      <section tabindex="0" id="mapSection" class="map-page"></section>
    `;
  }

  async afterRender() {
    const container = document.getElementById("mapSection");
    const presenter = new MapPresenter(container);
    await presenter.showMap({
      lat: this.#lat,
      lon: this.#lon,
      name: this.#name,
      desc: this.#desc,
    });
  }
}
