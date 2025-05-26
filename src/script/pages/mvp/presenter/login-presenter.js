

export default class LoginPresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init() {
    this.view.render();
    this.view.loginHandler(async (email, password) => {
      await this.handleLogin(email, password);
    });
  }

  async handleLogin(email, password) {
    try {
      this.view.showLoading();
      const result = await this.model.renderLogin(email, password);

      if (result.error) {
        this.view.showError(result.message);
        return;
      }

      this.view.showSuccess("Login berhasil");
      this.view.redirect("#/");
    } catch (error) {
      console.error(error);
    } finally {
      this.view.hideLoading();
    }
  }
}
