import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { InputGetFile } from '../client-http.dto';
import { Observable } from 'rxjs';
import ObjectId from 'bson-objectid';
import { StoragesService } from '../../common/storages/storages.service';

@Injectable()
export class ClientHttpService {
  constructor(
    private storagesService: StoragesService,
    private httpService: HttpService) {}

  public async download({ url, dir, extname }: InputGetFile, config?: AxiosRequestConfig): Promise<Observable<any>> {
    const result = await this.httpService.get(url, { responseType: 'arraybuffer', ...config });
    return new Observable(subscriber => {
      result.subscribe({
        next: async (response) => {
          try {
            const filename = `${new ObjectId().toHexString()}.${extname}`;
            const relativePath = `${dir}/${filename}`;
            const realPath = this.storagesService.pathStorage(relativePath);
            await this.storagesService.disk().put(relativePath, response.data);
            subscriber.next({
              filename,
              relativePath,
              realPath
            });
            subscriber.complete();
          } catch (error) {
            subscriber.error(error);
          }
        },
        error: (err) => {
          subscriber.error(err);
        }
      })
    });
  }
}
