import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';
import { ChatAlumnoComponent } from './components/chat-alumno/chat-alumno.component';
import { PanelDocenteComponent } from './components/panel-docente/panel-docente.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { TelefonosComponent } from './components/telefonos/telefonos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TestComponent,
    ChatAlumnoComponent,
    PanelDocenteComponent,
    RecursosComponent,
    TelefonosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
