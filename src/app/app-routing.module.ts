import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';
import { ChatAlumnoComponent } from './components/chat-alumno/chat-alumno.component';
import { PanelDocenteComponent } from './components/panel-docente/panel-docente.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { TelefonosComponent } from './components/telefonos/telefonos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponent },
  { path: 'chat', component: ChatAlumnoComponent },
  { path: 'panel-docente', component: PanelDocenteComponent },
  { path: 'recursos', component: RecursosComponent },
  { path: 'telefonos', component: TelefonosComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
