import { useAuth } from '@context/AuthContext';
import { login } from '@utils/api';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

const LoginComp = ({ changeView, closeLogin, handleGoogleLogin }) => {
  const { setIsLoggedIn, setUser } = useAuth();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleLogin = async (data) => {
    if (!data.email || !data.password) {
      enqueueSnackbar('Please fill all the required fields!', {
        variant: 'error',
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      enqueueSnackbar('Enter a valid Email Id!', { variant: 'error' });
      return;
    }
    setLoading(true);
    try {
      const response = await login('/auth/login', data);
      setIsLoggedIn(true);
      setUser(response.data.user);
      closeLogin();
      enqueueSnackbar('Logged in successfully', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-div'>
      <div className='login-modal-heading heading3'>Login to Travlog</div>
      <input
        className='input email-input'
        type='text'
        placeholder='Email'
        value={data.email}
        name='email'
        onChange={handleChange}
      />
      <div className='password-box'>
        <input
          className='input password-input'
          type={show ? 'text' : 'password'}
          placeholder='Password'
          name='password'
          onChange={handleChange}
          value={data.password}
        />
        {show ? (
          <span className='pointer' onClick={() => setShow(false)}>
            Hide
          </span>
        ) : (
          <span className='pointer' onClick={() => setShow(true)}>
            Show
          </span>
        )}
      </div>
      <button onClick={() => handleLogin(data)} className='btn submit-btn'>
        SUBMIT
      </button>
      <button onClick={handleGoogleLogin} className='btn google-login-btn'>
        CONTINUE WITH GOOGLE
      </button>
      <p className='login-toggle-p'>
        Don&apos;t have an account?{' '}
        <span className='link' onClick={changeView}>
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginComp;
