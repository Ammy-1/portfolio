import './App.css';
import {AppBar, Box, Tab, Tabs, Toolbar, Typography} from '@mui/material';
import {BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LandingPg from './pages/LandingPg';
import Wordle from './pages/Wordle';

function App() {
  return (
    <BrowserRouter>
      <Box>
       <AppBar position="sticky" sx={{borderRadius: 1}}>
            <Toolbar sx={{display:'flex', flexDirection: 'row', padding: '0px 20px'}}>
            
             <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight:'fontWeightBold',
                  flexGrow: 1,
                  display: 'flex'
                }}
              >
                menu
              </Typography>
              
                <Tabs textColor='white'value={1}>
                  <Tab label='Home' value={1} component={Link} to='/'/>
                  <Tab label='Wordle+' value={2} component={Link} to='/wordle'/>
                </Tabs>

            </Toolbar>
          </AppBar>
        </Box>
     
      <Routes>
        <Route path='/' element={<LandingPg />}/>
        <Route path='/wordle' element={<Wordle/>}/>
      </Routes>

    </BrowserRouter>
  )
}

export default App
