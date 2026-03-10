// Mock data for STTB website - replaces .NET backend calls in development

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  featured: boolean;
  status: "published" | "draft";
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  imageUrl: string;
  category: string;
  registrationUrl?: string;
}

export interface Faculty {
  id: string;
  name: string;
  title: string;
  degree: string;
  specialization: string;
  imageUrl: string;
  email?: string;
}

export interface FacultyEnriched {
  id: string;
  name: string;
  title: string;
  rank: "pimpinan" | "tetap" | "tidak-tetap";
  degree: string;
  specialization: string;
  imageUrl: string;
  email?: string;
  bio: string;
  courses: string[];
  almaMater: string;
  origin: string;
}

export interface Program {
  id: string;
  level: "S1" | "S2";
  name: string;
  slug: string;
  description: string;
  duration: string;
  credits: number;
  degree: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "STTB Mengadakan Konferensi Teologi Transformasi 2025",
    slug: "konferensi-teologi-transformasi-2025",
    excerpt:
      "Sekolah Tinggi Teologi Bandung menyelenggarakan konferensi teologi internasional bertema 'Transformasi Gereja di Era Digital' yang dihadiri lebih dari 500 peserta dari seluruh Indonesia.",
    content: `<p>Sekolah Tinggi Teologi Bandung (STTB) sukses menyelenggarakan Konferensi Teologi Transformasi 2025 pada tanggal 15-17 Maret 2025 di Gedung Serbaguna STTB.</p>
    <p>Konferensi yang bertema "Transformasi Gereja di Era Digital" ini dihadiri oleh lebih dari 500 peserta dari berbagai denominasi gereja di seluruh Indonesia, termasuk para pendeta, penatua, mahasiswa teologi, dan aktivis Kristen.</p>
    <p>Pembicara utama dalam konferensi ini antara lain Dr. Samuel Gunawan, Pdt. Prof. Benyamin Intan, Ph.D., dan Dr. Lena Purbawaseso, yang masing-masing memberikan perspektif mendalam tentang peran gereja dalam menghadapi tantangan era digital.</p>`,
    category: "Konferensi",
    author: "Redaksi STTB",
    publishedAt: "2025-03-18",
    imageUrl:
      "https://images.unsplash.com/photo-1505427214476-47e71e07abfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    featured: true,
    status: "published",
  },
  {
    id: "2",
    title: "Wisuda STTB Angkatan ke-45: 120 Lulusan Siap Melayani",
    slug: "wisuda-sttb-angkatan-45",
    excerpt:
      "STTB dengan bangga meluluskan 120 mahasiswa terbaik dalam upacara wisuda yang khidmat dan penuh sukacita. Para lulusan siap berkontribusi bagi gereja dan masyarakat.",
    content: `<p>Sekolah Tinggi Teologi Bandung kembali meluluskan generasi pelayan Tuhan yang baru. Pada tanggal 20 Februari 2025, STTB menyelenggarakan Upacara Wisuda Angkatan ke-45 di Kampus STTB Bandung.</p>
    <p>Sebanyak 120 mahasiswa diwisuda dalam upacara yang dihadiri oleh keluarga, dosen, dan tamu undangan. Para wisudawan terdiri dari 65 lulusan program Sarjana Teologi, 28 lulusan Sarjana Pendidikan Kristen, dan 27 lulusan dari berbagai program Magister.</p>`,
    category: "Akademik",
    author: "Humas STTB",
    publishedAt: "2025-02-22",
    imageUrl:
      "https://images.unsplash.com/photo-1659439267023-982233253ba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    featured: true,
    status: "published",
  },
  {
    id: "3",
    title: "Program Beasiswa STTB 2025: Membuka Peluang bagi Calon Hamba Tuhan",
    slug: "beasiswa-sttb-2025",
    excerpt:
      "STTB membuka pendaftaran beasiswa penuh dan parsial untuk tahun akademik 2025/2026. Program ini ditujukan bagi calon mahasiswa berprestasi yang terpanggil untuk melayani.",
    content: `<p>Sekolah Tinggi Teologi Bandung kembali membuka program beasiswa untuk tahun akademik 2025/2026. Tersedia beasiswa penuh (full scholarship) dan beasiswa parsial bagi calon mahasiswa yang memenuhi kriteria.</p>`,
    category: "Beasiswa",
    author: "BAK STTB",
    publishedAt: "2025-01-15",
    imageUrl:
      "https://images.unsplash.com/photo-1742549586702-c23994895082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    featured: false,
    status: "published",
  },
  {
    id: "4",
    title: "STTB Jalin Kerjasama Akademik dengan Universitas Teologi Amerika",
    slug: "kerjasama-akademik-internasional",
    excerpt:
      "STTB menandatangani MoU dengan Gordon-Conwell Theological Seminary dan Calvin Theological Seminary untuk program pertukaran mahasiswa dan penelitian bersama.",
    content: `<p>Dalam upaya memperluas wawasan dan meningkatkan kualitas pendidikan teologi, STTB telah menandatangani Memorandum of Understanding (MoU) dengan dua institusi teologi terkemuka di Amerika Serikat.</p>`,
    category: "Kerjasama",
    author: "Humas STTB",
    publishedAt: "2025-01-08",
    imageUrl:
      "https://images.unsplash.com/photo-1768355680597-c1650acb43cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    featured: false,
    status: "published",
  },
  {
    id: "5",
    title: "Seminar Pastoral: Pemimpin Gereja dan Isu Kesehatan Mental",
    slug: "seminar-pastoral-kesehatan-mental",
    excerpt:
      "STTB mengadakan seminar pastoral intensif tentang pendekatan Alkitabiah terhadap kesehatan mental, konseling pastoral, dan pelayanan holistik bagi jemaat modern.",
    content: `<p>Tantangan kesehatan mental semakin nyata di era post-pandemi. STTB menjawab kebutuhan ini dengan menyelenggarakan Seminar Pastoral intensif berjudul 'Pemimpin Gereja dan Isu Kesehatan Mental'.</p>`,
    category: "Seminar",
    author: "LEAD Center STTB",
    publishedAt: "2024-12-20",
    imageUrl:
      "https://images.unsplash.com/photo-1536126750180-3c7d59643f99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    featured: false,
    status: "published",
  },
  {
    id: "6",
    title:
      "Perpustakaan STTB Kini Dilengkapi dengan Koleksi Digital Internasional",
    slug: "perpustakaan-digital-internasional",
    excerpt:
      "Perpustakaan STTB kini menyediakan akses ke lebih dari 50.000 judul buku digital dan jurnal akademik teologi internasional melalui platform ATLA Religion Database.",
    content: `<p>Perpustakaan Sekolah Tinggi Teologi Bandung terus berkembang untuk mendukung kebutuhan akademik mahasiswa dan dosen. Mulai tahun 2025, perpustakaan STTB menyediakan akses penuh ke ATLA Religion Database.</p>`,
    category: "Fasilitas",
    author: "Perpustakaan STTB",
    publishedAt: "2024-12-10",
    imageUrl:
      "https://images.unsplash.com/photo-1742549586702-c23994895082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    featured: false,
    status: "published",
  },
];

