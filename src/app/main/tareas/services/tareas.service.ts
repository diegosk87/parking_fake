import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estancia } from 'app/main/home/models/estancia';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private urlApi:string = environment.apiUrl + "/estancias";

  constructor(private _httpClient:HttpClient) { }

  public getEstancias():Observable<Array<Estancia>>{
    return this._httpClient.get<Array<Estancia>>(this.urlApi);
  }

  public postComienzaMes(): Observable<any> {
    return this._httpClient.post(`${this.urlApi}/tareas`, {});
  }
}
