import { getModel } from "../model";
import DetailView from "../view/detail-view";
import MapPage from "../../map";
import API_STORY from "../../../app/api-link";
import { idbStory } from "../../../utils/idb";

export default class DetailPresenter {
  constructor(container) {
    this.container = container;
    this.model = new getModel();
    this.view = new DetailView(container);
  }

  async init() {
    try {
      const story = await this.model.getDetail(API_STORY);
      // Simpan ke IndexedDB
      await idbStory.put(story);

      this.view.showDetail(story, async () => {
        const mapPage = new MapPage({
          lat: story.lat,
          lon: story.lon,
          name: story.name,
          desc: story.description,
        });

        this.view.renderMap(mapPage);
      });
    } catch (error) {
      console.error(`Gagal ambil data: ${error}`);
    }
  }
}
