'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './style';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

export const CategoriasCreate = ({openModal, closeModal}) => {
  const [name, setName] =  useState();
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/categorias', { name }, {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })
      
      setNotification({
        open: true,
        message: `Categoria ${ name } criada com sucesso`,
        severity: 'success'
      })
      handleCloseModal()
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

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(openModal) {setOpen(true)};
  }, [openModal])

  const handleCloseModal = () => {
    setOpen(false);
    closeModal(false);
    location.reload();
  };

  return (
    <>
      <S.Snackbar open={ notification.open } autoHideDuration={3000} onClose={handleClose}>
        <S.Alert onClose={handleClose} severity={notification.severity} variant='filled' sx={{ width: '100%'}}>
          {notification.message}
        </S.Alert>
      </S.Snackbar>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Nova categoria</DialogTitle>
        <DialogContent>

          < S.Form onSubmit ={ onSubmit }>
            
              <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  name="name" label="Nome" color="primary"/>
              
          </S.Form>
        </DialogContent>
        <DialogActions style={{display: 'flex', justifyContent: 'center'}}>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <S.Button variant="contained" color="primary" type='submit' onClick={onSubmit}>Salvar</S.Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CategoriasCreate;