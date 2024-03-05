import { Button } from "@mui/material";
import ProductList from "@components/ProductList";
import { useNavigate } from "react-router-dom";
import { useGetUserOwnProductsQuery } from "@store/api/usersApi.ts";
import { ReactElement } from "react";

function MyProductsPage(): ReactElement {
  const navigate = useNavigate();
  const { data } = useGetUserOwnProductsQuery(null);

  return (
    <>
      <Button variant='contained' onClick={() => navigate('/create')}>
        Add New
      </Button>
      <ProductList list={data}/>
    </>
  );
}

export default MyProductsPage;