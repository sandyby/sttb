using Microsoft.EntityFrameworkCore;
using sttb.Entities;
using sttb.Entities.Models;

namespace sttb.WebAPI.Seeding;

public static class DataSeeder
{
    public static async Task SeedAsync(ApplicationDbContext db, string adminUserId)
    {
        var newsCategories = await SeedNewsCategoriesAsync(db);
        var eventCategories = await SeedEventCategoriesAsync(db);
        var mediaCategories = await SeedMediaCategoriesAsync(db);

        await SeedNewsAsync(db, adminUserId, newsCategories);
        await SeedEventsAsync(db, adminUserId, eventCategories);
        await SeedMediaAsync(db, adminUserId, mediaCategories);
        await SeedPagesAsync(db, adminUserId);
        await SeedStudyProgramsAsync(db, adminUserId);
        await SeedLecturersAsync(db, adminUserId);
        await SeedFoundationMembersAsync(db, adminUserId);
        await SeedAdmissionWavesAsync(db, adminUserId);
        await SeedScholarshipsAsync(db, adminUserId);
    }

    // ─── Scholarships ─────────────────────────────────────────────────────────

    private static async Task SeedScholarshipsAsync(ApplicationDbContext db, string adminUserId)
    {
        if (await db.Scholarships.AnyAsync())
            return;

        var scholarships = new List<Scholarship>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Beasiswa Pastor Scholar",
                Level = "S1",
                Color = "#E62129",
                ImageUrl = "https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
                Description = "Beasiswa bergengsi untuk mahasiswa S1 terpilih yang menjadikan STTB sebagai pilihan pertama dan memiliki prestasi akademik menonjol.",
                Requirements = new List<string>
                {
                    "Diperuntukkan bagi mahasiswa S1 yang menjadikan STTB sebagai pilihan pertama",
                    "Beasiswa meliputi biaya pendidikan dari semester 1",
                    "Memiliki prestasi menonjol di SMA (rata-rata rapor minimal 8.0)",
                    "Memiliki panggilan yang jelas",
                    "Memiliki rekomendasi yang kuat",
                    "Minimal IPK 2.75 pada semester 1 dan minimal IPK 3.0 pada semester 2–4",
                    "Bersedia mengalokasikan waktu 15 jam/bulan untuk membantu kegiatan administrasi/akademik di STTB",
                    "Kelanjutan beasiswa akan dievaluasi per semester",
                    "Bersedia memenuhi ikatan dinas 0.5 N (setara 2 tahun) setelah lulus",
                },
                DisplayOrder = 1,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Beasiswa Formatio",
                Level = "S1",
                Color = "#0A2C74",
                ImageUrl = "https://images.unsplash.com/photo-1722962674485-d34e69a9a406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
                Description = "Beasiswa untuk mahasiswa S1 aktif yang telah memasuki tahun kedua studi dan menunjukkan prestasi akademik yang baik.",
                Requirements = new List<string>
                {
                    "Beasiswa meliputi biaya pendidikan S1 dari tahun kedua atau telah menempuh semester 2",
                    "Memiliki prestasi belajar yang baik serta lolos seleksi dan wawancara",
                    "Kelanjutan beasiswa akan dievaluasi per semester",
                    "Bersedia menyediakan waktu 15 jam/bulan untuk membantu kegiatan administrasi/akademik di STTB",
                    "Bersedia memenuhi ikatan dinas 0.5 N",
                },

                DisplayOrder = 2,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Beasiswa Transformative Leadership",
                Level = "S1 – S2",
                Color = "#0570CD",
                ImageUrl = "https://images.unsplash.com/photo-1607332796965-436d1bf61731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
                Description = "Beasiswa untuk mahasiswa S2 dengan prestasi akademik dan non-akademik menonjol yang berkomitmen dalam pelayanan.",
                Requirements = new List<string>
                {
                    "Diperuntukkan bagi mahasiswa S2 dengan prestasi akademik maupun non-akademik yang menonjol",
                    "Memiliki integritas dan panggilan yang jelas",
                    "Meliputi maksimal 50% dari total biaya pendidikan",
                    "Memberikan surat keterangan pelayanan minimal 10 jam di lembaga pelayanan atau domisili setempat",
                    "Bersedia menjadi bagian kepanitiaan event STTB dan bersedia menjadi ketua & koordinator kelas",
                    "Tidak diberlakukan ikatan dinas",
                },
                DisplayOrder = 3,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
        };

