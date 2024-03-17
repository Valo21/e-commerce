import { Product } from "@src/types";

interface CartItem extends Product {
  amount: number
}
interface ProductItemProps {
  data: CartItem
}
