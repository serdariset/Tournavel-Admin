# Tournavel Yönetim Paneli (Admin)

## Projenin Amacı

Bu proje, Tournavel uygulamasının yönetim panelidir. Temel amacı, uygulamanın verilerini merkezi bir arayüz üzerinden yönetmektir.

Başlıca sorumlulukları şunlardır:

- **Kaynak Yönetimi:** `ResourceAPI` tarafından sunulan statik ve yarı-statik verilerin (turistik noktalar, aktiviteler, etiketler vb.) oluşturulması, güncellenmesi ve silinmesi.
- **Kullanıcı Yönetimi:** Kullanıcı hesaplarını görüntüleme, düzenleme ve yönetme.
- **İçerik Denetimi:** Kullanıcı tarafından oluşturulan içeriklerin (yorumlar, seyahat planları vb.) denetlenmesi.
- **Raporlama:** Uygulama kullanımıyla ilgili temel istatistikleri ve raporları görüntüleme.

## Teknoloji Kararları

- **Framework:** **Vue.js**
- **State Management:** **Pinia**
- **UI Kütüphanesi:** (Henüz karar verilmedi, Quasar/Vuetify/PrimeVue gibi seçenekler değerlendirilecek)
- **API İletişimi:** **Axios**

### Neden Vue.js?

Yönetim paneli, veri odaklı ve iç kullanıma yönelik bir araçtır. Bu nedenle geliştirme hızı ve verimliliği en önemli önceliktir. Geliştiricinin Vue.js ekosistemindeki yüksek yetkinliği, projenin daha hızlı, daha kaliteli ve daha kolay bakılabilir bir şekilde hayata geçirilmesini sağlayacaktır. Mobil ve web projeleriyle doğrudan bir kod bağımlılığı olmadığı için, teknoloji yığınını ayrıştırmak mantıklı bir yaklaşımdır.
