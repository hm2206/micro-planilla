import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as urlJoin from 'url-join'

@Injectable()
export class AuthHttpService {
  constructor(private httpService: HttpService) {}

  private urlBase = process.env.AUTH_HOST;

  public findPerson(id: number): Observable<any> {
    const url = urlJoin(this.urlBase, `/person/${id}`);
    return this.httpService.get(url);
  }
}