import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

const OnlyPrivate = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default OnlyPrivate;
