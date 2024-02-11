'use client'
import { useState, useEffect, forwardRef} from 'react';
import { NumericFormat } from 'react-number-format';
import axios from 'axios';
import * as S from './style';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {formatISO} from 'date-fns';
import { ptBR } from 'date-fns/locale';

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      valueIsNumericString
      prefix="R$ "
    />
  );
});


export const MetasUpdate = ({ metaId, openModal, closeModal}) => {
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
      const getMeta = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8080/metas/${ metaId }`, {
            headers: {
              Authorization: `Bearer ${ token }`
          }
        })
        console.log(response)
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
  getMeta()
  }, [ metaId ]) 

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:8080/metas/${ metaId }`, { descricao, data: dataMeta, valor , user_id: userId }, {
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
    <S.Snackbar open={ notification.open } autoHideDuration={3000} onClose={handleClose}>
        <S.Alert onClose={handleClose} severity={notification.severity} variant='filled' sx={{ width: '100%'}}>
          {notification.message}
        </S.Alert>
      </S.Snackbar>

     <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Editar meta</DialogTitle>
        <DialogContent>
          < S.Form onSubmit ={ onSubmit }>    

            <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  value={descricao} name="descricao" label="Descrição" color="primary"/>
            <S.TextField fullWidth onChange={ onChangeValue } variant="outlined" value={valor} name="valor" label="Valor" color="primary"/>
            <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  value={dataMeta} name="dataMeta" label="Data" color="primary"/>
        
            <S.Button variant="contained" color="success" type='submit'>Enviar</S.Button>
            
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

export default MetasUpdate;