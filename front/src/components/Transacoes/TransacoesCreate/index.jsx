'use client'
import { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import * as S from './style';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {formatISO} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { NumericFormat } from 'react-number-format';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material'


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

export const TransacoesCreate = ({openModal, closeModal}) => {
  const [descricao, setDescricao] =  useState();
  const [valor, setValor] =  useState();
  const [dataTransacao, setDataTransacao] =  useState(new Date());
  const [categoria, setCategoria] =  useState('');
  const [categorias, setCategorias] =  useState([]);
  const [tipo, setTipo] =  useState('Receita');

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === 'descricao') setDescricao(value);
    if (name === 'valor') setValor(value);
    // if (name === 'dataTransacao') setDataTransacao(value);
    if (name === 'categoria') setCategoria(value);
    if (name === 'tipo') setTipo(value);
    
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
      const response = await axios.post('http://localhost:8080/transacoes', { descricao, valor: valor*100, data: formatISO(dataTransacao, {representation: 'date', locale: ptBR}), tipo, categoria_id: categoria}, {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })
      setNotification({
        open: true,
        message: `Transacão ${ descricao } realizada com sucesso`,
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

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/categorias`, {
          headers: {
            Authorization: `Bearer ${ token }`
        }
      })
      setCategorias(response.data.data)
    }
   catch (error) {
    setNotification({
      open: true,
      message: error.response,
      severity: 'error'
    })
  }
  
 }
 getCategorias()
}, [ ]) 


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
        <DialogTitle>Nova Transação</DialogTitle>
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

          <S.FormControl fullWidth>
            <S.InputLabel id="tipo">Categoria</S.InputLabel>
            <S.Select
              labelId="categoria"
              id="categoria_select"
              value={categoria}
              label="Categoria"
              name="categoria"
              onChange={onChangeValue}
            >
            { categorias.map(categoria => <S.MenuItem key={categoria.id} value={categoria.id}>{categoria.name}</S.MenuItem>)}
           
          </S.Select>
        </S.FormControl>

          <S.FormControl fullWidth>
            <S.InputLabel id="tipo">Tipo</S.InputLabel>
            <S.Select
              labelId="tipo"
              id="tipo_select"
              name='tipo'
              value={tipo}
              label="Tipo"
              onChange={onChangeValue}
            >
              <S.MenuItem value="Receita">Receita</S.MenuItem>
              <S.MenuItem value="Despesa">Despesa</S.MenuItem>
            </S.Select>
          </S.FormControl>
      
        </S.Form>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker  onChange={ (newValue) => {setDataTransacao(newValue)} } variant="outlined"  value="dataMeta" label="Data" color="primary" />
          </LocalizationProvider>

         
        </DialogContent>
        <DialogActions style={{display: 'flex', justifyContent: 'center'}}>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <S.Button variant="contained" color="primary" type='submit' onClick={onSubmit}>Salvar</S.Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TransacoesCreate;