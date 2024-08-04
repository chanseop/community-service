import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseTransformInterceptor } from "./interceptors/response-transform-interceptors";


@Controller()
@UseInterceptors(ResponseTransformInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
