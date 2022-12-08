import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Header } from './components';

import './styles/index.scss';

import styles from './App.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <Header />
      <Routes></Routes>
    </div>
  );
};

export default memo(App);
