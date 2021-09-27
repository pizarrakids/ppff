import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeberService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  //Deberes del alumno
  getDeber(token, estudiante) {
    var url = `${this.apiUrl}PadreSitio/deberes/${token}/${estudiante}`;
    return this.http.get(url);
  }

  //Muestra detalle de UN DEBER
  getDetalleDeber(token, id) {
    var url = `${this.apiUrl}PadreSitio/deber/${token}/${id}`;
    return this.http.get(url);
  }

  //Método para subir tarea del estudiante
  postSubirArchivo(archivo){
    //console.log(archivo);
    var url = `${this.apiUrl}PadreSitio/entregadeber`;
    return this.http.post(url, JSON.stringify(archivo));
  }

  //Método para MOSTRAR TAREA SUBIDA DEL ESTUDIANTE
  getMuestraDeber(token, id) {
    var url = `${this.apiUrl}PadreSitio/archivosentregados/${token}/${id}`;
    return this.http.get(url);
  }

  //Método para ELIMINAR TAREA SUBIDA DEL ESTUDIANTE
  getEliminaDeber(token, id) {
    var url = `${this.apiUrl}PadreSitio/eliminarentrega/${token}/${id}`;
    return this.http.get(url);
  }

}
