import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('images', { dest: './uploads' }))
  create(
    @UploadedFile() files: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    const user = {
      id: '45d6edff-e0f0-4f26-9468-20c1fd8c5659',
    };
    const paths = [files.filename];
    return this.productsService.create(createProductDto, user.id, paths);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post('search')
  search(@Body() body: any) {
    return this.productsService.findManyByName(body.name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
