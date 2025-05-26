export default class RegisterPresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init() {
    this.view.render();
    this.view.registerHandler(async (nama, email, password) => {
      await this.handleRegister(nama, email, password);
    });
  }

  async handleRegister(nama, email, password) {
    try {
      this.view.showLoading();
      const result = await this.model.renderRegister(nama, email, password);

      if (result && !result.error) {
        this.view.showSuccess("Register berhasil");
        this.view.redirect("#/login");
      } else {
        this.view.showError(result.message || "Register gagal");
      }
    } catch (e) {
      this.view.showError("Terjadi error: " + e);
    } finally {
      this.view.hideLoading();
    }
  }
}
