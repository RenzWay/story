import API_STORY from "../../app/api-link";

export class getModel {
  async logout() {
    localStorage.removeItem("token");
  }

  async getData() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_STORY}/stories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      return result.listStory;
    } catch (er) {
      console.error("terjadi error: ", er);
    }
  }
  async getDetail(API) {
    try {
      const token = localStorage.getItem("token");
      const storyId = location.hash.split("/")[2];

      if (!storyId) {
        location.hash = "#/login";
        return;
      }

      const response = await fetch(`${API}/stories/${storyId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data.story;
    } catch (error) {
      console.error("Terjadi error saat mengambil detail story:", error);
      return null;
    }
  }

  async addStory(payload) {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("description", payload.description);
      formData.append("lat", payload.latitude);
      formData.append("lon", payload.longitude);

      const blob = await (await fetch(payload.image)).blob();
      formData.append("photo", blob, "capture.png");

      const response = await fetch(`${API_STORY}/stories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      return response.json();
    } catch (error) {
      console.error(`terjadi error: ${error}`);
    }
  }

  async renderRegister(inputNama, inputEmail, inputPassword) {
    try {
      const response = await fetch(`${API_STORY}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputNama,
          email: inputEmail,
          password: inputPassword,
        }),
      });
      const result = await response.json();

      if (!result.error) {
        console.log("Berhasil register");
      }

      return result;
    } catch (er) {
      console.error(`Maaf sedang terjadi error: ${er}`);
    }
  }

  async renderLogin(inputEmail, inputPassword) {
    try {
      const response = await fetch(`${API_STORY}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inputEmail,
          password: inputPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      if (!result.error) {
        localStorage.setItem("token", result.loginResult.token);

        console.log("Berhasil login. Selamat datang");

        setTimeout(() => {
          location.hash = "#/";
        }, 1500);
      }

      return result;
    } catch (er) {
      console.error(`terjadi kesalahan: ${er}`);
    }
  }

  async subscribe(endpoint, keys) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_STORY}/notifications/subscribe`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ endpoint, keys }),
      });

      const result = await response.json();
      console.log("hasil dari subscribe", result);
    } catch (er) {
      console.log("error tidak ada subscribe: ", er);
    }
  }

  async unsubscribe(endpoint) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_STORY}/notifications/subscribe`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ endpoint }),
      });

      const result = await response.json();
      console.log("hasil dari unsubscribe", result);
    } catch (er) {
      console.log("error tidak ada unsubscribe: ", er);
    }
  }
}
