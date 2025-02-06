import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config(); // Lädt Umgebungsvariablen aus der .env-Datei

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// 🏆 Route für Clash of Clans API
app.get("/clan/:clanTag", async (req, res) => {
    try {
        let clanTag = req.params.clanTag.replace("#", "%23"); // Hashtag (#) für URL kodieren

        console.log(`🔍 Anfrage an Clash of Clans API: https://api.clashofclans.com/v1/clans/${clanTag}`);

        const response = await fetch(`https://api.clashofclans.com/v1/clans/${clanTag}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`.trim(), // Trim entfernt Leerzeichen/Zeilenumbrüche
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ Fehler von Clash of Clans API:", errorData);
            return res.status(response.status).json(errorData);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("❌ Server-Fehler:", error);
        res.status(500).json({ error: "Server-Fehler", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Proxy läuft auf Port ${PORT}`);
});
