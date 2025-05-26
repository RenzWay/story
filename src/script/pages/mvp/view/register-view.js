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

export default class RegisterView {
  constructor(container) {
    this.container = container;
  }

  template() {
    return `
                <form class="register-form" id="registerForm">
                    <div>
                      <h2>Register Form</h2>
                    </div>

                  <div class="register-item">
                      <label for="nama">Nama</label><br>
                      <input id="nama" name="nama" type="text" placeholder="Nama" required /><br>

                      <label for="email">Email</label><br>
                      <input id="email" name="email" type="email" placeholder="example@email.com" required /><br>

                      <label for="password">Password</label><br>
                      <input id="password" name="password" type="password" placeholder="Password" required /><br>

                      <input type="submit" value="register"/>

                      <p class="or-text">or</p><br>

                      <p class="login-here">Have already an account? <a href="#/login">login here</a></p>
                  </div>
                </form>
    `;
  }

  render() {
    this.container.innerHTML = this.template();
    this.injectStyle();
  }

  registerHandler(handle) {
    const form = document.getElementById("registerForm");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nama = form.nama.value;
      const email = form.email.value;
      const password = form.password.value;
      await handle(nama, email, password);
    });
  }

  showSuccess(message) {
    Toast.fire({ icon: "success", text: message });
  }

  showError(message) {
    Swal.fire({ icon: "error", text: message });
  }

  showLoading() {
    const button = document.querySelector('#registerForm input[type="submit"]');
    button.disabled = true;
    button.value = "Loading...";
  }

  hideLoading() {
    const button = document.querySelector('#registerForm input[type="submit"]');
    button.disabled = false;
    button.value = "Register";
  }

  redirect(hash) {
    location.hash = hash;
  }

  injectStyle() {
    const style = document.createElement("style");
    style.textContent = this.style();
    document.head.appendChild(style);
  }

  style() {
    return `
    .register-con {
      background: linear-gradient(135deg, #4cc9f0, #4895ef);
      height: 100vh;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .register-form {
      width: 300px;
      padding: 20px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      background-color: #fff;
    }

    .register-form h2 {
      text-align: center;
      font-weight: 900;
      margin-bottom: 20px;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    }

    .register-form input {
      width: 100%;
      margin-bottom: 10px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .register-form input[type="submit"] {
      background-color: #007bff;
      color: #fff;
      border: none;
      cursor: pointer;
    }

    .register-form input[type="submit"]:hover {
      background-color: #0056b3;
    }

    .login-here{
      color:#666;
    }
    
    `;
  }
}
