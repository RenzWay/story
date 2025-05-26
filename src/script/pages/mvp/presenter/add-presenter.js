import AddView from "../view/add-view";
import { getModel } from "../model";

export default class AddPresenter {
  constructor({ container }) {
    this.container = container;
    this.model = new getModel();
    this.view = new AddView();
    this.stream = null;
  }

  async init() {
    this.view.render(this.container);

    this.view.bindSubmit(async (formData) => {
      try {
        await this.model.addStory(formData);
        this.view.showSuccessToast();
        this.view.onsuccessSubmit();
      } catch (err) {
        this.view.showErrorToast(err.message || "Terjadi kesalahan");
      }
    });

    this.view.bindCameraToggle(this.toggleCamera.bind(this));
    this.view.bindCapture(() => {
      this.view.updateCanvasFromVideo();
    });

    this.view.bindFileInput((event) => {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => this.view.updateCanvasFromImage(img);
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });

    this.view.renderMapClick((lat, lng) => {
      this.view.setLatLng(lat, lng);
    });

    this.view.onHashChangeCleanUp(() => {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        this.view.stopVideo();
        this.stream = null;
      }
    });
  }

  async toggleCamera() {
    if (!this.stream) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.view.showVideo(this.stream);
      } catch {
        alert("Tidak bisa mengakses kamera");
      }
    } else {
      this.stream.getTracks().forEach((track) => track.stop());
      this.view.stopVideo();
      this.stream = null;
    }
  }
}
