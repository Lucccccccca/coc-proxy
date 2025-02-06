import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware für JSON
app.use(express.json());

// Clan-Daten abrufen
app.get("/clan/:tag", async (req, res) => {
    const clanTag = req.params.tag.startsWith("#") ? req.params.tag : `#${req.params.tag}`;
    const API_KEY = process.env.COC_API_KEY;

    try {
        console.log(`🔍 Anfrage an Clash of Clans API: https://api.clashofclans.com/v1/clans/${encodeURIComponent(clanTag)}`);

        const response = await fetch(`https://api.clashofclans.com/v1/clans/${encodeURIComponent(clanTag)}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ error: "Fehler beim Abrufen der Clan-Daten", details: errorData });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("❌ API-Fehler:", error);
        res.status(500).json({ error: "Interner Server-Fehler", details: error.message });
    }
});

// Server starten
app.listen(PORT, () => {
    console.log(`🚀 Proxy läuft auf Port ${PORT}`);
});
