import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: any) {

  const logado = localStorage.getItem("adminLogado");


  if (!logado) {

    return <Navigate to="/login" />;

  }


  return children;

}

export default PrivateRoute;