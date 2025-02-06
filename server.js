const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.COC_API_KEY; // Clash of Clans API Key aus Render Variables

app.get("/clan/:tag", async (req, res) => {
    const clanTag = req.params.tag.replace("#", "%23");
    try {
        const response = await fetch(`https://api.clashofclans.com/v1/clans/${clanTag}`, {
            headers: { Authorization: `Bearer ${API_KEY}` }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Abrufen der Clan-Daten" });
    }
});

app.listen(PORT, () => console.log(`✅ Proxy läuft auf Port ${PORT}`));
