# Build Brief — Somewhere, in Our Little Universe ♡

> Dokumen panduan untuk Google Antigravity. Gunakan brief ini sebagai spesifikasi proyek, lalu implementasikan website yang benar-benar berfungsi, bukan hanya mockup.

## 1. Ringkasan proyek

Buat website personal bertema **cozy dreamy pixel-art game** untuk seseorang yang spesial/cem-ceman. Ini **bukan website confess** dan jangan menambahkan ajakan jadian, pernyataan cinta eksplisit, atau countdown romantis.

**Nama website:** `somewhere, in our little universe`

**Tagline:** `a tiny world for a very curious human ♡`

Rasanya seperti game indie 16-bit yang tenang: malam berbintang, kamar mungil yang hangat, karakter pixel, mini game sederhana, playlist, pesan random, dan easter egg rahasia.

Website harus terasa dibuat dengan niat, lucu, interaktif, dan personal—bukan template landing page generik.

## 2. Teknologi dan cara kerja

- Gunakan **React + Vite**.
- Gunakan **Tailwind CSS** bila sudah tersedia di proyek. Jika belum, pasang dan konfigurasi dengan benar atau gunakan CSS biasa yang terstruktur jika instalasi tidak memungkinkan.
- Gunakan komponen React yang reusable dan state React untuk interaksi.
- Pastikan proyek dapat dijalankan dengan `npm install` dan `npm run dev`.
- Jangan hanya menampilkan screenshot atau desain statis. Semua tombol dan interaksi yang dijanjikan harus bekerja.
- Jangan menghapus konfigurasi atau file proyek yang sudah ada tanpa alasan. Periksa struktur proyek terlebih dahulu, kemudian implementasikan dan uji.
- Utamakan tampilan mobile-first karena website kemungkinan besar dibuka dari HP.
- Hindari dependensi berat jika fitur dapat dibuat sederhana.
- Jika aset pixel-art khusus belum tersedia, buat placeholder pixel-art sederhana menggunakan CSS/SVG atau gunakan aset lokal yang tersedia. Jangan membuat URL gambar palsu atau bergantung pada URL gambar yang tidak terverifikasi.

## 3. Art direction

### Mood
- Cozy, dreamy, playful, sedikit nostalgic.
- Terasa seperti game malam hari yang aman dan nyaman.
- Tidak terlalu ramai, tidak terlalu childish, dan tidak terlalu penuh dekorasi.
- Gunakan pixel art untuk karakter, objek, ikon, dan dekorasi. Untuk paragraf panjang gunakan font yang mudah dibaca.

### Palet warna
- Midnight navy: `#202440`
- Deep night: `#171B35`
- Muted lavender: `#7776A8`
- Soft lilac: `#D8B6D8`
- Dusty pink: `#F7DCE7`
- Warm cream: `#FFF4DE`

Gunakan warna gelap sebagai latar dunia malam, cream untuk teks penting, dan pink/lilac sebagai aksen. Jaga kontras teks agar tetap terbaca.

### Tipografi
- Judul pendek boleh memakai font pixel seperti **Press Start 2P** atau **Silkscreen**, jika dapat dimuat dengan andal.
- Isi dan dialog memakai font yang lebih nyaman dibaca, misalnya **Nunito** atau font sans-serif sistem.
- Jangan gunakan font pixel kecil untuk paragraf panjang.

### Detail visual
- Pixel stars yang berkedip pelan.
- Bulan sabit di luar jendela.
- Lampu meja hangat.
- Jendela dengan langit malam.
- Tanaman, buku, komputer, kasur, dan dekorasi kamar sederhana.
- Pixel border dan panel dialog ala RPG.
- Animasi ringan dan halus; hindari terlalu banyak gerakan yang mengganggu.
- Tambahkan opsi mute untuk audio dan hormati `prefers-reduced-motion`.

## 4. POV, player identity, dan dua karakter pixel

