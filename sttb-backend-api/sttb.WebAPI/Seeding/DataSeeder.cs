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
    }

    // ─── Categories ──────────────────────────────────────────────────────────

    private static async Task<Dictionary<string, NewsCategory>> SeedNewsCategoriesAsync(ApplicationDbContext db)
    {
        if (!await db.NewsCategories.AnyAsync())
        {
            var categories = new List<NewsCategory>
            {
                new() { Id = Guid.NewGuid(), Name = "Konferensi", Slug = "konferensi" },
                new() { Id = Guid.NewGuid(), Name = "Akademik", Slug = "akademik" },
                new() { Id = Guid.NewGuid(), Name = "Beasiswa", Slug = "beasiswa" },
                new() { Id = Guid.NewGuid(), Name = "Kerjasama", Slug = "kerjasama" },
                new() { Id = Guid.NewGuid(), Name = "Seminar", Slug = "seminar" },
                new() { Id = Guid.NewGuid(), Name = "Fasilitas", Slug = "fasilitas" },
                new() { Id = Guid.NewGuid(), Name = "Admisi", Slug = "admisi" },
                new() { Id = Guid.NewGuid(), Name = "Prestasi", Slug = "prestasi" },
            };
            db.NewsCategories.AddRange(categories);
            await db.SaveChangesAsync();
        }
        return await db.NewsCategories.ToDictionaryAsync(c => c.Name);
    }

    private static async Task<Dictionary<string, EventCategory>> SeedEventCategoriesAsync(ApplicationDbContext db)
    {
        if (!await db.EventCategories.AnyAsync())
        {
            var categories = new List<EventCategory>
            {
                new() { Id = Guid.NewGuid(), Name = "Admisi", Slug = "admisi" },
                new() { Id = Guid.NewGuid(), Name = "Kerohanian", Slug = "kerohanian" },
                new() { Id = Guid.NewGuid(), Name = "LEAD", Slug = "lead" },
                new() { Id = Guid.NewGuid(), Name = "Seminar", Slug = "seminar" },
                new() { Id = Guid.NewGuid(), Name = "Akademik", Slug = "akademik" },
                new() { Id = Guid.NewGuid(), Name = "Misi", Slug = "misi" },
                new() { Id = Guid.NewGuid(), Name = "Pelatihan", Slug = "pelatihan" },
            };
            db.EventCategories.AddRange(categories);
            await db.SaveChangesAsync();
        }
        return await db.EventCategories.ToDictionaryAsync(c => c.Name);
    }

    private static async Task<Dictionary<string, MediaCategory>> SeedMediaCategoriesAsync(ApplicationDbContext db)
    {
        if (!await db.MediaCategories.AnyAsync())
        {
            var categories = new List<MediaCategory>
            {
                new() { Id = Guid.NewGuid(), Name = "Misi & Penginjilan", Slug = "misi-penginjilan" },
                new() { Id = Guid.NewGuid(), Name = "Pelayanan Anak", Slug = "pelayanan-anak" },
                new() { Id = Guid.NewGuid(), Name = "Pemuridan & Pembinaan", Slug = "pemuridan-pembinaan" },
                new() { Id = Guid.NewGuid(), Name = "Pendidikan Teologi", Slug = "pendidikan-teologi" },
                new() { Id = Guid.NewGuid(), Name = "Belajar & Mengajar", Slug = "belajar-mengajar" },
                new() { Id = Guid.NewGuid(), Name = "Pembelajaran Digital", Slug = "pembelajaran-digital" },
                new() { Id = Guid.NewGuid(), Name = "Pelayanan Keluarga", Slug = "pelayanan-keluarga" },
                new() { Id = Guid.NewGuid(), Name = "Pelayanan Dunia Kerja", Slug = "pelayanan-dunia-kerja" },
            };
            db.MediaCategories.AddRange(categories);
            await db.SaveChangesAsync();
        }
        return await db.MediaCategories.ToDictionaryAsync(c => c.Name);
    }

    // ─── News ────────────────────────────────────────────────────────────────

    private static async Task SeedNewsAsync(ApplicationDbContext db, string adminUserId, Dictionary<string, NewsCategory> categories)
    {
        if (await db.News.AnyAsync()) return;

        var now = DateTime.UtcNow;

        var articles = new List<News>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "STTB Mengadakan Konferensi Teologi Transformasi 2025",
                Slug = "konferensi-teologi-transformasi-2025",
                Excerpt = "Sekolah Tinggi Teologi Bandung menyelenggarakan konferensi teologi internasional bertema 'Transformasi Gereja di Era Digital' yang dihadiri lebih dari 500 peserta.",
                Content = "<p>Sekolah Tinggi Teologi Bandung (STTB) sukses menyelenggarakan Konferensi Teologi Transformasi 2025 pada tanggal 15-17 Maret 2025 di Gedung Serbaguna STTB.</p><p>Konferensi yang bertema \"Transformasi Gereja di Era Digital\" ini dihadiri oleh lebih dari 500 peserta dari berbagai denominasi gereja di seluruh Indonesia, termasuk para pendeta, penatua, mahasiswa teologi, dan aktivis Kristen.</p><p>Pembicara utama dalam konferensi ini antara lain Dr. Samuel Gunawan, Pdt. Prof. Benyamin Intan, Ph.D., dan Dr. Lena Purbawaseso.</p>",
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
                Excerpt = "STTB dengan bangga meluluskan 120 mahasiswa terbaik dalam upacara wisuda yang khidmat dan penuh sukacita.",
                Content = "<p>Sekolah Tinggi Teologi Bandung kembali meluluskan generasi pelayan Tuhan yang baru. Pada tanggal 20 Februari 2025, STTB menyelenggarakan Upacara Wisuda Angkatan ke-45 di Kampus STTB Bandung.</p><p>Sebanyak 120 mahasiswa diwisuda dalam upacara yang dihadiri oleh keluarga, dosen, dan tamu undangan. Para wisudawan terdiri dari 65 lulusan program Sarjana Teologi, 28 lulusan Sarjana Pendidikan Kristen, dan 27 lulusan dari berbagai program Magister.</p>",
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
                Excerpt = "STTB membuka pendaftaran beasiswa penuh dan parsial untuk tahun akademik 2025/2026 bagi calon mahasiswa berprestasi.",
                Content = "<p>Sekolah Tinggi Teologi Bandung kembali membuka program beasiswa untuk tahun akademik 2025/2026. Tersedia beasiswa penuh (full scholarship) dan beasiswa parsial bagi calon mahasiswa yang memenuhi kriteria.</p><p>Pendaftaran beasiswa dibuka mulai 1 Januari hingga 31 Maret 2025. Calon penerima beasiswa akan melalui seleksi akademik, wawancara, dan penilaian karakter pelayanan.</p>",
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
                Excerpt = "STTB menandatangani MoU dengan Gordon-Conwell Theological Seminary dan Calvin Theological Seminary untuk program pertukaran mahasiswa.",
                Content = "<p>Dalam upaya memperluas wawasan dan meningkatkan kualitas pendidikan teologi, STTB telah menandatangani Memorandum of Understanding (MoU) dengan dua institusi teologi terkemuka di Amerika Serikat.</p><p>Kerjasama ini mencakup program pertukaran mahasiswa, penelitian bersama, dan pengembangan kurikulum yang relevan dengan konteks Asia Tenggara.</p>",
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
                Excerpt = "STTB mengadakan seminar pastoral intensif tentang pendekatan Alkitabiah terhadap kesehatan mental dan konseling pastoral.",
                Content = "<p>Tantangan kesehatan mental semakin nyata di era post-pandemi. STTB menjawab kebutuhan ini dengan menyelenggarakan Seminar Pastoral intensif berjudul 'Pemimpin Gereja dan Isu Kesehatan Mental'.</p><p>Seminar ini menghadirkan pakar konseling pastoral dan psikologi Kristen untuk membekali para pemimpin gereja dalam menghadapi isu-isu kesehatan mental di jemaat mereka.</p>",
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
                Excerpt = "Perpustakaan STTB kini menyediakan akses ke lebih dari 50.000 judul buku digital dan jurnal akademik teologi internasional.",
                Content = "<p>Perpustakaan Sekolah Tinggi Teologi Bandung terus berkembang untuk mendukung kebutuhan akademik mahasiswa dan dosen. Mulai tahun 2025, perpustakaan STTB menyediakan akses penuh ke ATLA Religion Database, repositori jurnal teologi terbesar di dunia.</p>",
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
                Excerpt = "STTB membuka pendaftaran mahasiswa baru untuk program S1 Teologi, S1 Pendidikan Kristen, dan berbagai program Magister.",
                Content = "<p>Sekolah Tinggi Teologi Bandung dengan bangga mengumumkan pembukaan penerimaan mahasiswa baru untuk tahun akademik 2025/2026. Tersedia program Sarjana dan Pascasarjana di bidang teologi dan pendidikan Kristen.</p><p>Pendaftaran dapat dilakukan secara online melalui website resmi STTB atau langsung ke kampus di Bandung.</p>",
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
                Excerpt = "Dr. Grace Liem dari STTB meraih penghargaan penelitian terbaik dari Asosiasi Sekolah Teologi Indonesia atas karyanya tentang Teologi Hikmat.",
                Content = "<p>Kebanggaan besar datang bagi keluarga besar STTB. Dr. Grace Liem, dosen Studi Perjanjian Lama di STTB, berhasil meraih penghargaan Penelitian Teologi Terbaik dari Asosiasi Sekolah Teologi Indonesia (ASTI) 2024.</p><p>Penelitian beliau berjudul \"Relevansi Teologi Hikmat Perjanjian Lama bagi Spiritualitas Urban Indonesia\" dinilai memberikan kontribusi signifikan bagi pengembangan teologi kontekstual Indonesia.</p>",
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
                Excerpt = "Menjawab kebutuhan jemaat di daerah terpencil, STTB meluncurkan program pendidikan teologi jarak jauh yang fleksibel dan terjangkau.",
                Content = "<p>Sekolah Tinggi Teologi Bandung meluncurkan program pendidikan teologi berbasis online yang dirancang khusus untuk para pelayan gereja di seluruh Indonesia yang tidak dapat hadir secara fisik ke kampus.</p><p>Program ini mencakup modul video pembelajaran, sesi mentoring online dengan dosen, dan ujian komprehensif yang dapat diakses dari mana saja.</p>",
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
                Excerpt = "Gedung kuliah utama STTB telah selesai direnovasi dengan fasilitas modern untuk mendukung proses belajar mengajar yang lebih efektif.",
                Content = "<p>Setelah delapan bulan proses renovasi, gedung kuliah utama Sekolah Tinggi Teologi Bandung kini hadir dengan wajah baru yang lebih modern dan representatif.</p><p>Renovasi mencakup ruang kuliah berkapasitas besar, laboratorium bahasa, ruang seminar, dan fasilitas multimedia canggih yang akan mendukung pengalaman belajar mahasiswa secara optimal.</p>",
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

    private static async Task SeedEventsAsync(ApplicationDbContext db, string adminUserId, Dictionary<string, EventCategory> categories)
    {
        if (await db.Events.AnyAsync()) return;

        var now = DateTime.UtcNow;

        var events = new List<Event>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Penerimaan Mahasiswa Baru 2025/2026",
                Description = "Daftarkan diri Anda untuk menjadi bagian dari keluarga besar STTB. Tersedia program S1 dan S2 Teologi. Pendaftaran dibuka secara online dan offline.",
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
                Description = "Retreat tahunan mahasiswa STTB yang akan diadakan di Lembang, Bandung. Tema: 'Dipanggil untuk Melayani dalam Kekudusan'.",
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
                Description = "LEAD Center STTB mengadakan konferensi kepemimpinan untuk para profesional Kristen tentang integrasi iman dan dunia bisnis.",
                StartDate = now.AddDays(70),
                EndDate = now.AddDays(71),
                Location = "Aula Utama STTB Bandung",
                ImageUrl = "/uploads/events/event-3.jpg",
                CategoryId = categories["LEAD"].Id,
                RegistrationUrl = "https://www.eventbrite.com/e/fire-conference-a-christian-business-conference-tickets-1972725946410",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-3),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Kuliah Umum: Teologi dan Artificial Intelligence",
                Description = "Pembicara tamu dari Singapore Bible College akan membahas perspektif Alkitabiah tentang kecerdasan buatan dan masa depan manusia.",
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
                Description = "Workshop intensif penulisan karya ilmiah teologi bagi mahasiswa program pascasarjana STTB. Dipandu oleh editor jurnal teologi nasional.",
                StartDate = now.AddDays(14),
                EndDate = now.AddDays(14),
                Location = "Ruang Seminar Lt. 3, STTB Bandung",
                ImageUrl = "/uploads/events/event-5.jpg",
                CategoryId = categories["Akademik"].Id,
                RegistrationUrl = "https://www.eventbrite.com/e/academic-writing-workshop-tickets-1981778103656",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-2),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Ibadah Pembukaan Tahun Akademik 2025/2026",
                Description = "Ibadah syukur dan pembukaan resmi tahun akademik baru STTB. Seluruh civitas akademika diundang untuk hadir.",
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
                Description = "Seminar tentang tantangan dan strategi pelayanan misi di daerah 3T (Tertinggal, Terdepan, Terluar) Indonesia bersama praktisi misi lapangan.",
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
                Description = "Upacara wisuda Angkatan ke-46 Sekolah Tinggi Teologi Bandung. Keluarga wisudawan diwajibkan mendaftar undangan terlebih dahulu.",
                StartDate = now.AddDays(90),
                EndDate = null,
                Location = "Gedung Serbaguna STTB Bandung",
                ImageUrl = "/uploads/events/event-8.jpg",
                CategoryId = categories["Akademik"].Id,
                RegistrationUrl = "https://www.waikato.ac.nz/students/graduation/graduand-and-guest-tickets/",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-6),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Open House STTB untuk Calon Mahasiswa",
                Description = "Kesempatan bagi calon mahasiswa dan orang tua untuk mengenal lebih dekat program studi, fasilitas, dan kehidupan kampus STTB.",
                StartDate = now.AddDays(25),
                EndDate = null,
                Location = "Kampus STTB Bandung",
                ImageUrl = "/uploads/events/event-9.jpg",
                CategoryId = categories["Admisi"].Id,
                RegistrationUrl = "https://www.eventbrite.sg/e/nus-college-open-house-2026-tickets-1979704932746",
                IsPublished = true,
                CreatedBy = adminUserId,
                CreatedAt = now.AddDays(-8),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Pelatihan Konseling Pastoral Tingkat Lanjut",
                Description = "Pelatihan intensif konseling pastoral selama tiga hari untuk para pendeta dan pemimpin gereja. Sertifikat kompetensi diberikan bagi peserta yang lulus.",
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

    private static async Task SeedMediaAsync(ApplicationDbContext db, string adminUserId, Dictionary<string, MediaCategory> categories)
    {
        if (await db.Media.AnyAsync()) return;

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
                Title = "Pendidikan Kristen Berbasis Alkitabiah: Membangun Fondasi Iman dan Spiritualitas Generasi Era Digital",
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
                Title = "Pendidikan Agama Kristen: Mengintegrasikan Nilai-Nilai Spiritual dalam Era Globalisasi",
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
                Title = "Pendidikan Agama Kristen dalam Keluarga di Era Digital: Membangun Remaja Bijak Menggunakan Media Sosial",
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
}
