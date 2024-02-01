'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as S from './page.module';

export const PageHome = () => {
  const [email, setEmail] =  useState();
  const [password, setPassword] =  useState();
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
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
      router.push('/dashboard')
    } catch (error) {
      setNotification({
        open: true,
        message: error.response,
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
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <>
      < S.Form onSubmit ={ onSubmit }>
      <S.Typography variant='h1' color='primary' style={{marginBottom: '64px'}}>YOURfinance.IO</S.Typography>

        <S.Button href="/login" variant="contained">Faça Login</S.Button> 
        <S.Button href="/register" variant="outlined">Criar uma conta</S.Button> 
      </S.Form>

    



    </>
  )
}

export default PageHome;