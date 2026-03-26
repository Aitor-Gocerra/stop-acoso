import { Component } from '@angular/core';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent {
  activeTab: 'alumnos' | 'familias' | 'docentes' | 'protocolo' | 'videos' = 'alumnos';

  alumnoResources = [
    { icon: '🛡️', title: 'Guía de Ciberseguridad', desc: 'Cómo gestionar tu privacidad en redes sociales y proteger tus datos personales online.', type: 'Guía PDF', color: '#1565c0' },
    { icon: '📱', title: 'Sexting y Grooming', desc: 'Qué hacer si recibes contenido inapropiado o alguien intenta manipularte online.', type: 'Guía PDF', color: '#c62828' },
    { icon: '🔇', title: 'Cómo silenciar a un acosador', desc: 'Pasos para bloquear, denunciar y silenciar en todas las plataformas: TikTok, Instagram, WhatsApp.', type: 'Tutorial', color: '#00897b' },
    { icon: '📸', title: 'Cómo reportar contenido', desc: 'Instrucciones para denunciar fotos, vídeos o mensajes inapropiados en cada red social.', type: 'Tutorial', color: '#ef6c00' },
    { icon: '⚖️', title: 'Tus derechos como menor', desc: 'Lo que la ley protege en casos de acoso. Hablar no es chivarse, es ejercer tu derecho.', type: 'Legal', color: '#4a148c' },
    { icon: '💪', title: 'Cómo pedir ayuda', desc: 'Guía paso a paso para hablar con un adulto de confianza cuando sientes que no puedes más.', type: 'Guía', color: '#2e7d32' },
  ];

  familiaResources = [
    { icon: '🔍', title: 'Señales de alerta en casa', desc: 'Cómo detectar cambios de comportamiento: evitar el colegio, tristeza, problemas para dormir.', type: 'Guía', color: '#1565c0' },
    { icon: '📝', title: 'Modelo de escrito para el centro', desc: 'Plantilla para presentar una denuncia formal ante la dirección del centro educativo.', type: 'Plantilla', color: '#c62828' },
    { icon: '📋', title: 'Normativa y responsabilidad civil', desc: 'Los centros educativos tienen obligación de actuar. Conoce qué puedes exigirles legalmente.', type: 'Legal', color: '#ef6c00' },
    { icon: '🤝', title: 'Cómo hablar con tu hijo/a', desc: 'Técnicas de comunicación para que el menor se sienta seguro al contarte lo que pasa.', type: 'Guía', color: '#2e7d32' },
  ];

  docenteResources = [
    { icon: '🧠', title: 'Psicología del adolescente', desc: 'Artículos sobre desarrollo emocional, grupos de iguales y conducta disruptiva en el aula.', type: 'Artículo', color: '#1565c0' },
    { icon: '💻', title: 'Nuevas formas de ciberacoso', desc: 'Ghosting, exclusión digital, deepfakes y otras modalidades de acoso que debes conocer.', type: 'Artículo', color: '#c62828' },
    { icon: '🎭', title: 'Dinámicas de convivencia', desc: 'Actividades prácticas para mejorar la cohesión del grupo y detectar exclusiones en el aula.', type: 'Actividad', color: '#00897b' },
    { icon: '📊', title: 'Indicadores de detección temprana', desc: 'Checklist para identificar posibles víctimas o agresores en las primeras semanas de curso.', type: 'Herramienta', color: '#ef6c00' },
    { icon: '🖥️', title: 'Manual de uso de la plataforma', desc: 'Cómo gestionar el panel de docente, responder casos anónimos y activar el protocolo.', type: 'Manual', color: '#4a148c' },
  ];

  protocols = [
    { num: '1', phase: 'Fase de Indicios', desc: 'Al recibir el mensaje anónimo, el tutor realiza pesquisas discretas: observación del patio, pasillos y zonas mencionadas.', icon: '👁️' },
    { num: '2', phase: 'Apertura del Expediente', desc: 'Si hay indicios fundados, el director/a inicia el protocolo formal. El centro tiene 48h para responder. Interviene el orientador/a.', icon: '📂' },
    { num: '3', phase: 'Medidas Cautelares', desc: 'Protección inmediata de la víctima: cambios de clase o grupo, vigilancia reforzada en recreos, separación provisional del agresor.', icon: '🛡️' },
    { num: '4', phase: 'Investigación', desc: 'Entrevistas por separado con víctima, agresor y testigos. Recogida de evidencias (capturas, mensajes). Informe técnico.', icon: '🔍' },
    { num: '5', phase: 'Resolución', desc: 'Medidas disciplinarias al agresor. Plan de apoyo psicológico a la víctima. Comunicación a las familias. Seguimiento mensual.', icon: '✅' },
    { num: '6', phase: 'Seguimiento', desc: 'Revisión del caso a los 30, 60 y 90 días. Si la situación persiste, derivación a Inspección Educativa o Fiscalía de Menores.', icon: '📅' },
  ];

  videos = [
    { title: 'El testimonio de Kira', duration: '3:24', type: 'Sensibilización', icon: '🎬', desc: 'Historia real sobre las consecuencias del silencio institucional ante el acoso.' },
    { title: 'Cómo usar el chat anónimo', duration: '1:45', type: 'Tutorial', icon: '📱', desc: 'Guía rápida para iniciar tu primera conversación anónima en Stop Acoso.' },
    { title: '¿Qué es el ciberacoso?', duration: '2:30', type: 'Educativo', icon: '💻', desc: 'Explicación clara sobre las formas de acoso digital y cómo identificarlas.' },
    { title: 'El código del silencio', duration: '4:10', type: 'Sensibilización', icon: '🎭', desc: 'Por qué las víctimas no hablan y cómo la plataforma rompe esa barrera.' },
    { title: 'Webinar para padres', duration: '45:00', type: 'Webinar', icon: '👨‍👩‍👧', desc: 'Expertos en psicología educativa y Guardia Civil hablan sobre ciberacoso.' },
    { title: 'Protocolo explicado en 60 segundos', duration: '1:00', type: 'Tutorial', icon: '⚡', desc: 'El proceso completo desde la denuncia hasta la resolución del caso.' },
  ];
}
