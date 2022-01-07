import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as urlJoin from 'url-join'

@Injectable()
export class AuthHttpService {
  constructor(private httpService: HttpService) {}

  private urlBase = process.env.AUTH_HOST;

  public getPerson<T>(ids: T[], limit: T): Promise<any> {
    const queryIds = ids.join("&ids=");
    const url = urlJoin(this.urlBase, `/person?ids=${queryIds}&perPage=${limit}`);
    return new Promise((resolve, reject) => {
      this.httpService.get(url)
        .subscribe({
          next: (res) => resolve(res?.data?.person),
          error: (err) => {
            console.log(err)
            reject(new InternalServerErrorException)
          }
      })
    });
  }

  public findPerson(id: number): Promise<any> {
    const url = urlJoin(this.urlBase, `/person/${id}`);
    return new Promise((resolve, reject) => {
      this.httpService.get(url)
        .subscribe({
          next: (res) => resolve(res?.data?.person),
          error: () => reject(new InternalServerErrorException)
      })
    });
  }
}