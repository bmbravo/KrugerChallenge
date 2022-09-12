import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = ({ location, history }) => {
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [typeOfVaccine, setTypeOfVaccine] = useState("");
  const [dateOfVaccination, setDayOfVaccination] = useState("");
  const [numberOfDoses, setNumberOfDoses] = useState(0);

  const [validBirthDate, setValidBirthDate] = useState(true);
  const [validAddress, setValidAddress] = useState(false);
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [validTypeOfVaccine, setValidTypeOfVaccine] = useState(true);
  const [validDateOfVaccination, setValidDayOfVaccination] = useState(true);
  const [validNumberOfDoses, setValidNumberOfDoses] = useState(true);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const validateFields = (field, data) => {
    if (field === "vaccinated" && data === true) {
      setValidTypeOfVaccine(false);
      setValidNumberOfDoses(false);
    } else if (field === "vaccinated" && data === false) {
      setValidTypeOfVaccine(true);
      setValidNumberOfDoses(true);
    }
    const notEmpty = /\S+/;
    const onlyLetters = /^[A-zÀ-ú\s]+$/;
    const onlyNumbers = /^\d+$/;
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let validacion = false;
    if (field === "identification" || field === "phoneNumber") {
      validacion = data.length === 10 && onlyNumbers.test(data);
      if (validacion && field === "phoneNumber") {
        setValidPhoneNumber(true);
        setMessage(null);
      } else {
        setMessage("Por favor ingrese un número de teléfono correcto");
      }
    } else if (field === "firstName" || field === "lastName") {
      validacion = notEmpty.test(data) && onlyLetters.test(data);
    } else if (field === "email") {
      validacion = validEmail.test(data);
    } else if (
      field === "birthDay" ||
      field === "dayOfVaccination" ||
      field === "typeOfVaccine" ||
      field === "address"
    ) {
      validacion = notEmpty.test(data);
      switch (true) {
        case field === "birthDay" && validacion:
          setValidBirthDate(true);
          setMessage(null);
          break;
        case field === "dayOfVaccination" && validacion:
          setValidDayOfVaccination(true);
          setMessage(null);
          break;
        case field === "typeOfVaccine" && validacion:
          if (data === "None") {
            setValidTypeOfVaccine(false);
            setMessage("Por favor ingrese un tipo de vacuna");
            validacion = false;
            break;
          } else {
            setValidTypeOfVaccine(true);
            setMessage(null);
            break;
          }
        case field === "address" && validacion:
          setValidAddress(true);
          setMessage(null);
          break;
        default:
          setMessage("Por favor ingrese todos los campos");
          break;
      }
    } else if (field === "numberOfDoses") {
      validacion =
        onlyNumbers.test(data) && parseInt(data) >= 1 && parseInt(data) <= 10;
      if (validacion) {
        setValidNumberOfDoses(true);
        setMessage(null);
      } else {
        setMessage("Por favor ingrese una dosis correcta");
      }
    }
    return validacion;
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.firstName || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setBirthDate(user.birthDate ?? "2000-01-01");
        setAddress(user.address ?? "");
        setPhoneNumber(user.phoneNumber ?? "");
        setIsVaccinated(user.vaccinationData.isVaccinated ?? false);
        setTypeOfVaccine(user.vaccinationData.typeOfVaccine ?? "None");
        setDayOfVaccination(
          user.vaccinationData.dateOfVaccination ?? "2021-01-01"
        );
        setNumberOfDoses(user.vaccinationData.numberOfDoses ?? 0);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      validBirthDate &&
      validAddress &&
      validPhoneNumber &&
      validTypeOfVaccine &&
      validNumberOfDoses &&
      validDateOfVaccination
    ) {
      if (isVaccinated) {
        dispatch(
          updateUserProfile({
            id: user._id,
            birthDate,
            address,
            phoneNumber,
            vaccinationData: {
              isVaccinated,
              typeOfVaccine,
              dateOfVaccination,
              numberOfDoses,
            },
          })
        );
      } else if (!isVaccinated) {
        dispatch(
          updateUserProfile({
            id: user._id,
            birthDate,
            address,
            phoneNumber,
            vaccinationData: {
              isVaccinated,
            },
          })
        );
      }
    } else {
      setMessage("Por favor ingrese todos los campos");
    }
  };

  return (
    <>
      <h2>Actualizar perfil</h2>
      {error && <Message variant="danger">{error}</Message>}
      {success && <Message variant="success">Perfil actualizado</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="birthDate" className="mb-3">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control
            type="date"
            placeholder="Ingrese su fecha de nacimiento"
            value={birthDate.slice(0, 10)}
            onChange={(e) => {
              setBirthDate(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su dirección"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              validateFields("address", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="phoneNumber" className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su teléfono"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              validateFields("phoneNumber", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="isVaccinated" className="mb-3">
          <Form.Label>Está vacunado</Form.Label>
          <Form.Check
            type="checkbox"
            checked={isVaccinated}
            label={isVaccinated === true ? "Si" : "No"}
            onChange={(e) => {
              setIsVaccinated(e.target.checked);
              validateFields("vaccinated", e.target.checked);
            }}
          ></Form.Check>
        </Form.Group>
        <div style={{ display: isVaccinated === true ? "inline" : "none" }}>
          <Form.Group controlId="typeOfVaccine" className="mb-3">
            <Form.Label>Tipo de vacuna</Form.Label>
            <Form.Select
              controlId="typeOfVaccine"
              value={typeOfVaccine}
              onChange={(e) => {
                setTypeOfVaccine(e.target.value);
                validateFields("typeOfVaccine", e.target.value);
              }}
            >
              <option value="None">Ninguna</option>
              <option value="Sputnik">Sputnik</option>
              <option value="Astra Zeneca">Astra Zeneca</option>
              <option value="Pfizer">Pfizer</option>
              <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="dayOfVaccination" className="mb-3">
            <Form.Label>Fecha de vacunación</Form.Label>
            <Form.Control
              type="date"
              placeholder="Ingrese su fecha de vacunación"
              value={dateOfVaccination.slice(0, 10)}
              onChange={(e) => setDayOfVaccination(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="numberOfDoses" className="mb-3">
            <Form.Label>Cantidad de dosis recibidas</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese la cantidad de dosis recibidas"
              value={numberOfDoses}
              onChange={(e) => {
                setNumberOfDoses(e.target.value);
                validateFields("numberOfDoses", e.target.value);
              }}
            />
          </Form.Group>
        </div>
        <Button type="submit" variant="primary" style={{ marginTop: "10px" }}>
          Actualizar
        </Button>
      </Form>
    </>
  );
};

export default ProfileScreen;
