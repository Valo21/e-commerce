import { Box, Button, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const navigate = useNavigate();
  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputs = Object.fromEntries(formData);
    axios.post('/api/v1/auth/signin', {
      username: inputs.email,
      password: inputs.password
    })
      .then(() => {
        alert('Signed in!');
        navigate('/')
      })
      .catch(e => {
        alert(e.response.data.message)
      })
  }

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputs = Object.fromEntries(formData);
    if (inputs.password != inputs.rpassword) {
      return alert('wrong pass')
    }
    axios.post('/api/v1/auth/signup', inputs)
      .then(() => {
        alert('Signed up!');
      })
      .catch(e => {
        alert(e.response.data.message)
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
        <Paper sx={{display: 'flex', flexDirection: 'column', padding: 4, gap: 2, maxWidth: 450, width: '100%'}} component='form' onSubmit={handleRegister}>
          <Typography variant='h4' textAlign='center' mb={6}>
            Register
          </Typography>
          <TextField name='givenName' label="First name" variant="outlined" type='text' required/>
          <TextField name='familyName' label="Last name" variant="outlined" type='text' required/>
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