**PENTING: website ini dimainkan dari POV Keonho.** Pengunjung bukan sekadar melihat dua karakter dari luar; mereka masuk ke dunia sebagai karakter/muse Keonho. Karakter pemandu yang mewakili sistem adalah Seonghyeon, dengan nama in-world **Sebastian Everett**. Jadi, saat karakter sistem berbicara, gunakan nama `Sebastian Everett` (boleh ditampilkan sebagai `Sebastian Everett · system guide`) dan visual sprite Seonghyeon. Jangan tertukar: Keonho = player/muse; Seonghyeon = system guide bernama Sebastian Everett.

Gunakan foto referensi yang diberikan di percakapan sebagai panduan visual jika foto tersedia di workspace Antigravity. Foto menunjukkan dua orang: karakter dengan outer sporty memegang kamera, sedangkan karakter berkaus putih tanpa lengan berada di belakang. Buat sprite game 16-bit yang terinspirasi dari ciri visual tersebut.

### Player character — Keonho
Label karakter: `you, player one 📸`

- Rambut gelap, belah tengah, dengan poni sedikit berantakan.
- Mata gelap dan ekspresi kalem.
- Outfit: kaus putih dengan outer/jaket sporty navy dan aksen merah.
- Properti khas: kamera kecil.
- Kepribadian visual: cool, sedikit jutek, tetapi imut.
- Animasi: idle blink, mengangkat kamera, efek flash kecil, lalu kembali ke pose idle.

### System guide — Seonghyeon / Sebastian Everett
Label karakter: `Sebastian Everett · your little system guide 🌙`

- Rambut gelap, belah tengah, poni jatuh di dahi.
- Mata gelap dan ekspresi lembut.
- Outfit: kaus putih tanpa lengan bertekstur ribbed.
- Kepribadian visual: tenang, sedikit misterius, ramah dengan humor kering. Dia berbicara sebagai pemandu sistem, bukan player.
- Nama yang terlihat pada dialog: `Sebastian Everett`. Nama muse/visual referensinya tetap Seonghyeon.
- Animasi: idle blink, menoleh ke Keonho, melambaikan tangan kecil, menunjuk menu, atau duduk melihat bintang.

### Aturan sprite
- Kedua karakter harus memiliki skala, tingkat detail, outline, dan palet yang seragam.
- Pertahankan siluet rambut dan perbedaan outfit agar karakter mudah dibedakan.
- Hindari desain yang terlalu bulat hingga ciri khas mereka hilang.
- Jika membuat sprite dengan CSS/SVG, susun bentuk dengan gaya pixel yang rapi. Jika memakai sprite sheet, gunakan file lokal dan dokumentasikan path-nya.
- Jangan mengklaim aset placeholder sebagai sprite final yang identik dengan foto.
- Buat fallback sederhana jika sprite khusus belum siap.

## 5. Struktur halaman dan alur

Buat website sebagai single-page experience dengan pergantian scene/room yang terasa seperti game. Gunakan transisi ringan, bukan reload halaman. Alur wajib: boot screen → pop-up input nama player → intro dari Sebastian Everett → main room. Jangan langsung membawa pengunjung ke game sebelum pop-up nama selesai.

### Scene 1 — Boot / loading screen
Latar: langit navy dengan bintang dan bulan.

Teks:
- `collecting little stars...`
- `preparing a tiny world for you ♡`

Tampilkan progress bar animasi singkat, lalu tombol:
- `enter world.exe`

Interaksi:
- Tombol `enter world.exe` membuka pop-up input nama, bukan langsung main room.
- Jangan membuat loading palsu yang terlalu lama; pengalaman harus bisa dimulai segera.

### Scene 1.5 — Player name pop-up (required)

Sebelum gameplay dimulai, tampilkan modal bergaya RPG/pixel dialog di atas latar yang sedikit redup. Player/muse yang dikendalikan adalah Keonho, tetapi minta pengunjung memasukkan nama panggilan yang ingin ditampilkan dalam dialog. Ini membuat pengalaman terasa personal.

Copywriting modal:
- Small label: `NEW PLAYER DETECTED`
- Heading: `before we begin...`
- Prompt: `what should I call you?`
- Placeholder input: `type your name here...`
- Helper text: `don't worry, this world is pretty friendly.`
- Primary button: `that's me! →`

