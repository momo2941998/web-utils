import * as React from "react";
import './App.scss'
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { LayoutPage, LoginPage, Page404, UserInfo, Welcome } from "./routes";
import { routeList } from "./routes/RouteList";
import { RequireAuth } from "./components/auth";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { selectWindow, setFocus, setOnline, updateSize } from "./features/windowSlice";
import { JwtInfo, RouteConfig, UserRole } from "./types";
import { Logout } from "./routes/Logout";
import { routesConfig } from "./routeConfig";


export default function App() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const myWindow = useAppSelector(selectWindow)
  useEffect(() => {
    function jsUpdateSize(){ 
      let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      dispatch(updateSize({width, height}))
    }
    window.onload = jsUpdateSize
    window.onresize = jsUpdateSize
    window.ononline = () => dispatch(setOnline(true))
    window.onoffline = () => dispatch(setOnline(false))
    window.onfocus = () => dispatch(setFocus(true))
    window.onblur = () => dispatch(setFocus(false))
  }, [])

  useEffect(() => {
    console.log('website connect internet: ', myWindow.online)
  }, [myWindow.online])

  useEffect(() => {
    console.log('website is focus: ', myWindow.focus)
  }, [myWindow.focus])
  

  const authRoutes: React.ReactElement[] = []

  routesConfig.forEach(config => {
    authRoutes.push(
      <Route key={config.path} path={config.path} element={
        <RequireAuth roles={config.roles}>
          {config.element}
        </RequireAuth>
      } />
    )
  })

  return (
      <Routes>
        <Route key={routeList.LOGIN} path={routeList.LOGIN} element={<LoginPage />} />
        <Route element={<LayoutPage />}>
          <Route key={routeList.HOME} path={routeList.HOME} element={<Welcome />} />
          {authRoutes}
          <Route key={routeList.LOGOUT} path={routeList.LOGOUT} element={<Logout />} />
          <Route 
            path="/*"
            element={<Page404 backHome={() => navigate('/')}/>}
          />
        </Route>
      </Routes>
  );
}