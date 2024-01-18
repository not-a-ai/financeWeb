'use client'
import { useState } from 'react';
import axios from 'axios';
import * as S from './style';

export const LoginForm = () => {
  const [email, setEmail] =  useState();
  const [password, setPassword] =  useState();

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
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form onSubmit ={ onSubmit }>
    <S.H1>Login Form</S.H1>

      <S.TextField onChange={ onChangeValue } variant="outlined"  name="email" label="E-mail" color="primary"/>
      <S.TextField onChange={ onChangeValue }  variant="outlined" name="password" label="Password" color="primary"/>
      <S.Button variant="outline" color="success" type='submit'>Enviar</S.Button>
      
    </form>
  )
}

export default LoginForm;