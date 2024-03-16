import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private userService: UsersService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    sellerId: string,
    imgPaths: string[],
  ) {
    const seller: User = await this.userService.findOne(sellerId);
    return this.productRepository.save({
      ...createProductDto,
      seller,
      images: imgPaths,
    });
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: string): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  findManyByName(name: string) {
    return this.productRepository.query(
      'SELECT * FROM product WHERE SIMILARITY(name, $1) > 0.05',
      [name],
    );
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
