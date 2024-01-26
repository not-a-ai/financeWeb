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

export const MetasCreate = ({openModal, closeModal}) => {
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
      const response = await axios.post('http://localhost:8080/metas', { descricao, valor: valor * 100, data: dataMeta}, {
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
        <DialogTitle>Nova meta</DialogTitle>
        <DialogContent>

          < S.Form onSubmit ={ onSubmit }>
            
          <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  name="descricao" label="Descrição" color="primary"/>
          <S.TextField 
          variant="outlined" 
          label="Valor"
          onChange={ onChangeValue }
          name="valor"
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: NumericFormatCustom,
          }}
          fullWidth/>

          <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  name="dataMeta" label="Data Meta" color="primary"/>
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

export default MetasCreate;