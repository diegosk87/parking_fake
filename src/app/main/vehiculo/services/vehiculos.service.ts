import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promises } from 'dns';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private urlApi:string = environment.apiUrl + "/vehiculos";
  private urlApiTipos:string = environment.apiUrl + "/tipos";

  constructor(private _httpClient:HttpClient) {

  }

  public getVehiculos():Observable<any>{
    return this._httpClient.get(this.urlApi);
  }

  public getTipos():Observable<any>{
    return this._httpClient.get(this.urlApiTipos);
  }
  
}
