import { Component } from '@angular/core';

interface Case {
  id: string;
  code: string;
  level: 'leve' | 'moderado' | 'grave';
  testScore: number;
  lastMessage: string;
  time: string;
  unread: number;
  status: 'nuevo' | 'activo' | 'resuelto';
}

interface Message {
  text: string;
  fromMe: boolean;
  time: string;
  type?: 'system';
}

@Component({
  selector: 'app-panel-docente',
  templateUrl: './panel-docente.component.html',
  styleUrls: ['./panel-docente.component.css']
})
export class PanelDocenteComponent {
  activeCase: Case | null = null;
  newMessage = '';
  showReportConfirm = false;
  reportSent = false;

  cases: Case[] = [
    {
      id: '1',
      code: 'Usuario-A45',
      level: 'grave',
      testScore: 8,
      lastMessage: 'Me empujan cada día en los pasillos y me han roto la mochila...',
      time: 'Ahora',
      unread: 3,
      status: 'nuevo'
    },
    {
      id: '2',
      code: 'Usuario-B12',
      level: 'moderado',
      testScore: 5,
      lastMessage: 'Me mandan mensajes por WhatsApp diciéndome cosas feas',
      time: 'Hace 15 min',
      unread: 1,
      status: 'activo'
    },
    {
      id: '3',
      code: 'Usuario-C78',
      level: 'leve',
      testScore: 2,
      lastMessage: 'A veces me dejan fuera del grupo de trabajo',
      time: 'Hace 1h',
      unread: 0,
      status: 'activo'
    },
    {
      id: '4',
      code: 'Usuario-D33',
      level: 'grave',
      testScore: 9,
      lastMessage: 'No quiero ir al colegio, tengo miedo cada día...',
      time: 'Ayer',
      unread: 0,
      status: 'resuelto'
    }
  ];

  messagesMap: { [key: string]: Message[] } = {
    '1': [
      { text: '🔒 Caso abierto. Usuario anónimo con nivel GRAVE (test: 8/10). Toda la conversación está cifrada.', fromMe: false, time: '', type: 'system' },
      { text: 'Hola, no sé si debo contar esto pero llevo semanas sin poder dormir de los nervios', fromMe: false, time: '09:14' },
      { text: 'Hola. Estás en un lugar completamente seguro. Cuéntame, te escucho. ¿Qué está pasando?', fromMe: true, time: '09:15' },
      { text: 'Cada vez que paso por los pasillos me empujan a propósito. Ya me han roto la mochila y me quitaron el bocadillo delante de todos', fromMe: false, time: '09:17' },
      { text: 'Me dicen que si lo cuento me va a ir peor', fromMe: false, time: '09:17' },
      { text: 'Eso que describes es acoso físico. Primero que nada, estás haciendo lo correcto al contármelo. Eso requiere mucho valor. ¿Puedes decirme en qué zona del centro ocurre más? ¿El patio, los pasillos...?', fromMe: true, time: '09:20' },
      { text: 'Me empujan en los pasillos de 1º y también en los baños del sótano', fromMe: false, time: '09:21' },
    ],
    '2': [
      { text: '🔒 Caso abierto. Usuario anónimo con nivel MODERADO (test: 5/10).', fromMe: false, time: '', type: 'system' },
      { text: 'Me mandan mensajes por WhatsApp diciéndome cosas feas sobre mi físico. No sé qué hacer', fromMe: false, time: '10:05' },
      { text: '¿Tienes capturas de esos mensajes? Puedes adjuntarlas aquí de forma segura.', fromMe: true, time: '10:08' },
    ],
    '3': [
      { text: '🔒 Caso abierto. Usuario anónimo con nivel LEVE (test: 2/10).', fromMe: false, time: '', type: 'system' },
      { text: 'A veces me dejan fuera del grupo de trabajo y cuando pido unirme me dicen que ya están completos', fromMe: false, time: '11:30' },
    ],
    '4': [
      { text: '🔒 Caso resuelto. Protocolo activado el 15/03/2025. Medidas cautelares aplicadas.', fromMe: false, time: '', type: 'system' },
      { text: 'No quiero ir al colegio, tengo miedo cada día de lo que me pueden hacer', fromMe: false, time: '15/03' },
      { text: 'Caso derivado a dirección. Protocolo de entorno seguro activado.', fromMe: true, time: '15/03' },
    ]
  };

  get activeMessages(): Message[] {
    if (!this.activeCase) return [];
    return this.messagesMap[this.activeCase.id] || [];
  }

  selectCase(c: Case) {
    this.activeCase = c;
    c.unread = 0;
    this.showReportConfirm = false;
    this.reportSent = false;
  }

  sendReply() {
    if (!this.newMessage.trim() || !this.activeCase) return;
    const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    this.messagesMap[this.activeCase.id].push({ text: this.newMessage.trim(), fromMe: true, time });
    this.newMessage = '';
  }

  confirmReport() {
    this.showReportConfirm = true;
  }

  sendReport() {
    this.showReportConfirm = false;
    this.reportSent = true;
    if (this.activeCase) {
      this.activeCase.status = 'resuelto';
      const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      this.messagesMap[this.activeCase.id].push({
        text: '📋 PROTOCOLO ACTIVADO: Se ha enviado una copia cifrada de este caso a la Dirección del centro. Se iniciarán las medidas cautelares de inmediato.',
        fromMe: false,
        time,
        type: 'system'
      });
    }
  }

  getLevelLabel(level: string): string {
    return level === 'grave' ? 'GRAVE' : level === 'moderado' ? 'MODERADO' : 'LEVE';
  }

  getLevelClass(level: string): string {
    return level === 'grave' ? 'badge-red' : level === 'moderado' ? 'badge-yellow' : 'badge-green';
  }
}
