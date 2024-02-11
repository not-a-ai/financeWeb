import styled from "@emotion/styled";
import FormControlMUI from '@mui/material/FormControl'
import InputLabelMUI from '@mui/material/InputLabel'
import SelectMUI from '@mui/material/Select'
import MenuItemMUI from '@mui/material/MenuItem'

export const ChartContainer = styled.div`
  background-color: #fff;
  display: flex;
  itens-align: center;
  padding: 1rem 1rem; 
  border-radius: 10px;
  margin-bottom: 1rem;
`

export const IconWrapper = styled.div`
  padding:  1rem 1rem; 
  background: #299D91;
  border-radius: 8px;
`

export const Content = styled.div`
  width: 100%;
  text-align: center;
`
export const FormControl = styled(FormControlMUI)``
export const InputLabel = styled(InputLabelMUI)``
export const Select = styled(SelectMUI)``
export const MenuItem = styled(MenuItemMUI)``