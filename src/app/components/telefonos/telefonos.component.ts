import { Component } from '@angular/core';

interface Contact {
  name: string;
  number: string;
  desc: string;
  icon: string;
  color: string;
  bg: string;
  available: string;
  who: string;
  urgent: boolean;
}

@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.css']
})
export class TelefonosComponent {
  contacts: Contact[] = [
    {
      name: 'INCIBE · Línea de Ayuda en Ciberseguridad',
      number: '017',
      desc: 'Para problemas de ciberacoso, seguridad en internet y ayuda ante cualquier amenaza o acoso digital. Gratuito, confidencial y disponible todos los días.',
      icon: '💻',
      color: '#1565c0',
      bg: '#e3f2fd',
      available: '9:00 – 21:00 · Lun a Dom',
      who: 'Menores, familias y docentes',
      urgent: true
    },
    {
      name: 'Ministerio de Educación',
      number: '900 018 018',
      desc: 'Línea nacional contra el acoso escolar del Ministerio de Educación. Atención especializada para casos de bullying en centros educativos.',
      icon: '🏫',
      color: '#00897b',
      bg: '#e0f2f1',
      available: 'Horario de oficina',
      who: 'Alumnos, familias y centros',
      urgent: true
    },
    {
      name: 'ANAR · Ayuda a Niños y Adolescentes en Riesgo',
      number: '116 111',
      desc: 'Teléfono de emergencias para menores. También dispone de chat en su web. Atención psicológica inmediata y orientación en situaciones de riesgo.',
      icon: '🧡',
      color: '#e65100',
      bg: '#fff3e0',
      available: '24h · 365 días',
      who: 'Menores en situación de riesgo',
      urgent: true
    },
    {
      name: 'Teléfono de Emergencias',
      number: '112',
      desc: 'Si hay una amenaza inmediata a la integridad física. Llama al 112 si tú o alguien que conoces está en peligro real en este momento.',
      icon: '🚨',
      color: '#c62828',
      bg: '#ffebee',
      available: '24h · 365 días',
      who: 'Cualquier situación de emergencia',
      urgent: true
    },
    {
      name: 'Policía Nacional',
      number: '091',
      desc: 'Denuncia de delitos de acoso, amenazas, agresiones y delitos informáticos. Unidad de Delitos Telemáticos especializada en menores.',
      icon: '🚔',
      color: '#1a237e',
      bg: '#e8eaf6',
      available: '24h · 365 días',
      who: 'Delitos penales de acoso',
      urgent: false
    },
    {
      name: 'Guardia Civil',
      number: '062',
      desc: 'Denuncia de casos graves en zonas rurales. Equipo EMUME (especialistas en menores y mujeres) para casos de acoso y ciberdelitos.',
      icon: '⚔️',
      color: '#37474f',
      bg: '#eceff1',
      available: '24h · 365 días',
      who: 'Zonas rurales y provincias',
      urgent: false
    },
    {
      name: 'Fiscalía de Menores',
      number: 'Web oficial',
      desc: 'Para casos graves que requieran intervención jurídica. La Fiscalía puede abrir diligencias de oficio contra el centro si hay inacción ante denuncias previas.',
      icon: '⚖️',
      color: '#4a148c',
      bg: '#f3e5f5',
      available: 'Horario judicial',
      who: 'Casos con implicación legal',
      urgent: false
    },
    {
      name: 'Inspección Educativa · Extremadura',
      number: '924 007 800',
      desc: 'Si el centro no actúa ante tus denuncias, la Inspección puede exigir la apertura del protocolo formal e investigar la gestión del centro.',
      icon: '📋',
      color: '#2e7d32',
      bg: '#e8f5e9',
      available: 'Horario laboral',
      who: 'Familias y alumnos de Extremadura',
      urgent: false
    },
  ];

  onlineResources = [
    { name: 'Chat ANAR', url: 'anar.org', icon: '💬', desc: 'Chat online con especialistas en menores' },
    { name: 'Is it OK?', url: 'isitok.es', icon: '🌐', desc: 'Plataforma de ayuda a jóvenes en riesgo' },
    { name: 'Pantallas Amigas', url: 'pantallasamigas.net', icon: '📱', desc: 'Recursos sobre seguridad digital para menores' },
    { name: 'Stop Bullying', url: 'stopbullying.gov (EEUU)', icon: '🛑', desc: 'Recursos internacionales de referencia' },
  ];
}
