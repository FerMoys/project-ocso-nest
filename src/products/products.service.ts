import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Sabritas Normal",
      price: 29,
      countSeal: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Coca Cola 600ml",
      price: 40,
      countSeal: 2,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Agua Ciel 1L",
      price: 15,
      countSeal: 2,
      provider: uuid(),
    },
  ];

  create(createProductDto: CreateProductDto) {
    if(!createProductDto.productId) createProductDto.productId = uuid()
    const newProduct: CreateProductDto = {
      ...createProductDto,
      productId: createProductDto.productId || uuid(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((p) => p.productId === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  findByProvider(providerId: string) {
    const providerProducts = this.products.filter(
      (p) => p.provider === providerId
    );
    if (providerProducts.length === 0) {
      throw new NotFoundException(
        `No products found for provider ${providerId}`
      );
    }
    return providerProducts;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = this.findOne(id);

    const updatedProduct = {
      ...productToUpdate,
      ...updateProductDto,
    };

    this.products = this.products.map((p) =>
      p.productId === id ? updatedProduct : p
    );

    return updatedProduct;
  }

  remove(id: string) {
    const product = this.findOne(id);
    this.products = this.products.filter((p) => p.productId !== id);
    return product;
  }
}