import { Typography, Box } from "@mui/material"

function LandingPg() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="91vh"
      width="100vw"
    >
      <Typography variant="h3" sx={{textAlign: "center"}}>Welcome to my portfolio :)</Typography>
      <Typography>  Explore the tabs to view different projects.</Typography>
    </Box>
  )
}

export default LandingPg