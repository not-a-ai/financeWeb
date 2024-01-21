'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from './style';

export const MetasUpdate = ({ categoriaId }) => {
  const [name, setName] =  useState();
  const [userId, setUserId] =  useState();
  
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    
  }
  
  useEffect(() => {
      const getCategoria = async () => {
        try {

          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8080/metas/${ categoriaId }`, {
            headers: {
              Authorization: `Bearer ${ token }`
          }
        })
        setName(response.data.data.name)
        setUserId(response.data.data.user_id)
      }
     catch (error) {
      setNotification({
        open: true,
        message: error.response.data.message,
        severity: 'error'
      })
    }
    
   }
  getCategoria()
  }, [ categoriaId ]) 

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:8080/metas/${ categoriaId }`, { name, user_id: userId }, {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })
      setName(response.data.data.name)
      setNotification({
        open: true,
        message: `Categoria ${ name } atualizada com sucesso`,
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
      <S.H1>Atualizar Categoria</S.H1>

        <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  name="name" label="Nome" color="primary"  value={ name }/>
     
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

export default MetasUpdate;