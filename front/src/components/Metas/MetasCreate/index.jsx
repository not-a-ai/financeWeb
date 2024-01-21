'use client'
import { useState } from 'react';
import axios from 'axios';
import * as S from './style';

export const MetasCreate = () => {
  const [descricao, setDescricao] =  useState();
  const [valor, setValor] =  useState();
  const [dataMeta, setDataMeta] =  useState();

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === 'descricao') setDescricao(value);
    if (name === 'valor') setValor(value);
    if (name === 'dataMeta') setDataMeta(value);
    
  }

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/metas', { descricao, valor, data: dataMeta}, {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })
      console.log(response)
      setNotification({
        open: true,
        message: `Meta ${ descricao } criada com sucesso`,
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
      <S.H1>Criar Meta</S.H1>

        <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  name="descricao" label="Descrição" color="primary"/>
        <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  name="valor" label="Valor" color="primary"/>
        <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  name="dataMeta" label="Data Meta" color="primary"/>
     
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

export default MetasCreate;