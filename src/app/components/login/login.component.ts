import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  activeTab: 'alumno' | 'docente' = 'alumno';

  alumnoForm = { email: '', password: '', confirmPassword: '' };
  docenteForm = { usuario: '', password: '' };

  alumnoSubmitted = false;
  docenteSubmitted = false;

  constructor(private router: Router) {}

  loginAlumno() {
    this.alumnoSubmitted = true;
    if (this.alumnoForm.email && this.alumnoForm.password) {
      this.router.navigate(['/chat']);
    }
  }

  loginDocente() {
    this.docenteSubmitted = true;
    if (this.docenteForm.usuario && this.docenteForm.password) {
      this.router.navigate(['/panel-docente']);
    }
  }
}
