import { loading as load } from "../../../utils/loading";
import { idbStory } from "../../../utils/idb";

export class storyView {
  async renderPage() {
    return `
    <section tabindex="0" id="mainStory">
        <header>
            <nav class="flex nav-homepage">
              <div>
                <h1>Story</h1>
              </div>
              <div class="nav-homepage-menu">
                <a class="add-btn" href="#/add">+ add story</a>
                <a class="reg-btn" href="#/register">register</a>
                <a class="logout-btn logout" href="#/register">logout</a>
                <a class="offline-btn" id="offline-btn">Lihat Offline</a>
                <button class="subscribe-btn" id="push-btn">Subscribe</button>
              </div>
            </nav>
        </header>
        
        <div class="hidden" id="loading">${load()}</div>
        <div class="container-relative">
          <div id="map-home" style="height: 400px; margin: 2rem 0;"></div>
          <ul class="grid container-story" id="story"></ul>
        </div>
    </section>
    
    
`;
  }

  async renderStories(storiesData) {
    const storiesContainer = document.getElementById("story");
    storiesContainer.innerHTML = "";

    if (!storiesData || storiesData.length === 0) {
      storiesContainer.innerHTML = "<p>No stories available.</p>";
      return;
    }

    storiesData.forEach((story) => {
      storiesContainer.innerHTML += `
        <li onclick="location.hash='#/detail/${
          story.id
        }'" class="container-item">
          <div class="story-image">
            <img src="${story.photoUrl}" class="img-home" alt="${
        story.name
      } - gambar story">
          </div>
          <div class="story-item">
            <h1>${story.name}</h1>
            <h4>${story.description}</h4>
            <small>Created at: ${new Date(
              story.createdAt
            ).toLocaleString()}</small><br><br>
            <div class="latlng-coordinate">
              <small>latitude: ${story.lat}</small><br>
              <small>longtitude: ${story.lon}</small>
            </div>
            <button class="save-offline-btn" data-id="${
              story.id
            }">Simpan Offline</button>
          </div>
        </li>`;
    });

    storiesContainer.querySelectorAll(".save-offline-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        const story = storiesData.find((s) => s.id === id);
        if (story) {
          await idbStory.put(story);
          btn.textContent = "Tersimpan";
          btn.disabled = true;
        }
      });
    });

    this.initMapWithMarkers(storiesData);
  }

  async renderOfflineStories() {
    const storiesContainer = document.getElementById("story");
    storiesContainer.innerHTML = "";
    const offlineStories = await idbStory.getAll();
    if (!offlineStories || offlineStories.length === 0) {
      storiesContainer.innerHTML = "<p>No offline stories available.</p>";
      return;
    }
    offlineStories.forEach((story) => {
      storiesContainer.innerHTML += `
        <li class="container-item">
          <div class="story-image">
            <img src="${story.photoUrl}" class="img-home" alt="${
        story.name
      } - gambar story">
          </div>
          <div class="story-item">
            <h1>${story.name}</h1>
            <h4>${story.description}</h4>
            <small>Created at: ${new Date(
              story.createdAt
            ).toLocaleString()}</small><br><br>
            <div class="latlng-coordinate">
              <small>latitude: ${story.lat}</small><br>
              <small>longtitude: ${story.lon}</small>
            </div>
            <button class="delete-offline-btn" data-id="${
              story.id
            }">Hapus Offline</button>
          </div>
        </li>`;
    });
    storiesContainer.querySelectorAll(".delete-offline-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        await idbStory.delete(id);
        btn.closest("li").remove();
      });
    });
  }

  initMapWithMarkers(storiesData) {
    const mapContainer = document.getElementById("map-home");

    if (mapContainer._leaflet_map) {
      mapContainer._leaflet_map.remove();
      mapContainer._leaflet_map = null;
    }

    const map = L.map("map-home").setView([-2.548926, 118.0148634], 5);
    mapContainer._leaflet_map = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const markerIcon = L.icon({
      iconUrl: "leaf-green.png",
      shadowUrl: "leaf-shadow.png",
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-2, -76],
    });

    storiesData
      .map((story) => {
        if (story.lat && story.lon) {
          const marker = L.marker([story.lat, story.lon], {
            icon: markerIcon,
          }).addTo(map);
          marker.bindPopup(`<b>${story.name}</b><br>${story.description}`);
        }
      })
      .join("");
  }

  toggleLoading(show) {
    const loadingElement = document.getElementById("loading");
    if (!loadingElement) return;
    show
      ? loadingElement.classList.remove("hidden")
      : loadingElement.classList.add("hidden");
  }

  setPushButtonLabel(text) {
    const pushBtn = document.getElementById("push-btn");
    if (pushBtn) pushBtn.textContent = text;
  }

  onPushButtonClick(handler) {
    const pushBtn = document.getElementById("push-btn");
    if (pushBtn) {
      pushBtn.addEventListener("click", handler);
    }
  }

  logout(logoutHandler) {
    document.querySelector(".logout").addEventListener("click", function () {
      logoutHandler();
      location.hash = "#/register";
    });
  }

  async renderLoading() {
    return `<div id="loading">${load()}</div>`;
  }

  setPushButtonState(isSubscribed) {
    const pushBtn = document.getElementById("push-btn");
    if (!pushBtn) return;
    if (isSubscribed) {
      pushBtn.textContent = "Unsubscribe";
      pushBtn.classList.add("unsubscribe");
    } else {
      pushBtn.textContent = "Subscribe";
      pushBtn.classList.remove("unsubscribe");
    }
  }

  onOfflineButtonClick(handler) {
    const offlineBtn = document.getElementById("offline-btn");
    if (offlineBtn) {
      offlineBtn.addEventListener("click", handler);
    }
  }
}
