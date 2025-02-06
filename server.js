require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.COC_API_KEY;

app.get("/clan/:tag", async (req, res) => {
    const clanTag = encodeURIComponent(req.params.tag);
    const url = `https://api.clashofclans.com/v1/clans/%23${clanTag}`;
    
    try {
        const response = await fetch(url, {
            headers: { "Authorization": `Bearer ${API_KEY}` }
        });

        if (!response.ok) {
            throw new Error(`Fehler: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Abrufen der Clan-Daten", details: error.message });
    }
});

app.listen(PORT, () => console.log(`✅ Server läuft auf Port ${PORT}`));
