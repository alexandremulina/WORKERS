import { Controller, Get, Param } from '@nestjs/common';
import { FibonacciService } from './fibonacci.service';

@Controller('fibonacci')
export class FibonacciController {
  constructor(private readonly fibonacciService: FibonacciService) {}

  @Get(':n')
  async calculateFibonacci(@Param('n') n: string): Promise<number> {
    console.log(n);
    const result = await this.fibonacciService.calculateFibonacci(
      parseInt(n, 10),
    );
    console.log('oi', result);
    return result;
  }
}
