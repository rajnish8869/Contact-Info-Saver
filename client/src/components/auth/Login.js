import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = props => {

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const [user, setUser] = useState({
    password: '',
    email: ''
  });

  const { loginUser, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;
  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error) {
      setAlert('Invalid Credetials', 'danger', 2000);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger', 2000);
    } else {
      loginUser({ email, password });
    }
  }

  return (
    <div className='form-container'>
      <h1>Account Login</h1>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>

        <input type="submit" value="Login" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Login;
