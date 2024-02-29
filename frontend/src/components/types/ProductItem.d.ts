import { Product } from "../../../../src/products/entities/product.entity";

interface CartItem extends Product {
  amount: number
}
interface ProductItemProps {
  data: CartItem
}