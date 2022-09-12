import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if ((userInfo && userInfo.isAdmin) || successDelete) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Estas seguro que quieres eliminar este usuario?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <h1>Empleados</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Cédula</th>
              <th>Correo</th>
              <th>Fecha Nacimiento</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Vacunado</th>
              <th>Tipo Vacuna</th>
              <th>Fecha Vacunación</th>
              <th># Dosis</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.userName}</td>
                <td>{user.identification}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.birthDate?.slice(0, 10) ?? "N/A"}</td>
                <td>{user.address ?? "N/A"}</td>
                <td>{user.phoneNumber ?? "N/A"}</td>
                <td>
                  {user.vaccinationData.isVaccinated ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>{user.vaccinationData.typeOfVaccine ?? "N/A"}</td>
                <td>
                  {user.vaccinationData.dateOfVaccination?.slice(0, 10) ??
                    "N/A"}
                </td>
                <td>{user.vaccinationData.numberOfDoses ?? "N/A"}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm" title="Editar">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                    title="Eliminar"
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
