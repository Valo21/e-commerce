import { Product } from "@backend/products/entities/product.entity";

interface CartItem extends Product {
  amount: number
}
interface ProductItemProps {
  data: CartItem
}