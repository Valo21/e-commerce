import { Container } from "@mui/material";
import { useLocation, useSearchParams } from "react-router-dom";
import ProductList from "@components/ProductList";
import { useSearchProductsQuery } from "@store/api/productsApi";

function SearchPage() {
  const [params] = useSearchParams()
  console.log(params)
  const { data, error } = useSearchProductsQuery(params.get('q'));

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