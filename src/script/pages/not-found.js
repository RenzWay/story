export default class not_foundPage {
  render() {
    return `
            <section class="not-found-page">
                <h2>404 - Halaman Tidak Ditemukan</h2>
                <p>Maaf, halaman yang Anda cari tidak tersedia.</p>
                <a href="#/">Kembali ke Beranda</a>
            </section>
        `;
  }
  afterRender() {}
}
