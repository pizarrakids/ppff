import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DeberService } from 'src/app/services/deber.service';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-deber',
  templateUrl: './deber.component.html',
  styleUrls: ['./deber.component.css'],
})
export class DeberComponent implements OnInit {
  token = '';
  correo = '';
  dataDeber: any = [];
  dataHijo: any = [];
  hijo: any = [];
  deber: any = [];
  correoPadre = '';

  constructor(private rutaActiva: ActivatedRoute,
              private router: Router,
              private servSite: SiteService,
              private servDeber: DeberService
              ) {
    this.verificaToken();
    this.rutaActiva.params.subscribe((params)=>{
      this.correo = params['correo'];
    });
    this.muestraDeberes();
    this.muestraHijo();
  }

  ngOnInit(): void {}

  verificaToken() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.correoPadre = localStorage.getItem('correo');

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

  //Muestra deberes del estudiante
  muestraDeberes(){
    this.servDeber.getDeber(this.token,this.correo).subscribe(resp=>{
      //console.log(resp);
      this.dataDeber = resp;
      this.deber = this.dataDeber.deberes;
      console.log(this.deber);
    })
  }

  //Muestra Info del Niño
  muestraHijo(){
    this.servSite.recuperaHijos(this.token,this.correoPadre).subscribe(resp=>{
      //console.log(resp);
      this.dataHijo = resp;
      this.hijo = this.dataHijo.data;
      console.log(this.hijo);
    })
  }


}
