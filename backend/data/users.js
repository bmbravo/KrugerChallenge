import bcrypt from "bcryptjs";

const users = [
  {
    firstName: "Bill",
    lastName: "Bravo",
    userName: "bbravo",
    identification: "0706321320",
    email: "admin@kruger.com",
    birthDate: new Date("1998-11-03T00:00"),
    address: "Mirador del Norte",
    phoneNumber: "0999214229",
    vaccinationData: {
      isVaccinated: true,
      typeOfVaccine: "Astra Zeneca",
      dateOfVaccination: new Date("2021-05-05T00:00"),
      numberOfDoses: 2,
    },
    password: bcrypt.hashSync("admin", 10),
    isAdmin: true,
  },
  {
    firstName: "Jhon",
    lastName: "Doe",
    userName: "jdoe",
    identification: "1234567890",
    email: "jhon@kruger.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
