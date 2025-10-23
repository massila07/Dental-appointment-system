// pour créer le modèle de patient
import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true,
    },
    prenom: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    téléphone: {
        type: String,
        required: true,
        trim: true,
    },

    telephone: {
        type: String,
        required: true,
        trim: true,
    },
    dateDeNaissance: {
        type: Date,
        required: true,
    },
    adresse: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true, // ajoute automatiquement les dates de création / mise à jour
  }
);
const Patient = mongoose.model("Patient", patientSchema);

export default Patient;