import { memo, useState, useCallback } from 'react';

import styles from './AuthForm.scss';

export const AuthForm = memo(({ errors, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (typeof onSubmit === 'function') {
        onSubmit({ email, password });
      }
    },
    [email, onSubmit, password]
  );

  return (
    <div className="row">
      <form className="col s4" onSubmit={onSubmitHandler}>
        <div className="input-field">
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            value={email}
          />
        </div>
        <div className="input-field">
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          />
        </div>
        <div className={styles.Errors}>
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
});

AuthForm.displayName = 'AuthForm';
