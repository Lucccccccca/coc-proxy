import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
    res.send("Clash of Clans Proxy API läuft!");
});

app.get("/clan/:tag", async (req, res) => {
    const clanTag = req.params.tag.replace("#", "%23");
    const apiUrl = `https://api.clashofclans.com/v1/clans/${clanTag}`;

    console.log(`🔍 Anfrage an Clash of Clans API: ${apiUrl}`);

    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Authorization": `Bearer ${process.env.COC_API_KEY}`,
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
        console.error("❌ Fehler:", error);
        res.status(500).json({ error: "Server-Fehler", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Proxy läuft auf Port ${PORT}`);
});
