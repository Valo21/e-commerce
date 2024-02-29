import { Product } from "../../../../src/products/entities/product.entity";

interface ProductCardProps {
  data: Product | Record<string, never>
}