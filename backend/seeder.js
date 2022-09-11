import dotenv from "dotenv";
import users from "./data/users.js";
import vaccines from "./data/vaccines.js";
import User from "./models/userModel.js";
import Vaccine from "./models/vaccineModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Vaccine.deleteMany();
    await User.insertMany(users);
    await Vaccine.insertMany(vaccines);
    console.log("Data Imported");
    process.exit;
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroytData = async () => {
  try {
    await User.deleteMany();
    await Vaccine.deleteMany();
    console.log("Data Destroyed");
    process.exit;
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroytData();
} else {
  importData();
}
