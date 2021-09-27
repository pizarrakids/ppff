import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

//Muestra información de los hijos del Padre de Familia
  recuperaHijos(token,correo){
    var url = `${this.apiUrl}PadreSitio/kids/${token}/${correo}`;
    return this.http.get(url);
  }

//Muestra información que puso el profesor en el anecdotario de la actividad
  postAnecdotario(token, correo){
    var url = `${this.apiUrl}Anecdota/anecdotasRstudiante`;

    const anecdotarioData = {
      token: token,
      correo: correo
    };

    return this.http.post(url, anecdotarioData);
  }

}
