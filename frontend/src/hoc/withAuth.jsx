import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
        if (!token) {
          // Redirect to login page
          navigate('/login');
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }, [token, navigate]);

    if (!token && isLoading) {
      // Render the loader animation
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <PulseLoader color="#041083" size={20} />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
