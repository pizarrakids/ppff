import { environment } from './../../../environments/environment.prod';
import { SiteService } from './../../services/site.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-kid',
  templateUrl: './kid.component.html',
  styleUrls: ['./kid.component.css'],
})
export class KidComponent implements OnInit {
  token = '';
  correo = '';
  correoPadre = '';
  data: any = [];
  hijos: any = [];
  anecdotario: any = [];
  fecha: any = [];
  //fotos url
  anecdotaUrl = environment.anecdotaUrl;

  constructor(
    private SiteService: SiteService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) {
    this.verificaToken();
    this.rutaActiva.params.subscribe((params) => {
      this.correo = params['correo'];
    });
    this.Anecdotario();
    this.recuperaHijos();

    //console.log(this.correo);
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

  Anecdotario() {
    this.SiteService.postAnecdotario(this.token, this.correo).subscribe(
      (resp) => {
        //console.log(resp);
        this.data = resp;
        this.anecdotario = this.data.data;
        //console.log(this.anecdotario);
      }
    );
  }

  //Recuperar Hijos
  recuperaHijos() {
    this.SiteService.recuperaHijos(this.token, this.correoPadre).subscribe((resp) => {
      //console.log(resp);
      this.data = resp;
      this.hijos = this.data.data;
      console.log(this.hijos);
    });
  }
}
