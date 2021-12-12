import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeberDetalleComponent } from './components/deber-detalle/deber-detalle.component';
import { DeberComponent } from './components/deber/deber.component';
import { HomeComponent } from './components/home/home.component';
import { KidComponent } from './components/kid/kid.component';
import { LoginComponent } from './components/login/login.component';
import { SiteComponent } from './components/site/site.component';


const routes: Routes = [
    { path:'home', component: HomeComponent },
    { path:'login', component: LoginComponent },
    { path:'site', component: SiteComponent },
    { path:'kid/:correo', component: KidComponent },
    { path:'deber/:correo', component: DeberComponent },
    { path:'deber-detalle/:correo/:id/:calificacion_id', component: DeberDetalleComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
