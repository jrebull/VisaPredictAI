const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.incrementPredictionCounter = functions.https.
    onRequest(async (req, res) => {
      // Habilitar CORS para permitir peticiones desde cualquier origen
      res.set("Access-Control-Allow-Origin", "*");

      if (req.method === "OPTIONS") {
        // Pre-flight request for CORS
        res.set("Access-Control-Allow-Methods", "POST");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        res.set("Access-Control-Max-Age", "3600");
        res.status(204).send("");
        return;
      }

      if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
      }

      try {
        const counterRef = admin.database().ref("totalPredictions");
        await counterRef.transaction((current) => {
          return (current || 0) + 1;
        });

        const snapshot = await counterRef.once("value");
        const newCount = snapshot.val();

        res.json({success: true, count: newCount});
      } catch (error) {
        console.error("Error al incrementar el contador:", error);
        res.status(500).json({error: error.message});
      }
    });
