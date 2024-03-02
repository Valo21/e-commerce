import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../auth/jwt.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([Product, User]), PassportModule],
  controllers: [ProductsController],
  providers: [ProductsService, UsersService, JwtStrategy],
})
export class ProductsModule {}
