'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as S from './style';

export const LoginForm = () => {
  const [email, setEmail] =  useState('');
  const [password, setPassword] =  useState('');
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
        message:  `Email ou senha errado.`,
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

        <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  name="email" label="E-mail" color="primary" />
        
        <S.FormControl fullWidth style={{marginBottom: '64px'}}>
          <S.InputLabel id="senha">Senha</S.InputLabel>
          <S.OutlinedInput
            labelId="senha"
            id="outlined-adornment-password"
            name='senha'
            label="Senha"
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

        <S.Link href="/register">Criar uma conta</S.Link> 
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