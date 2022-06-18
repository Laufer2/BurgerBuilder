import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    return (
      <Component
        navigate={navigate}
        params={params}
        location={location}

        {...props} />
    )
  }
  return Wrapper;
}

export default withRouter;