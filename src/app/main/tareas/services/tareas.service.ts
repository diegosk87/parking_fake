import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private urlApi:string = environment.apiUrl + "/vehiculos";

  constructor(private _httpClient:HttpClient) { }

  public getVehiculos():Observable<any>{
    return this._httpClient.get(this.urlApi);
  }
}
