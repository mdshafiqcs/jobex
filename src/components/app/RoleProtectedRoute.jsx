
import { store } from '../../store/store';
import { Navigate } from 'react-router-dom';

const RoleProtectedRoute = ({ element, restrictedRoles }) => {
  const userData = store.getState().auth.userData;

  if (restrictedRoles.includes(userData?.role)) {
    return <Navigate to="/404" />;
  }
  return element;
};


export default RoleProtectedRoute;