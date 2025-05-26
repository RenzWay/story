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

export default class LoginView {
  constructor(container) {
    this.container = container;
  }

  template() {
    return `
            <form class="login-form" id="loginForm">
                <div>
                  <h2>Login Form</h2>
                </div>

                <label for="email">Email</label><br>
                <input id="email" type="email" name="email" placeholder="example@email.com" required /><br>

                <label for="password">Password</label><br>
                <input id="password" type="password" name="password" placeholder="Password" required /><br>
                <input type="submit" value="Login"/>
            </form>
    `;
  }

  render() {
    this.container.innerHTML = this.template();
    this.injectStyle();
  }

  loginHandler(handle) {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
      await handle(email, password);
    });
  }

  showLoading() {
    const button = document.querySelector('#loginForm [type="submit"]');
    button.disabled = true;
    button.value = "Loading...";
  }

  hideLoading() {
    const button = document.querySelector('#loginForm [type="submit"]');
    button.disabled = false;
    button.value = "Login";
  }

  showSuccess(text) {
    Toast.fire({
      icon: "success",
      title: text,
      text: "Selamat Datang",
    });
  }

  showError(text) {
    Toast.fire({
      icon: "error",
      title: text,
      text: `Gagal Login`,
    });
  }

  injectStyle() {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = this.style();
    document.head.appendChild(styleElement);
  }

  redirect(hash) {
    location.hash = hash;
  }

  style() {
    return `
      .login-page {
        background: linear-gradient(135deg, #4cc9f0, #4895ef);
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .login-form {
        width: 300px;
        padding: 1em;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        background-color: #fff;
      }

      .login-form h2 {
        text-align: center;
        font-weight: 900;
        margin-bottom: 20px;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
      }

      .login-form>input {
        width: 100%;
        max-width: 100%;
        margin-bottom: 10px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }

      .login-form input:focus {
        outline: 2px solid #007bff;
        border-color: #007bff;
      }

      .login-form input[type="submit"] {
        background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
      }

      .login-form input[type="submit"]:hover {
        background-color: #0056b3;
      }

      #message {
        margin-top: 10px;
        color: red;
      }
    `;
  }
}
