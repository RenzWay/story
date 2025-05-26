export async function swRegister() {
  if (!("serviceWorker" in navigator)) {
    console.error("Service Worker API not supported.");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("./sw.js");
    console.log("Service worker registration succeeded:", registration);
  } catch (error) {
    console.error("Service worker registration failed:", error);
  }
}

export async function notifRegister() {
  const result = await Notification.requestPermission();

  if (result === "granted") {
    console.log("notif di izinkan", result);
  } else {
    console.error("notif tidak di ijinkan", result);
  }
}