export const events: Event[] = [
  {
    id: "1",
    title: "Penerimaan Mahasiswa Baru 2025/2026",
    description:
      "Daftarkan diri Anda untuk menjadi bagian dari keluarga besar STTB. Tersedia program S1 dan S2 Teologi. Pendaftaran dibuka secara online dan offline.",
    date: "2025-04-01",
    endDate: "2025-06-30",
    location: "STTB Bandung & Online",
    imageUrl:
      "https://images.unsplash.com/photo-1659439267023-982233253ba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    category: "Admisi",
    registrationUrl: "/prosedur-admisi",
  },
  {
    id: "2",
    title: "Retreat Rohani Mahasiswa STTB 2025",
    description:
      "Retreat tahunan mahasiswa STTB yang akan diadakan di Lembang, Bandung. Tema: 'Dipanggil untuk Melayani dalam Kekudusan'.",
    date: "2025-05-15",
    endDate: "2025-05-17",
    location: "Lembang, Bandung Barat",
    imageUrl:
      "https://images.unsplash.com/photo-1536126750180-3c7d59643f99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    category: "Kerohanian",
  },
  {
    id: "3",
    title: "Konferensi LEAD: Kepemimpinan Kristen dalam Bisnis",
    description:
      "LEAD Center STTB mengadakan konferensi kepemimpinan untuk para profesional Kristen tentang integrasi iman dan dunia bisnis.",
    date: "2025-06-20",
    endDate: "2025-06-21",
    location: "Aula Utama STTB Bandung",
    imageUrl:
      "https://images.unsplash.com/photo-1505427214476-47e71e07abfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    category: "LEAD",
  },
  {
    id: "4",
    title: "Kuliah Umum: Teologi dan Artificial Intelligence",
    description:
      "Pembicara tamu dari Singapore Bible College akan membahas perspektif Alkitabiah tentang kecerdasan buatan dan masa depan manusia.",
    date: "2025-04-25",
    location: "Auditorium STTB Bandung",
    imageUrl:
      "https://images.unsplash.com/photo-1768355680597-c1650acb43cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    category: "Seminar",
  },
];

