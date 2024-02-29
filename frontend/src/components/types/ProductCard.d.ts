import { Product } from "@backend/products/entities/product.entity";

interface ProductCardProps {
  data: Product | Record<string, never>
}