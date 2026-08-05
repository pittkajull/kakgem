export const navItems = [
  { label: 'Home', target: 'Home' },
  { label: 'Profile', target: 'About' },
  { label: 'Aktivasi', target: 'Works' },
  { label: 'Gabung Anggota', target: 'Membership' },
]

export const services = [
  { no: '01', title: 'Literasi Digital', text: 'Menguatkan kecakapan digital melalui pelatihan, diskusi, dan program kolaboratif.', accent: 'lime' },
  { no: '02', title: 'Kolaborasi Profesional', text: 'Memperluas jejaring antara akademisi, influencer, stakeholder, masyarakat, dan pegiat digital.', accent: 'blue' },
  { no: '03', title: 'Inovasi Berdampak', text: 'Mendorong karya dan solusi digital yang berkualitas, beretika, dan bermanfaat.', accent: 'orange' },
]

export const leadership = {
  chair: ['FN', 'Ketua', 'Franko Nero, S.P.'],
  viceChair: ['WK', 'Wakil Ketua', 'Koordinasi Pengurus'],
  secretary: ['AP', 'Sekretaris', 'Ari Akbar Devananta, S.Pi.'],
  treasurer: ['YS', 'Bendahara', 'Yulita Windi Nuraini, S.P., M.Sc.'],
}

export const divisionsTeam = [
  ['HH', 'Organisasi & Keanggotaan', 'Hendra Agus Herlambang, S.P.'],
  ['AU', 'Fasilitasi Alumni', 'Ajeng Respati Wiji Utami, S.S.'],
  ['YD', 'Pengkajian & Advokasi Kebijakan', 'Yudha Purbawa, S.P., M.Sc., M.Ec.Dev.'],
  ['BP', 'Kerjasama & Kemitraan', 'Bagus Shidqi Hakim, S.Tr.Par.'],
  ['RP', 'Pengabdian Masyarakat', 'Rino Damar Jati, S.Par.'],
  ['OA', 'Penggalangan Dana', 'Oktavina Dzinuha Ananda, S.AB.'],
  ['YP', 'Komunitas', 'Yudha Kristiawan, S.Fil., M.Phil.'],
  ['FE', 'Aktivasi Sosial Media', 'Faris Adlin, S.T., M.Eng.'],
  ['DM', 'Riset & Pengembangan', 'Dian Pramitasari, A.Md.'],
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
  ['/img/2026_04_11_18_00_IMG_1833.JPG', 'Aktivasi digital', 'Belajar bersama'],
  ['/img/COP01930.JPG', 'Kolaborasi lintas profesi', 'Kagama Digi · Community'],
  ['/img/IMG_0637.JPG', 'Ruang bertukar ide', 'Digital literacy'],
  ['/img/IMG_2985.JPG', 'Aktivasi berdampak', 'Innovation · Community'],
  ['/img/IMG_3338.JPG', 'Dari ruang kelas', 'Knowledge sharing'],
  ['/img/2026_04_11_18_00_IMG_1835.JPG', 'Tumbuh bersama', 'Kagama Digi · People'],
  ['/img/WhatsApp%20Image%202026-04-25%20at%2023.07.07.jpg', 'Jejaring yang hidup', 'Collaboration'],
  ['/img/IMG_4900.JPG', 'Komunitas yang beragam', 'Kagama Digi · Together'],
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
