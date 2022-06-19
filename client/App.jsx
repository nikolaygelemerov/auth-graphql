import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './styles/index.scss';

import styles from './App.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <h1>App</h1>
      <Routes></Routes>
    </div>
  );
};

export default memo(App);
