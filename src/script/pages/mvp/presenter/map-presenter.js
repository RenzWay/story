import MapView from "../view/map-view";

export default class MapPresenter {
  constructor(container) {
    this.container = container;
    this.view = new MapView(container);
  }

  async showMap({ lat, lon, desc, name }) {
    await this.view.render({ lat, lon, desc, name });
  }
}
