import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; 
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
import patientRoutes from "./routes/patientRoutes.js";

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);

// 🔗 Connexion à la base MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API du cabinet dentaire 😁");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));

