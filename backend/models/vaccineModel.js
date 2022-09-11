import mongoose from "mongoose";

const vaccineSchema = mongoose.Schema(
  {
    abv: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Vaccine = mongoose.model("Vaccine", vaccineSchema);

export default Vaccine;
