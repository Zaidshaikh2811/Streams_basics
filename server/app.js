
import express from 'express';
import { readFileSync, statSync } from "fs";
import { createReadStream } from 'fs';
import { dirname } from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);



dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.get("/video", (req, res) => {
    const videoPath = `${__dirname}/public/video.mp4`;
    const range = req.headers.range;
    const stat = statSync(videoPath);
    const fileSize = stat.size;
    if (!range) {
        res.status(400).send("Requires Range header");
    }

    const chunkSize = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = start + chunkSize > fileSize ? fileSize - 1 : start + chunkSize - 1;

    const fileStream = createReadStream(videoPath, {
        start,
        end,
    });
    fileStream.pipe(res);

    res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});