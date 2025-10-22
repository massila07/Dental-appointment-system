import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },
    prenom: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    motDePasse: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['patient', 'staff']
    }
}, {
    timestamps: true // ajoute automatiquement les dates de création / mise à jour
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("motDePasse")) return next();
    
        this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
        next();
});

// Instance method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.motDePasse);
};
const User = mongoose.model("User", userSchema);

export default User;