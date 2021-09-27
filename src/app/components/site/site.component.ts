import { SiteService } from './../../services/site.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css'],
})
export class SiteComponent implements OnInit {
  token = '';
  correo = '';
  data: any = [];
  hijos: any = [];

  constructor(private sitioServ: SiteService, private router: Router) {
    this.verificaToken();
    this.recuperaHijos();
  }

  ngOnInit(): void {}

  verificaToken() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.correo = localStorage.getItem('correo');
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

  //Recuperar Hijos
  recuperaHijos() {
    this.sitioServ.recuperaHijos(this.token, this.correo).subscribe((resp) => {
      //console.log(resp);
      this.data = resp;
      this.hijos = this.data.data;
      console.log(this.hijos);
    });
  }
}
