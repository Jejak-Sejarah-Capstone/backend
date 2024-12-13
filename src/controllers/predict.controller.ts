import { Request, Response } from 'express';
import * as xlsx from 'xlsx'; // Install with: npm install xlsx
import haversine from 'haversine-distance'; // Install with: npm install haversine-distance
import axios from 'axios'; // Import axios

interface DataPoint {
    latitude: number;
    longitude: number;
    "judul peristiwa": string;
    "deskripsi": string;
    "tanggal peristiwa": string;
    "Lokasi": string;
    "gambar pendukung": string;
    "kategori sejarah": string;
    distance?: number; // Jarak yang dihitung
}

export const PredictController = {
    async predict(req: Request, res: Response) {
        let dataset: DataPoint[] = [];
        const url = 'https://storage.googleapis.com/dataset-ml-js/dataset.xlsx'; // Replace with your online XLSX file URL

        try {
            // Fetch the XLSX file from the URL
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = xlsx.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // Mengambil sheet pertama
            const sheet = workbook.Sheets[sheetName];

            // Parse sheet menjadi JSON dan populasi dataset
            const jsonData = xlsx.utils.sheet_to_json(sheet);
            dataset = jsonData.map((row: any) => ({
                latitude: parseFloat(row.latitude),
                longitude: parseFloat(row.longitude),
                "judul peristiwa": row["judul peristiwa"],
                "deskripsi": row["deskripsi"],
                "tanggal peristiwa": row["tanggal peristiwa"],
                "Lokasi": row["Lokasi"],
                "gambar pendukung": row["gambar pendukung"],
                "kategori sejarah": row["kategori sejarah"]
            }));

            console.log('Dataset loaded successfully');

            const userLat = req.body.latitude;
            const userLon = req.body.longitude;

            if (!userLat || !userLon) {
                return res.status(400).json({ error: 'Latitude and longitude are required.' });
            }

            const userCoords = { latitude: userLat, longitude: userLon };

            // Hitung jarak ke semua titik dalam dataset
            const distances = dataset.map((point) => {
                const pointCoords = { latitude: point.latitude, longitude: point.longitude };
                const distance = haversine(userCoords, pointCoords);
                return { ...point, distance }; // Menyertakan jarak dalam hasil
            });

            // Urutkan berdasarkan jarak dan ambil tiga titik terdekat
            const nearestPoints = distances
                .sort((a, b) => a.distance! - b.distance!)
                .slice(0, 3);

            // Kembalikan tiga titik terdekat dengan semua detail
            res.json({ nearest_points: nearestPoints });
        } catch (error) {
            console.error('Error loading dataset:', error);
            res.status(500).json({ error: 'Failed to load dataset.' });
        }
    }
};
