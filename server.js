const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.COC_API_KEY; // API-Key aus .env Datei

app.use(express.json());

// Clan-Daten abrufen
app.get("/clan/:tag", async (req, res) => {
    try {
        const clanTag = encodeURIComponent(req.params.tag); // FIXED: %23 für #

        console.log(`🔍 Anfrage an Clash of Clans API: https://api.clashofclans.com/v1/clans/${clanTag}`);

        const response = await fetch(`https://api.clashofclans.com/v1/clans/${clanTag}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Accept": "application/json"
            }
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("❌ API-Fehler:", data);
            return res.status(response.status).json({ error: "Fehler beim Abrufen der Clan-Daten", details: data });
        }

        res.json(data);
    } catch (err) {
        console.error("❌ Server-Fehler:", err);
        res.status(500).json({ error: "Interner Server-Fehler" });
    }
});

// Server starten
app.listen(PORT, () => {
    console.log(`✅ Server läuft auf Port ${PORT}`);
});
