import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  token = '';
  nickname = '';
  data: any = [];
  usuario: any = [];
  perfil: any = [];

  constructor(private auth: AuthService, private router: Router) {
    this.verificaToken();
  }

  ngOnInit(): void {}

  verificaToken() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      //console.log(this.token);
      this.router.navigateByUrl('/home');
    }
  }

  /*
  onSubmit( form: NgForm){

    let estado: any;

    if( form.invalid ){
      alert('Datos ingresados no son correctos!!!');
      return;
    }else{
      this.router.navigateByUrl('/login');
    }

*/

  onSubmit(form: NgForm) {
    let estado: any;

    if (form.invalid) {
      alert('Datos ingresados no son correctos!!!');
      return;
    }

    this.auth.login(form.value.email, form.value.password).subscribe((resp) => {
      //console.log(resp);
      this.data = resp;
      estado = this.data.error;

      if (estado == true) {
        alert(this.data.mensaje);
        localStorage.clear();
        return;
      } else {
        //console.log(this.data);
        console.log(resp);
        this.perfil = this.data.perfil;
        if (this.perfil.codigo != 'padre') {
          alert('No es un usuario Padre de Familia');
          localStorage.clear();
        } else {
          localStorage.setItem('token', this.data.data.token);
          localStorage.setItem('correo', this.data.data.correo);
          localStorage.setItem('nickname', this.data.data.nickname);
          this.router.navigateByUrl('/site');

        }
      }
    });
  }

//cerrar sesion
cerrarSesion(){
  localStorage.clear();
  location.reload();
}

}
