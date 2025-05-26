import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export default class AddView {
  constructor() {
    this.canvas = null;
    this.video = null;
    this.captureBtn = null;
    this.stopCameraBtn = null;
    this.fileInput = null;
  }

  getTemplate() {
    return `
      
        <header class="container-heading-add">
          <h2 class="heading-add">Tambah Data Cerita</h2>
        </header>

        <form id="addForm">
          <div class="description-container">
            <label for="description">Deskripsi:</label><br>
            <textarea id="description" required></textarea><br>
          </div>
          <div>
            <p class="upload-instruction">Pilih salah satu metode untuk mengunggah gambar:</p>
            <div class="container-file-input">
              <label class="file-input-label" for="fileInput">Unggah File</label>
              <input class="file-input hidden" type="file" id="fileInput" /><br><br>
            </div>
            <p class="or-text">atau<br>Buka Kamera</p>
            <div class="container-btn">
              <button class="hidden" type="button" id="captureBtn">Ambil Gambar</button>
              <button type="button" id="stopCamera">Aktifkan Kamera</button>
            </div>
            <div class="container-capture">
              <video class="hidden" id="video" autoplay playsinline></video>
              <canvas class="hidden" id="canvas"></canvas>
            </div>
          </div>
          <div class="map-add" id="map" style="height: 300px; margin-top: 1rem;"></div>
          <div class="coor-container">
            <label>Koordinat:</label><br>
            <input type="text" id="lat" placeholder="Latitude" /><br>
            <input type="text" id="lng" placeholder="Longitude" /><br>
          </div>
          <button class="submit-add" type="submit">Simpan</button>
        </form>
        <a class="back-button" href="#/">Kembali</a>
      
    `;
  }

  render(container) {
    container.innerHTML = this.getTemplate();
    this.canvas = document.getElementById("canvas");
    this.video = document.getElementById("video");
    this.captureBtn = document.getElementById("captureBtn");
    this.stopCameraBtn = document.getElementById("stopCamera");
    this.fileInput = document.getElementById("fileInput");
  }

  bindSubmit(handler) {
    document.getElementById("addForm").addEventListener("submit", (e) => {
      e.preventDefault();
      handler(this.getFormData());
    });
  }

  bindCameraToggle(handler) {
    this.stopCameraBtn.addEventListener("click", handler);
  }

  bindCapture(handler) {
    this.captureBtn.addEventListener("click", handler);
  }

  bindFileInput(handler) {
    this.fileInput.addEventListener("change", handler);
  }

  renderMapClick(callback) {
    const map = L.map("map").setView([-2.548926, 118.0148634], 5);
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

    let marker;
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      callback(lat, lng);

      if (marker) map.removeLayer(marker);
      marker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);
      marker.bindPopup(`Lokasi dipilih: ${lat}, ${lng}`).openPopup();
    });
  }

  updateCanvasFromVideo() {
    const ctx = this.canvas.getContext("2d");
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;
    ctx.drawImage(this.video, 0, 0);
    this.canvas.style.display = "block";
  }

  updateCanvasFromImage(img) {
    const ctx = this.canvas.getContext("2d");
    this.canvas.width = img.width;
    this.canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    this.canvas.style.display = "block";
  }

  showVideo(stream) {
    this.video.srcObject = stream;
    this.video.classList.remove("hidden");
    this.captureBtn.classList.remove("hidden");
    this.stopCameraBtn.textContent = "Nonaktifkan Kamera";
  }

  stopVideo() {
    this.video.srcObject = null;
    this.captureBtn.classList.add("hidden");
    this.video.classList.add("hidden");
    this.stopCameraBtn.textContent = "Aktifkan Kamera";
  }

  setLatLng(lat, lng) {
    document.getElementById("lat").value = lat;
    document.getElementById("lng").value = lng;
  }

  getFormData() {
    const description = document.getElementById("description").value;
    const lat = document.getElementById("lat").value;
    const lng = document.getElementById("lng").value;
    const image = this.canvas.toDataURL("image/png");

    return {
      description,
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      image,
    };
  }

  onsuccessSubmit() {
    return (window.location.hash = "#/");
  }

  showSuccessToast() {
    Toast.fire({
      icon: "success",
      title: "Sukses",
      text: "Berhasil menambah data",
    });
  }

  showErrorToast(error) {
    Toast.fire({
      icon: "error",
      title: "Error",
      text: `Gagal menambah data: ${error}`,
    });
  }

  onHashChangeCleanUp(callback) {
    window.addEventListener("hashchange", callback);
  }
}
