import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DeberService } from 'src/app/services/deber.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-deber-detalle',
  templateUrl: './deber-detalle.component.html',
  styleUrls: ['./deber-detalle.component.css'],
})
export class DeberDetalleComponent implements OnInit {
  token = '';
  correo = '';
  idDeber = '';
  idCalificacion = '';
  dataDeber: any = [];
  deber: any = [];
  material: any = [];
  fechaInicio: '';
  fechaEntrega: '';
  horaInicio: '';
  horaEntrega: '';
  dataDeberEstudiante: any = [];
  deberEstudiante: any = [];
//creando archivo
archivo = {
  nombreArchivo: null,
  base64textString: null,
  token: null,
  observacion: null,
  deber_calificacion_id : null
};
  //atributos para la descarga de archivos
  apiUrl = environment.apiUrl;
  url = `${this.apiUrl}Deber/descargarmaterial/`;

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private servDeber: DeberService
  ) {
    this.verificaToken();
    this.rutaActiva.params.subscribe((params) => {
      this.correo = params['correo'];
      this.idDeber = params['id'];
      this.idCalificacion = params['calificacion_id'];
    });
    this.detalleDeber();
    this.tareaSubida();
  }

  ngOnInit(): void {}

  verificaToken() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      //console.log(this.token);
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  //cerrar sesion
  cerrarSesion() {
    localStorage.clear();
    location.reload();
  }

  //Muestra detalle de un deber
  detalleDeber(){
    // console.log(this.idDeber);
     this.servDeber.getDetalleDeber(this.token,this.idDeber).subscribe(resp=>{
       console.log(resp);
       this.dataDeber = resp;
       this.deber = this.dataDeber.deberes.deber;
       this.material  = this.dataDeber.deberes.material;
       //console.log(this.material);
       this.fechaInicio = this.deber.fecha_inicio.substring(0,10);
       this.fechaEntrega = this.deber.fecha_entrega.substring(0,10);
       this.horaInicio = this.deber.fecha_inicio.substring(11,16);
       this.horaEntrega = this.deber.fecha_entrega.substring(11,16);
       //console.log(this.horaInicio);
     });
  }


//insertar archivo en el sistema
seleccionarArchivo(event) {
  var files = event.target.files;
  var file = files[0];
  this.archivo.nombreArchivo = file.name;
  if (files && file) {
    var reader = new FileReader();
    reader.onload = this._handlerReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }
}

_handlerReaderLoaded(readerEvent) {
  var binaryString = readerEvent.target.result;
  this.archivo.base64textString = btoa(binaryString);
}

upload() {
  //console.log(this.archivo);
  this.archivo.token = this.token;
  this.archivo.deber_calificacion_id = this.idCalificacion;
  //console.log(this.archivo);
  this.servDeber.postSubirArchivo(this.archivo).subscribe(resp=>{
    //console.log(resp);
    this.tareaSubida();
  });
}
//fin de insertar archivo

//Muestra TAREAS SUBIDAS DEL ESTUDIANTE
tareaSubida(){
  this.servDeber.getMuestraDeber(this.token,this.idCalificacion).subscribe(resp=>{
    //console.log(resp);
    this.dataDeberEstudiante = resp;
    this.deberEstudiante = this.dataDeberEstudiante.deberes;
    console.log(this.deberEstudiante);
  });
}

eliminarTarea(id){
  console.log(id);
  this.servDeber.getEliminaDeber(this.token,id).subscribe(resp=>{
    //console.log(resp);
    this.tareaSubida();
  });
}


}
