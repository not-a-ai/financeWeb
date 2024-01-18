'use client'
import { useState } from 'react';
import axios from 'axios';
import * as S from './style';

export const RegisterForm = () => {
  const [email, setEmail] =  useState();
  const [password, setPassword] =  useState();
  const [name, setName] =  useState();

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'name') setName(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/register', { email, password, name })
      localStorage.setItem('token', response.data.data.token)
      setNotification({
        open: true,
        message: `Usuário ${ email } cadastrado com sucesso`,
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
      <S.Form onSubmit ={ onSubmit }>
        <S.H1>Cadastre-se </S.H1>

        <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  name="name" label="Nome" color="primary" />
        <S.TextField onChange={ onChangeValue } variant="outlined"  name="email" label="E-mail" color="primary" fullWidth/>
        <S.TextField onChange={ onChangeValue }  variant="outlined" name="password" label="Senha" type='password' color="primary" fullWidth/>
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

export default RegisterForm;