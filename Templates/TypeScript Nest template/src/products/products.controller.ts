import {
  Controller,
  Get,
  Post,
  HttpCode,
  Header,
  Req,
  Res,
  Redirect,
  Param,
} from '@nestjs/common';
import { Request, Response } from 'express';

//@Controller({ host: 'admin.example.com' })
@Controller('products')
export class ProductsController {
  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(@Req() request: Request): string {
    return 'This action adds a new cat';
  }

  @Get(':id')
  @Redirect('https://nestjs.com', 301)
  findAll(@Res() response: Response): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param() params): string {
    return 'This action returns all cats';
  }
}
