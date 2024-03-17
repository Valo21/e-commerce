import {
  Column,
  CreateDateColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

interface ApiError {
  data: {
    message: string
  }
}

interface User {
  id: string;
  givenName: string;
  familyName: string;
  email: string;
  password: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: Array<string>;
  seller: User;
  sellerId: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  related?: Product[];
}
