'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from './style';

export const CategoriasUpdate = ({ categoriaId, openModal, closeModal}) => {
  const [descricao, setDescricao] =  useState();
  const [valor, setValor] =  useState();
  const [dataMeta, setDataMeta] =  useState();
  const [userId, setUserId] =  useState();
  

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

  useEffect(() => {
      const getCategoria = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8080/categorias/${ metaId }`, {
            headers: {
              Authorization: `Bearer ${ token }`
          }
        })
        setDescricao(response.data.data.descricao)
        setValor(response.data.data.valor)
        setDataMeta(response.data.data.data)
        setUserId(response.data.data.user_id)
      }
     catch (error) {
      setNotification({
        open: true,
        message: error.response,
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
      const response = await axios.put(`http://localhost:8080/categorias/${ categoriaId }`, { descricao, data: dataMeta, valor , user_id: userId }, {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })
      setDescricao(response.data.data.descricao)
      setValor(response.data.data.valor)
      setDataMeta(response.data.data.data)
      setUserId(response.data.data.user_id)
      setNotification({
        open: true,
        message: `Meta ${ descricao } atualizada com sucesso`,
        severity: 'success'
      })
      handleCloseModal()
    } catch (error) {
      setNotification({
        open: true,
        message: error,
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
    const [open, setOpen] = useState(false);

  useEffect(() => {
    if(openModal) {setOpen(true)};
  }, [openModal])

  const handleCloseModal = () => {
    setOpen(false);
    closeModal(false);
  };


  return (
    <>
      < S.Form onSubmit ={ onSubmit }>
      <S.H1>Atualizar Meta</S.H1>

        <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  value={descricao} name="descricao" label="Descrição" color="primary"/>
        <S.TextField fullWidth onChange={ onChangeValue } variant="outlined" value={valor} name="valor" label="Valor" color="primary"/>
        <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  value={dataMeta} name="dataMeta" label="Data" color="primary"/>
     
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

export default CategoriasUpdate;