'use client'


import * as S from './style.jsx';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GridViewIcon from '@mui/icons-material/GridView';
import SwapHorizontal from '@mui/icons-material/SwapHoriz';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';


const drawerWidth = 280;

export const Menu = ({children}) => {
  const router = useRouter()
  const doLogout = () => {
      localStorage.removeItem('token')
      router.push('/login')
  }
  return <>
    <Box sx={{ display: 'flex' }}>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          '& .MuiPaper-root': {
            background: '#000',
            color: '#fff'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <S.Typography variant='h1' color="primary" style={{ marginTop: '48px', marginBottom: '40px'}}>YOURfinance.IO</S.Typography>
        <List>
          
            <ListItem  disablePadding>
            <S.Link href="/dashboard">
              <ListItemButton>
                <ListItemIcon>
                <GridViewIcon style={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primary="Meu painel" />
              </ListItemButton>
              </S.Link>
            </ListItem>
          
            <ListItem  disablePadding>
              <S.Link href="/categoria">
                <ListItemButton>
                
                <ListItemIcon >
                  <AccountBalanceWalletIcon style={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primary="Categoria" />
                
                </ListItemButton>
              </S.Link>
            </ListItem>

            <ListItem  disablePadding>
              <S.Link href="/extrato">
              <ListItemButton>
                <ListItemIcon>
                <SwapHorizontal style={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primary="Extrato" />
              </ListItemButton>
              </S.Link>
            </ListItem>

            <ListItem  disablePadding onClick={doLogout}>
           
              <ListItemButton >
                <ListItemIcon onClick={ doLogout }>
                <LogoutIcon style={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primary="Sair"  />
              </ListItemButton>
              
            </ListItem>
        </List>
        <Divider />
        
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  </>
}

export default Menu;