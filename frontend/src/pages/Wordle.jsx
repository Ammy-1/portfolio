import { Typography, Box, Paper, TextField, Button, ButtonGroup, Alert, Modal } from "@mui/material"
import { useState } from "react"

function Wordle() {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'rgb(245,245,245)',
    boxShadow: 24,
    borderRadius: 3,
    p: 3,
    color: 'black'
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [won, setWon] = useState(false);

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
  const [word, setWord] = useState('');

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
      <Typography variant="h3" sx={{textAlign: "center", color: '#222', paddingBottom: '30px'}}>Wordle+</Typography>
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
           <Alert severity="error" variant="outlined" >guessed word must be 5 letters long</Alert>
        </Box>
        

        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline', padding: '30px', gap: '20px'}}>
          <Typography variant="body1">Or make a guess for me:</Typography>
            <ButtonGroup>
              <Button size="small">Random</Button>
              <Button size="small">Intelligent</Button>
            </ButtonGroup>
        </Box>
        <Typography fontWeight='bold'>Clues found:</Typography>
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
                    <Box variant='outined' sx={{width: '70px', height: '70px', backgroundColor: '#ddd', margin: '5px', flexShrink: 2}} key={`col${x}`}>
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

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        {won ? <Typography variant="h4">You Win!</Typography> : <Typography variant="h4">You Lose!</Typography>}
        <Typography>The word was {word}</Typography>
        <Box sx={{display:'flex', gap: '10px', justifyContent: 'center', marginTop: '20px'}}>
          <Button variant="contained" color="error" onClick={handleClose}>Close</Button>
          <Button variant="contained">Play Again?</Button>
        </Box>
      </Box>
    </Modal>
  </Box>
  )
}

export default Wordle