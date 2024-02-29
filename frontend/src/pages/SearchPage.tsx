import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import ProductList from "@components/ProductList";
import { useSearchProductsQuery } from "@store/api/productsApi";

function SearchPage() {
  const location = useLocation();
  const { data, error } = useSearchProductsQuery(location.state.p);

  if (error) return (
    <>
      Error
    </>
  );

  return (
    <Container>
      <ProductList list={data}/>
    </Container>
  );
}

export default SearchPage;