Perilaku:
- Input nama wajib diisi dan tidak boleh hanya spasi. Trim spasi berlebih dan batasi panjang nama secara wajar (misalnya 20 karakter).
- Tekan Enter atau klik tombol untuk melanjutkan.
- Simpan nama di state aplikasi dan tampilkan secara dinamis di sapaan/dialog berikutnya, misalnya `welcome in, {playerName}.`
- Jika pengunjung memilih nama `Keonho`, jangan tampilkan sapaan yang terdengar janggal; gunakan nama secara natural.
- Jangan mengirim atau menyimpan nama ke server. Opsional: simpan hanya di `sessionStorage` agar tidak perlu mengetik ulang selama sesi; jika storage tidak tersedia, tetap lanjut dengan React state.
- Sediakan tombol kecil `change name` di menu/peta untuk mengganti nama kapan saja.

### Scene 1.75 — Sebastian Everett, system guide

Setelah nama dikonfirmasi dan sebelum masuk ke main room, tampilkan dialog perkenalan singkat dari sprite Seonghyeon. Dalam UI, nama pembicara harus tampil sebagai **Sebastian Everett**. Karakter visualnya adalah sprite Seonghyeon.

Copywriting yang disarankan:
- `SYSTEM ONLINE`
- `oh, there you are, {playerName}.`
- `I'm Sebastian Everett. I'll be your guide around here.`
- `I'll explain the important stuff. probably. no promises about the unimportant stuff.`
- Button: `show me around`

Interaksi:
- Tombol membawa player ke main room.
- Sebastian muncul lagi sebagai system/dialog guide saat membuka map, mini game, atau secret room, tetapi jangan mengganggu layar terus-menerus.
- Gunakan gaya bicara santai, sedikit teasing, dan hangat. Jangan membuatnya terdengar seperti AI assistant generik.

### Scene 2 — Main room
Ini adalah hub utama dan harus menjadi scene paling detail.

Tampilkan kamar pixel malam hari dari perspektif player Keonho:
- Jendela dan bulan.
- Meja dengan komputer/lampu.
- Rak buku.
- Tanaman.
- Kasur atau sofa.
- Sprite player Keonho yang bisa bergerak ringan atau bereaksi saat objek diklik.
- Sebastian Everett (sprite Seonghyeon) sebagai pemandu sistem yang muncul di panel dialog kecil, tidak mengambil alih peran player.

Teks utama:
- `welcome in, {playerName}.`
- `take your time. there's no quest to rush here.`

Dialog Sebastian sesekali:
- `the computer opens the arcade. the plant opens... well, you'll see.`
- `you can explore in any order. try not to get lost. I'd hate to file the paperwork.`

Objek yang bisa diklik:
- Komputer → buka mini arcade.
- Pemutar musik → buka playlist room.
- Buku → buka pesan random.
- Bulan/jendela → memicu easter egg.
- Karakter → menampilkan dialog lucu.

Sediakan tombol `night map` untuk membuka peta navigasi. Sediakan tombol `back` di setiap room agar pengguna tidak tersesat.

### Scene 3 — Character interaction
Tampilkan Keonho sebagai player character dan Sebastian Everett (sprite Seonghyeon) sebagai system guide. Mereka bisa terlihat berdampingan pada beberapa scene, tetapi bedakan jelas siapa yang dikendalikan player dan siapa yang memberi dialog sistem.

Dialog pendek yang dapat muncul secara acak:
- `why are you staring at us...`
- `did you come here to cause trouble?`
- `the moon looks extra round tonight.`
- `we're definitely not just standing here waiting for you. nope.`

Interaksi:
- Klik sprite player Keonho: animasi kamera/pose player dan flash kecil.
- Klik Sebastian Everett: tampilkan dialog sistem atau komentar singkat.
- Klik keduanya dalam urutan tertentu: buka dialog rahasia.
- Jangan memakai dialog confess atau menyebut hubungan sebagai pasangan.

