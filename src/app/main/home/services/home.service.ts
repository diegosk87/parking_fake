import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Estancia } from '../models/estancia';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private urlApi:string = environment.apiUrl + "/estancias";

  constructor(private _httpClient:HttpClient) { }

  public getEstancias():Observable<Array<Estancia>>{
    return this._httpClient.get<Array<Estancia>>(this.urlApi);
  }

  public postEstancia(estancia:Estancia): Observable<Estancia> {
    return this._httpClient.post<Estancia>(this.urlApi, estancia);
  }
}
