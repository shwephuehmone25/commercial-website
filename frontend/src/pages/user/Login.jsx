import React, { Suspense } from 'react';

const AuthForm = React.lazy(() => import("../../components/AuthForm"));

const Register = () => {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <AuthForm isLogin={true} />
    </Suspense>
  );
};

export default Register;
