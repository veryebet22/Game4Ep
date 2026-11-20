// ============================================
// Game Configuration
// Bahasa Indonesia santai, aesthetic, manis & gaul (bby, sayang)
// ============================================

export const GAME_CONFIG = {
  title: 'somewhere, in our little universe',
  tagline: 'semesta kecil yang sengaja kubikin buat kamu ♡',
  
  characters: {
    player: {
      name: 'Keonho',
      label: 'kamu, player one 📸',
      role: 'player/muse',
    },
    guide: {
      name: 'Sebastian Everett',
      visualRef: 'Seonghyeon',
      label: 'Sebastian Everett · pemandu kamu 🌙',
      role: 'system guide',
    },
  },

  starGame: {
    targetScore: 10,
    timeLimit: 30,
    starInterval: 550,
    starSpeed: 3.2,
  },

  colors: {
    midnight: '#1B203E',
    deepNight: '#0E1124',
    lavender: '#8E82E2',
    lilac: '#D6B8F7',
    dustyPink: '#FFB3D6',
    cream: '#FFF9E6',
  },
};



export const RANDOM_MESSAGES = [
  'baby, jam segini masih melek aja. emang besok nggak butuh jadi orang ganteng?',
  'minum air putih juga yaa, jangan yang manis-manis mulu. although you are one too.',
  'kamu tuh imut banget, ngeselin. gimana ceritanya bisa dua-duanya sekaligus?',
  'another day, another night of you refusing to sleep. proud of u? absolutely not.',
  'kamu kalau cerita sesuatu yang kamu suka tuh heboh banget. lucu aja ngeliatnya.',
  'jangan manis-manis. nanti saingan gua makin banyak.',
  'jangan lupa banyak istirahat ya, sayang.',
  'kalau hari ini capek, cerita ke aku aja ya? if you want to.',
  'you can yap about your day to me, even the most random stuff. i like listening to you.',
  'kalau lagi nggak baik-baik aja, nggak perlu pura-pura ceria terus di depanku, okay?',
  'please get enough sleep, baby. dunia nggak bakal kiamat kalau kamu tidur lebih awal sehari.',
  'hari ini udah hebat banget kok. sekarang istirahat dulu, besok lanjut jadi manusia bawel lagi.',
];

export const CHARACTER_DIALOGS = [
  'kamu tinggal senyum doang, aku yang repot sendiri. unfair banget, sayang.',
  'malam ini adem banget ya. cocok buat ngobrol random sama kamu sampai lupa waktu.',
  'akhirnya mampir juga. kirain udah lupa jalan ke sini, bby.',
  'mau foto? bentar, bentar. rambutku udah oke belum? harus ganteng di semua angle dong.',
  'ssst, bentar. lagi menikmati suasana, jangan dirusuhin dulu 😔',
];

export const SEBASTIAN_DIALOGS = [
  'hai, bby. akhirnya dateng juga. kirain udah lupa.',
  'malam ini adem banget. cocok buat nongkrong, ngobrol ngalor-ngidul, dan pelukan sama kamu.',
  'ayo main arcade bareng aku! jangan cuma muter-muter doang, masa kalah rajin sama aku.',
  'udah minum air belum, hm? jangan mentang-mentang suka yang manis-manis terus lupa minum air putih.',
  'mau foto? gas aja, baby. good angle mah semua angle kalau modelnya aku.',
  'ssst, sini dulu. liat bintang bentar, nggak usah buru-buru ke mana-mana.',
  'fokus banget sih kamu. lagi ngapain, hm? boleh kepo dikit nggak?',
];

export const COMPLIMENTS = [
  'please, Mr. Pietro. bisa nggak sih gantengnya dikurangin dikit? susah fokus jadinya.',
  'how are you this handsome without even trying, sir? agak nggak adil ya.',
  'senyum tipis Mr. Pietro tuh bahaya juga ternyata. noted.',
  'ganteng, imut, bawel pula. paket lengkap banget ya, Pak Pietro.',
  'Mr. Pietro, your smile is actually one of my favorite things. jangan geer dulu.',
  'honestly, Mr. Pietro, ada aja hal kecil dari kamu yang bikin aku senyum sendiri.',
  'nggak semua hal harus kamu bikin lucu, Mr. Pietro. diem aja juga udah gemesin.',
];

