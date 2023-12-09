import { Navigate, useLocation } from "react-router-dom";
import { selectAuth } from "../../features/authSlice";
import { useAppSelector } from "../../app/hooks";
import { routeList } from "../../routes/RouteList";
import { StateLocation } from "../../types/router";
import jwt_decode from "jwt-decode";
import { JwtInfo } from "../../types";
import { errorMsg } from "../../utils/errMessage";
import { AuthException } from "../../Exceptions";
import { useAppDispatch } from "../../app/hooks";
import { Page403 } from "../../routes";

export function RequireAuth({ children, roles }: { children: JSX.Element, roles?: string[] }) {
  let dispatch = useAppDispatch()
  let auth = useAppSelector(selectAuth)
  try {
    if (!auth.jwt) throw new AuthException("No login info")
    var decoded: JwtInfo = jwt_decode(auth.jwt);
    if (!decoded) throw new AuthException("Auth fail")
    if (decoded) {
      if (roles) {
        if (!roles.includes(decoded.role)) {
          return <Page403 />
        }
      } 
    }
    return children;
  } catch (error) {
    
    if (error instanceof AuthException) {
      errorMsg(error.message, error)
    } else {
      console.error(error)
    }
    return <Navigate to={routeList.LOGIN} />;
  }

}