export const facultyData: FacultyEnriched[] = [
  {
    id: "1",
    name: "Prof. Dr. Benyamin Intan",
    title: "Ketua STTB",
    rank: "pimpinan",
    degree: "Ph.D. in Systematic Theology, Calvin Theological Seminary",
    specialization: "Teologi Sistematik, Filsafat Agama",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    email: "ketua@sttb.ac.id",
    almaMater: "Calvin Theological Seminary, USA",
    origin: "Grand Rapids, Michigan — USA",
    bio: "Prof. Dr. Benyamin Intan adalah akademisi dan rohaniwan terkemuka dengan pengalaman lebih dari 30 tahun dalam pendidikan teologi. Sebagai Ketua STTB, beliau memimpin visi transformasi institusi menuju pendidikan teologi yang relevan, akademis, dan berdampak bagi gereja Indonesia.",
    courses: [
      "Teologi Sistematik I & II",
      "Filsafat Agama",
      "Teologi Reformed & Injili",
    ],
  },
  {
    id: "2",
    name: "Dr. Samuel Gunawan",
    title: "Wakil Ketua Akademik",
    rank: "pimpinan",
    degree: "Ph.D. in New Testament Studies, Fuller Theological Seminary",
    specialization: "Studi Perjanjian Baru, Hermeneutika",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    email: "akademik@sttb.ac.id",
    almaMater: "Fuller Theological Seminary, USA",
    origin: "Pasadena, California — USA",
    bio: "Dr. Samuel Gunawan adalah pakar Studi Perjanjian Baru yang berdedikasi dalam pengembangan kurikulum teologi berbasis riset. Sebagai Wakil Ketua Akademik, beliau memastikan standar akademis STTB sejajar dengan institusi teologi internasional.",
    courses: [
      "Studi PB 1: Kitab Injil",
      "Studi PB 2: Kis Para Rasul & Paulus",
      "Hermeneutika Biblika",
    ],
  },
  {
    id: "3",
    name: "Dr. Lena Purbawaseso",
    title: "Dosen Tetap",
    rank: "tetap",
    degree: "Th.D. in Christian Education, Gordon-Conwell Theological Seminary",
    specialization: "Pendidikan Agama Kristen, Pedagogi",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    almaMater: "Gordon-Conwell Theological Seminary",
    origin: "South Hamilton, Massachusetts — USA",
    bio: "Dr. Lena Purbawaseso membawa keahlian pendidikan Kristen yang mendalam dengan spesialisasi dalam pedagogis iman. Penelitiannya berfokus pada pengembangan kurikulum anak dan remaja dalam konteks gereja urban Indonesia.",
    courses: [
      "Dasar-Dasar Pendidikan Kristen",
      "Psikologi Perkembangan",
      "Kurikulum PAK",
    ],
  },
  {
    id: "4",
    name: "Pdt. Dr. Marthen Mau",
    title: "Dosen Tetap",
    rank: "tetap",
    degree: "Ph.D. in Missiology, Biola University",
    specialization: "Misiologi, Studi Agama-agama",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    almaMater: "Biola University / Talbot School of Theology",
    origin: "La Mirada, California — USA",
    bio: "Pdt. Dr. Marthen Mau adalah misionolog dengan pengalaman lapangan di berbagai konteks budaya Nusantara. Keahliannya dalam studi agama-agama membentuk pendekatan pelayanan lintas budaya di STTB.",
    courses: ["Misiologi", "Fenomenologi Agama", "Iman & Kebudayaan"],
  },
  {
    id: "5",
    name: "Dr. Grace Liem",
    title: "Dosen Tetap",
    rank: "tetap",
    degree: "Ph.D. in Old Testament, Trinity Evangelical Divinity School",
    specialization: "Studi Perjanjian Lama, Bahasa Ibrani",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    almaMater: "Trinity Evangelical Divinity School",
    origin: "Deerfield, Illinois — USA",
    bio: "Dr. Grace Liem adalah spesialis Perjanjian Lama dan bahasa Ibrani yang diakui di tingkat nasional. Penelitiannya meliputi studi Kitab Sastra Hikmat dan relevansinya bagi spiritualitas kontemporer.",
    courses: ["Studi PL 1–4", "Bahasa Ibrani", "Teologi Biblika Lanjutan"],
  },
  {
    id: "6",
    name: "Pdt. Dr. Yohanes Adrie Hartopo",
    title: "Dosen Tetap",
    rank: "tetap",
    degree: "Ph.D. in Historical Theology, Westminster Theological Seminary",
    specialization: "Sejarah Gereja, Teologi Reformed",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    almaMater: "Westminster Theological Seminary",
    origin: "Philadelphia, Pennsylvania — USA",
    bio: "Pdt. Dr. Yohanes Adrie Hartopo adalah sejarawan gereja yang menghubungkan warisan teologi Reformed klasik dengan tantangan konteks Indonesia. Publikasi ilmiahnya telah menjadi referensi dalam studi Sejarah Gereja nasional.",
    courses: [
      "Sejarah Gereja Dunia",
      "Sejarah Gereja Indonesia",
      "Sejarah Teologi",
    ],
  },
  {
    id: "7",
    name: "Dr. Ronny Kristianus",
    title: "Dosen Tetap",
    rank: "tetap",
    degree: "Ph.D. in Practical Theology, University of South Africa",
    specialization: "Teologi Praktika, Konseling Pastoral",
    imageUrl:
      "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    almaMater: "University of South Africa (UNISA)",
    origin: "Pretoria — Afrika Selatan",
    bio: "Dr. Ronny Kristianus mengintegrasikan teologi pastoral dengan ilmu konseling modern. Keahliannya dalam Teologi Praktika membentuk pendekatan holistik dalam pelatihan konseling pastoral di STTB.",
    courses: [
      "Konseling Pastoral – Dasar",
      "Konseling Pastoral – Pastoral Issues",
      "Formasi Spiritualitas",
    ],
  },
  {
    id: "8",
    name: "Pdt. Dr. Hendra Wijaya",
    title: "Dosen Tidak Tetap",
    rank: "tidak-tetap",
    degree: "Th.D. in Biblical Theology, Dallas Theological Seminary",
    specialization: "Teologi Biblika, Eksegesis",
    imageUrl:
      "https://images.unsplash.com/photo-1542178243-bc20204b769f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    almaMater: "Dallas Theological Seminary",
    origin: "Dallas, Texas — USA",
    bio: "Pdt. Dr. Hendra Wijaya adalah pakar eksegesis yang mengajar di beberapa institusi teologi di Indonesia. Kontribusinya di STTB berfokus pada pendalaman Teologi Biblika yang akademis dan aplikatif.",
    courses: [
      "Pengantar Alkitab dan Teologi Biblika",
      "Prolegomena & Doktrin Alkitab",
    ],
  },
];

