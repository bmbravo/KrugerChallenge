import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { USER_REGISTER_RESET } from "../constants/userConstants";

const RegisterScreen = ({ match, history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identification, setIdentification] = useState("");
  const [email, setEmail] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validIdentification, setValididentification] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success: successUpdate } = userRegister;

  const validateFields = (field, data) => {
    const notEmpty = /\S+/;
    const onlyLetters = /^[A-zÀ-ú\s]+$/;
    const onlyNumbers = /^\d+$/;
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let validacion = false;
    if (field === "identification" || field === "phoneNumber") {
      validacion = data.length === 10 && onlyNumbers.test(data);
      if (validacion && field === "identification") {
        setValididentification(true);
        setMessage(null);
      } else {
        setValididentification(false);
        setMessage("Por favor ingrese un número de cedula correcto");
      }
    } else if (field === "firstName" || field === "lastName") {
      validacion = notEmpty.test(data) && onlyLetters.test(data);
      if (validacion && field === "firstName") {
        setValidFirstName(true);
        setMessage(null);
      } else if (validacion && field === "lastName") {
        setValidLastName(true);
        setMessage(null);
      } else {
        if (field === "firstName") {
          setValidFirstName(false);
        } else if (field === "lastName") {
          setValidLastName(false);
        }
        setMessage("Por favor ingrese un nombre y apellido correcto");
      }
    } else if (field === "email") {
      validacion = validEmail.test(data);
      if (validacion) {
        setValidEmail(true);
        setMessage(null);
      } else {
        setValidEmail(false);
        setMessage("Por favor ingrese un correo válido");
      }
    }
    return validacion;
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_REGISTER_RESET });
      history.push("/admin/userlist");
    }
  }, [history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (validFirstName && validLastName && validIdentification && validEmail) {
      dispatch(register(firstName, lastName, identification, email));
    } else {
      setMessage("Por favor ingrese todos los campos");
    }
  };

  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        Regresar a los empleados
      </Link>
      <FormContainer>
        <h1>Registrar nuevo empleado</h1>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {loading && <Loader></Loader>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="firstName" className="mb-3">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              type="name"
              placeholder="Ingrese nombres"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                validateFields("firstName", e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="lastName" className="mb-3">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="name"
              placeholder="Ingrese apellidos"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                validateFields("lastName", e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="identification" className="mb-3">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese número de cedula"
              value={identification}
              onChange={(e) => {
                setIdentification(e.target.value);
                validateFields("identification", e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese correo"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateFields("email", e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Registrar
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
