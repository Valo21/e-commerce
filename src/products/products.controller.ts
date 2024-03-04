import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile, UseGuards, Res, Req, UploadedFiles, Query
} from "@nestjs/common";
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor, FilesInterceptor, NoFilesInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Request } from 'express';
import { User } from "../users/entities/user.entity";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('images', 6, { dest: './uploads' }))
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
    @Req() req: any,
  ) {
    const user = req.user as User;
    const paths: string[] = files.map((file) => file.filename);
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
  async findOne(@Param('id') id: string, @Query() query: any) {
    const product = await this.productsService.findOne(id);
    if (query.related) {
      product.related = await this.productsService.findAll();
    }
    return product;
  }

  @Patch(':id')
  @UseInterceptors(NoFilesInterceptor())
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
