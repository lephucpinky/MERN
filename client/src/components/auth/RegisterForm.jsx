import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../redux/Features/authApiSlice';
import Cookies from 'js-cookie';
import styles from '../../styles/Form.module.css';
const RegisterForm = () => {
   const navigate = useNavigate();

  const [userInputs, setUserInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [register, { isError, isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({
        username: userInputs.username,
        email: userInputs.email,
        password: userInputs.password,
      });
      const accessToken = data.accessToken;
      if (accessToken) {
        Cookies.set('accessToken', accessToken);
        setUserInputs({
          email: '',
          username: '',
          password: '',
        });
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor='username'>User Name</label>
          <input
            id='username'
            type='text'
            name='username'
            required
            value={userInputs.username}
            onChange={(e) =>
              setUserInputs((prev) => {
                return { ...prev, username: e.target.value };
              })
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            required
            value={userInputs.email}
            onChange={(e) =>
              setUserInputs((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            required
            value={userInputs.password}
            onChange={(e) =>
              setUserInputs((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
          />
        </fieldset>
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Create Account'}
        </button>
      </form>
      {isError && error && <p className={styles.error}>{error.data.message}</p>}
    </>
  );
}

export default RegisterForm
