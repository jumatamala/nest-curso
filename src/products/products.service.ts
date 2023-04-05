import {
  BadRequestException,
  NotFoundException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
      /*  const product = await this.productRepository.save(createProductDto);
      return product; */
    } catch (error) {
      this.handleDBException(error);
    }
  }

  findAll() {
    const products = this.productRepository.find();
    return products;
  }

  async findOne(id: UUID) {
    try {
      const product = await this.productRepository.findOneByOrFail({ id });
      return product;
    } catch (error) {
      if (error.name === 'EntityNotFoundError') {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      this.handleDBException(error);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: UUID) {
    try {
      const { title } = await this.findOne(id);
      await this.productRepository.delete(id);
      return `Product with title ${title} deleted`;
    } catch (error) {
      if (error.name === 'NotFoundException')
        throw new NotFoundException(`Product with id ${id} not found`);
    }
  }

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    if (error.code === '22P02') throw new BadRequestException('Invalid UUID');

    throw new InternalServerErrorException(`error: ${error}`);
  }
}
