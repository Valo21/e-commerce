import React from "react";
import { Box, Button, InputAdornment, MenuItem, Paper, TextField } from "@mui/material";
import { useCreateProductMutation } from "@store/api/productsApi";
import { useSnackbar } from "notistack";
import ImageUploader from "@components/ImageUploader.tsx";

enum ProductCategory {
  Clothing = 'Clothing',
  Electronics = 'Electronics',
  Furniture = 'Furniture',
  PersonalCare = 'Personal Care',
  Vehicles = 'Vehicles',
  Pets = 'Pets',
}

const categories = Object.values(ProductCategory)


function CreateProductPage() {
  const [createProduct] = useCreateProductMutation();
  const { enqueueSnackbar } = useSnackbar();
  async function handlePublish(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await createProduct(formData);

    if ('error' in res) {
      const error = res.error as ApiError;
      enqueueSnackbar(error.data.message, { variant: 'error'})
      return
    }

    enqueueSnackbar('Published!', { variant: 'success'})
    location.href = '/products/' + res.data.id;
  }

  return (
    <>
      <Paper sx={{padding: 2}}>
        <Box encType='multipart/form-data' component='form' display='flex' flexDirection='column' gap={2} onSubmit={handlePublish}>
          <ImageUploader/>
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
            name='category'
            select
            label="Category"
            defaultValue={categories[0]}
            helperText="Please select a category"
            required
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
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