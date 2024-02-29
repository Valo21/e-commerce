import { Button } from "@mui/material";
import ProductList from "@components/ProductList";
import { useNavigate } from "react-router-dom";

function MyProductsPage() {
  const navigate = useNavigate();

  return (
    <>
      <Button variant='contained' onClick={() => navigate('/create')}>
        Add New
      </Button>
      <ProductList list={undefined}/>
    </>
  );
}

export default MyProductsPage;