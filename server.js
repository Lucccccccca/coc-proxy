const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.COC_API_KEY?.trim(); // Entfernt unnötige Leerzeichen & Zeilenumbrüche

app.get("/clan/:tag", async (req, res) => {
    const clanTag = req.params.tag.replace("#", "%23");

    try {
        console.log(`🔍 Anfrage an Clash of Clans API: https://api.clashofclans.com/v1/clans/${clanTag}`);
        console.log(`🛠️ API-Key: Bearer ${API_KEY}`); // Debugging

        const response = await fetch(`https://api.clashofclans.com/v1/clans/${clanTag}`, {
            headers: { 
                "Authorization": `Bearer ${API_KEY.trim()}` // Entfernt mögliche Zeilenumbrüche
            }
        });

        const data = await response.json();
        console.log(`✅ API Antwort:`, data);
        res.json(data);
    } catch (error) {
        console.error("❌ Fehler:", error);
        res.status(500).json({ error: "Fehler beim Abrufen der Clan-Daten", details: error.toString() });
    }
});

app.listen(PORT, () => console.log(`✅ Proxy läuft auf Port ${PORT}`));
