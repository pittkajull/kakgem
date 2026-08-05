export const navItems = [
  { label: 'Home', target: 'Home' },
  { label: 'Tentang', target: 'About' },
  { label: 'Program', target: 'Works' },
  { label: 'Pengurus', target: 'Team' },
  { label: 'Kontak', target: 'Contact' },
]

export const services = [
  { no: '01', title: 'Literasi Digital', text: 'Menguatkan kecakapan digital melalui pelatihan, diskusi, dan program kolaboratif.', accent: 'lime' },
  { no: '02', title: 'Kolaborasi Profesional', text: 'Memperluas jejaring antara akademisi, influencer, stakeholder, masyarakat, dan pegiat digital.', accent: 'blue' },
  { no: '03', title: 'Inovasi Berdampak', text: 'Mendorong karya dan solusi digital yang berkualitas, beretika, dan bermanfaat.', accent: 'orange' },
]

export const team = [
  ['FN', 'Ketua', 'Franko Nero, S.P.'],
  ['AP', 'Sekretaris', 'Ari Akbar Devananta, S.Pi.'],
  ['DB', 'Wakil Sekretaris I', 'Desta Ratu Berliana, S.S.'],
  ['FS', 'Wakil Sekretaris II', 'Faisa Abhinaya Sarastri, S.Si.'],
  ['YS', 'Bendahara Umum', 'Yulita Windi Nuraini, S.P., M.Sc.'],
  ['UL', 'Wakil Bendahara', 'Ulfida Aisya Laishela, S.P.'],
  ['HH', 'Organisasi & Keanggotaan', 'Hendra Agus Herlambang, S.P.'],
  ['AU', 'Fasilitasi Alumni', 'Ajeng Respati Wiji Utami, S.S.'],
  ['YD', 'Advokasi & Pengkajian Kebijakan', 'Yudha Purbawa, S.P., M.Sc., M.Ec.Dev.'],
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

export const gallery = [
  ['/img/2026_04_11_18_00_IMG_1833.JPG', 'Workshop digital', 'Belajar bersama · 2026'],
  ['/img/COP01930.JPG', 'Kolaborasi lintas profesi', 'Kagama Digi · Community'],
  ['/img/IMG_0637.JPG', 'Ruang bertukar ide', 'Digital literacy · 2026'],
  ['/img/IMG_2985.JPG', 'Aktivasi berdampak', 'Innovation · Community'],
  ['/img/IMG_3338.JPG', 'Dari ruang kelas', 'Knowledge sharing · 2026'],
  ['/img/2026_04_11_18_00_IMG_1835.JPG', 'Tumbuh bersama', 'Kagama Digi · People'],
  ['/img/WhatsApp%20Image%202026-04-25%20at%2023.07.07.jpg', 'Jejaring yang hidup', 'Collaboration · 2026'],
  ['/img/IMG_4900.JPG', 'Komunitas yang beragam', 'Kagama Digi · Together'],
]

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
