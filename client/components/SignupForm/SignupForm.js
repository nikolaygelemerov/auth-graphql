import { memo, useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';

import { SIGNUP_MUTATION } from '../../mutations';

import { AuthForm } from '../AuthForm/AuthForm';

export const SignupForm = memo(() => {
  const [signupMutation] = useMutation(SIGNUP_MUTATION);
  const [errors, setErrors] = useState([]);

  const onSubmit = useCallback(
    async ({ email, password }) => {
      try {
        await signupMutation({ variables: { email, password } });
      } catch (error) {
        const errors = error.graphQLErrors.map((error) => error.message);

        setErrors(errors);
      }
    },
    [signupMutation]
  );

  return (
    <div>
      <h3>Sign Up</h3>
      <AuthForm errors={errors} onSubmit={onSubmit} />
    </div>
  );
});

SignupForm.displayName = 'SignupForm';
