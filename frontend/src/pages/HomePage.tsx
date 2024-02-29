import { ReactElement } from "react";
import { Container } from "@mui/material";
import ProductList from "@components/ProductList";
import { useGetProductsQuery } from "@store/api/productsApi";

function HomePage() : ReactElement {
  const { data } = useGetProductsQuery(null);

  return (
    <Container>
      <ProductList list={data}/>
    </Container>
  );
}
export default HomePage;