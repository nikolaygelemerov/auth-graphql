import { memo, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { NavLink } from 'react-router-dom';

import { LOGOUT_MUTATION } from '../../mutations';
import { CURRENT_USER_QUERY } from '../../queries';

export const Header = memo(() => {
  const { data: { user } = {}, loading } = useQuery(CURRENT_USER_QUERY);

  const [logoutMutation] = useMutation(LOGOUT_MUTATION);

  console.log('user: ', user);

  const onLogoutClick = useCallback(async () => {
    await logoutMutation({ refetchQueries: [{ query: CURRENT_USER_QUERY }] });
  }, [logoutMutation]);

  const renderButtons = useCallback(() => {
    if (loading) {
      return <div />;
    }

    if (user) {
      return (
        <li>
          <a onClick={onLogoutClick}>Logout</a>
        </li>
      );
    } else {
      return (
        <>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </>
      );
    }
  }, [loading, onLogoutClick, user]);

  return (
    <nav>
      <div className="nav-wrapper">
        <NavLink to="/">Home</NavLink>
        <ul className="right">{renderButtons()}</ul>
      </div>
    </nav>
  );
});

Header.displayName = 'Header';
