import { Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import ProductList from "@components/ProductList";
import { useSearchProductsQuery } from "@store/api/productsApi";

function SearchPage() {
  const [params] = useSearchParams()
  const { data, error } = useSearchProductsQuery(params.get('q') ?? '');

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