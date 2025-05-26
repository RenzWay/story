export default class DetailView {
  constructor(container) {
    this.container = container;
  }

  showDetail(story, onViewMap) {
    this.container.innerHTML = this.storyDetailElement(story);
    this.initMap(onViewMap);
  }

  storyDetailElement(story) {
    return `
      <section tabindex="0" class="detail-container flex" aria-labelledby="detail-heading">
        <div class="image-container">
          <img class="image-detail-story" src="${story.photoUrl}" alt="${
      story.name
    }">
        </div>

        <article class="detail-item flex">
          <div><h3>${story.name}</h3></div>
          <div>
            <p>${story.description}</p><br>
            <small><b>${new Date(story.createdAt).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</b></small><br>
            <div>
              <p id="latStory">Latitude: ${story.lat}</p>
              <p id="lonStory">Longtitude: ${story.lon}</p>
            </div>
            <a id="viewMapBtn">View Location</a>
          </div>
        </article>
      </section>
    `;
  }

  async renderMap(mapInstancee) {
    this.container.innerHTML = await mapInstancee.render();
    await mapInstancee.afterRender();
  }

  initMap(callback) {
    const viewMapBtn = document.getElementById("viewMapBtn");
    if (viewMapBtn) {
      viewMapBtn.addEventListener("click", (ev) => {
        ev.preventDefault();
        callback();
      });
    }
  }
}
