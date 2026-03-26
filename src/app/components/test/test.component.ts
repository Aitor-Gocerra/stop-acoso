import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Question {
  id: number;
  text: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  questions: Question[] = [
    { id: 1, text: '¿Te sientes con miedo o ansiedad al pensar en ir al centro educativo?' },
    { id: 2, text: '¿Has recibido insultos, motes ofensivos o burlas de forma repetida en la última semana?' },
    { id: 3, text: '¿Algún compañero/a ha difundido rumores falsos sobre ti o ha compartido fotos/vídeos sin tu consentimiento?' },
    { id: 4, text: '¿Te sientes ignorado/a o excluido/a a propósito de los grupos de trabajo o de las actividades de ocio?' },
    { id: 5, text: '¿Has sufrido algún tipo de empujón, golpe o daño físico, aunque te digan que "es una broma"?' },
    { id: 6, text: '¿Te han quitado, escondido o roto material escolar, dinero o pertenencias personales?' },
    { id: 7, text: '¿Evitas pasar por ciertos lugares del centro (baños, pasillos, patio) para no encontrarte con determinadas personas?' },
    { id: 8, text: '¿Has recibido mensajes amenazantes o humillantes a través de redes sociales o WhatsApp?' },
    { id: 9, text: '¿Sientes que no tienes a ningún adulto en el centro en quien confiar plenamente lo que te sucede?' },
    { id: 10, text: '¿Has notado que tu rendimiento académico ha bajado o que te cuesta concentrarte por problemas con otros compañeros?' }
  ];

  answers: (boolean | null)[] = new Array(10).fill(null);
  currentQuestion = 0;
  showResult = false;
  started = false;

  constructor(private router: Router) {}

  get progress(): number {
    return ((this.currentQuestion) / this.questions.length) * 100;
  }

  get yesCount(): number {
    return this.answers.filter(a => a === true).length;
  }

  get result() {
    const count = this.yesCount;
    if (count <= 3) {
      return {
        level: 'Leve / Alerta',
        color: '#2e7d32',
        bg: '#e8f5e9',
        badge: 'VERDE',
        icon: '🟢',
        message: 'La situación no muestra indicadores claros de acoso sistemático. Sin embargo, es recomendable hacer un seguimiento preventivo.',
        action: 'Mantente alerta y si algo cambia, vuelve a realizar el test o contacta con tu tutor.',
        cta: false
      };
    } else if (count <= 6) {
      return {
        level: 'Moderado',
        color: '#f57f17',
        bg: '#fff8e1',
        badge: 'AMARILLO',
        icon: '🟡',
        message: 'Hay indicios de una situación de acoso. Es necesaria atención y no debes dejarlo pasar.',
        action: 'Te recomendamos contactar con un tutor o mediador de confianza de forma anónima.',
        cta: true
      };
    } else {
      return {
        level: 'Grave',
        color: '#c62828',
        bg: '#ffebee',
        badge: 'ROJO',
        icon: '🔴',
        message: 'RIESGO ALTO: La situación indica acoso real y requiere intervención inmediata del centro.',
        action: 'Has dado un gran paso al identificarlo. Ahora deja que te ayudemos. Cuéntanoslo aquí abajo.',
        cta: true
      };
    }
  }

  startTest() {
    this.started = true;
    this.currentQuestion = 0;
    this.answers = new Array(10).fill(null);
  }

  answer(value: boolean) {
    this.answers[this.currentQuestion] = value;
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
    } else {
      this.showResult = true;
    }
  }

  goBack() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }

  restartTest() {
    this.started = false;
    this.showResult = false;
    this.currentQuestion = 0;
    this.answers = new Array(10).fill(null);
  }

  goToChat() {
    this.router.navigate(['/login']);
  }
}
