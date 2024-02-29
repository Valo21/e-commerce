import { Box, Button, InputAdornment, MenuItem, Paper, TextField } from "@mui/material";
import { useCreateProductMutation } from "@store/api/productsApi";
import React from "react";


//TODO: Convert Categories to enum
const currencies = [
  {
    value: 'Technology',
    label: '$',
  },
  {
    value: 'Clothes',
    label: '฿',
  },
];


function CreateProductPage() {
  //TODO: Change create product fetch method
  const [createProduct] = useCreateProductMutation();
  async function handlePublish(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    createProduct(formData)
    const res = await createProduct(formData);

    /*
    if (res.error) {
      alert('error')
      return
    }
    */
    alert('published')
  }

  return (
    <>
      <Paper sx={{padding: 2}}>
        <Box encType='multipart/form-data' component='form' display='flex' flexDirection='column' gap={2} onSubmit={handlePublish}>
          <input name='images' type='file' multiple required/>
          <TextField name='name' id="standard-basic" label="Name" variant="standard" required/>
          <TextField
            name='price'
            label="Price"
            id="standard-start-adornment"
            InputProps={{
              endAdornment: <InputAdornment position="start">USD</InputAdornment>,
            }}
            inputProps={{
              step: 0.01
            }}
            variant="standard"
            type='number'
            required
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Category"
            defaultValue="Technology"
            helperText="Please select a category"
            required
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <Button variant='contained' type='submit'>Publish</Button>
        </Box>
      </Paper>
    </>
  );
}

export default CreateProductPage;