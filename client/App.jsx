import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Header, LoginForm, SignupForm } from './components';

import './styles/index.scss';

import styles from './App.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </div>
  );
};

export default memo(App);
