import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default class MapView {
  constructor(container) {
    this.container = container;
  }

  async render({ lat, lon, desc, name }) {
    this.container.innerHTML = `
      
        <div class="map" id="map"></div>
      
    `;

    this.initMap(lat, lon, desc, name);
  }

  initMap(lat, lon, desc, name) {
    const indonesiaCoor = [-2.548926, 118.0148634];

    const markerIcon = L.icon({
      iconUrl: "leaf-green.png",
      shadowUrl: "leaf-shadow.png",
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-2, -76],
    });

    const map = L.map("map", {
      zoom: 5,
      center: lat && lon ? [lat, lon] : indonesiaCoor,
    });

    const baseTile = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    baseTile.addTo(map);

    if (lat && lon) {
      const marker = L.marker([lat, lon], {
        icon: markerIcon,
      }).addTo(map);
      marker.bindPopup(`<b>${name}</b><br>${desc || "Lokasi"}`).openPopup();
    }
  }
}
