import HttpResponse from '@entities/http_response';
import { net } from 'electron';

class HttpService {
  static get(url: string): Promise<HttpResponse> {
    return new Promise((resolve, reject) => {
      const request = net.request(url);

      request.on('response', (response) => {
        const buffers: Buffer[] = [];

        response.on('data', (data) => buffers.push(data));

        response.on('end', () =>
          resolve({
            status: response.statusCode,
            html: Buffer.concat(buffers).toString(),
          }),
        );
      });

      request.on('error', (error) => reject(error));

      request.end();
    });
  }
}

export default HttpService;