### Scene 3.5 — The Compliment Corner (important: this is for a crush)
Buat satu area khusus untuk mengagumi dia dengan cara manis, playful, dan sedikit malu-malu. Website ini memang untuk crush, jadi jangan sampai seluruh pengalaman terasa seperti website biasa yang netral. Tetap bukan halaman confess dan jangan menambahkan ajakan jadian.

Nama area: `things about you ✧` atau `a very biased observation`.

Letakkan area ini sebagai **ruangan/section yang bisa ditemukan dari main room**, misalnya dengan mengeklik cermin, foto polaroid, atau buku kecil di meja. Tambahkan juga pintasan kecil di `night map` bernama `compliment corner`. Dengan begitu, pujian terasa seperti kejutan yang sengaja disiapkan, bukan pop-up yang memaksa.

Judul dan copywriting:
- Heading: `a very, very unbiased list (trust me)`
- Subheading: `just a few things i've noticed about you ♡`
- Intro: `okay, don't get a big head about this. but...`

Tampilkan pujian sebagai kartu pixel/polaroid yang dapat diklik satu per satu. Gunakan contoh teks berikut sebagai placeholder yang mudah diganti:
- `first of all, you're ridiculously pretty. this is getting a little unfair.`
- `your smile? yeah, that one. very distracting. 10/10, no notes.`
- `you have this way of making an ordinary moment feel a little less ordinary.`
- `sometimes you look so good it's honestly rude. please be considerate.`
- `you being cute without even trying is a suspicious talent.`
- `official report: face card is strong. investigation ongoing.`
- `there's something about your vibe that makes people want to stay a little longer.`
- `this note is scientifically biased because the person who made this website thinks you're really, really cute.`

Interaksi:
- Klik kartu untuk membaliknya dan melihat pujian di bagian belakang.
- Kartu bisa muncul dengan animasi kecil, sparkles, atau pixel hearts—jangan gunakan animasi berlebihan.
- Setelah membuka beberapa kartu, tampilkan dialog: `okay, that's enough compliments for one visit. (there are more. obviously.)`
- Opsional: tombol `one more, please` untuk membuka kartu pujian acak.
- Simpan semua teks pujian dalam satu array/config file supaya mudah dipersonalisasi.

Nada tulisan harus terasa seperti orang yang jelas-jelas punya crush: memuji wajahnya, senyum, gaya, aura, dan hal kecil yang bikin dia menarik. Campurkan pujian tulus dengan godaan receh agar tidak terasa seperti daftar gombalan generik. Jangan membuat klaim tentang sifat atau pengalaman spesifik yang belum diberikan; biarkan teks mudah diedit oleh pemilik website.

Area ini harus cukup menonjol untuk ditemukan, tetapi tetap menjadi bagian dari eksplorasi game. Jangan hanya menyelipkan satu compliment random; buat **satu section yang jelas dan memorable**.

### Scene 4 — Mini game: Catch the Stars
Buat mini game yang benar-benar dapat dimainkan.

Aturan:
- Pemain menggerakkan keranjang/karakter ke kiri dan kanan untuk menangkap bintang yang jatuh.
- Kontrol desktop: tombol panah kiri/kanan atau A/D.
- Kontrol mobile: tombol kiri/kanan di layar; dukung sentuhan.
- Setiap bintang tertangkap menambah skor.
- Target menang: 10 bintang.
- Tambahkan timer yang wajar (misalnya 30 detik), tombol mulai, tombol ulangi, skor, dan pesan hasil.
- Pastikan kontrol tidak mengganggu scroll halaman di mobile.
- Sediakan fallback jika keyboard tidak tersedia.

Pesan menang:
- `star collector unlocked!`
- `your reward: one (1) imaginary cookie 🍪`

Pesan jika waktu habis:
- `the stars are slippery little things. try again?`

### Scene 5 — Random message room
Tampilkan panel seperti buku catatan atau dialog RPG.

Judul:
- `a note from the void`

Tombol:
- `tell me something`

Setiap klik menampilkan satu pesan dari kumpulan berikut:
- `psst. drink some water, little human.`
- `today's reminder: you're doing better than you think.`
- `breaking news: someone has excellent taste in websites.`
- `you found this button. your reward is absolutely nothing. congrats.`
- `tiny reminder: stretch your shoulders for a sec.`
- `the local moon says hi. don't question it.`

