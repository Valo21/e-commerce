import { Box, Button, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

function AuthPage() {
  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch('/api/auth/login')
      .then(res => {
        if (!res.ok) {
          alert('error')
        }
        return res.json()
      })
      .then(data => {

      })
  }

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch('/api/auth/register')
      .then(res => {
        if (!res.ok) {
          alert('error')
        }
        return res.json()
      })
      .then(data => {

      })
  }
  return (
    <>
      <Box display='flex' width='100%' flexDirection='column' justifyContent='center' alignItems='center'>
        <Paper sx={{display: 'flex', flexDirection: 'column', padding: 4, gap: 2, maxWidth: 450, width: '100%'}} component='form' onSubmit={handleLogin}>
          <Typography variant='h4' textAlign='center' mb={6}>
            Log in
          </Typography>
          <TextField name='email' label="Email" variant="outlined" type='email' required/>
          <TextField name='password' label="Password" variant="outlined" type='password' required/>
          <Button variant='contained' type='submit'>Log in</Button>
          <Button variant='contained'>Register</Button>
        </Paper>
        <Paper sx={{display: 'flex', flexDirection: 'column', padding: 4, gap: 2, maxWidth: 450, width: '100%'}} component='form' onSubmit={handleLogin}>
          <Typography variant='h4' textAlign='center' mb={6}>
            Register
          </Typography>
          <TextField name='firstname' label="First name" variant="outlined" type='text' required/>
          <TextField name='lastname' label="Last name" variant="outlined" type='text' required/>
          <TextField name='email' label="Email" variant="outlined" type='email' required/>
          <TextField name='password' label="Password" variant="outlined" type='password' required/>
          <TextField name='rpassword' label="Repeat password" variant="outlined" type='password' required/>
          <Button variant='contained' type='submit'>Register</Button>
        </Paper>
      </Box>
    </>
  );
}

export default AuthPage;