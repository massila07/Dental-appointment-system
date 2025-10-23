import Patient from '../models/Patients.js';

//ajouter un patient
export const createPatient = async (req, res) => {
  try {
    // Use ASCII-friendly property names
    const { nom, prenom, email, telephone, dateDeNaissance, adresse } = req.body;

    // Vérifier si l'email existe déjà
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Un patient avec cet email existe déjà." });
    }

    // Créer un nouveau patient
    const newPatient = await Patient.create({
      nom,
      prenom,
      email,
      telephone,
      dateDeNaissance,
      adresse,
    });

    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout du patient", error: error.message });
  }
};

// recuperer tous les patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 }); // tri décroissant
    res.status(200).json(patients); //envoyer la reponse avec la liste des patients
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des patients", error: error.message });
  }
};


export const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient non trouvé" });
        }
        res.status(200).json(patient); // envoyer la reponse avec le patient trouvé
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du patient", error: error.message });
    }
};

export const updatePatient = async (req, res) => {
try {                                                  //id, data, options     
        const UpdatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); //req.params.id pour obtenir l'ID du patient à mettre à jour de l'URL
        if (!UpdatedPatient) {
            return res.status(404).json({ message: "Patient non trouvé" });
        }
        res.status(200).json(UpdatedPatient); // envoyer la reponse avec le patient trouvé
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du patient", error: error.message });
    }
};


export const deletePatient = async (req, res) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        if (!deletedPatient) {
            return res.status(404).json({ message: "Patient non trouvé" });
        }
        res.status(200).json({ message: "Patient supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du patient", error: error.message });
    }
};

