import { Component } from '@angular/core';

interface Teacher {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
  available: boolean;
  specialty: string;
}

interface Message {
  text: string;
  fromMe: boolean;
  time: string;
  type?: 'system';
}

@Component({
  selector: 'app-chat-alumno',
  templateUrl: './chat-alumno.component.html',
  styleUrls: ['./chat-alumno.component.css']
})
export class ChatAlumnoComponent {
  selectedTeacher: Teacher | null = null;
  newMessage = '';
  attachmentName = '';
  anonCode = Math.floor(Math.random() * 9000 + 1000);

  teachers: Teacher[] = [
    { id: 1, name: 'Ana García López', role: 'Tutora 1ºESO A', initials: 'AG', color: '#1565c0', available: true, specialty: 'Tutora de grupo' },
    { id: 2, name: 'Carlos Martín', role: 'Orientador', initials: 'CM', color: '#00897b', available: true, specialty: 'Orientación educativa' },
    { id: 3, name: 'María Sánchez', role: 'Mediadora de Entorno Seguro', initials: 'MS', color: '#6d4c41', available: true, specialty: 'Protocolo anti-acoso' },
    { id: 4, name: 'Pedro Ruiz', role: 'Tutor 2ºESO B', initials: 'PR', color: '#4a148c', available: false, specialty: 'Tutor de grupo' },
    { id: 5, name: 'Laura Jiménez', role: 'Psicóloga del centro', initials: 'LJ', color: '#c62828', available: true, specialty: 'Psicología escolar' },
    { id: 6, name: 'Antonio López', role: 'Educador Social', initials: 'AL', color: '#e65100', available: true, specialty: 'Trabajo social' },
  ];

  messages: Message[] = [
    {
      text: '🔒 Chat iniciado de forma anónima. Tu identidad está protegida mediante cifrado E2E. Solo el docente seleccionado puede leer estos mensajes.',
      fromMe: false,
      time: '',
      type: 'system'
    }
  ];

  selectTeacher(teacher: Teacher) {
    if (!teacher.available) return;
    this.selectedTeacher = teacher;
    const hour = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    this.messages = [
      {
        text: `🔒 Chat iniciado de forma anónima. Tu identidad está protegida. Has elegido hablar con ${teacher.name} (${teacher.role}).`,
        fromMe: false,
        time: '',
        type: 'system'
      },
      {
        text: `Hola. Soy ${teacher.name}. Este es un espacio completamente seguro. Cuéntame qué está pasando, te escucho sin juzgarte.`,
        fromMe: false,
        time: hour
      }
    ];
  }

  sendMessage() {
    if (!this.newMessage.trim() && !this.attachmentName) return;
    const hour = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage.trim(), fromMe: true, time: hour });
    }

    const userMsg = this.newMessage.trim().toLowerCase();
    this.newMessage = '';
    this.attachmentName = '';

    setTimeout(() => {
      const replies = [
        'Gracias por contármelo. Eso que describes suena muy difícil. ¿Desde cuándo lleva pasando esto?',
        'Te escucho. ¿Hay testigos de lo que ocurre? ¿Algún compañero/a que esté presente?',
        'Entiendo cómo te sientes. ¿En qué zonas del centro suele ocurrir esto? ¿El patio, los pasillos?',
        'Estás haciendo lo correcto al contármelo. ¿Quieres que activemos el protocolo de entorno seguro para que pueda intervenir sin que nadie sepa que me lo contaste tú?',
        'Gracias por tu confianza. Para poder ayudarte de la mejor manera posible, ¿podrías contarme quién o quiénes son los que te hacen esto?'
      ];
      const r = replies[Math.floor(Math.random() * replies.length)];
      const t = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      this.messages.push({ text: r, fromMe: false, time: t });
    }, 1200);
  }

  goBack() {
    this.selectedTeacher = null;
    this.messages = [];
    this.newMessage = '';
  }
}
