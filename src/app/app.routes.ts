import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/paginas/home/home.component';
import { DiarioComponent } from './componentes/paginas/diario/diario.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'diario', component: DiarioComponent },
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
