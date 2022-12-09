import { memo, useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN_MUTATION } from '../../mutations';
import { CURRENT_USER_QUERY } from '../../queries';

import { AuthForm } from '../AuthForm/AuthForm';

export const LoginForm = memo(() => {
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [errors, setErrors] = useState([]);

  const onSubmit = useCallback(
    async ({ email, password }) => {
      try {
        await loginMutation({
          variables: { email, password },
          refetchQueries: [{ query: CURRENT_USER_QUERY }]
        });
      } catch (error) {
        const errors = error.graphQLErrors.map((error) => error.message);

        setErrors(errors);
      }
    },
    [loginMutation]
  );

  return (
    <div>
      <h3>Login</h3>
      <AuthForm errors={errors} onSubmit={onSubmit} />
    </div>
  );
});

LoginForm.displayName = 'LoginForm';