// export const faculty: Faculty[] = [
//   {
//     id: "1",
//     name: "Prof. Dr. Benyamin Intan",
//     title: "Ketua STTB",
//     degree: "Ph.D. in Systematic Theology, Calvin Theological Seminary",
//     specialization: "Teologi Sistematik, Filsafat Agama",
//     imageUrl:
//       "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
//   },
//   {
//     id: "2",
//     name: "Dr. Samuel Gunawan",
//     title: "Wakil Ketua Akademik",
//     degree: "Ph.D. in New Testament Studies, Fuller Theological Seminary",
//     specialization: "Studi Perjanjian Baru, Hermenuetika",
//     imageUrl:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
//   },
//   {
//     id: "3",
//     name: "Dr. Lena Purbawaseso",
//     title: "Dosen Tetap",
//     degree: "Th.D. in Christian Education, Gordon-Conwell",
//     specialization: "Pendidikan Agama Kristen, Pedagogi",
//     imageUrl:
//       "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
//   },
//   {
//     id: "4",
//     name: "Pdt. Dr. Marthen Mau",
//     title: "Dosen Tetap",
//     degree: "Ph.D. in Missiology, Biola University",
//     specialization: "Misiologi, Studi Agama-agama",
//     imageUrl:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
//   },
//   {
//     id: "5",
//     name: "Dr. Grace Liem",
//     title: "Dosen Tetap",
//     degree: "Ph.D. in Old Testament, Trinity Evangelical Divinity School",
//     specialization: "Studi Perjanjian Lama, Bahasa Ibrani",
//     imageUrl:
//       "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
//   },
//   {
//     id: "6",
//     name: "Pdt. Dr. Yohanes Adrie Hartopo",
//     title: "Dosen Tetap",
//     degree: "Ph.D. in Historical Theology, Westminster Theological Seminary",
//     specialization: "Sejarah Gereja, Teologi Reformed",
//     imageUrl:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
//   },
// ];

