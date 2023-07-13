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
        let subuh = jadwalSholat.subuh
        let waktuJamSubuh = subuh.split(':')[0] * 60
        let waktuMenitSubuh = subuh.split(':')[1]
        let waktuSubuh = parseInt(waktuJamSubuh) + parseInt(waktuMenitSubuh)
        return waktuSubuh;
    }

    // Fungsi untuk mengambil jadwal sholat dzuhur
    async function getSholatDzuhur(jadwalSholat) {
        let dzuhur = jadwalSholat.dzuhur
        let waktuJamDzuhur = dzuhur.split(':')[0] * 60
        let waktuMenitDzuhur = dzuhur.split(':')[1]
        let waktuDzuhur = parseInt(waktuJamDzuhur) + parseInt(waktuMenitDzuhur)
        return waktuDzuhur;
    }

    // Fungsi untuk mengambil jadwal sholat ashar
    async function getSholatAshar(jadwalSholat) {
        let ashar = jadwalSholat.ashar
        let waktuJamAshar = ashar.split(':')[0] * 60
        let waktuMenitAshar = ashar.split(':')[1]
        let waktuAshar = parseInt(waktuJamAshar) + parseInt(waktuMenitAshar)
        return waktuAshar;
    }

    // Fungsi untuk mengambil jadwal sholat maghrib
    async function getSholatMaghrib(jadwalSholat) {
        let maghrib = jadwalSholat.maghrib
        let waktuJamMaghrib = maghrib.split(':')[0] * 60
        let waktuMenitMaghrib = maghrib.split(':')[1]
        let waktuMaghrib = parseInt(waktuJamMaghrib) + parseInt(waktuMenitMaghrib)
        return waktuMaghrib;
    }

    // Fungsi untuk mengambil jadwal sholat isya
    async function getSholatIsya(jadwalSholat) {
        let isya = jadwalSholat.isya
        let waktuJamIsya = isya.split(':')[0] * 60
        let waktuMenitIsya = isya.split(':')[1]
        let waktuIsya = parseInt(waktuJamIsya) + parseInt(waktuMenitIsya)
        return waktuIsya;
    }

    // Fungsi untuk mengambil data kegiatan dari Google Sheet melalui API
    async function getKegiatan(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    let waktuSubuh = await getSholatSubuh(jadwalSholat);
    let waktuDzuhur = await getSholatDzuhur(jadwalSholat);
    let waktuAshar = await getSholatAshar(jadwalSholat);
    let waktuMaghrib = await getSholatMaghrib(jadwalSholat);
    let waktuIsya = await getSholatIsya(jadwalSholat);

    // SheetDB
    // let dataKegiatan = await getKegiatan(APIKegiatan);

    // NoCodeAPI
    // let kegiatan = await getKegiatan(APIKegiatan);
    // let dataKegiatan = kegiatan.data

    // gsx2json
    let kegiatan = await getKegiatan(APIKegiatan);
    let dataKegiatan = kegiatan.rows

    res.status(200).render('home', { 
        jadwalSholat, waktuSekarang, waktuSubuh, waktuDzuhur, waktuAshar, waktuMaghrib, waktuIsya, timeSubscribe, dataKegiatan 
    });
});

app.listen(PORT, () => console.log(`Ready!`));