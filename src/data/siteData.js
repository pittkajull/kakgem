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
