import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { routes } from './routes';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) =>
          route.isPrivate ? (
            <Route
              key={index}
              path={route.path}
              element={<AuthMiddleware>{route.element}</AuthMiddleware>}
            />
          ) : (
            <Route key={index} path={route.path} element={route.element} />
          )
        )}
      </Routes>
    </Router>
  );
};
export default AppRouter;
