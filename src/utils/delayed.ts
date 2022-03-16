import sleep from './sleep';

function delayed<T>(promise: Promise<T>, delayInMS = 800): Promise<T> {
  return new Promise((resolve, reject) => {
    Promise.all([promise.catch((error: any) => error), sleep(delayInMS)]).then(
      (values) => {
        const res = values[0];
        if (res instanceof Error) reject(res);
        else resolve(res);
      },
    );
  });
}

export default delayed;
