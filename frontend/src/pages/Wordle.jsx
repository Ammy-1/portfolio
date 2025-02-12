import { Typography, Box, Paper, TextField, Button, ButtonGroup } from "@mui/material"
import { useState } from "react"

function Wordle() {
  const [grid, setGrid] = useState([
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
  ]);

  const [letters, setLetters] = useState([
    ['A', '#ddd'], ['B', '#ddd'], ['C', '#ddd'], 
    ['D', '#ddd'], ['E', '#ddd'], ['F', '#ddd'], 
    ['G', '#ddd'], ['H', '#ddd'], ['I', '#ddd'], 
    ['J', '#ddd'], ['K', '#ddd'], ['L', '#ddd'], 
    ['M', '#ddd'], ['N', '#ddd'], ['O', '#ddd'], 
    ['P', '#ddd'], ['Q', '#ddd'], ['R', '#ddd'], 
    ['S', '#ddd'], ['T', '#ddd'], ['U', '#ddd'], 
    ['V', '#ddd'], ['W', '#ddd'], ['X', '#ddd'], 
    ['Y', '#ddd'], ['Z', '#ddd']
  ]);

  const [guess, setGuess] = useState('');

  function handleGuess() {
    console.log(guess);
  }
  return (
  <Box
    sx={{display:"flex",
      justifyContent:"center",
      width:"100vw",
      backgroundColor:"#eee",
      flexWrap:'wrap',
      padding: '30px 0px'
    }}
    
  >
    
    <Box sx={{ flexGrow: 1, padding:'30px', width: '40vw' }}> 
      <Typography variant="h3" sx={{textAlign: "center", color: '#222', padding: '30px'}}>Wordle+</Typography>
      <Paper sx={{padding: '20px'}} >
        <Typography variant="h5" sx={{padding: '20px', color: 'primary.main'}}>Figure out the mystery word:</Typography>
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline', gap: '20px'}}>
          <TextField  
            sx={{height: '20px'}} 
            variant="standard" 
            label='Guess a 5-letter word:'
            onChange={e => setGuess(e.target.value)}
          />
          <Button 
            variant="contained"
            onClick={handleGuess}
          >Enter</Button>
        </Box>

        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline', padding: '30px', gap: '20px'}}>
          <Typography variant="body1">Or make a guess for me:</Typography>
            <ButtonGroup>
              <Button size="small">Random</Button>
              <Button size="small">Intelligent</Button>
            </ButtonGroup>
        </Box>
        <Typography>Clues:</Typography>
          <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '2px', justifyContent: 'center', padding: '5px 50px'}}>
            {letters.map((l, index) => <Box sx={{padding: '5px'}} key={index} backgroundColor={l[1]}>{l[0]}</Box>)}
          </Box>
      </Paper>
    </Box>
    
    

   
    <Box sx={{padding:'30px'}}>
      <Paper sx={{padding:'25px'}}>
        {grid.map((row, y) => {
            return (
              <Box sx={{display: 'flex'}} key={`row${y}`}>
                {row.map((value, x) => {
                  return (
                    <Box variant='outined' sx={{width: '70px', height: '70px', backgroundColor: '#ddd', margin: '5px'}} key={`col${x}`}>
                      {value}
                    </Box>
                  )
                })}
              </Box>
            )
          })
        }
      </Paper>
    </Box>

  </Box>
  )
}

export default Wordle