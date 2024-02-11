'use client'
import { useState } from 'react';
import axios from 'axios';
import * as S from './style';
import { useRouter } from 'next/navigation';

export const RegisterForm = () => {
  const [email, setEmail] =  useState();
  const [password, setPassword] =  useState();
  const [name, setName] =  useState();
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
      router.push("/dashboard")
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <S.Form onSubmit ={ onSubmit }>
      <S.Typography variant='h1' color='primary' style={{marginBottom: '1rem'}}>YOURfinance.IO</S.Typography>
      <S.Typography variant='h2' color='black' style={{marginBottom: '1rem'}}>Crie sua conta</S.Typography>


        <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  name="name" label="Nome" color="primary" />
        <S.TextField onChange={ onChangeValue } variant="outlined"  name="email" label="E-mail" color="primary" fullWidth/>

        <S.FormControl fullWidth variant="outlined" style={{marginBottom: '1rem'}}>
          <S.InputLabel htmlFor="filled-adornment-password">Senha</S.InputLabel>
          <S.OutlinedInput
            id="outlined-adornment-password"
            name='password'
            onChange={ onChangeValue }
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <S.InputAdornment position="end">
                <S.IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <S.VisibilityOff /> : <S.Visibility />}
                </S.IconButton>
              </S.InputAdornment>
            }
          />
        </S.FormControl>


        <S.Button variant="contained" color="primary" type='submit' fullWidth>Enviar</S.Button>
        <div> Já possui uma conta? <S.Link href='/login'>Faça o login aqui.</S.Link></div>
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