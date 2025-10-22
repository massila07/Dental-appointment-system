import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const authController = {
    register: async (req, res) => {
        // Accept both French and English field names for compatibility
        const { nom, prenom, email, motDePasse, password, role } = req.body;

        // Prefer motDePasse (schema) but fall back to password if provided
        const pwd = motDePasse || password;

        if (!nom || !prenom || !email || !pwd) {
            return res.status(400).json({ message: 'Champs manquants: nom, prenom, email et motDePasse/password sont requis' });
        }

        try {
            // Vérifier si l'email est déjà utilisé
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Cet email est déjà utilisé' });
            }

            const user = new User({ nom, prenom, email, motDePasse: pwd, role });
            await user.save();

            const token = generateToken(user._id);
            res.status(201).json({ token });
        } catch (error) {
            console.error('Erreur inscription:', error);
            // Gestion spécifique pour duplicate key (sécurité au cas où la vérification échouerait concurrentiellement)
            if (error.code === 11000) {
                return res.status(400).json({ message: 'Email déjà utilisé' });
            }
            // Return some details to help debugging (don't expose sensitive data in production)
            res.status(500).json({ message: "Erreur lors de l'inscription", error: error.message });
        }
    },

    login: async (req, res) => {
        const { email, motDePasse, password } = req.body;

        // Accept both motDePasse and password
        const pwd = motDePasse || password;

        if (!email || !pwd) {
            return res.status(400).json({ message: 'Email et mot de passe requis' });
        }

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }

            const isMatch = await user.matchPassword(pwd);
            if (!isMatch) {
                return res.status(401).json({ message: "Mot de passe incorrect" });
            }

            const token = generateToken(user._id);
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la connexion" });
        }
    }
};

export default authController;
export const registerPatient = authController.register;
export const loginPatient = authController.login;

