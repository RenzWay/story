import App from "./app/app.js";
import { swRegister, notifRegister } from "./utils/reg.js";

const content = document.getElementById("konten");
const mainContent = document.querySelector("#konten");
const skipLink = document.querySelector(".skip-link");

document.addEventListener("DOMContentLoaded", async function () {
  skipLink.addEventListener("click", function (event) {
    event.preventDefault();
    skipLink.blur();
    mainContent.focus();
    mainContent.scrollIntoView();
  });

  await swRegister();

  if ("notification" in window) {
    await notifRegister();
  }

  const appPage = new App({ content });
  const token = localStorage.getItem("token");

  if (!token) {
    location.hash = "#/register";
  } else {
    await appPage.renderPage();
  }

  await appPage.renderPage();

  window.addEventListener("hashchange", async () => {
    await appPage.renderPage();
  });
});
