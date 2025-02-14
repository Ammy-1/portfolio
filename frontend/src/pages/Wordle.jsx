import { Typography, Box, Paper, TextField, Button, ButtonGroup, Alert, Modal, IconButton, Popover } from "@mui/material"
import { useEffect, useState } from "react";
import {Close, InfoOutlined} from '@mui/icons-material';
import axios from 'axios';

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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleInfoClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleInfoClose = () => {
    setAnchorEl(null);
  };

  const infoOpen = Boolean(anchorEl);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [turn, setTurn] = useState(0);
  const [disableEnter, setDisableEnter] = useState(false);
  const maxTurns = 5;
  const [alertText, setAlertText] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const [won, setWon] = useState(false);

  const initGrid = [
    [{ letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }],
    [{ letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }],
    [{ letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }],
    [{ letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }],
    [{ letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }],
    [{ letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }, { letter: '', feedback: '#ddd' }]
  ];  
  const [grid, setGrid] = useState(initGrid);

  const initLetters = {
    A: "#ddd",
    B: "#ddd",
    C: "#ddd",
    D: "#ddd",
    E: "#ddd",
    F: "#ddd",
    G: "#ddd",
    H: "#ddd",
    I: "#ddd",
    J: "#ddd",
    K: "#ddd",
    L: "#ddd",
    M: "#ddd",
    N: "#ddd",
    O: "#ddd",
    P: "#ddd",
    Q: "#ddd",
    R: "#ddd",
    S: "#ddd",
    T: "#ddd",
    U: "#ddd",
    V: "#ddd",
    W: "#ddd",
    X: "#ddd",
    Y: "#ddd",
    Z: "#ddd"
  }
  const [letters, setLetters] = useState(initLetters);
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [prevGuesses, setPrevGuesses] = useState([]);

  const fetchWord = async () => {
    const response = await axios.get('http://localhost:8080/wordle/word');
    setWord(response.data.word);
  }

  useEffect(() => {
    fetchWord();
  }, []);
  
  function handleGuess() {
    setShowAlert(false);
    if (guess.length !== 5) {
      setShowAlert(true);
      setAlertText("Word must be 5-letters long");
    } else if (prevGuesses.includes(guess.toUpperCase())) {
      setShowAlert(true);
      setAlertText("Word was already guessed");
    } else {
      checkGuess();
    }
    setGuess('');
   
  }

  const checkGuess = async () => {
    const checkedGuess = guess.toUpperCase();
    try {
      // Send the guess to the backend
      const response = await axios.post('http://localhost:8080/wordle/check', {
        guess: checkedGuess
      });
      
      // Get feedback from the response and update the state
      const feedback = response.data.feedback

      // update the letter clues
      const updatedLetters = { ...letters };
      const updatedGrid = (grid.map(row => [...row]));
      for (let i = 0; i < 5; i++) {
        if (updatedLetters[checkedGuess[i]] !== 'success.light') {
          updatedLetters[checkedGuess[i]] = feedback[i];
        }
        updatedGrid[turn][i] = { letter: checkedGuess[i], feedback: feedback[i] };
      } 
      setGrid (updatedGrid);
      setLetters(updatedLetters);
      setTurn(turn + 1);
      setPrevGuesses([...prevGuesses, checkedGuess]);
      handleEndGame(checkedGuess);
      
    } catch (error) {
      console.error("Error making guess:", error.response?.data || error.message);
    }
  };

  function handleEndGame(checkedGuess) {
    if (checkedGuess === word || turn === maxTurns) {
      setWon(checkedGuess === word);
      handleOpen();
      setDisableEnter(true);
    }
  }

  const randomGuess = async () => {
    try {
      // fetch a random guess from backend
      const response = await axios.get('http://localhost:8080/wordle/random');
      
      const randGuess = response.data.random;
      setGuess(randGuess);
    } catch (error) {
      console.error("Error making guess:", error.response?.data || error.message);
    }
  };

  function resetGame() {
    setGrid(initGrid);
    setLetters(initLetters);
    setTurn(0);
    setPrevGuesses([]);
    setShowAlert(false);
    setWon(false);
    setDisableEnter(false);
    fetchWord();
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
        <Typography variant="h5" sx={{padding: '20px', color: 'primary.main', fontWeight: 'bold'}}>Figure out the mystery word</Typography>

        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline', gap: '20px'}}>
         
          <TextField  
            sx={{height: '20px'}} 
            variant="standard" 
            label='Guess a 5-letter word:'
            value={guess}
            onChange={e => setGuess(e.target.value)}
          />
          <Button 
            variant="contained"
            onClick={handleGuess}
            disabled={disableEnter}
          >Enter</Button>
          {
            showAlert && <Alert severity="error" variant="outlined" >{alertText}</Alert>
          }
           
        </Box>
        

        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline', padding: '30px', gap: '20px'}}>
          <Typography variant="body1">Or make a guess for me:</Typography>
            <ButtonGroup>
              <Button size="small" onClick={randomGuess}>Random guess</Button>
              
            </ButtonGroup>
        </Box>
          <Box  sx={{display: 'flex',  gap: '2px', justifyContent: 'center', alignItems: 'center'}}>
            <Typography fontWeight='bold'>Clues found</Typography>
            <IconButton color="primary" onClick={handleInfoClick}><InfoOutlined/></IconButton>
          </Box>
          <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '2px', justifyContent: 'center', padding: '5px 50px'}}>
            {Object.entries(letters).map((l, index) => <Box sx={{padding: '4px'}} key={index} backgroundColor={l[1]}>{l[0]}</Box>)}
          </Box>
          <Button sx={{paddingTop: '15px'}} onClick={resetGame}>New Game?</Button>
      </Paper>

    </Box>
   
    <Box sx={{padding:'30px'}}>
      <Paper sx={{padding:'25px'}}>
        {grid.map((row, y) => {
            return (
              <Box sx={{display: 'flex'}} key={`row${y}`}>
                {row.map((value, x) => {
                  return (
                    <Box 
                      variant='outined' 
                      sx={{
                        width: '70px', 
                        height: '70px', 
                        backgroundColor: value.feedback, 
                        margin: '5px', 
                        flexShrink: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }} 
                      key={`col${x}`}>
                      <Typography variant="h5" sx= {{fontWeight: 'bold', color: 'white'}}>{value.letter}</Typography>
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
        <IconButton 
          variant="contained" 
          onClick={handleClose}
          sx={{position: 'relative', left: '45%'}}
        >
          <Close/>
        </IconButton>
        {won ? <Typography variant="h4">You Win!</Typography> : <Typography variant="h4">You Lose!</Typography>}
        <Typography>The word was {word}</Typography>
        <Box sx={{display:'flex', gap: '10px', justifyContent: 'center', marginTop: '20px'}}>
          
          <Button variant="contained" onClick={() => {handleClose(); resetGame();}}>Play Again?</Button>
        </Box>
      </Box>
    </Modal>

    <Popover
        open={infoOpen}
        anchorEl={anchorEl}
        onClose={handleInfoClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ fontWeight: 'bold', padding: '20px' }}>Different colours indicate how close your guesses are:</Typography>
        <Box sx={{display: 'flex',  gap: '10px', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '0px 0px 20px 40px'}}>
          <Box sx={{display: 'flex',  gap: '2px', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{width: '15px', height: '15px', backgroundColor: 'success.light'}}></Box>
            <Typography> = correct letter in correct position</Typography>
          </Box>
          <Box sx={{display: 'flex',  gap: '2px', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{width: '15px', height: '15px', backgroundColor: 'warning.light'}}></Box>
            <Typography> = letter in word but incorrect position</Typography>
          </Box>
          <Box sx={{display: 'flex',  gap: '2px', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{width: '15px', height: '15px', backgroundColor: '#aaa'}}></Box>
            <Typography > = letter not in word</Typography>
          </Box>
        </Box>
       
    </Popover>
  </Box>
  )
}

export default Wordle