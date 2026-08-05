import { useEffect, useRef, useState } from 'react'

const chatReplies = [
  { keys: ['apa itu', 'tentang', 'kagama digi', 'komunitas'], answer: 'Kagama Digi adalah komunitas Keluarga Alumni Universitas Gadjah Mada yang menjadi ruang kolaborasi untuk inovasi, kreativitas, dan teknologi digital.' },
  { keys: ['visi', 'misi', 'tujuan'], answer: 'Visi Kagama Digi adalah menjadi ruang kolaborasi strategis insan Kagama dalam mengembangkan inovasi, kreativitas, dan teknologi digital untuk menciptakan dampak nyata.' },
  { keys: ['program', 'kegiatan', 'aktivitas', 'workshop'], answer: 'Program Kagama Digi mencakup literasi digital, kolaborasi profesional, inovasi berdampak, Java Influencer / Innovation Summit, Indonesia Mengajar Digital, Digi-Run, Digital Goes to Campus / School, serta workshop digital.' },
  { keys: ['daftar', 'member', 'anggota', 'gabung', 'alumni'], answer: 'Pendaftaran member tersedia di bagian “Temukan ruang untuk tumbuh”. Fitur ini khusus untuk alumni Universitas Gadjah Mada. Klik tombol “Daftar jadi member” untuk mengisi data.' },
  { keys: ['pengurus', 'struktur', 'divisi', 'bidang'], answer: 'Kagama Digi memiliki pengurus harian dan bidang Organisasi & Keanggotaan, Fasilitasi Alumni, Pengkajian & Advokasi Kebijakan, Kerjasama & Kemitraan, Pengabdian Masyarakat, Komunitas, Aktivasi Sosial Media, serta Riset & Pengembangan.' },
  { keys: ['kontak', 'whatsapp', 'wa', 'hubungi', 'instagram', 'email'], answer: 'Untuk terhubung dengan Kagama Digi, gunakan tombol “Gabung WA” di navigasi atau bagian Kontak. Email resmi yang tercantum adalah kagamadigi@ugm.ac.id.' },
]

function getChatReply(question) {
  const normalized = question.toLowerCase().trim()
  if (/^(hai|halo|hi|hello|pagi|siang|sore|malam)/.test(normalized)) return 'Halo! Aku Digi, asisten informasi Kagama Digi. Mau tahu tentang komunitas, program, pengurus, atau cara daftar member?'
  const match = chatReplies.find(item => item.keys.some(key => normalized.includes(key)))
  return match?.answer || 'Aku hanya bisa membantu menjelaskan Kagama Digi, program, kepengurusan, keanggotaan alumni UGM, dan kontak resmi. Coba tanyakan salah satu topik itu ya.'
}

export function KagamaChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Halo! Aku Digi. Aku bisa bantu menjelaskan Kagama Digi dan cara bergabung sebagai member alumni UGM.' }])
  const messagesRef = useRef(null)

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages, open])

  const sendMessage = (preset = input) => {
    const question = preset.trim()
    if (!question) return
    setMessages(current => [...current, { from: 'user', text: question }, { from: 'bot', text: getChatReply(question) }])
    setInput('')
  }

  return <aside className={`kagama-chat ${open ? 'is-open' : ''}`} aria-label="Asisten Kagama Digi">
    {open && <div className="chat-panel">
      <div className="chat-head"><div><span className="chat-eyebrow"><i /> Kagama Digi / Info desk</span><h3>Ngobrol soal <span>Kagama.</span></h3></div><button className="chat-close" onClick={() => setOpen(false)} aria-label="Tutup chatbot">×</button></div>
      <div className="chat-scope">Asisten ini hanya menjawab informasi seputar Kagama Digi.</div>
      <div className="chat-messages" ref={messagesRef} aria-live="polite">{messages.map((message, index) => <div className={`chat-message ${message.from}`} key={`${message.from}-${index}`}><span>{message.text}</span></div>)}</div>
      <div className="chat-prompts"><button onClick={() => sendMessage('Apa itu Kagama Digi?')}>Apa itu Kagama?</button><button onClick={() => sendMessage('Bagaimana cara daftar member?')}>Cara daftar member</button><button onClick={() => sendMessage('Apa saja programnya?')}>Program</button></div>
      <form className="chat-form" onSubmit={event => { event.preventDefault(); sendMessage() }}><input value={input} onChange={event => setInput(event.target.value)} placeholder="Tulis pertanyaan..." aria-label="Pertanyaan untuk asisten" /><button type="submit" aria-label="Kirim pertanyaan">↗</button></form>
    </div>}
    <button className="chat-fab" onClick={() => setOpen(current => !current)} aria-expanded={open} aria-label={open ? 'Tutup asisten Kagama Digi' : 'Buka asisten Kagama Digi'}><span className="chat-fab-mark">K</span><span className="chat-fab-label">{open ? 'Tutup' : 'Tanya Digi'}</span><span className="chat-fab-pulse" /></button>
  </aside>
}
