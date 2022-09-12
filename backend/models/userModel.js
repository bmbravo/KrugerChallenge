import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Por favor ingrese su Nombre"],
    },
    lastName: {
      type: String,
      required: [true, "Por favor ingrese su Apellido"],
    },
    userName: {
      type: String,
      required: [true, "Por favor ingrese un nombre de usuario"],
      unique: true,
    },
    identification: {
      type: String,
      required: [true, "Ingrese una cédula válida"],
      unique: [true, "Ya existe un usuario con esta cédula"],
      minLength: [10, "La cedula debe tener 10 digitos"],
      maxLength: [10, "La cedula debe tener 10 digitos"],
    },
    email: {
      type: String,
      required: [true, "Ingrese un correo válido"],
      unique: true,
    },
    birthDate: {
      type: Date,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: false,
      minLength: [10, "El número de teléfono debe tener 10 digitos"],
      maxLength: [10, "El número de teléfono debe tener 10 digitos"],
    },
    vaccinationData: {
      isVaccinated: { type: Boolean, default: false },
      typeOfVaccine: { type: String },
      dateOfVaccination: { type: Date },
      numberOfDoses: { type: Number },
    },
    password: {
      type: String,
      required: [true, "Por favor ingrese una contraseña"],
      minLength: 6,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
