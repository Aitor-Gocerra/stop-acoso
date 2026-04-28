import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pillars = [
    {
      icon: '💬',
      title: 'Chat Encriptado',
      desc: 'Comunicación anónima de extremo a extremo. Tu identidad desaparece tras la verificación.',
      color: '#1565c0'
    },
    {
      icon: '📚',
      title: 'Documentación',
      desc: 'Guías legales y formativas para alumnos, familias y docentes actualizadas.',
      color: '#00897b'
    },
    {
      icon: '🎥',
      title: 'Biblioteca de Vídeos',
      desc: 'Cápsulas cortas estilo Reels/TikTok para sensibilización y tutoriales de uso.',
      color: '#6d4c41'
    },
    {
      icon: '📞',
      title: 'Directorio de Ayuda',
      desc: 'Acceso rápido al 017, 018, ANAR, Fiscalía y líneas de emergencia especializadas.',
      color: '#c62828'
    },
    {
      icon: '👩‍⚕️',
      title: 'Red de Profesionales',
      desc: 'Psicólogos y trabajadores sociales externos con primera consulta gratuita.',
      color: '#6a1b9a'
    },
    {
      icon: '📋',
      title: 'Guía de Protocolo',
      desc: 'Paso a paso del proceso legal: indicios, expediente, medidas cautelares y derechos.',
      color: '#ef6c00'
    }
  ];

  steps = [
    { num: '1', title: 'Accede anónimamente', desc: 'Usa tu correo corporativo para verificar que eres alumno del centro. Tu nombre desaparece al instante.' },
    { num: '2', title: 'Haz el test', desc: 'Responde 10 preguntas validadas por psicólogos. Descubre si lo que vives es acoso real.' },
    { num: '3', title: 'Inicia el chat', desc: 'Elige al docente de tu confianza y cuéntale lo que ocurre. El centro activará el protocolo.' }
  ];
}