        db.Scholarships.AddRange(scholarships);
        await db.SaveChangesAsync();
    }

    // ─── Categories ──────────────────────────────────────────────────────────

    private static async Task<Dictionary<string, NewsCategory>> SeedNewsCategoriesAsync(
        ApplicationDbContext db
    )
    {
        if (!await db.NewsCategories.AnyAsync())
        {
            var categories = new List<NewsCategory>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Konferensi",
                    Slug = "konferensi",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Akademik",
                    Slug = "akademik",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Beasiswa",
                    Slug = "beasiswa",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Kerjasama",
                    Slug = "kerjasama",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Seminar",
                    Slug = "seminar",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Fasilitas",
                    Slug = "fasilitas",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Admisi",
                    Slug = "admisi",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Prestasi",
                    Slug = "prestasi",
                },
            };
            db.NewsCategories.AddRange(categories);
            await db.SaveChangesAsync();
        }
        return await db.NewsCategories.ToDictionaryAsync(c => c.Name);
    }

    private static async Task<Dictionary<string, EventCategory>> SeedEventCategoriesAsync(
        ApplicationDbContext db
    )
    {
        if (!await db.EventCategories.AnyAsync())
        {
            var categories = new List<EventCategory>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Admisi",
                    Slug = "admisi",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Kerohanian",
                    Slug = "kerohanian",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "LEAD",
                    Slug = "lead",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Seminar",
                    Slug = "seminar",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Akademik",
                    Slug = "akademik",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Misi",
                    Slug = "misi",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Pelatihan",
                    Slug = "pelatihan",
                },
            };
            db.EventCategories.AddRange(categories);
            await db.SaveChangesAsync();
        }
        return await db.EventCategories.ToDictionaryAsync(c => c.Name);
    }

    private static async Task<Dictionary<string, MediaCategory>> SeedMediaCategoriesAsync(
        ApplicationDbContext db
    )
    {
        if (!await db.MediaCategories.AnyAsync())
        {
            var categories = new List<MediaCategory>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Misi & Penginjilan",
                    Slug = "misi-penginjilan",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Pelayanan Anak",
                    Slug = "pelayanan-anak",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Pemuridan & Pembinaan",
                    Slug = "pemuridan-pembinaan",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Pendidikan Teologi",
                    Slug = "pendidikan-teologi",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Belajar & Mengajar",
                    Slug = "belajar-mengajar",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Pembelajaran Digital",
                    Slug = "pembelajaran-digital",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Pelayanan Keluarga",
                    Slug = "pelayanan-keluarga",
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Pelayanan Dunia Kerja",
                    Slug = "pelayanan-dunia-kerja",
                },
            };
            db.MediaCategories.AddRange(categories);
            await db.SaveChangesAsync();
        }
        return await db.MediaCategories.ToDictionaryAsync(c => c.Name);
    }

    // ─── News ────────────────────────────────────────────────────────────────

    private static async Task SeedNewsAsync(
        ApplicationDbContext db,
        string adminUserId,
        Dictionary<string, NewsCategory> categories
    )
    {
        if (await db.News.AnyAsync())
            return;

        var now = DateTime.UtcNow;

        var articles = new List<News>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "STTB Mengadakan Konferensi Teologi Transformasi 2025",
                Slug = "konferensi-teologi-transformasi-2025",
                Excerpt =
                    "Sekolah Tinggi Teologi Bandung menyelenggarakan konferensi teologi internasional bertema 'Transformasi Gereja di Era Digital' yang dihadiri lebih dari 500 peserta.",
                Content =
                    "<p>Sekolah Tinggi Teologi Bandung (STTB) sukses menyelenggarakan Konferensi Teologi Transformasi 2025 pada tanggal 15-17 Maret 2025 di Gedung Serbaguna STTB.</p><p>Konferensi yang bertema \"Transformasi Gereja di Era Digital\" ini dihadiri oleh lebih dari 500 peserta dari berbagai denominasi gereja di seluruh Indonesia, termasuk para pendeta, penatua, mahasiswa teologi, dan aktivis Kristen.</p><p>Pembicara utama dalam konferensi ini antara lain Dr. Samuel Gunawan, Pdt. Prof. Benyamin Intan, Ph.D., dan Dr. Lena Purbawaseso.</p>",
                CategoryId = categories["Konferensi"].Id,
                ThumbnailUrl = "/uploads/news/news-1.jpg",
                IsFeatured = true,
                IsPublished = true,
                PublishedAt = now.AddDays(-30),
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-31),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Wisuda STTB Angkatan ke-45: 120 Lulusan Siap Melayani",
                Slug = "wisuda-sttb-angkatan-45",
                Excerpt =
                    "STTB dengan bangga meluluskan 120 mahasiswa terbaik dalam upacara wisuda yang khidmat dan penuh sukacita.",
                Content =
                    "<p>Sekolah Tinggi Teologi Bandung kembali meluluskan generasi pelayan Tuhan yang baru. Pada tanggal 20 Februari 2025, STTB menyelenggarakan Upacara Wisuda Angkatan ke-45 di Kampus STTB Bandung.</p><p>Sebanyak 120 mahasiswa diwisuda dalam upacara yang dihadiri oleh keluarga, dosen, dan tamu undangan. Para wisudawan terdiri dari 65 lulusan program Sarjana Teologi, 28 lulusan Sarjana Pendidikan Kristen, dan 27 lulusan dari berbagai program Magister.</p>",
                CategoryId = categories["Akademik"].Id,
                ThumbnailUrl = "/uploads/news/news-2.jpg",
                IsFeatured = true,
                IsPublished = true,
                PublishedAt = now.AddDays(-45),
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-46),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Program Beasiswa STTB 2025: Membuka Peluang bagi Calon Hamba Tuhan",
                Slug = "beasiswa-sttb-2025",
                Excerpt =
                    "STTB membuka pendaftaran beasiswa penuh dan parsial untuk tahun akademik 2025/2026 bagi calon mahasiswa berprestasi.",
                Content =
                    "<p>Sekolah Tinggi Teologi Bandung kembali membuka program beasiswa untuk tahun akademik 2025/2026. Tersedia beasiswa penuh (full scholarship) dan beasiswa parsial bagi calon mahasiswa yang memenuhi kriteria.</p><p>Pendaftaran beasiswa dibuka mulai 1 Januari hingga 31 Maret 2025. Calon penerima beasiswa akan melalui seleksi akademik, wawancara, dan penilaian karakter pelayanan.</p>",
                CategoryId = categories["Beasiswa"].Id,
                ThumbnailUrl = "/uploads/news/news-3.jpg",
                IsFeatured = false,
                IsPublished = true,
                PublishedAt = now.AddDays(-60),
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-61),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "STTB Jalin Kerjasama Akademik dengan Universitas Teologi Amerika",
                Slug = "kerjasama-akademik-internasional",
                Excerpt =
                    "STTB menandatangani MoU dengan Gordon-Conwell Theological Seminary dan Calvin Theological Seminary untuk program pertukaran mahasiswa.",
                Content =
                    "<p>Dalam upaya memperluas wawasan dan meningkatkan kualitas pendidikan teologi, STTB telah menandatangani Memorandum of Understanding (MoU) dengan dua institusi teologi terkemuka di Amerika Serikat.</p><p>Kerjasama ini mencakup program pertukaran mahasiswa, penelitian bersama, dan pengembangan kurikulum yang relevan dengan konteks Asia Tenggara.</p>",
                CategoryId = categories["Kerjasama"].Id,
                ThumbnailUrl = "/uploads/news/news-4.jpg",
                IsFeatured = false,
                IsPublished = true,
                PublishedAt = now.AddDays(-75),
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-76),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Seminar Pastoral: Pemimpin Gereja dan Isu Kesehatan Mental",
                Slug = "seminar-pastoral-kesehatan-mental",
                Excerpt =
                    "STTB mengadakan seminar pastoral intensif tentang pendekatan Alkitabiah terhadap kesehatan mental dan konseling pastoral.",
                Content =
                    "<p>Tantangan kesehatan mental semakin nyata di era post-pandemi. STTB menjawab kebutuhan ini dengan menyelenggarakan Seminar Pastoral intensif berjudul 'Pemimpin Gereja dan Isu Kesehatan Mental'.</p><p>Seminar ini menghadirkan pakar konseling pastoral dan psikologi Kristen untuk membekali para pemimpin gereja dalam menghadapi isu-isu kesehatan mental di jemaat mereka.</p>",
                CategoryId = categories["Seminar"].Id,
                ThumbnailUrl = "/uploads/news/news-5.jpg",
                IsFeatured = false,
                IsPublished = true,
                PublishedAt = now.AddDays(-90),
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-91),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Perpustakaan STTB Kini Dilengkapi dengan Koleksi Digital Internasional",
                Slug = "perpustakaan-digital-internasional",
                Excerpt =
                    "Perpustakaan STTB kini menyediakan akses ke lebih dari 50.000 judul buku digital dan jurnal akademik teologi internasional.",
                Content =
                    "<p>Perpustakaan Sekolah Tinggi Teologi Bandung terus berkembang untuk mendukung kebutuhan akademik mahasiswa dan dosen. Mulai tahun 2025, perpustakaan STTB menyediakan akses penuh ke ATLA Religion Database, repositori jurnal teologi terbesar di dunia.</p>",
                CategoryId = categories["Fasilitas"].Id,
                ThumbnailUrl = "/uploads/news/news-6.jpg",
                IsFeatured = false,
                IsPublished = true,
                PublishedAt = now.AddDays(-100),
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-101),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Penerimaan Mahasiswa Baru STTB 2025/2026 Resmi Dibuka",
                Slug = "penerimaan-mahasiswa-baru-2025-2026",
                Excerpt =
                    "STTB membuka pendaftaran mahasiswa baru untuk program S1 Teologi, S1 Pendidikan Kristen, dan berbagai program Magister.",
                Content =
                    "<p>Sekolah Tinggi Teologi Bandung dengan bangga mengumumkan pembukaan penerimaan mahasiswa baru untuk tahun akademik 2025/2026. Tersedia program Sarjana dan Pascasarjana di bidang teologi dan pendidikan Kristen.</p><p>Pendaftaran dapat dilakukan secara online melalui website resmi STTB atau langsung ke kampus di Bandung.</p>",
                CategoryId = categories["Admisi"].Id,
                ThumbnailUrl = "/uploads/news/news-7.jpg",
                IsFeatured = true,
                IsPublished = true,
                PublishedAt = now.AddDays(-15),
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-16),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Dosen STTB Raih Penghargaan Penelitian Teologi Nasional",
                Slug = "dosen-sttb-raih-penghargaan-penelitian",
                Excerpt =
                    "Dr. Grace Liem dari STTB meraih penghargaan penelitian terbaik dari Asosiasi Sekolah Teologi Indonesia atas karyanya tentang Teologi Hikmat.",
                Content =
                    "<p>Kebanggaan besar datang bagi keluarga besar STTB. Dr. Grace Liem, dosen Studi Perjanjian Lama di STTB, berhasil meraih penghargaan Penelitian Teologi Terbaik dari Asosiasi Sekolah Teologi Indonesia (ASTI) 2024.</p><p>Penelitian beliau berjudul \"Relevansi Teologi Hikmat Perjanjian Lama bagi Spiritualitas Urban Indonesia\" dinilai memberikan kontribusi signifikan bagi pengembangan teologi kontekstual Indonesia.</p>",
                CategoryId = categories["Prestasi"].Id,
                ThumbnailUrl = "/uploads/news/news-8.jpg",
                IsFeatured = false,
                IsPublished = true,
                PublishedAt = now.AddDays(-20),
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-21),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "STTB Luncurkan Program Studi Online untuk Pelayan Gereja",
                Slug = "program-studi-online-pelayan-gereja",
                Excerpt =
                    "Menjawab kebutuhan jemaat di daerah terpencil, STTB meluncurkan program pendidikan teologi jarak jauh yang fleksibel dan terjangkau.",
                Content =
                    "<p>Sekolah Tinggi Teologi Bandung meluncurkan program pendidikan teologi berbasis online yang dirancang khusus untuk para pelayan gereja di seluruh Indonesia yang tidak dapat hadir secara fisik ke kampus.</p><p>Program ini mencakup modul video pembelajaran, sesi mentoring online dengan dosen, dan ujian komprehensif yang dapat diakses dari mana saja.</p>",
                CategoryId = categories["Akademik"].Id,
                ThumbnailUrl = "/uploads/news/news-9.jpg",
                IsFeatured = false,
                IsPublished = true,
                PublishedAt = now.AddDays(-50),
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-51),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Kampus STTB Selesai Renovasi Gedung Kuliah Utama",
                Slug = "renovasi-gedung-kuliah-utama",
                Excerpt =
                    "Gedung kuliah utama STTB telah selesai direnovasi dengan fasilitas modern untuk mendukung proses belajar mengajar yang lebih efektif.",
                Content =
                    "<p>Setelah delapan bulan proses renovasi, gedung kuliah utama Sekolah Tinggi Teologi Bandung kini hadir dengan wajah baru yang lebih modern dan representatif.</p><p>Renovasi mencakup ruang kuliah berkapasitas besar, laboratorium bahasa, ruang seminar, dan fasilitas multimedia canggih yang akan mendukung pengalaman belajar mahasiswa secara optimal.</p>",
                CategoryId = categories["Fasilitas"].Id,
                ThumbnailUrl = "/uploads/news/news-10.jpg",
                IsFeatured = false,
                IsPublished = true,
                PublishedAt = now.AddDays(-7),
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-8),
            },
        };

        db.News.AddRange(articles);
        await db.SaveChangesAsync();
    }

    // ─── Events ──────────────────────────────────────────────────────────────

    private static async Task SeedEventsAsync(
        ApplicationDbContext db,
        string adminUserId,
        Dictionary<string, EventCategory> categories
    )
    {
        if (await db.Events.AnyAsync())
            return;

        var now = DateTime.UtcNow;

        var events = new List<Event>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Penerimaan Mahasiswa Baru 2025/2026",
                Description =
                    "Daftarkan diri Anda untuk menjadi bagian dari keluarga besar STTB. Tersedia program S1 dan S2 Teologi. Pendaftaran dibuka secara online dan offline.",
                StartDate = now.AddDays(20),
                EndDate = now.AddDays(110),
                Location = "STTB Bandung & Online",
                ImageUrl = "/uploads/events/event-1.jpg",
                CategoryId = categories["Admisi"].Id,
                RegistrationUrl = "https://apply.fuller.edu/",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-5),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Retreat Rohani Mahasiswa STTB 2025",
                Description =
                    "Retreat tahunan mahasiswa STTB yang akan diadakan di Lembang, Bandung. Tema: 'Dipanggil untuk Melayani dalam Kekudusan'.",
                StartDate = now.AddDays(35),
                EndDate = now.AddDays(37),
                Location = "Lembang, Bandung Barat",
                ImageUrl = "/uploads/events/event-2.jpg",
                CategoryId = categories["Kerohanian"].Id,
                RegistrationUrl = null,
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-10),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Konferensi LEAD: Kepemimpinan Kristen dalam Bisnis",
                Description =
                    "LEAD Center STTB mengadakan konferensi kepemimpinan untuk para profesional Kristen tentang integrasi iman dan dunia bisnis.",
                StartDate = now.AddDays(70),
                EndDate = now.AddDays(71),
                Location = "Aula Utama STTB Bandung",
                ImageUrl = "/uploads/events/event-3.jpg",
                CategoryId = categories["LEAD"].Id,
                RegistrationUrl =
                    "https://www.eventbrite.com/e/fire-conference-a-christian-business-conference-tickets-1972725946410",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-3),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Kuliah Umum: Teologi dan Artificial Intelligence",
                Description =
                    "Pembicara tamu dari Singapore Bible College akan membahas perspektif Alkitabiah tentang kecerdasan buatan dan masa depan manusia.",
                StartDate = now.AddDays(45),
                EndDate = null,
                Location = "Auditorium STTB Bandung",
                ImageUrl = "/uploads/events/event-4.jpg",
                CategoryId = categories["Seminar"].Id,
                RegistrationUrl = null,
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-7),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Workshop Penulisan Teologi untuk Mahasiswa S2",
                Description =
                    "Workshop intensif penulisan karya ilmiah teologi bagi mahasiswa program pascasarjana STTB. Dipandu oleh editor jurnal teologi nasional.",
                StartDate = now.AddDays(14),
                EndDate = now.AddDays(14),
                Location = "Ruang Seminar Lt. 3, STTB Bandung",
                ImageUrl = "/uploads/events/event-5.jpg",
                CategoryId = categories["Akademik"].Id,
                RegistrationUrl =
                    "https://www.eventbrite.com/e/academic-writing-workshop-tickets-1981778103656",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-2),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Ibadah Pembukaan Tahun Akademik 2025/2026",
                Description =
                    "Ibadah syukur dan pembukaan resmi tahun akademik baru STTB. Seluruh civitas akademika diundang untuk hadir.",
                StartDate = now.AddDays(7),
                EndDate = null,
                Location = "Kapel STTB Bandung",
                ImageUrl = "/uploads/events/event-6.jpg",
                CategoryId = categories["Kerohanian"].Id,
                RegistrationUrl = null,
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-1),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Seminar Misi: Pelayanan di Daerah Terpencil Indonesia",
                Description =
                    "Seminar tentang tantangan dan strategi pelayanan misi di daerah 3T (Tertinggal, Terdepan, Terluar) Indonesia bersama praktisi misi lapangan.",
                StartDate = now.AddDays(55),
                EndDate = now.AddDays(56),
                Location = "Aula STTB Bandung",
                ImageUrl = "/uploads/events/event-7.jpg",
                CategoryId = categories["Misi"].Id,
                RegistrationUrl = "https://internationalministries.org/wmc-2026/",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-4),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Wisuda STTB Angkatan ke-46",
                Description =
                    "Upacara wisuda Angkatan ke-46 Sekolah Tinggi Teologi Bandung. Keluarga wisudawan diwajibkan mendaftar undangan terlebih dahulu.",
                StartDate = now.AddDays(90),
                EndDate = null,
                Location = "Gedung Serbaguna STTB Bandung",
                ImageUrl = "/uploads/events/event-8.jpg",
                CategoryId = categories["Akademik"].Id,
                RegistrationUrl =
                    "https://www.waikato.ac.nz/students/graduation/graduand-and-guest-tickets/",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-6),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Open House STTB untuk Calon Mahasiswa",
                Description =
                    "Kesempatan bagi calon mahasiswa dan orang tua untuk mengenal lebih dekat program studi, fasilitas, dan kehidupan kampus STTB.",
                StartDate = now.AddDays(25),
                EndDate = null,
                Location = "Kampus STTB Bandung",
                ImageUrl = "/uploads/events/event-9.jpg",
                CategoryId = categories["Admisi"].Id,
                RegistrationUrl =
                    "https://www.eventbrite.sg/e/nus-college-open-house-2026-tickets-1979704932746",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-8),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Pelatihan Konseling Pastoral Tingkat Lanjut",
                Description =
                    "Pelatihan intensif konseling pastoral selama tiga hari untuk para pendeta dan pemimpin gereja. Sertifikat kompetensi diberikan bagi peserta yang lulus.",
                StartDate = now.AddDays(60),
                EndDate = now.AddDays(62),
                Location = "Pusat Konseling STTB Bandung",
                ImageUrl = "/uploads/events/event-10.jpg",
                CategoryId = categories["Pelatihan"].Id,
                RegistrationUrl = "https://www.ccef.org/school/",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-9),
            },
        };

        db.Events.AddRange(events);
        await db.SaveChangesAsync();
    }

    // ─── Media ───────────────────────────────────────────────────────────────

    private static async Task SeedMediaAsync(
        ApplicationDbContext db,
        string adminUserId,
        Dictionary<string, MediaCategory> categories
    )
    {
        if (await db.Media.AnyAsync())
            return;

        var now = DateTime.UtcNow;

        var mediaItems = new List<Media>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "City TransForMission #2: \"Fokus Strategis Misi Urban\"",
                Url = "https://www.youtube.com/watch?v=Sop6nPCHyys",
                Type = "video",
                ThumbnailUrl = "/uploads/media/media-1.jpg",
                CategoryId = categories["Misi & Penginjilan"].Id,
                Tag = "LEAD",
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-30),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "City TransForMission #01: \"Urbanisasi & Misi\"",
                Url = "https://www.youtube.com/watch?v=Xjep62yfbG0",
                Type = "video",
                ThumbnailUrl = "/uploads/media/media-2.jpg",
                CategoryId = categories["Misi & Penginjilan"].Id,
                Tag = "UMC",
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-45),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Persembahan Pujian STTB untuk Pelayanan Sekolah Minggu",
                Url = "https://www.youtube.com/watch?v=VMetVSDTX9o",
                Type = "video",
                ThumbnailUrl = "/uploads/media/media-3.jpg",
                CategoryId = categories["Pelayanan Anak"].Id,
                Tag = "STT Bandung",
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-60),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Disciplesight: Figital Discipleship",
                Url = "https://www.youtube.com/watch?v=uhA8g0MhRU8",
                Type = "video",
                ThumbnailUrl = "/uploads/media/media-4.jpg",
                CategoryId = categories["Pemuridan & Pembinaan"].Id,
                Tag = "Disciplesight",
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-70),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Profil STTB Bandung 2022",
                Url = "https://www.youtube.com/watch?v=xvnhsSWAkVY",
                Type = "video",
                ThumbnailUrl = "/uploads/media/media-5.jpg",
                CategoryId = categories["Pendidikan Teologi"].Id,
                Tag = "STT Bandung",
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-80),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title =
                    "Pendidikan Kristen Berbasis Alkitabiah: Membangun Fondasi Iman dan Spiritualitas Generasi Era Digital",
                Url = "https://jurnal.sttkn.ac.id/index.php/Veritas/article/view/281",
                Type = "article",
                ThumbnailUrl = "/uploads/media/media-6.jpg",
                CategoryId = categories["Belajar & Mengajar"].Id,
                Tag = null,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-85),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title =
                    "Pendidikan Agama Kristen: Mengintegrasikan Nilai-Nilai Spiritual dalam Era Globalisasi",
                Url = "https://prin.or.id/index.php/JURRAFI/article/view/7676",
                Type = "article",
                ThumbnailUrl = "/uploads/media/media-7.jpg",
                CategoryId = categories["Pendidikan Teologi"].Id,
                Tag = null,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-90),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Inovasi Teknologi dalam Strategi Pembelajaran Pendidikan Agama Kristen",
                Url = "https://prin.or.id/index.php/JURRAFI/article/view/7730",
                Type = "article",
                ThumbnailUrl = "/uploads/media/media-8.jpg",
                CategoryId = categories["Pembelajaran Digital"].Id,
                Tag = null,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-95),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title =
                    "Pendidikan Agama Kristen dalam Keluarga di Era Digital: Membangun Remaja Bijak Menggunakan Media Sosial",
                Url = "https://jurnal.sttkn.ac.id/index.php/Veritas/article/view/157",
                Type = "article",
                ThumbnailUrl = "/uploads/media/media-9.jpg",
                CategoryId = categories["Pelayanan Keluarga"].Id,
                Tag = null,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-100),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Pelatihan Mahasiswa STTB: Pembuatan Pupuk Kompos Dari Sampah Organik",
                Url = "https://www.youtube.com/watch?v=dOw1w6J3hZk",
                Type = "video",
                ThumbnailUrl = "/uploads/media/media-10.jpg",
                CategoryId = categories["Pelayanan Dunia Kerja"].Id,
                Tag = "STT Bandung",
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-110),
            },
        };

        db.Media.AddRange(mediaItems);
        await db.SaveChangesAsync();
    }

    // ─── Pages ───────────────────────────────────────────────────────────────

    private static async Task SeedPagesAsync(ApplicationDbContext db, string adminUserId)
    {
        if (await db.Pages.AnyAsync())
            return;

        var pages = new List<Page>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Beranda",
                Slug = "/",
                Section = "Publik",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-03-08"),
                Content = "<h1>Selamat Datang di STTB</h1>",
                MetaDescription = "Halaman resmi Sekolah Tinggi Teologi Bandung.",
                MetaKeywords = "sttb, teologi, bandung",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-03-01"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Visi & Misi",
                Slug = "/visi-misi",
                Section = "Tentang",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-03-05"),
                Content =
                    "<h2>Visi</h2><p>Menjadi institusi teologi yang unggul...</p><h2>Misi</h2><ul><li>Misi 1</li></ul>",
                MetaDescription = "Visi dan Misi Sekolah Tinggi Teologi Bandung.",
                MetaKeywords = "visi, misi, sttb",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-03-01"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Sejarah STTB",
                Slug = "/sejarah",
                Section = "Tentang",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-03-01"),
                Content = "<p>Sejarah panjang berdirinya STTB...</p>",
                MetaDescription = "Sejarah pendirian Sekolah Tinggi Teologi Bandung.",
                MetaKeywords = "sejarah, sttb, sejarah sttb",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-02-20"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Pengakuan Iman",
                Slug = "/pengakuan-iman",
                Section = "Tentang",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-02-28"),
                Content = "<p>Dasar pengakuan iman STTB...</p>",
                MetaDescription = "Pengakuan Iman STTB.",
                MetaKeywords = "pengakuan iman, iman, sttb",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-02-20"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Pengurus Yayasan",
                Slug = "/pengurus-yayasan",
                Section = "Tentang",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-02-20"),
                Content = "<p>Struktur pengurus yayasan STTB...</p>",
                MetaDescription = "Daftar Pengurus Yayasan STTB.",
                MetaKeywords = "pengurus, yayasan, sttb",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-02-10"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Dewan Pengajar Dosen STTB",
                Slug = "/dewan-dosen",
                Section = "Tentang",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-02-20"),
                Content = "<p>Dewan Pengajar Dosen STTB...</p>",
                MetaDescription = "Daftar Dewan Pengajar Dosen STTB.",
                MetaKeywords = "dewan, dosen, pengajar, sttb",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-02-10"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Mars STTB",
                Slug = "/mars-sttb",
                Section = "Tentang",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-02-15"),
                Content = "<p>Lirik dan notasi Mars STTB...</p>",
                MetaDescription = "Lirik Mars STTB.",
                MetaKeywords = "mars, lagu, sttb",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-02-10"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Sarjana Teologi",
                Slug = "/sarjana-teologi",
                Section = "Program Studi",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-02-10"),
                Content = "<p>Program Studi Sarjana Teologi (S1)...</p>",
                MetaDescription = "Program Studi Sarjana Teologi di STTB.",
                MetaKeywords = "sarjana teologi, s1 teologi, prodi",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-02-01"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Sarjana Pendidikan Kristen",
                Slug = "/sarjana-pendidikan-kristen",
                Section = "Program Studi",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-02-10"),
                Content = "<p>Program Studi Sarjana Pendidikan Kristen (S1)...</p>",
                MetaDescription = "Program Studi Sarjana Pendidikan Kristen di STTB.",
                MetaKeywords = "pendidikan kristen, s1 pendidikan, prodi",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-02-01"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Jadwal Admisi",
                Slug = "/jadwal-admisi",
                Section = "Admisi",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-03-07"),
                Content = "<p>Jadwal pendaftaran mahasiswa baru...</p>",
                MetaDescription = "Jadwal Admisi dan Pendaftaran STTB.",
                MetaKeywords = "jadwal, admisi, pendaftaran",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-03-01"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Prosedur Admisi",
                Slug = "/prosedur-admisi",
                Section = "Admisi",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-03-07"),
                Content = "<p>Prosedur admisi mahasiswa baru...</p>",
                MetaDescription = "Prosedur Admisi",
                MetaKeywords = "prosedur, admisi, pendaftaran",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-03-01"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Info Persyaratan",
                Slug = "/informasi-persyaratan",
                Section = "Admisi",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-03-07"),
                Content = "<p>Persyaratan pendaftaran mahasiswa baru...</p>",
                MetaDescription = "Informasi Persyaratan Pendaftaran STTB.",
                MetaKeywords = "persyaratan, dokumen, pendaftaran",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-03-01"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Beasiswa",
                Slug = "/beasiswa",
                Section = "Admisi",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-03-06"),
                Content = "<p>Informasi program beasiswa STTB...</p>",
                MetaDescription = "Program Beasiswa STTB.",
                MetaKeywords = "beasiswa, diskon, biaya",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-03-01"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "FAQ Admisi",
                Slug = "/faq",
                Section = "Admisi",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-03-05"),
                Content = "<p>Pertanyaan yang sering diajukan...</p>",
                MetaDescription = "FAQ Pendaftaran STTB.",
                MetaKeywords = "faq, pertanyaan, bantuan",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-03-01"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Pembinaan Mahasiswa",
                Slug = "/pembinaan",
                Section = "Kehidupan Kampus",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-03-04"),
                Content = "<p>Program pembinaan spiritual dan akademik...</p>",
                MetaDescription = "Pembinaan Mahasiswa STTB.",
                MetaKeywords = "pembinaan, rohani, mahasiswa",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-03-01"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Senat Mahasiswa",
                Slug = "/senat",
                Section = "Kehidupan Kampus",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-03-03"),
                Content = "<p>Struktur dan kegiatan Senat Mahasiswa...</p>",
                MetaDescription = "Senat Mahasiswa STTB.",
                MetaKeywords = "senat, bem, mahasiswa",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-03-01"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Fasilitas",
                Slug = "/fasilitas",
                Section = "Kehidupan Kampus",
                IsPublished = false,
                UpdatedAt = DateTime.Parse("2026-03-02"), // Status: Draft
                Content = "<p>Daftar fasilitas kampus...</p>",
                MetaDescription = "Fasilitas Kampus STTB.",
                MetaKeywords = "fasilitas, kampus, gedung",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-03-01"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Biaya Studi",
                Slug = "/biaya-studi",
                Section = "Keuangan",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-03-01"),
                Content = "<p>Rincian biaya studi dan SPP...</p>",
                MetaDescription = "Informasi Biaya Studi STTB.",
                MetaKeywords = "biaya, spp, uang kuliah",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-02-20"),
                UpdatedBy = adminUserId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Kontak Kami",
                Slug = "/kontak-kami",
                Section = "Publik",
                IsPublished = true,
                UpdatedAt = DateTime.Parse("2026-02-28"),
                Content = "<p>Alamat, Email, dan Telepon STTB...</p>",
                MetaDescription = "Kontak dan Lokasi STTB.",
                MetaKeywords = "kontak, alamat, telepon, email",
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Parse("2026-02-20"),
                UpdatedBy = adminUserId,
            },
        };

        db.Pages.AddRange(pages);
        await db.SaveChangesAsync();
    }

    // ─── Study Programs ──────────────────────────────────────────────────────

    private static async Task SeedStudyProgramsAsync(ApplicationDbContext db, string adminUserId)
    {
        if (await db.StudyPrograms.AnyAsync())
            return;

        var programs = new List<StudyProgram>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Sarjana Teologi",
                Slug = "sarjana-teologi",
                Level = "S1",
                Degree = "S.Th.",
                Accreditation = "A",
                Tagline = "Membangun fondasi teologis yang kokoh untuk pelayanan gereja.",
                Description =
                    "Program studi empat tahun yang membekali mahasiswa dengan fondasi teologis yang kokoh, pemahaman Alkitab yang mendalam, dan keterampilan pastoral untuk melayani gereja dan masyarakat.",
                Duration = "4 tahun (8 semester)",
                Credits = 148,
                Vision =
                    "Menjadi program studi teologi yang unggul dalam integritas ilmiah dan kerohanian di Indonesia.",
                Mission =
                    "Menyelenggarakan pendidikan teologi yang berpusat pada Kristus, berorientasi pada gereja dan konteks budaya masa kini.",
                Objectives = new List<string>
                {
                    "Menguasai disiplin ilmu teologi biblika, sistematis, dan praktis.",
                    "Mampu melakukan penelitian teologis dasar secara mandiri.",
                    "Menunjukkan karakter kristiani dan integritas dalam pelayanan.",
                },
                Courses = new List<string>
                {
                    "Hermeneutika Alkitab",
                    "Teologi Sistematis I",
                    "Bahasa Ibrani Dasar",
                    "Sejarah Gereja",
                    "Homiletika",
                    "Pelayanan Pastoral",
                },
                Careers = new List<string>
                {
                    "Pendeta",
                    "Penginjil",
                    "Pekerja Lembaga Mis",
                    "Penatua/Guru Mandiri",
                },
                Tags = new List<string> { "Hermeneutika", "Homiletika", "Pastoral" },
                CoverImageUrl = "/images/covers/s1-teologi.jpg",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Now,
                UpdatedBy = adminUserId,
                UpdatedAt = DateTime.Now,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Sarjana Pendidikan Kristen",
                Slug = "sarjana-pendidikan-kristen",
                Level = "S1",
                Degree = "S.Pd.K.",
                Accreditation = "A",
                Tagline =
                    "Mendidik generasi penerus dalam nilai-nilai Kristiani yang transformatif.",
                Description =
                    "Program yang mempersiapkan guru agama Kristen, pembina anak dan remaja, serta pemimpin pendidikan gerejawi yang kompeten dan berkarakter Kristiani.",
                Duration = "4 tahun (8 semester)",
                Credits = 144,
                Vision =
                    "Menjadi pusat pengembangan pendidikan Kristen yang menghasilkan pendidik berkualitas.",
                Mission =
                    "Mempersiapkan pendidik Kristen profesional yang memiliki integritas karakter, pedagogik, dan spiritual.",
                Objectives = new List<string>
                {
                    "Menguasai teori dan praktik pendidikan Kristen.",
                    "Mampu mengembangkan kurikulum PAK yang kontekstual.",
                    "Memiliki keterampilan mengajar yang efektif dan kreatif.",
                },
                Courses = new List<string>
                {
                    "Dasar-dasar Pendidikan Kristen",
                    "Psikologi Perkembangan",
                    "Metode Pengajaran PAK",
                    "Kurikulum PAK",
                    "Pembinaan Remaja",
                },
                Careers = new List<string>
                {
                    "Guru Agama Kristen",
                    "Pembina Anak/Remaja",
                    "Kepala Sekolah Kristen",
                    "Konselor Pendidikan",
                },
                Tags = new List<string> { "PAK", "Kurikulum", "Pedagogi" },
                CoverImageUrl = "/images/covers/s1-pak.jpg",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Now,
                UpdatedBy = adminUserId,
                UpdatedAt = DateTime.Now,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Magister Teologi – Pelayanan Pastoral Gereja Urban",
                Slug = "magister-teologi-pelayanan-pastoral-gereja-urban",
                Level = "S2",
                Degree = "M.Th.",
                Accreditation = "Unggul",
                Tagline = "Melayani secara efektif dalam kompleksitas konteks perkotaan.",
                Description =
                    "Program pascasarjana yang mempersiapkan gembala sidang dan pemimpin gereja untuk melayani secara efektif dalam konteks perkotaan yang kompleks dan dinamis.",
                Duration = "2 tahun (4 semester)",
                Credits = 72,
                Vision =
                    "Menjadi program studi terdepan dalam teologi pastoral konteks urban di Asia Tenggara.",
                Mission =
                    "Memberdayakan pemimpin gereja dengan wawasan teologis dan praktis untuk transformasi kota.",
                Objectives = new List<string>
                {
                    "Menganalisis dinamika sosial budaya perkotaan.",
                    "Mengembangkan model pelayanan pastoral yang relevan.",
                    "Menerapkan kepemimpinan servant leadership di konteks urban.",
                },
                Courses = new List<string>
                {
                    "Teologi Urban",
                    "Sosiologi Perkotaan",
                    "Pastoral Care Kontemporer",
                    "Kepemimpinan Gereja Kota",
                },
                Careers = new List<string>
                {
                    "Gembala Gereja Kota",
                    "Konselor Kristen",
                    "Kapelen",
                    "Pemimpin LSM Urban",
                },
                Tags = new List<string> { "Urban Ministry", "Pastoral", "Leadership" },
                CoverImageUrl = "/images/covers/s2-urban.jpg",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Now,
                UpdatedBy = adminUserId,
                UpdatedAt = DateTime.Now,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Magister Teologi – Transformasi Budaya & Masyarakat",
                Slug = "magister-teologi-transformasi-budaya-masyarakat",
                Level = "S2",
                Degree = "M.Th.",
                Accreditation = "B",
                Tagline = "Agen transformasi Kerajaan Allah di tengah masyarakat.",
                Description =
                    "Program yang mempersiapkan pemimpin gereja dan aktivis sosial untuk menghadirkan transformasi Kerajaan Allah dalam berbagai lapisan budaya dan struktur masyarakat.",
                Duration = "2 tahun (4 semester)",
                Credits = 72,
                Vision =
                    "Menghadirkan transformasi holistik melalui pendidikan teologi kontekstual.",
                Mission =
                    "Membekali mahasiswa dengan kerangka teologis untuk perubahan sosial dan budaya.",
                Objectives = new List<string>
                {
                    "Memahami teologi transformasi dan misiologi kontekstual.",
                    "Menganalisis isu-isu keadilan sosial perspektif Alkitab.",
                    "Merancang program intervensi sosial berbasis iman.",
                },
                Courses = new List<string>
                {
                    "Teologi Transformasi",
                    "Antropologi Budaya",
                    "Misiologi Kontemporer",
                    "Etika Sosial",
                },
                Careers = new List<string>
                {
                    "Aktivis Sosial",
                    "Praktisi Pengembangan Masyarakat",
                    "Konsultan Kebijakan",
                    "Peneliti Sosial",
                },
                Tags = new List<string> { "Transformasi", "Budaya", "Misiologi" },
                CoverImageUrl = "/images/covers/s2-transformasi.jpg",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Now,
                UpdatedBy = adminUserId,
                UpdatedAt = DateTime.Now,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Magister Pendidikan Kristen",
                Slug = "magister-pendidikan-kristen",
                Level = "S2",
                Degree = "M.Pd.K.",
                Accreditation = "Unggul",
                Tagline = "Memimpin reformasi pendidikan berbasis iman dan riset.",
                Description =
                    "Program lanjutan untuk para pendidik Kristen yang ingin mengembangkan keahlian pedagogis, kurikulum, dan kepemimpinan pendidikan berbasis iman.",
                Duration = "2 tahun (4 semester)",
                Credits = 68,
                Vision =
                    "Menjadi program studi terdepan dalam riset dan inovasi pendidikan Kristen.",
                Mission =
                    "Mengembangkan keilmuan dan praktik pendidikan Kristen yang berkualitas bagi generasi mendatang.",
                Objectives = new List<string>
                {
                    "Melakukan riset pendidikan Kristen yang inovatif.",
                    "Mengembangkan kurikulum berbasis teologi Kristen.",
                    "Menerapkan kepemimpinan pendidikan yang transformatif.",
                },
                Courses = new List<string>
                {
                    "Filsafat Pendidikan Kristen",
                    "Metodologi Penelitian Pendidikan",
                    "Kurikulum & Pembelajaran",
                    "Kepemimpinan Pendidikan",
                },
                Careers = new List<string>
                {
                    "Dosen PAK",
                    "Kepala Sekolah",
                    "Kurikulum Developer",
                    "Peneliti Pendidikan",
                },
                Tags = new List<string> { "Pendidikan", "Riset", "Kepemimpinan" },
                CoverImageUrl = "/images/covers/s2-pak.jpg",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Now,
                UpdatedBy = adminUserId,
                UpdatedAt = DateTime.Now,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Magister Ministri – Marketplace",
                Slug = "magister-ministri-marketplace",
                Level = "S2",
                Degree = "M.Min.",
                Accreditation = "B",
                Tagline = "Mengintegrasikan iman dalam dunia kerja profesional.",
                Description =
                    "Program inovatif yang membekali profesional bisnis, entrepreneur, dan pekerja Kristen untuk mengintegrasikan iman dengan pekerjaan secara transformatif.",
                Duration = "2 tahun (4 semester)",
                Credits = 68,
                Vision =
                    "Memberdayakan profesional Kristen untuk menjadi garam dan terang di tempat kerja.",
                Mission =
                    "Memperlengkapi mahasiswa dengan teologi kerja dan etika bisnis yang berlandaskan iman.",
                Objectives = new List<string>
                {
                    "Mengintegrasikan nilai-nilai Kerajaan dalam strategi bisnis.",
                    "Memahami etika bisnis Kristen secara mendalam.",
                    "Mengembangkan visi kerja sebagai panggilan (calling).",
                },
                Courses = new List<string>
                {
                    "Teologi Kerja dan Bisnis",
                    "Etika Bisnis Kristen",
                    "Kewirausahaan Kristiani",
                    "Kepemimpinan Profesional",
                },
                Careers = new List<string>
                {
                    "Entrepreneur Kristen",
                    "Manajer Korporat",
                    "Konsultan Bisnis",
                    "Pemimpin Organisasi",
                },
                Tags = new List<string> { "Bisnis", "Integrasi Iman", "Profesional" },
                CoverImageUrl = "/images/covers/s2-marketplace.jpg",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Now,
                UpdatedBy = adminUserId,
                UpdatedAt = DateTime.Now,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Magister Ministri – Kepemimpinan Pastoral",
                Slug = "magister-ministri-kepemimpinan-pastoral",
                Level = "S2",
                Degree = "M.Min.",
                Accreditation = "A",
                Tagline = "Membentuk pemimpin rohani yang berkarakter dan efektif.",
                Description =
                    "Program yang mengembangkan kapasitas kepemimpinan rohani, manajemen gereja, dan pembinaan jemaat bagi para pemimpin gereja masa kini.",
                Duration = "2 tahun (4 semester)",
                Credits = 68,
                Vision = "Mencetak pemimpin gembala yang berintegritas, arif, dan berkualitas.",
                Mission =
                    "Meningkatkan kapasitas kepemimpinan dan manajemen pelayanan jemaat secara profesional.",
                Objectives = new List<string>
                {
                    "Menguasai prinsip-prinsip kepemimpinan rohani.",
                    "Mengelola administrasi dan manajemen gereja secara efektif.",
                    "Membina jemaat secara holistik dan dinamis.",
                },
                Courses = new List<string>
                {
                    "Kepemimpinan Rohani",
                    "Manajemen Gereja",
                    "Pembinaan Jemaat",
                    "Teologi Pastoral Lanjutan",
                },
                Careers = new List<string>
                {
                    "Gembala Senior",
                    "Penginjil",
                    "Pembina Rohani",
                    "Konselor Pastoral",
                },
                Tags = new List<string> { "Manajemen Gereja", "Kepemimpinan", "Pembinaan" },
                CoverImageUrl = "/images/covers/s2-pastoral.jpg",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Now,
                UpdatedBy = adminUserId,
                UpdatedAt = DateTime.Now,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Magister Ministri – Teologi Pelayanan Gerejawi",
                Slug = "magister-ministri-teologi-pelayanan-gerejawi",
                Level = "S2",
                Degree = "M.Min.",
                Accreditation = "A",
                Tagline = "Memadukan teologi biblika dengan praktik pelayanan gerejawi.",
                Description =
                    "Program yang mengintegrasikan teologi biblika dengan praktik pelayanan gerejawi yang kontekstual dan efektif untuk berbagai denominasi.",
                Duration = "2 tahun (4 semester)",
                Credits = 68,
                Vision =
                    "Menjadi program studi yang menjembatani teologi akademis dan praktik pelayanan gereja lokal.",
                Mission =
                    "Membekali hamba Tuhan dengan landasan teologis yang kuat untuk pelayanan praktis yang sehat.",
                Objectives = new List<string>
                {
                    "Memahami teologi biblika secara mendalam.",
                    "Menerapkan prinsip teologis dalam liturgi dan sakramen.",
                    "Melayani lintas denominasi dengan hikmat dan peka budaya.",
                },
                Courses = new List<string>
                {
                    "Teologi Biblika",
                    "Liturgi dan Ibadah",
                    "Praktik Pelayanan Gerejawi",
                    "Teologi Kontekstual",
                },
                Careers = new List<string>
                {
                    "Pendeta",
                    "Pelayan Altar",
                    "Pengajar Katekisasi",
                    "Pemimpin Ibadah",
                },
                Tags = new List<string> { "Pelayanan", "Teologi Praktis", "Denominasi" },
                CoverImageUrl = "/images/covers/s2-gerejawi.jpg",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.Now,
                UpdatedBy = adminUserId,
                UpdatedAt = DateTime.Now,
            },
        };

        db.StudyPrograms.AddRange(programs);
        await db.SaveChangesAsync();
    }

    // ─── Lecturers ────────────────────────────────────────────────────────────

    private static async Task SeedLecturersAsync(ApplicationDbContext db, string adminUserId)
    {
        if (await db.Lecturers.AnyAsync())
            return;

        var lecturers = new List<Lecturer>
        {
            // --- PIMPINAN (TOP LEADERSHIP) ---
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Sutrisna Harjanto",
                Title = "Ketua STTB",
                Rank = "pimpinan",
                Degree = "Ph.D. Trinity International University, USA; M.Div. Trinity Theological College, Singapore; S.Farm. Universitas Padjajaran",
                Specialization = "Pendidikan, Biblika, Marketplace",
                ImageUrl = "/uploads/lecturers/sutrisna-1.png",
                Email = "ketua@sttb.ac.id",
                Bio = "Sutrisna Harjanto adalah seorang akademisi dengan latar belakang multidisiplin yang unik, menggabungkan ilmu farmasi dengan teologi mendalam. Beliau fokus pada integrasi iman di dunia kerja (marketplace) dan pengembangan institusi pendidikan teologi.",
                AlmaMater = "Trinity International University, USA",
                Origin = "Deerfield, Illinois — USA",
                Courses = new List<string> { "Etika Marketplace", "Teologi Pendidikan", "Kepemimpinan Strategis" },
                DisplayOrder = 1,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Tan Giok Lie",
                Title = "Wakil Ketua I Akademik",
                Rank = "pimpinan",
                Degree = "Ed.D. Biola University Talbot School Theology USA; M.A. Institut Alkitab Tiranus; S.S. Universitas Kristen Maranatha",
                Specialization = "Pendidikan",
                ImageUrl = "/uploads/lecturers/tan-giok-lie.png",
                Email = "akademik@sttb.ac.id",
                Bio = "Dr. Tan Giok Lie memiliki kepakaran dalam administrasi akademik dan pengembangan kurikulum teologi. Beliau berdedikasi untuk memastikan standar pendidikan di STTB memenuhi kualitas internasional dan relevansi gerejawi.",
                AlmaMater = "Biola University, California",
                Origin = "La Mirada, California — USA",
                Courses = new List<string> { "Administrasi Pendidikan", "Pengembangan Kurikulum", "Teologi Pendidikan Kristen" },
                DisplayOrder = 2,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Wemmy Prayogo",
                Title = "Wakil Ketua II Adm. & Keuangan",
                Rank = "pimpinan",
                Degree = "M.Ed. Monash University Australia; S.Pd. Universitas Kristen Satya Wacana Salatiga",
                Specialization = "Pendidikan",
                ImageUrl = "/uploads/lecturers/wemmy-prayogo.png",
                Email = "admin-keuangan@sttb.ac.id",
                Bio = "Wemmy Prayogo mengkhususkan diri dalam manajemen pendidikan dan efisiensi operasional institusi. Keahliannya memastikan stabilitas keuangan dan infrastruktur pendukung bagi seluruh civitas akademika STTB.",
                AlmaMater = "Monash University, Australia",
                Origin = "Melbourne — Australia",
                Courses = new List<string> { "Manajemen Sekolah", "Kepemimpinan Organisasi", "Kebijakan Pendidikan" },
                DisplayOrder = 3,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Johan Setiawan",
                Title = "Wakil Ketua III Kemahasiswaan",
                Rank = "pimpinan",
                Degree = "M.Th. STT Bandung; M.C.M Discipleship Training Centre Singapore; S.Psi. UGM Yogyakarta",
                Specialization = "Biblika & Praktika",
                ImageUrl = "/uploads/lecturers/johan-setiawan.png",
                Email = "kemahasiswaan@sttb.ac.id",
                Bio = "Johan Setiawan mengintegrasikan ilmu psikologi dengan pelayanan praktika. Sebagai wakil bidang kemahasiswaan, beliau berfokus pada pembentukan karakter, pemuridan, dan kesehatan mental mahasiswa teologi.",
                AlmaMater = "Universitas Gadjah Mada (UGM)",
                Origin = "Yogyakarta — Indonesia",
                Courses = new List<string> { "Psikologi Konseling", "Teologi Pemuridan", "Pelayanan Praktika" },
                DisplayOrder = 4,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },

            // --- KETUA PROGRAM STUDI (KAPRODI) ---
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Ferry Herlianto",
                Title = "Ketua Program Studi S.Pd.",
                Rank = "tetap",
                Degree = "M.Th. STT Tiranus; S.Th. STT Tawangmangu",
                Specialization = "Pendidikan & Praktika",
                ImageUrl = "/uploads/lecturers/ferry.png",
                Bio = "Ferry Herlianto memiliki panggilan dalam mendidik calon guru agama Kristen. Beliau menekankan pada pedagogi yang kreatif dan penguasaan teologi dasar bagi pendidik di lingkungan sekolah.",
                AlmaMater = "STT Tiranus",
                Origin = "Bandung — Indonesia",
                Courses = new List<string> { "Metode Mengajar", "PAK Anak & Remaja", "Evangelisme" },
                DisplayOrder = 5,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Dwi Maria Handayani",
                Title = "Ketua Program Studi M.Th.",
                Rank = "tetap",
                Degree = "Ph.D. AGST Manila; M.Th. International Theological Seminary USA; M.A. STT Bandung; S.E. Unika Widyakarya",
                Specialization = "Biblika & Praktika",
                ImageUrl = "/uploads/lecturers/dwi-maria.png",
                Bio = "Dr. Dwi Maria adalah seorang peneliti biblika yang tekun. Sebagai Kaprodi Pascasarjana, beliau mendorong mahasiswa untuk melakukan riset teologi yang mendalam dan berkontribusi bagi literatur akademik global.",
                AlmaMater = "AGST Manila, Philippines",
                Origin = "Manila — Philippines",
                Courses = new List<string> { "Metodologi Penelitian Teologi", "Hermeneutika Lanjutan", "Eksegesis PB" },
                DisplayOrder = 6,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Sarinah Lo",
                Title = "Ketua Program Studi M.Pd.K.",
                Rank = "tetap",
                Degree = "Ph.D. TEDS; M.Ed. Calvin College USA; M.A. Singapore Bible College; S.Si. Universitas Indonesia",
                Specialization = "Pendidikan",
                ImageUrl = "/uploads/lecturers/sarinah-lo.png",
                Bio = "Dr. Sarinah Lo menggabungkan latar belakang sains dengan pendidikan Kristen. Fokus risetnya adalah pada pembentukan iman melalui institusi pendidikan formal dan kurikulum Kristen kontemporer.",
                AlmaMater = "Trinity Evangelical Divinity School (TEDS)",
                Origin = "Deerfield, Illinois — USA",
                Courses = new List<string> { "Filsafat Pendidikan Kristen", "Teori Belajar Lanjutan", "Desain Kurikulum" },
                DisplayOrder = 7,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Heriyanto",
                Title = "Ketua Program Studi M.Min.",
                Rank = "tetap",
                Degree = "DR. UPI Bandung; M.Th. International Theological Seminary USA; S.Th. STT Bandung",
                Specialization = "Biblika, Pendidikan & Praktika",
                ImageUrl = "/uploads/lecturers/heriyanto2.png",
                Bio = "Dr. Heriyanto aktif dalam pengembangan pelayanan pelayanan gerejawi melalui program Magister Pelayanan. Beliau berfokus pada efektivitas kepemimpinan rohani di tengah tantangan budaya modern.",
                AlmaMater = "Universitas Pendidikan Indonesia (UPI)",
                Origin = "Bandung — Indonesia",
                Courses = new List<string> { "Kepemimpinan Pastoral", "Teologi Pelayanan", "Pertumbuhan Gereja" },
                DisplayOrder = 8,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Kristian Kusumawardana",
                Title = "Ketua Program Studi S.Th.",
                Rank = "tetap",
                Degree = "M.Th. STT Bandung; M.Div. STT SAAT Malang; S.Si. MIPA UNS Surakarta",
                Specialization = "Teologi",
                ImageUrl = "/uploads/lecturers/kristian-Kusumawardana-1.png",
                Bio = "Kristian Kusumawardana adalah pengajar teologi sistematika yang berfokus pada relevansi doktrin klasik bagi jemaat modern. Beliau aktif dalam membimbing mahasiswa sarjana dalam dasar-dasar iman Kristen.",
                AlmaMater = "STT SAAT Malang",
                Origin = "Surakarta — Indonesia",
                Courses = new List<string> { "Teologi Sistematika I", "Doktrin Allah", "Sejarah Teologi" },
                DisplayOrder = 9,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },

            // --- DOSEN TETAP ---
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Joseph Tong",
                Title = "Dosen Filsafat, Sistematika & Praktika",
                Rank = "tetap",
                Degree = "Ph.D. University of Southern California USA; M.B.A. Graduate Theological Foundation Indiana; M.Th. Calvin Theological Seminary USA; B.A. Calvin College USA; B.Th. Seminari Alkitab Asia Tenggara Malang",
                Specialization = "Filsafat, Sistematika & Praktika",
                ImageUrl = "/uploads/lecturers/joseph-tong-rev-1.png",
                Bio = "Dr. Joseph Tong adalah figur senior dengan pengalaman akademik internasional yang sangat luas. Beliau dikenal karena kemampuannya menghubungkan filsafat barat dengan teologi sistematika yang ketat.",
                AlmaMater = "University of Southern California (USC)",
                Origin = "Los Angeles, California — USA",
                Courses = new List<string> { "Filsafat Agama", "Apologetika", "Teologi Sistematika Lanjutan" },
                DisplayOrder = 10,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Herlise Y. Sagala",
                Title = "Dosen Biblika & Praktika",
                Rank = "tetap",
                Degree = "D.Th. & D.Min. & M.Div. & S.Th. Institut Injil Indonesia Batu Malang; M.Th. International Theological Seminary USA; B.A. Universitas 17 Agustus 1945 Medan",
                Specialization = "Biblika & Praktika",
                ImageUrl = "/uploads/lecturers/herlise-y.png",
                Bio = "Dr. Herlise Sagala memiliki dedikasi panjang dalam pengajaran Alkitab, khususnya dalam studi Perjanjian Baru. Beliau aktif dalam pelayanan praktika dan pembinaan rohani kaum wanita.",
                AlmaMater = "Institut Injil Indonesia (I3) Batu",
                Origin = "Batu, Malang — Indonesia",
                Courses = new List<string> { "Studi PB: Surat-Surat Paulus", "Bahasa Yunani Alkitab", "Hermeneutika Biblika" },
                DisplayOrder = 11,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Agus Gunawan",
                Title = "Dosen Teologi, Praktika & Pendidikan",
                Rank = "tetap",
                Degree = "Ph.D. Biola University USA; M.Th. International Theological Seminary USA; M.Th. Trinity Theological College Singapore; S.Th. SAAT Malang",
                Specialization = "Teologi, Praktika & Pendidikan",
                ImageUrl = "/uploads/lecturers/agus-gunawan.png",
                Bio = "Dr. Agus Gunawan adalah pakar dalam studi teologi praktika dengan wawasan global. Riset-risetnya berfokus pada transformasi komunitas melalui pendidikan dan misi gereja di era digital.",
                AlmaMater = "Biola University, USA",
                Origin = "La Mirada, California — USA",
                Courses = new List<string> { "Misiologi Kontemporer", "Teologi Praktika", "Etika Kristen" },
                DisplayOrder = 12,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Chandra Koewoso",
                Title = "Dosen Biblika & Praktika",
                Rank = "tetap",
                Degree = "D.Min. & M.Div. Singapore Bible College; M.M. & S.T. Universitas Tarumanagara Jakarta",
                Specialization = "Biblika & Praktika",
                ImageUrl = "/uploads/lecturers/chandra-koewoso.png",
                Bio = "Dr. Chandra Koewoso membawa perspektif manajemen dan teknik ke dalam pelayanan biblika. Fokus pengajarannya adalah pada kepemimpinan Kristen yang transformatif dan manajemen pelayanan.",
                AlmaMater = "Singapore Bible College",
                Origin = "Singapore",
                Courses = new List<string> { "Manajemen Gereja", "Eksegesis PL", "Kepemimpinan Kristiani" },
                DisplayOrder = 13,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Budiyanto Santosa",
                Title = "Dosen Pendidikan & Biblika",
                Rank = "tetap",
                Degree = "D.Min. Gordon Conwell Theological Seminary USA; M.Th. Trinity Theological Seminary Singapore; S.Th. SAAT Malang; S.Pd. Universitas Katolik Indonesia Atmajaya Jakarta",
                Specialization = "Pendidikan & Biblika",
                ImageUrl = "/uploads/lecturers/budiyanto-1.png",
                Bio = "Dr. Budiyanto Santosa adalah ahli dalam pendidikan biblika yang menggabungkan metode pedagogi modern dengan kedalaman eksegetis. Beliau berfokus pada literasi Alkitab di kalangan jemaat awam.",
                AlmaMater = "Gordon-Conwell Theological Seminary",
                Origin = "South Hamilton, Massachusetts — USA",
                Courses = new List<string> { "Pedagogi Alkitab", "Teologi Biblika", "Pengantar PL & PB" },
                DisplayOrder = 14,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            }
        };

        db.Lecturers.AddRange(lecturers);
        await db.SaveChangesAsync();
    }

    // ─── Foundation ──────────────────────────────────────────────────────────

    private static async Task SeedFoundationMembersAsync(ApplicationDbContext db, string adminUserId)
    {
        if (await db.FoundationMembers.AnyAsync())
            return;

        var members = new List<FoundationMember>
        {
            // Dewan Pembina
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Pdt. Agus Gunawan, Ph.D.",
                Position = "Anggota Dewan Pembina",
                Category = "pembina",
                Description = "Pdt. Dr. Agus Gunawan adalah hamba Tuhan senior yang berdedikasi pada pendidikan teologi dan bimbingan spiritual yayasan.",
                ImageUrl = "/uploads/foundation/agus-gunawan.png",
                DisplayOrder = 1,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Pnt. Subianto Tjandra",
                Position = "Anggota Dewan Pembina",
                Category = "pembina",
                Description = "Penatua Subianto Tjandra berkontribusi dalam pengawasan tata kelola dan integritas operasional yayasan.",
                ImageUrl = "/uploads/foundation/profile-placeholder.jpg",
                DisplayOrder = 2,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Pdt. Budiyanto Santosa, D.Min.",
                Position = "Anggota Dewan Pembina",
                Category = "pembina",
                Description = "Pdt. Dr. Budiyanto Santosa memberikan arahan strategis dalam bidang pelayanan misi dan pengembangan gereja.",
                ImageUrl = "/uploads/foundation/budiyanto-1.png",
                DisplayOrder = 3,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },

            // Category: pengurus
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Pnts. Benny Soenarjo",
                Position = "Ketua Dewan Pengurus",
                Category = "pengurus",
                Description = "Penatua Benny Soenarjo memimpin operasional yayasan dengan visi transformatif, berfokus pada efektivitas pelayanan dan kolaborasi.",
                ImageUrl = "/uploads/foundation/profile-placeholder.jpg",
                DisplayOrder = 1,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Pnts. Ginawan Chondro",
                Position = "Wakil Ketua Dewan Pengurus",
                Category = "pengurus",
                Description = "Penatua Ginawan Chondro mendampingi Ketua dalam perencanaan strategis dan pengawasan pelaksanaan program kerja yayasan.",
                ImageUrl = "/uploads/foundation/profile-placeholder.jpg",
                DisplayOrder = 2,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Pnt. Arif Subagyo",
                Position = "Sekretaris",
                Category = "pengurus",
                Description = "Penatua Arif Subagyo mengelola korespondensi formal, pencatatan rapat, dan administrasi umum yayasan dengan teliti.",
                ImageUrl = "/uploads/foundation/profile-placeholder.jpg",
                DisplayOrder = 3,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Pnt. Widianto Tjandradipura",
                Position = "Bendahara",
                Category = "pengurus",
                Description = "Penatua Widianto Tjandradipura bertanggung jawab atas penyusunan anggaran, pelaporan keuangan, dan kepatuhan finansial yayasan.",
                ImageUrl = "/uploads/foundation/profile-placeholder.jpg",
                DisplayOrder = 4,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },

            // Category: anggota
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Pnts. Agus Tjandra",
                Position = "Anggota Dewan",
                Category = "anggota",
                Description = "Penatua Agus Tjandra aktif dalam memberikan masukan strategis bagi pengembangan pelayanan jemaat dan komunitas.",
                ImageUrl = "/uploads/foundation/profile-placeholder.jpg",
                DisplayOrder = 1,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Ev. Doroti Tunggal Widjaja, M.Th.",
                Position = "Anggota Dewan",
                Category = "anggota",
                Description = "Penginjil Doroti Tunggal Widjaja, M.Th. berkontribusi dalam inisiatif pendidikan iman dan pengembangan kurikulum teologi.",
                ImageUrl = "/uploads/foundation/doroti-tong-rev.png",
                DisplayOrder = 2,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Bp. Eddy Samuel Affendie",
                Position = "Anggota Dewan",
                Category = "anggota",
                Description = "Bapak Eddy Samuel Affendie memberikan saran ahli dalam manajemen aset dan optimalisasi sumber daya yayasan.",
                ImageUrl = "/uploads/foundation/profile-placeholder.jpg",
                DisplayOrder = 3,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Pnts. Edi Sukamto Josana",
                Position = "Anggota Dewan",
                Category = "anggota",
                Description = "Penatua Edi Sukamto Josana fokus pada program pemberdayaan ekonomi jemaat dan pengembangan kemitraan strategis.",
                ImageUrl = "/uploads/foundation/profile-placeholder.jpg",
                DisplayOrder = 4,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Bp. Herjanto Gunawan",
                Position = "Anggota Dewan",
                Category = "anggota",
                Description = "Bapak Herjanto Gunawan berkontribusi dengan kepakaran teknisnya dalam proyek infrastruktur dan teknologi informasi yayasan.",
                ImageUrl = "/uploads/foundation/profile-placeholder.jpg",
                DisplayOrder = 5,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Pnts. Joseph Koshan",
                Position = "Anggota Dewan",
                Category = "anggota",
                Description = "Penatua Joseph Koshan fokus pada pengembangan pelayanan pemuda dan inisiatif penginjilan kontemporer.",
                ImageUrl = "/uploads/foundation/profile-placeholder.jpg",
                DisplayOrder = 6,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Pnt. Suwito Kwee",
                Position = "Anggota Dewan",
                Category = "anggota",
                Description = "Penatua Suwito Kwee memberikan masukan strategis dalam upaya menjalin hubungan baik dengan pemerintah dan masyarakat luas.",
                ImageUrl = "/uploads/foundation/profile-placeholder.jpg",
                DisplayOrder = 7,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
            }
        };

        db.FoundationMembers.AddRange(members);
        await db.SaveChangesAsync();
    }

    // ─── Admission Waves ─────────────────────────────────────────────────────

    private static async Task SeedAdmissionWavesAsync(ApplicationDbContext db, string adminUserId)
    {
        if (await db.AdmissionWaves.AnyAsync())
            return;

        var waves = new List<AdmissionWave>
        {
            new()
            {
                Id = Guid.NewGuid(),
                WaveNumber = "I",
                Label = "Gelombang I",
                Deadline = new DateTime(2025, 10, 13),
                Status = "closed",
                Color = "#E62129",
                PsikotesSchedule = new DateTime(2025, 10, 17, 9, 0, 0),
                TertulisSchedule = new DateTime(2025, 10, 21, 9, 0, 0),
                WawancaraSchedule = new DateTime(2025, 11, 20, 9, 0, 0),
                DisplayOrder = 1,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
                Steps = new List<AdmissionWaveStepItem>
                {
                    new() { StepNumber = 1, Title = "Batas Pengembalian Formulir", WhenText = new DateTime(2025, 10, 13, 0, 0, 0), Via = "Via pos atau e-mail" },
                    new() { StepNumber = 2, Title = "Seleksi Dokumen Pendaftaran", WhenText = new DateTime(2025, 10, 14, 9, 0, 0), Via = "Onsite" },
                    new() { StepNumber = 3, Title = "Panggilan Tes", WhenText = new DateTime(2025, 10, 15, 9, 0, 0), Via = "Via email & WhatsApp" },
                    new() { StepNumber = 4, Title = "Psikotes Online Tahap 1 (Pengisian Form)", WhenText = new DateTime(2025, 10, 17, 9, 0, 0), Via = "Via website" },
                    new() { StepNumber = 5, Title = "Psikotes Online Tahap 2 (Tes Bersama)", WhenText = new DateTime(2025, 10, 20, 9, 0, 0), Via = "Via Zoom & website" },
                    new() { StepNumber = 6, Title = "Tes Tertulis Online (Teologi, Bahasa Indonesia, Bahasa Inggris)", WhenText = new DateTime(2025, 10, 21, 9, 0, 0), Via = "Via Zoom & website" },
                    new() { StepNumber = 7, Title = "Psikotes Tahap 3 (Wawancara Psikolog)", WhenText = new DateTime(2025, 10, 27, 9, 0, 0), Via = "Via Zoom" },
                    new() { StepNumber = 8, Title = "Wawancara dengan Dosen STTB", WhenText = new DateTime(2025, 11, 17, 9, 0, 0), Via = "Via Zoom" },
                    new() { StepNumber = 9, Title = "Pengumuman Hasil Penerimaan", WhenText = new DateTime(2025, 11, 26, 9, 0, 0), Via = "Via e-mail & WhatsApp" },
                }
            },
            new()
            {
                Id = Guid.NewGuid(),
                WaveNumber = "II",
                Label = "Gelombang II",
                Deadline = new DateTime(2026, 2, 2),
                Status = "closed",
                Color = "#0A2C74",
                PsikotesSchedule = new DateTime(2026, 2, 6, 9, 0, 0),
                TertulisSchedule = new DateTime(2026, 2, 10, 9, 0, 0),
                WawancaraSchedule = new DateTime(2026, 3, 3, 9, 0, 0),
                DisplayOrder = 2,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
                Steps = new List<AdmissionWaveStepItem>
                {
                    new() { StepNumber = 1, Title = "Batas Pengembalian Formulir", WhenText = new DateTime(2026, 2, 2, 0, 0, 0), Via = "Via pos atau e-mail" },
                    new() { StepNumber = 2, Title = "Seleksi Dokumen Pendaftaran", WhenText = new DateTime(2026, 2, 3, 9, 0, 0), Via = "Onsite" },
                    new() { StepNumber = 3, Title = "Panggilan Tes", WhenText = new DateTime(2026, 2, 4, 9, 0, 0), Via = "Via email & WhatsApp" },
                    new() { StepNumber = 4, Title = "Psikotes Online Tahap 1 (Pengisian Form)", WhenText = new DateTime(2026, 2, 6, 9, 0, 0), Via = "Via website" },
                    new() { StepNumber = 5, Title = "Psikotes Online Tahap 2 (Tes Bersama)", WhenText = new DateTime(2026, 2, 9, 9, 0, 0), Via = "Via Zoom & website" },
                    new() { StepNumber = 6, Title = "Tes Tertulis Online (Teologi, Bahasa Indonesia, Bahasa Inggris)", WhenText = new DateTime(2026, 2, 10, 9, 0, 0), Via = "Via Zoom & website" },
                    new() { StepNumber = 7, Title = "Psikotes Tahap 3 (Wawancara Psikolog)", WhenText = new DateTime(2026, 2, 16, 9, 0, 0), Via = "Via Zoom" },
                    new() { StepNumber = 8, Title = "Wawancara dengan Dosen STTB", WhenText = new DateTime(2026, 3, 16, 9, 0, 0), Via = "Via Zoom" },
                    new() { StepNumber = 9, Title = "Pengumuman Hasil Penerimaan", WhenText = new DateTime(2026, 3, 25, 9, 0, 0), Via = "Via e-mail & WhatsApp" },
                }
            },
            new()
            {
                Id = Guid.NewGuid(),
                WaveNumber = "III",
                Label = "Gelombang III",
                Deadline = new DateTime(2026, 4, 27),
                Status = "upcoming",
                Color = "#0570CD",
                PsikotesSchedule = new DateTime(2026, 5, 1, 9, 0, 0),
                TertulisSchedule = new DateTime(2026, 5, 5, 9, 0, 0),
                WawancaraSchedule = new DateTime(2026, 5, 26, 9, 0, 0),
                DisplayOrder = 3,
                IsActive = true,
                CreatedBy = adminUserId,
                CreatedAt = DateTime.UtcNow,
                Steps = new List<AdmissionWaveStepItem>
                {
                    new() { StepNumber = 1, Title = "Batas Pengembalian Formulir", WhenText = new DateTime(2026, 4, 27, 0, 0, 0), Via = "Via pos atau e-mail" },
                    new() { StepNumber = 2, Title = "Seleksi Dokumen Pendaftaran", WhenText = new DateTime(2026, 4, 28, 9, 0, 0), Via = "Onsite" },
                    new() { StepNumber = 3, Title = "Panggilan Tes", WhenText = new DateTime(2026, 4, 29, 9, 0, 0), Via = "Via email & WhatsApp" },
                    new() { StepNumber = 4, Title = "Psikotes Online Tahap 1 (Pengisian Form)", WhenText = new DateTime(2026, 5, 1, 9, 0, 0), Via = "Via website" },
                    new() { StepNumber = 5, Title = "Psikotes Online Tahap 2 (Tes Bersama)", WhenText = new DateTime(2026, 5, 4, 9, 0, 0), Via = "Via Zoom & website" },
                    new() { StepNumber = 6, Title = "Tes Tertulis Online (Teologi, Bahasa Indonesia, Bahasa Inggris)", WhenText = new DateTime(2026, 5, 5, 9, 0, 0), Via = "Via Zoom & website" },
                    new() { StepNumber = 7, Title = "Psikotes Tahap 3 (Wawancara Psikolog)", WhenText = new DateTime(2026, 5, 11, 9, 0, 0), Via = "Via Zoom" },
                    new() { StepNumber = 8, Title = "Wawancara dengan Dosen STTB", WhenText = new DateTime(2026, 6, 15, 9, 0, 0), Via = "Via Zoom" },
                    new() { StepNumber = 9, Title = "Pengumuman Hasil Penerimaan", WhenText = new DateTime(2026, 6, 24, 9, 0, 0), Via = "Via e-mail & WhatsApp" },
                }
            }
        };

        db.AdmissionWaves.AddRange(waves);
        await db.SaveChangesAsync();
    }
}