Hindari pesan yang menyiratkan cinta secara eksplisit. Pastikan pesan tidak berulang dua kali berturut-turut jika memungkinkan.

### Scene 6 — Playlist room
Judul:
- `songs under the moon`
- `some songs sound better when the world gets quiet.`
- `press play. stay a little.`

Fitur:
- Daftar 3–5 lagu yang dapat dikonfigurasi dengan judul, artis, cover, dan catatan personal pendek.
- Gunakan link/embed resmi Spotify atau sumber audio yang memang tersedia; jangan mengambil atau meng-host lagu berhak cipta tanpa izin.
- Jangan autoplay audio. Musik baru dimulai setelah pengguna menekan play.
- Sediakan kontrol play/pause dan mute jika audio dipakai.
- Jika belum ada lagu yang ditentukan, buat data placeholder yang mudah diganti di satu file konfigurasi dan jangan mengarang link embed.

### Scene 7 — Hidden easter eggs
Tambahkan setidaknya 3 easter egg yang bisa ditemukan:
1. Klik bulan lima kali → bulan berubah dan memunculkan bintang kecil.
2. Klik tanaman → karakter memberi komentar aneh/lucu.
3. Kumpulkan 10 bintang di mini game → buka secret badge dan dialog rahasia.
4. Opsional: klik buku atau kombinasi keyboard untuk membuka secret room.

Teks secret room:
- `a tiny secret for you ♡`
- `some things don't need a big explanation.`
- `sometimes, it's enough to make a little world and let someone wander through it.`

Jangan mengunci fitur inti secara berlebihan. Easter egg adalah bonus, bukan syarat untuk menyelesaikan website.

### Scene 8 — Goodbye screen
Teks:
- `leaving already?`
- `that's okay. the little stars will still be here whenever you visit again.`
- `take care on your way out, yeah?`

Tombol:
- `back to my little world`

Tombol membawa pengguna kembali ke main room.

## 6. Peta navigasi

Buat panel `night map.exe` dengan daftar lokasi:
- `bedroom` — the starting point
- `star arcade` — a tiny challenge
- `music room` — press play
- `message corner` — a note from the void
- `compliment corner` — a very, very unbiased list
- `secret garden` — not unlocked yet

Setiap lokasi menjadi tombol yang benar-benar dapat membuka scene terkait. Tampilkan status lokasi atau badge yang sudah ditemukan. Jangan menampilkan progress palsu; status harus berasal dari state aktual.

## 7. State dan persistensi

Gunakan React state untuk:
- Scene/room aktif.
- Pesan random saat ini.
- Skor dan status mini game.
- Status easter egg yang ditemukan.
- Badge yang sudah terbuka.
- Status audio.

Gunakan `localStorage` secara sederhana untuk menyimpan badge/easter egg yang sudah ditemukan agar tetap ada saat halaman dibuka lagi. Berikan opsi `reset discoveries` di menu kecil jika mudah dilakukan. Tangani kegagalan akses `localStorage` dengan aman.

## 8. Responsivitas dan aksesibilitas

- Prioritaskan layar HP 360px ke atas, lalu tablet dan desktop.
- Pada desktop, main room bisa menyerupai layar game; pada mobile, scene harus tetap terbaca dan objek klik memiliki area sentuh yang cukup.
- Semua tombol harus memiliki label yang jelas.
- Jangan mengandalkan warna saja untuk menunjukkan status.
- Jaga kontras teks.
- Dukung navigasi keyboard dasar dan fokus yang terlihat.
- Gunakan `prefers-reduced-motion` untuk mengurangi animasi.
- Jangan autoplay audio.
- Jangan gunakan flashing cepat atau efek yang berpotensi mengganggu.

## 9. Struktur komponen yang disarankan

Boleh disesuaikan dengan struktur proyek, tetapi pisahkan tanggung jawab:

