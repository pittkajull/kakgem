export const navItems = [
  { label: 'Gabung Anggota', target: 'Membership' },
]

export const services = [
  { no: '01', title: 'Literasi Digital', text: 'Menguatkan kecakapan digital melalui pelatihan, diskusi, dan program kolaboratif.', accent: 'lime' },
  { no: '02', title: 'Kolaborasi Profesional', text: 'Memperluas jejaring antara akademisi, influencer, stakeholder, masyarakat, dan pegiat digital.', accent: 'blue' },
  { no: '03', title: 'Inovasi Berdampak', text: 'Mendorong karya dan solusi digital yang berkualitas, beretika, dan bermanfaat.', accent: 'orange' },
]

export const leadership = [
  ['KETUA', 'FRANKO NERO, S.P.'],
  ['WAKIL', 'YUDHA PURBAWA, S.P., M.SC., M.EC.DEV.'],
  ['SEKRETARIS', 'ARI AKBAR DEVANANTA, S.Pi.'],
  ['WAKIL SEKRETARIS I', 'DESTA RATU BERLIANA, S.S.'],
  ['WAKIL SEKRETARIS II', 'FAISA ABHINAYA SARASTRI, S.Si.'],
  ['BENDAHARA UMUM', 'YULITA WINDI NURAINI, S.P., M.Sc.'],
  ['WAKIL BENDAHARA', 'ULFIDA AISYA LAISHELA, S.P.'],
]

export const divisionsTeam = [
  ['BIDANG ORGANISASI DAN KEANGGOTAAN', 'MUSTAQIM, S.SOS., M.A.'],
  ['BIDANG FASILITASI ALUMNI', 'HENDRA AGUS HERLAMBANG, S.P.'],
  ['BIDANG ADVOKASI DAN PENGKAJIAN KEBIJAKAN', 'BAGUS SHIDQI HAKIM, S.TR. PAR.'],
  ['BIDANG KERJASAMA DAN KEMITRAAN', 'AJENG RESPATI WIJI UTAMI, S.S.'],
  ['BIDANG PENGABDIAN MASYARAKAT', 'RINO DAMAR JATI, S.PAR.'],
  ['BIDANG PENGGALANGAN DANA', 'OKTAVINA DZINUHA ANANDA, S.AB.'],
  ['BIDANG KOMUNITAS', 'YUDHA KRISTIAWAN, S.FIL., M.PHIL.'],
  ['BIDANG AKTIVASI SOSIAL MEDIA', 'FARIS ADLIN, S.T., M.ENG.'],
  ['BIDANG RnD', 'DIAN PRAMITASARI, A.MD.'],
]

export const divisions = [
  'Tidak bersedia / belum memilih',
  'Bidang Organisasi & Keanggotaan',
  'Bidang Fasilitasi Alumni',
  'Bidang Pengkajian dan Advokasi Kebijakan',
  'Bidang Kerjasama dan Kemitraan',
  'Bidang Pengabdian Masyarakat',
  'Bidang Komunitas',
  'Bidang Aktivasi Sosial Media',
  'Bidang Riset & Pengembangan',
]

export const starterMembers = []

export const programs = [
  { title: 'JAVA INFLUENCER SUMMIT', tone: 'amber', description: 'Pertemuan kreator, profesional, dan jejaring digital untuk bertukar wawasan serta membangun pengaruh yang positif.' },
  { title: 'LEMBAGA SERTIFIKASI PROFESI (LSP) KAGAMA DIGI', tone: 'charcoal', description: 'Ruang penguatan kompetensi dan pengakuan profesional bagi insan digital melalui jalur sertifikasi yang relevan.' },
  { title: 'INDONESIA MENGAJAR DIGITAL', tone: 'sand', description: 'Gerakan berbagi pengetahuan digital untuk membuka akses belajar dan memperluas dampak ke berbagai komunitas.' },
  { title: 'DIGI-MINGLE OPPORTUNITY NETWORKING', tone: 'gold', description: 'Forum jejaring santai untuk mempertemukan alumni, industri, komunitas, pemerintah, dan individu.' },
]

export const gallery = [
  ['/img/WhatsApp%20Image%202026-08-05%20at%2015.32.53.jpeg', 'Ngaji Digital', 'Ruang belajar dan berbagi'],
  ['/img/WhatsApp%20Image%202026-08-05%20at%2015.36.47.jpeg', 'Praktik terbaik digital', 'Berbagi wawasan bersama'],
  ['/img/WhatsApp%20Image%202026-08-05%20at%2015.37.37.jpeg', 'Belajar lintas ruang', 'Aktivasi komunitas'],
  ['/img/WhatsApp%20Image%202026-08-05%20at%2015.38.45.jpeg', 'Eksplorasi teknologi', 'Belajar bersama'],
  ['/img/WhatsApp%20Image%202026-08-05%20at%2015.39.28.jpeg', 'Jejaring virtual', 'Kagama Digi online'],
  ['/img/WhatsApp%20Image%202026-08-05%20at%2015.39.51.jpeg', 'Ruang kolaborasi', 'Berbagi pengalaman'],
  ['/img/WhatsApp%20Image%202026-08-05%20at%2015.41.42.jpeg', 'Tumbuh bersama', 'Komunitas dan koneksi'],
  ['/img/WhatsApp%20Image%202026-08-05%20at%2015.43.22.jpeg', 'Workshop kreatif', 'Aktivasi digital'],
  ['/img/WhatsApp%20Image%202026-08-05%20at%2015.44.04.jpeg', 'Kelas produktif', 'Belajar dan berkarya'],
  ['/img/WhatsApp%20Image%202026-08-05%20at%2015.45.10.jpeg', 'Komunitas yang hidup', 'Berjumpa dan berdampak'],
]

export const displayGallery = gallery

export const emptyForm = () => ({
  name: '',
  study: '',
  faculty: '',
  year: '',
  phone: '',
  domicile: '',
  email: '',
  division: divisions[0],
})
