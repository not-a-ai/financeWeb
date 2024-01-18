'use client'
import { useState } from 'react';
import axios from 'axios';
import * as S from './style';

export const LoginForm = () => {
  const [email, setEmail] =  useState();
  const [password, setPassword] =  useState();

  
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password})
      localStorage.setItem('token', response.data.data.token)
      setNotification({
        open: true,
        message: `Usuário ${ email } autenticado com sucesso`,
        severity: 'success'
      })
    } catch (error) {
      setNotification({
        open: true,
        message: error.response.data.error,
        severity: 'error'
      })
    }
  };


  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setNotification({
      open: false,
      message: '',
      severity: ''
    })
  }


  return (
    <>
      < S.Form onSubmit ={ onSubmit }>
      <S.H1>Autenticação</S.H1>

        <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  name="email" label="E-mail" color="primary"/>
        <S.TextField fullWidth onChange={ onChangeValue }  variant="outlined" name="password" type='password' label="Password" color="primary"/>
        <S.Button variant="contained" color="success" type='submit'>Enviar</S.Button>
        
      </S.Form>


      <S.Snackbar open={ notification.open } autoHideDuration={3000} onClose={handleClose}>
        <S.Alert onClose={handleClose} severity={notification.severity} variant='filled' sx={{ width: '100%'}}>
          {notification.message}
        </S.Alert>
      </S.Snackbar>
    </>
  )
}

export default LoginForm;