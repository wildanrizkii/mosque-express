import express from "express";
import path from "path";
import product from './api/product.js';

const app = express();

const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
const staticPath = path.resolve("public");
app.set('views', path.join(staticPath, '../views'))
app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));

app.use("/api/product", product);

app.get("/", async (req, res) => {

    // API Ninjas (TIME)
    const kota = 'Bandung';
    const timeAPI = 'https://api.api-ninjas.com/v1/worldtime?city=' + kota;
    const APIKey = 'NoWN4Uv5h9SaZGYWHcbJbg==1bAK2bvlRKJ6HAq8';
    
    // NoCodeAPI
    // const APIKegiatan = 'https://v1.nocodeapi.com/wildanrizkii/google_sheets/StuMBMJbZAHAfgVd?tabId=Kegiatan'

    // SheetDB API
    // const APIKegiatan = 'https://sheetdb.io/api/v1/cwocbdhpkx4z4'

    // gsx2json API
    const APIKegiatan = 'https://gsx2json.com/api?id=1OFsj9Bm84BF1qGzEWhLZ350D099XiB2tsRChD7KuzpE&sheet=Sheet1&api_key=AIzaSyD17_QyNnk3j3Wbf8yxUugz4VVLsAJtqXM'

    let waktuSekarang, tahun, bulan, tanggal, timeSubscribe, time, jadwalAPI, jadwal, jadwalSholat;

    // Fungsi untuk mendapatkan waktu sekarang dari API Ninjas
    async function getTime(url, key) {
        const response = await fetch(url, 
            {
                method: 'GET',
                headers: {
                    'X-Api-Key': key
                },
                contentType: 'application/json',
                json: true
            }
        );

        const data = await response.json();
        return data;
    }

    // Waktu dalam bentuk JSON
    time = await getTime(timeAPI, APIKey);
    
    const tanggalSekarang = new Date(time.date);
    
    let hariSekarang = time.day_of_week;
    let bulanSekarang = time.month;

    if (hariSekarang == 'Monday'){
        hariSekarang = 'Senin'
    } else if(hariSekarang == 'Tuesday'){
        hariSekarang = 'Selasa'
    } else if(hariSekarang == 'Wednesday'){
        hariSekarang = 'Rabu'
    } else if(hariSekarang == 'Thursday'){
        hariSekarang = 'Kamis'
    } else if(hariSekarang == 'Friday'){
        hariSekarang = 'Jumat'
    } else if(hariSekarang == 'Saturday'){
        hariSekarang = 'Sabtu'
    } else if(hariSekarang == 'Sunday'){
        hariSekarang = 'Minggu'
    }

    if (bulanSekarang == '01'){
        bulanSekarang = 'Januari'
    } else if(bulanSekarang == '02'){
        bulanSekarang = 'Februari'
    } else if(bulanSekarang == '03'){
        bulanSekarang = 'Maret'
    } else if(bulanSekarang == '04'){
        bulanSekarang = 'April'
    } else if(bulanSekarang == '05'){
        bulanSekarang = 'Mei'
    } else if(bulanSekarang == '06'){
        hariSekarang = 'Juni'
    } else if(bulanSekarang == '07'){
        bulanSekarang = 'Juli'
    } else if(bulanSekarang == '08'){
        bulanSekarang = 'Agustus'
    } else if(bulanSekarang == '09'){
        bulanSekarang = 'September'
    } else if(bulanSekarang == '10'){
        bulanSekarang = 'Oktober'
    } else if(bulanSekarang == '11'){
        bulanSekarang = 'November'
    } else if(bulanSekarang == '12'){
        bulanSekarang = 'Desember'
    }
    
    const tanggalSekarangID = hariSekarang + ', ' + time.day + ' ' + bulanSekarang + ' ' + time.year

    // Mengolah Waktu
    waktuSekarang = parseInt(time.hour * 60) + parseInt(time.minute)
    tahun = time.year
    bulan = time.month
    tanggal = time.day
    timeSubscribe = time.datetime

    // Deklarasi API untuk jadwal sholat di Kota Bandung
    jadwalAPI = 'https://api.myquran.com/v1/sholat/jadwal/1219/' + tahun + '/' + bulan + '/' + tanggal

    // Fungsi untuk mendapatkan jadwal sholat di Kota Bandung dari API myquran
    async function getJadwalSholat(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    // Jadwal Sholat dalam bentuk JSON
    jadwal = await getJadwalSholat(jadwalAPI);

    // Mengambil data jadwal sholat sesuai kebutuhan
    jadwalSholat = jadwal.data.jadwal

    // Fungsi untuk mengambil jadwal sholat subuh
    async function getSholatSubuh(jadwalSholat) {
        const subuh = jadwalSholat.subuh
        const waktuJamSubuh = subuh.split(':')[0] * 60
        const waktuMenitSubuh = subuh.split(':')[1]
        const waktuSubuh = parseInt(waktuJamSubuh) + parseInt(waktuMenitSubuh)
        return waktuSubuh;
    }

    // Fungsi untuk mengambil jadwal sholat dzuhur
    async function getSholatDzuhur(jadwalSholat) {
        const dzuhur = jadwalSholat.dzuhur
        const waktuJamDzuhur = dzuhur.split(':')[0] * 60
        const waktuMenitDzuhur = dzuhur.split(':')[1]
        const waktuDzuhur = parseInt(waktuJamDzuhur) + parseInt(waktuMenitDzuhur)
        return waktuDzuhur;
    }

    // Fungsi untuk mengambil jadwal sholat ashar
    async function getSholatAshar(jadwalSholat) {
        const ashar = jadwalSholat.ashar
        const waktuJamAshar = ashar.split(':')[0] * 60
        const waktuMenitAshar = ashar.split(':')[1]
        const waktuAshar = parseInt(waktuJamAshar) + parseInt(waktuMenitAshar)
        return waktuAshar;
    }

    // Fungsi untuk mengambil jadwal sholat maghrib
    async function getSholatMaghrib(jadwalSholat) {
        const maghrib = jadwalSholat.maghrib
        const waktuJamMaghrib = maghrib.split(':')[0] * 60
        const waktuMenitMaghrib = maghrib.split(':')[1]
        const waktuMaghrib = parseInt(waktuJamMaghrib) + parseInt(waktuMenitMaghrib)
        return waktuMaghrib;
    }

    // Fungsi untuk mengambil jadwal sholat isya
    async function getSholatIsya(jadwalSholat) {
        const isya = jadwalSholat.isya
        const waktuJamIsya = isya.split(':')[0] * 60
        const waktuMenitIsya = isya.split(':')[1]
        const waktuIsya = parseInt(waktuJamIsya) + parseInt(waktuMenitIsya)
        return waktuIsya;
    }

    // Fungsi untuk mengambil data kegiatan dari Google Sheet melalui API
    async function getKegiatan(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const waktuSubuh = await getSholatSubuh(jadwalSholat);
    const waktuDzuhur = await getSholatDzuhur(jadwalSholat);
    const waktuAshar = await getSholatAshar(jadwalSholat);
    const waktuMaghrib = await getSholatMaghrib(jadwalSholat);
    const waktuIsya = await getSholatIsya(jadwalSholat);

    // SheetDB
    // let dataKegiatan = await getKegiatan(APIKegiatan);

    // NoCodeAPI
    // let kegiatan = await getKegiatan(APIKegiatan);
    // let dataKegiatan = kegiatan.data

    // gsx2json
    const kegiatan = await getKegiatan(APIKegiatan);
    const dataKegiatan = kegiatan.rows

    // Experiment

    async function getKegiatanHariIni() {
        let kegiatanHariIni = []
        for (let row of dataKegiatan) {
            let bulan

            if (row.month < 10) {
                bulan = '0' + row.month
            }
            let tanggalKegiatan = new Date(row.tahun + '-' + bulan + '-' + row.day)

            if (tanggalSekarang.getTime() == tanggalKegiatan.getTime()) {
                kegiatanHariIni.push(row)
            }
        }
        return kegiatanHariIni;
    }

    async function getKegiatanBesok() {
        let kegiatanBesok = []
        for (let row of dataKegiatan){
            let bulan
            
            if (row.month < 10){
                bulan = '0' + row.month
            }
            let tanggalKegiatan = new Date(row.tahun + '-' + bulan + '-' + row.day)
    
            if (tanggalSekarang.getTime() < tanggalKegiatan.getTime()) {
                kegiatanBesok.push(row)
            }
        }
        return kegiatanBesok;
    }

    const kegiatanHariIni = await getKegiatanHariIni();
    const kegiatanBesok = await getKegiatanBesok();

    res.status(200).render('home', { 
        jadwalSholat, waktuSekarang, waktuSubuh,
        waktuDzuhur, waktuAshar, waktuMaghrib,
        waktuIsya, timeSubscribe, tanggalSekarang,
        hariSekarang, tanggalSekarangID, kegiatanHariIni,
        kegiatanBesok
    });
});

app.listen(PORT, () => console.log(`Ready!`));