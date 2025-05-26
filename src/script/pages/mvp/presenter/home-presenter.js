import { publicKeys } from "../../../app/api-link";

export default class HomePresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    this.view.logout(this.handleLogut);
    this.view.toggleLoading(true);
    try {
      const storiesData = await this.model.getData();
      this.view.renderStories(storiesData);
      this.initPushButton();
      this.view.onOfflineButtonClick(async () => {
        await this.view.renderOfflineStories();
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.view.toggleLoading(false);
    }
  }

  async initPushButton() {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      this.view.setPushButtonLabel("Push Not Supported");
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    const existingSub = await registration.pushManager.getSubscription();

    this.view.setPushButtonLabel(existingSub ? "Unsubscribe" : "Subscribe");
    this.view.setPushButtonState(!!existingSub);

    this.view.onPushButtonClick(async () => {
      try {
        if (Notification.permission !== "granted") {
          const permission = await Notification.requestPermission();
          if (permission !== "granted") {
            alert("Permission denied for notifications");
            return;
          }
        }

        const currentSub = await registration.pushManager.getSubscription();

        if (currentSub) {
          await currentSub.unsubscribe();
          await this.model.unsubscribe(currentSub.endpoint);
          alert("Unsubscribed successfully!");
          this.view.setPushButtonState(false);

          if ("serviceWorker" in navigator) {
            const registration = await navigator.serviceWorker.ready;
            registration.showNotification("Berhasil Unsubscribe!", {
              body: "Kamu tidak akan menerima notifikasi lagi.",
            });
          }
        } else {
          const newSub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.convertBase64ToUint8Array(publicKeys),
          });

          const p256dh = btoa(
            String.fromCharCode(...new Uint8Array(newSub.getKey("p256dh")))
          );
          const auth = btoa(
            String.fromCharCode(...new Uint8Array(newSub.getKey("auth")))
          );

          await this.model.subscribe(newSub.endpoint, { p256dh, auth });

          alert("Subscribed successfully!");
          this.view.setPushButtonState(true);

          if ("serviceWorker" in navigator) {
            const registration = await navigator.serviceWorker.ready;
            registration.showNotification("Berhasil Subscribe!", {
              body: "Kamu akan menerima notifikasi terbaru.",
            });
          }
        }
      } catch (err) {
        console.error("Subscription failed:", err);
        alert("Failed to (un)subscribe. Please check the console.");
      }
    });
  }

  convertBase64ToUint8Array(base64String) {
    const base64 = base64String
      .padEnd(base64String.length + ((4 - (base64String.length % 4)) % 4), "=")
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = atob(base64);

    return new Uint8Array(rawData.split("").map((char) => char.charCodeAt(0)));
  }

  handleLogut = () => {
    this.model.logout();
  };
}
