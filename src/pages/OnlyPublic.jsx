import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

const OnlyPublic = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return props.children;
  } else {
    return <Navigate to="/dashboard" />;
  }
};

export default OnlyPublic;
