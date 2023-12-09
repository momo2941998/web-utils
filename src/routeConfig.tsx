import { routeList } from "./routes/RouteList";
import { RouteConfig, UserRole } from "./types";
import { UserInfo, Welcome, YoutubeVideo } from "./routes";

const authRoles = [UserRole.SP_ADMIN, UserRole.ADMIN, UserRole.USER,]

export const routesConfig: RouteConfig[] = [
  {
    path: routeList.USER_INFO,
    roles: authRoles,
    element: <UserInfo />,
  },
  {
    path: routeList.YOUTUBE_VIDEO,
    roles: authRoles,
    element: <YoutubeVideo />,
  }
] 