- `App` — state utama dan routing antar-scene.
- `LoadingScene`
- `MainRoom`
- `PixelCharacter`
- `CharacterInteraction`
- `NightMap`
- `StarCatchGame`
- `MessageRoom`
- `PlaylistRoom`
- `SecretRoom`
- `GoodbyeScene`
- `DialogBox`
- `PixelButton`
- `StarBackground`

Simpan pesan, data lagu, label lokasi, dan konfigurasi karakter di file terpisah jika membantu pemeliharaan.

## 10. Acceptance criteria / checklist selesai

Proyek dianggap selesai jika:

- [ ] Website dapat dijalankan dengan `npm run dev`.
- [ ] Tampilan konsisten dengan cozy dreamy pixel game.
- [ ] Loading screen dapat menuju main room.
- [ ] Objek di main room memiliki interaksi yang berfungsi.
- [ ] Kedua karakter memiliki penampilan berbeda dan animasi ringan.
- [ ] Mini game dapat dimainkan dengan keyboard dan kontrol mobile.
- [ ] Random message berubah saat tombol diklik.
- [ ] Playlist room menampilkan data lagu dan tidak autoplay.
- [ ] Minimal 3 easter egg benar-benar berfungsi.
- [ ] Night map dapat membuka scene yang dipilih.
- [ ] Tombol kembali dan goodbye berfungsi.
- [ ] Progress penemuan tersimpan dengan aman.
- [ ] Layout nyaman di mobile dan desktop.
- [ ] Tidak ada tombol palsu, tautan rusak, error console yang diketahui, atau placeholder yang disamarkan sebagai fitur selesai.

## 11. Cara kerja yang diharapkan dari Antigravity

1. Periksa struktur dan dependensi proyek yang ada sebelum mengubah apa pun.
2. Buat rencana singkat dan implementasikan website secara bertahap.
3. Bangun pengalaman inti terlebih dahulu: main room, navigasi, karakter, dan mini game.
4. Lanjutkan dengan playlist, random messages, dan easter eggs.
5. Jalankan proyek dan periksa error build/console.
6. Uji navigasi, kontrol mini game, interaksi objek, penyimpanan progress, dan layout mobile.
7. Perbaiki masalah yang ditemukan, lalu rangkum file yang dibuat/diubah dan cara menjalankan proyek.
8. Jangan berhenti setelah membuat rencana atau mockup; lanjutkan sampai implementasi berfungsi.

## 12. Hal yang harus mudah dikustomisasi

Sediakan satu tempat konfigurasi yang mudah ditemukan untuk:
- Nama/judul website.
- Nama karakter dan role: Keonho = player/muse; Seonghyeon = visual system guide; Sebastian Everett = nama yang tampil pada sistem/dialog.
- Nama player yang dimasukkan lewat pop-up (runtime state, bukan hard-coded).
- Warna outfit dan detail sprite.
- Kumpulan random messages.
- Daftar lagu dan link resmi.
- Teks dialog dan secret messages.
- Target skor mini game.

Jangan menulis ulang banyak komponen hanya untuk mengganti pesan atau lagu.

---

## 13. Konsistensi POV dan dialog (wajib)

- Pengunjung memasuki game sebagai player/muse Keonho.
- Sebelum gameplay, pengunjung wajib mengisi nama melalui modal pop-up.
- Nama input pengunjung dipakai dalam greeting dan dialog yang relevan.
- Karakter pemandu sistem adalah sprite Seonghyeon, tetapi nama pembicara yang ditampilkan adalah **Sebastian Everett**.
- Jangan menyebut Keonho sebagai system atau Sebastian sebagai player.
- Compliment Corner ditulis dari sudut pandang pembuat website/guide yang mengagumi player, dengan pujian yang manis dan sedikit menggoda. Hindari confess eksplisit atau ajakan jadian.
- Pastikan semua teks yang menyebut `you`, nama player, atau Sebastian konsisten dengan POV tersebut.

**Prioritas utama:** website harus terasa seperti dunia pixel kecil yang bisa dijelajahi, hangat, lucu, penuh kejutan, dan jelas dibuat khusus untuk crush. Tetap playful dan subtle—bukan halaman confess.