export const programs: Program[] = [
  {
    id: "1",
    level: "S1",
    name: "Sarjana Teologi",
    slug: "sarjana-teologi",
    description:
      "Program studi empat tahun yang membekali mahasiswa dengan fondasi teologis yang kokoh, pemahaman Alkitab yang mendalam, dan keterampilan pastoral untuk melayani gereja dan masyarakat.",
    duration: "4 tahun (8 semester)",
    credits: 148,
    degree: "S.Th.",
  },
  {
    id: "2",
    level: "S1",
    name: "Sarjana Pendidikan Kristen",
    slug: "sarjana-pendidikan-kristen",
    description:
      "Program yang mempersiapkan guru agama Kristen, pembina anak dan remaja, serta pemimpin pendidikan gerejawi yang kompeten dan berkarakter Kristiani.",
    duration: "4 tahun (8 semester)",
    credits: 144,
    degree: "S.Pd.K.",
  },
  {
    id: "3",
    level: "S2",
    name: "Magister Teologi – Pelayanan Pastoral Gereja Urban",
    slug: "magister-teologi-pelayanan-pastoral-gereja-urban",
    description:
      "Program pascasarjana yang mempersiapkan gembala sidang dan pemimpin gereja untuk melayani secara efektif dalam konteks perkotaan yang kompleks dan dinamis.",
    duration: "2 tahun (4 semester)",
    credits: 72,
    degree: "M.Th.",
  },
  {
    id: "4",
    level: "S2",
    name: "Magister Teologi – Transformasi Budaya & Masyarakat",
    slug: "magister-teologi-transformasi-budaya-masyarakat",
    description:
      "Program yang mempersiapkan pemimpin gereja dan aktivis sosial untuk menghadirkan transformasi Kerajaan Allah dalam berbagai lapisan budaya dan struktur masyarakat.",
    duration: "2 tahun (4 semester)",
    credits: 72,
    degree: "M.Th.",
  },
  {
    id: "5",
    level: "S2",
    name: "Magister Pendidikan Kristen",
    slug: "magister-pendidikan-kristen",
    description:
      "Program lanjutan untuk para pendidik Kristen yang ingin mengembangkan keahlian pedagogis, kurikulum, dan kepemimpinan pendidikan berbasis iman.",
    duration: "2 tahun (4 semester)",
    credits: 68,
    degree: "M.Pd.K.",
  },
  {
    id: "6",
    level: "S2",
    name: "Magister Ministri – Marketplace",
    slug: "magister-ministri-marketplace",
    description:
      "Program inovatif yang membekali profesional bisnis, entrepreneur, dan pekerja Kristen untuk mengintegrasikan iman dengan pekerjaan secara transformatif.",
    duration: "2 tahun (4 semester)",
    credits: 68,
    degree: "M.Min.",
  },
  {
    id: "7",
    level: "S2",
    name: "Magister Ministri – Kepemimpinan Pastoral",
    slug: "magister-ministri-kepemimpinan-pastoral",
    description:
      "Program yang mengembangkan kapasitas kepemimpinan rohani, manajemen gereja, dan pembinaan jemaat bagi para pemimpin gereja masa kini.",
    duration: "2 tahun (4 semester)",
    credits: 68,
    degree: "M.Min.",
  },
  {
    id: "8",
    level: "S2",
    name: "Magister Ministri – Teologi Pelayanan Gerejawi",
    slug: "magister-ministri-teologi-pelayanan-gerejawi",
    description:
      "Program yang mengintegrasikan teologi biblika dengan praktik pelayanan gerejawi yang kontekstual dan efektif untuk berbagai denominasi.",
    duration: "2 tahun (4 semester)",
    credits: 68,
    degree: "M.Min.",
  },
];

export const stats = {
  studentsTotal: 850,
  graduates: 3500,
  faculty: 45,
  yearsEstablished: 1971,
  programs: 8,
  accreditation: "B",
};
