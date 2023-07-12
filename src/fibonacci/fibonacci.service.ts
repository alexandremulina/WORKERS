import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import Piscina from 'piscina';

@Injectable()
export class FibonacciService implements OnApplicationShutdown {
  private piscina: Piscina;

  constructor() {
    this.piscina = new Piscina({
      filename: require.resolve('./fibonacci.worker'),
      minThreads: 2, // Minimum number of worker threads
      maxThreads: 10, // Maximum number of worker threads
      concurrentTasksPerWorker: 1, // Number of tasks a worker can handle concurrently
    });
  }

  calculateFibonacci(n: number): Promise<number> {
    return this.piscina.run(n);
  }

  onApplicationShutdown() {
    // Terminate the worker threads on application shutdown
    this.piscina.destroy();
  }
}
