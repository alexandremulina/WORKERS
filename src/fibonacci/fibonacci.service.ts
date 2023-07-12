import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import * as path from 'path';
import { Worker } from 'worker_threads';

@Injectable()
export class FibonacciService implements OnApplicationShutdown {
  private workers: Worker[] = [];

  constructor() {}

  calculateFibonacci(n: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const worker = new Worker(
        path.resolve(__dirname, './fibonacci.worker.js'),
        {
          workerData: n,
        },
      );

      this.workers.push(worker);

      worker.on('message', (result) => {
        resolve(result);
      });

      worker.on('error', (err) => {
        reject(err);
      });

      worker.on('exit', () => {
        this.workers = this.workers.filter((w) => w !== worker);
      });
    });
  }

  async onApplicationShutdown() {
    await Promise.all(
      this.workers.map((worker) => {
        return new Promise<void>((resolve) => {
          worker.on('exit', () => {
            resolve();
          });

          worker.terminate();
        });
      }),
    );
  }
}
