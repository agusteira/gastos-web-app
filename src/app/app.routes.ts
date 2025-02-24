import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },  // Ruta por defecto
    /*{ path: 'signUp', component: SignUpComponent },
    { path: 'quien-soy', component: QuienSoyComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'encuesta', component: EncuestaComponent },
    { path: "juegos", loadChildren: ()=> import ("./modulos/juegos/juegos.module").then(m => m.JuegosModule)},
    { path: '**', component: ErrorComponent }  // Ruta para errores 404
    */
];
