import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private urlApi:string = environment.apiUrl + "/estancias";

  constructor(private _httpClient:HttpClient) { }

  public getEstancias():Observable<any>{
    return this._httpClient.get(this.urlApi);
  }
  
}
