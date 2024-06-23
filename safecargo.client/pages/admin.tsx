import React from 'react';
import withAuth from '../hoc/withAuth';

const AdminPage: React.FC = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome to the admin page!</p>
    </div>
  );
};

export default withAuth(AdminPage, 'ADMIN');
