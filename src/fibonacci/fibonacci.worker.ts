const { parentPort, workerData } = require('worker_threads');

function fibonacci(num) {
  if (num <= 1) {
    return num;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
}

parentPort.postMessage(fibonacci(workerData));
