import express from "express";
import path from "path";
// import { product } from "./api/product.js";
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
    const today = new Date();
    var waktuSekarang = (parseInt(today.getHours())*60) + parseInt(today.getMinutes())
    var tanggalSekarang = today.getDate();
    var bulanSekarang = today.getMonth() + 1;
    var tahunSekarang = today.getFullYear();
    res.setHeader('Content-Type', 'text/html');

    fetch('https://api.myquran.com/v1/sholat/jadwal/1219/' + tahunSekarang + '/' + bulanSekarang + '/' + tanggalSekarang)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let jadwalSholat = data.data.jadwal

            // Subuh
            let subuh = jadwalSholat.subuh
            let waktuJamSubuh = subuh.split(':')[0] * 60
            let waktuMenitSubuh = subuh.split(':')[1]
            let waktuSubuh = parseInt(waktuJamSubuh) + parseInt(waktuMenitSubuh)

            // Dzuhur
            let dzuhur = jadwalSholat.dzuhur
            let waktuJamDzuhur = dzuhur.split(':')[0] * 60
            let waktuMenitDzuhur = dzuhur.split(':')[1]
            let waktuDzuhur = parseInt(waktuJamDzuhur) + parseInt(waktuMenitDzuhur)

            // Ashar
            let ashar = jadwalSholat.ashar
            let waktuJamAshar = ashar.split(':')[0] * 60
            let waktuMenitAshar = ashar.split(':')[1]
            let waktuAshar = parseInt(waktuJamAshar) + parseInt(waktuMenitAshar)

            // Maghrib
            let maghrib = jadwalSholat.maghrib
            let waktuJamMaghrib = maghrib.split(':')[0] * 60
            let waktuMenitMaghrib = maghrib.split(':')[1]
            let waktuMaghrib = parseInt(waktuJamMaghrib) + parseInt(waktuMenitMaghrib)

            // Isya
            let isya = jadwalSholat.isya
            let waktuJamIsya = isya.split(':')[0] * 60
            let waktuMenitIsya = isya.split(':')[1]
            let waktuIsya = parseInt(waktuJamIsya) + parseInt(waktuMenitIsya)

            res.status(200).render('home', {jadwalSholat, waktuSekarang, waktuSubuh, waktuDzuhur, waktuAshar, waktuMaghrib, waktuIsya});
        });
  });


app.listen(PORT, () => console.log(`Ready!`));