// Playlist lagu Indonesia romantis & manis: HIVI!, Tulus, Afgan
// `localFile` points to a file in public/music/. The player checks
// each path on the server; if a file is missing it reports honestly.
// Drop the file at the listed path and it plays locally everywhere.
export const PLAYLIST = [
  {
    title: "Siapkah Kau 'Tuk Jatuh Cinta Lagi",
    artist: 'HIVI!',
    trackId: '1uF0XYWWeoWEWipY855GxT',
    emoji: '💖',
    note: 'lagu paling pas buat kamu, bby... siap nggak jatuh cinta lagi sama aku?',
    spotifyUrl: 'https://open.spotify.com/track/1uF0XYWWeoWEWipY855GxT',
    localFile: '/music/HIVI - Siapkah Kau Tuk Jatuh Cinta Lagi.mp3',
  },
  {
    title: 'Mata Ke Hati',
    artist: 'HIVI!',
    trackId: '1Ml2eaYgtXPdklPnZeVqqv',
    emoji: '👀',
    note: 'dari mata turun ke hati, persis kayak caraku merhatiin kamu tiap hari, sayang.',
    spotifyUrl: 'https://open.spotify.com/track/1Ml2eaYgtXPdklPnZeVqqv',
    localFile: '/music/hivi-mata-ke-hati.m4a',
  },
  {
    title: 'Teman Hidup',
    artist: 'Tulus',
    trackId: '1U1qumuS2O5Qttw8G7UXOZ',
    emoji: '🌙',
    note: 'tetaplah bersamaku jadi teman hidupku... dengerin ini berasa dunia cuma milik kita berdua, bby.',
    spotifyUrl: 'https://open.spotify.com/track/1U1qumuS2O5Qttw8G7UXOZ',
    localFile: '/music/08 Tulus - Teman Hidup.mp3',
  },
  {
    title: 'Jatuh Suka',
    artist: 'Tulus',
    trackId: '6PqWdGIYq5xdLaa4zCZfRp',
    emoji: '✨',
    note: 'candu banget vibesnya, kayak rasa suka yang pelan-pelan tapi pasti ke kamu, sayang.',
    spotifyUrl: 'https://open.spotify.com/track/6PqWdGIYq5xdLaa4zCZfRp',
    localFile: '/music/tulus-jatuh-suka.mp3',
  },
  {
    title: 'Panah Asmara',
    artist: 'Afgan',
    trackId: '2n5MdJ8bdz4QYOTdeZaBd5',
    emoji: '💘',
    note: 'berdebar rasa di dada tiap liat senyum kamu. panah asmaranya nembus beneran nih, bby.',
    spotifyUrl: 'https://open.spotify.com/track/2n5MdJ8bdz4QYOTdeZaBd5',
    localFile: '/music/afgan-panah-asmara.m4a',
  },
  {
    title: 'Bukan Cinta Biasa',
    artist: 'Afgan',
    trackId: '7pnySx65jx0qm8ZmV6R56m',
    emoji: '🌌',
    note: 'karena rasa sayang ini emang nggak biasa dan tulus cuma buat kamu, ganteng.',
    spotifyUrl: 'https://open.spotify.com/track/7pnySx65jx0qm8ZmV6R56m',
    localFile: '/music/Afgan - Bukan Cinta Biasa (Official Music Video).flac',
  },
];

export const MAP_LOCATIONS = [
  { id: 'main', name: 'kamar kita', desc: 'ruang kamar tidur yang hangat', emoji: '🏠', locked: false },
  { id: 'game', name: 'star arcade', desc: 'tangkap bintang buat aku yuk, bby', emoji: '⭐', locked: false },
  { id: 'playlist', name: 'ruang musik', desc: 'lagu manis buat malam yang tenang', emoji: '🎵', locked: false },
  { id: 'messages', name: 'catatan semesta', desc: 'pesan hangat dari luar angkasa, sayang', emoji: '📖', locked: false },
  { id: 'compliments', name: 'kata manis', desc: 'alasan kenapa kamu selalu bikin salting ♡', emoji: '💝', locked: false },
  { id: 'secret', name: 'taman rahasia', desc: 'tempat tersembunyi kita berdua', emoji: '🌿', locked: true },
];

export const BADGES = [
  { id: 'explorer', name: '🗺️ si penjelajah', desc: 'udah berkunjung ke peta malam' },
  { id: 'star_collector', name: '⭐ kolektor bintang', desc: 'berhasil nangkep 10 bintang buat aku, bby' },
  { id: 'message_finder', name: '📖 pembaca pesan', desc: 'baca catatan manis dari semesta' },
  { id: 'music_lover', name: '🎵 penikmat musik', desc: 'dengerin lagu manis di bawah sinar bulan' },
  { id: 'moon_gazer', name: '🌙 pemuja bulan', desc: 'ngeklik bulan 5 kali di kamar' },
  { id: 'plant_whisperer', name: '🌿 sahabat tanaman', desc: 'ngobrol santai sama si tanaman' },
  { id: 'selfie_taker', name: '📸 partner foto', desc: 'foto polaroid gemes bareng berdua di cermin' },
  { id: 'secret_finder', name: '✨ penemu rahasia', desc: 'berhasil nemuin taman rahasia kita' },
  { id: 'compliment_reader', name: '💝 korban salting', desc: 'udah baca dan salting sama semua kata manis' },
];

export const SECRET_ROOM_TEXT = [
  'tempat rahasia kecil kita berdua ♡',
  'nggak semua hal di dunia ini butuh alasan rumit kok, bby.',
  'kadang, bikin semesta kecil yang nyaman kayak gini udah lebih dari cukup cuma buat liat senyum kamu, sayang.',
];


export const PLANT_COMMENTS = [
  'katanya mau tidur cepet. katanya.',
  'Bby, tanaman aja butuh istirahat. masa kamu nggak?',
  'aku emang nggak bisa ke mana-mana, tapi setidaknya aku nggak begadang tiap malem, kayak siapa tuh?',
  'lagi seneng banget ya? dari tadi senyum-senyum sendiri.',
  'kalau capek, istirahat. jangan dipaksa terus, manusia satu ini.',
];