import {
  activationHighlights,
  divisionsTeam,
  gallery,
  journeyPhases,
  leadership,
  programs,
  services,
  workshopTopics,
} from './siteData'

const galleryItems = gallery.map(([src, title, meta]) => ({ src, title, meta }))

export const defaultSiteContent = {
  brand: {
    name: 'kagama digi',
    logo: '/img/logo.png',
    navCta: 'Kontak Admin Kagama Digi',
  },
  hero: {
    eyebrow: 'Keluarga Alumni Universitas Gadjah Mada · Komunitas Digital dan Inovasi',
    title: 'Komunitas kreatif',
    highlight: 'bangun ekosistem',
    titleEnd: 'digital yang positif',
    description: 'Komunitas profesional Universitas Gadjah Mada yang memanfaatkan ruang digital positif secara kolaboratif, mempertemukan berbagai elemen masyarakat, pemerintah, industri, komunitas, dan individu untuk menciptakan ekosistem internet yang aman, produktif, dan beretika.',
    image: '/img/kamadigi.webp',
    imageAlt: 'Kegiatan Kagama Digi',
    artLabel: 'KAGAMA DIGI',
    artSubLabel: 'DIGITAL / INOVASI',
    artNumber: 'KAGAMADIGI',
    caption: 'Membuat ruang untuk tumbuh bersama',
    meta: [
      { value: '01 / 08', label: '' },
      { value: 'Komunitas digital', label: '& inovasi' },
      { value: 'Yogyakarta', label: 'Indonesia' },
    ],
  },
  impact: {
    items: ['COLLABORATION', 'CREATIVITY', 'DIGITAL LITERACY', 'POSITIVE IMPACT'],
  },
  about: {
    kicker: '/01 — Profil singkat',
    title: 'Ruang kolaborasi',
    highlight: 'untuk tumbuh bersama',
    titleEnd: 'insan Kagama.',
    body: 'Kagama Digi adalah komunitas Keluarga Alumni Universitas Gadjah Mada yang menjadi ruang kolaborasi untuk pengembangan inovasi, kreativitas, dan teknologi digital.',
    mutedBody: 'Kami memperluas jaringan antara akademisi, influencer, stakeholder, masyarakat, dan pegiat digital serta menumbuhkan literasi digital melalui konten yang berkualitas, beretika, dan berdampak positif.',
    vision: 'Menjadi ruang kolaborasi strategis insan Kagama dalam mengembangkan inovasi, kreativitas, dan teknologi digital untuk menciptakan dampak nyata.',
    mission: 'Membangun ruang tumbuh bersama, menguatkan kecakapan digital melalui pelatihan, dan mendorong kolaborasi lintas profesi untuk melahirkan karya yang berdampak.',
    cta: 'Gabung Kagamadigi (khusus alumni UGM)',
    stats: [
      { value: '01', label: 'Fokus', detail: 'digital & inovasi' },
      { value: 'UGM', label: 'Jejaring', detail: 'alumni' },
      { value: 'ID', label: 'Yogyakarta', detail: '& Indonesia' },
    ],
  },
  services: {
    kicker: '/02 — Fokus kerja',
    title: 'Nilai yang',
    highlight: 'kami bangun.',
    description: 'Wawasan yang terbuka. Jejaring yang terhubung. Dampak yang positif.',
    items: services,
  },
  works: {
    kicker: '/03 — Aktivasi',
    title: 'Program jangka panjang',
    highlight: 'Kagama Digi.',
    description: 'Kenali program yang sedang kami siapkan dan temukan ruang kolaborasi yang paling dekat denganmu.',
    items: programs,
  },
  journey: {
    kicker: '/04 — Perjalanan dan aktivasi',
    welcomeLabel: 'Sambutan Ketua',
    welcomeTitle: 'Selamat datang',
    welcomeHighlight: 'di Kagama Digi.',
    chairMessage: [
      'Kagama Digi lahir dari semangat kolaborasi, kreativitas, dan komitmen untuk membawa nilai-nilai keilmuan Universitas Gadjah Mada ke dalam dunia digital yang terus berkembang.',
      'Kami ingin menjadi ekosistem yang inklusif, adaptif, dan progresif—tempat setiap anggota dapat bertumbuh, berkontribusi, dan terinspirasi untuk menghadirkan karya digital yang bermanfaat bagi bangsa.',
    ],
    chairName: 'Franko Nero, S.P.',
    chairRole: 'Ketua Kagama Digi',
    storylineLabel: 'Storyline',
    storylineTitle: 'Dari ruang belajar',
    storylineHighlight: 'menjadi gerakan.',
    storylineText: 'Perjalanan Kagama Digi dirangkum sebagai proses yang terus bergerak: membangun fondasi, berbagi pengetahuan, memperluas jejaring, dan menguatkan organisasi.',
    phases: journeyPhases,
    portfolioLabel: 'Portofolio workshop',
    portfolioTitle: 'Topik yang sudah',
    portfolioHighlight: 'kami gerakkan.',
    portfolioText: 'Rangkaian kelas Kagama Digi menghubungkan pengetahuan praktis, teknologi, kreativitas, dan kebutuhan industri digital.',
    workshopTopics,
    activations: activationHighlights,
  },
  gallery: {
    kicker: '/05 — Dokumentasi aktivasi',
    title: 'Yang terjadi',
    highlight: 'ketika bertemu.',
    description: 'Dokumentasi ruang belajar, pertemuan, dan kolaborasi yang mempertemukan insan Kagama dari berbagai latar.',
    items: galleryItems,
  },
  team: {
    kicker: '/06 — Tim kami',
    title: 'Susunan',
    highlight: 'pengurus.',
    description: 'Kagama Digi digerakkan oleh pengurus harian dan bidang-bidang yang menjaga kolaborasi, kemitraan, komunitas, aktivasi digital, dan riset.',
    leadership,
    divisions: divisionsTeam,
  },
  membership: {
    kicker: '/07 — Jadi bagian dari kami',
    title: 'Temukan ruang',
    highlight: 'untuk tumbuh.',
    description: 'Gabung menjadi anggota Kagama Digi dan ikut membangun jejaring, wawasan, serta inovasi digital bersama alumni dan pegiat digital dari berbagai bidang.',
    alumniOnly: 'Khusus alumni Universitas Gadjah Mada',
    cta: 'Daftar jadi member',
    footerLeft: 'Terbuka untuk alumni Universitas Gadjah Mada',
    footerRight: 'Digital · Inovasi · Kolaborasi',
  },
  contact: {
    kicker: '/08 — Kontak',
    title: 'Bangun',
    highlight: 'dampak.',
    description: 'Untuk kolaborasi, informasi program, dan jejaring komunitas, hubungi Kagama Digi melalui kanal resmi berikut.',
    email: 'kagamadigi@gmail.com',
    whatsapp: '6285600604388',
    phoneLabel: '0856-0060-4388',
    locationName: 'Griya Mlati Indah',
    locationMeta: 'Mlati, Sleman, DIY',
    locationUrl: 'https://www.google.com/maps/search/?api=1&query=Perumahan+Griya+Mlati+Yogyakarta',
    instagram: '@kagamadigi',
    instagramUrl: 'https://www.instagram.com/kagamadigi/',
    footerEyebrow: 'Hubungi kami',
    footerText: 'kagama digi · keluarga alumni universitas gadjah mada · komunitas digital dan inovasi',
  },
  articles: {
    kicker: '/08 — Catatan Kagama Digi',
    title: 'Gagasan yang',
    highlight: 'terus bergerak.',
    description: 'Berita, cerita, dan wawasan dari ruang kolaborasi Kagama Digi.',
  },
}

export function mergeSiteContent(value) {
  if (!value || typeof value !== 'object') return defaultSiteContent
  const merge = (base, override) => {
    if (Array.isArray(base)) return Array.isArray(override) ? override : base
    if (!base || typeof base !== 'object') return override ?? base
    return Object.fromEntries(Object.keys(base).map(key => [key, merge(base[key], override?.[key])]))
  }
  return merge(defaultSiteContent, value)
}
