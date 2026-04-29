import { Component } from '@angular/core';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent {
  activeTab: 'alumnos' | 'familias' | 'docentes' | 'protocolo' | 'videos' = 'alumnos';

  alumnoResources = [
    { icon: '🛡️', title: 'Guía de Ciberseguridad «Navega Seguro»', desc: 'Cómo gestionar tu privacidad en redes sociales y proteger tus datos personales online.', type: 'Guía PDF', color: '#1565c0', url: 'https://www.incibe.es/menores/educadores/ciberseguridad' },
    { icon: '📱', title: 'Gestión de Privacidad en Redes Sociales', desc: 'Qué hacer si recibes contenido inapropiado o alguien intenta manipularte online.', type: 'Guía PDF', color: '#c62828', url: 'https://www.incibe.es/sites/default/files/contenidos/materiales/Campanas/is4k-guia-rrss.pdf' },
    { icon: '🔇', title: 'Protocolo de Actuación ante Sexting y Grooming', desc: 'Pasos para bloquear, denunciar y silenciar en todas las plataformas: TikTok, Instagram, WhatsApp.', type: 'Tutorial', color: '#00897b', url: 'https://www.incibe.es/menores/tematicas/sexting' },
    { icon: '📸', title: 'Cómo reportar contenido', desc: 'Instrucciones para denunciar fotos, vídeos o mensajes inapropiados en cada red social.', type: 'Tutorial', color: '#ef6c00', url: 'https://www.incibe.es/menores/temas-interes/ciberacoso' },
    { icon: '⚖️', title: 'Tus derechos como menor', desc: 'Lo que la ley protege en casos de acoso. Hablar no es chivarse, es ejercer tu derecho.', type: 'Legal', color: '#4a148c', url: 'https://www.savethechildren.es/actualidad/stopacoso' },
    { icon: '💪', title: 'Cómo pedir ayuda', desc: 'Guía paso a paso para hablar con un adulto de confianza cuando sientes que no puedes más.', type: 'Guía', color: '#2e7d32', url: 'https://www.anar.org/' },
  ];

  familiaResources = [
    { icon: '🔍', title: 'Guía de Observación en el Hogar', desc: 'Cómo detectar cambios de comportamiento: evitar el colegio, tristeza, problemas para dormir.', type: 'Guía', color: '#1565c0', url: 'https://www.anar.org/wp-content/uploads/2021/12/MANUAL_PADRES_Y_PROFESORES_ACOSO.pdf' },
    { icon: '📝', title: 'Modelos de Escritos', desc: 'Plantilla para presentar una denuncia formal ante la dirección del centro educativo.', type: 'Plantilla', color: '#c62828', url: 'https://www.aepd.es/canalprioritario' },
    { icon: '📋', title: 'Dossier de Normativa Vigente', desc: 'Los centros educativos tienen obligación de actuar. Conoce qué puedes exigirles legalmente.', type: 'Legal', color: '#ef6c00', url: 'https://www.incibe.es/menores/tematicas/ciberacoso' },
    { icon: '🤝', title: 'Webinars con Expertos', desc: 'Técnicas de comunicación para que el menor se sienta seguro al contarte lo que pasa.', type: 'Webinar', color: '#2e7d32', url: 'https://www.incibe.es/menores/familias/formacion' },
  ];

  docenteResources = [
    { icon: '🧠', title: 'Artículos de Especialización (Psicología y Anonimato)', desc: 'Artículos sobre desarrollo emocional, grupos de iguales y conducta disruptiva en el aula.', type: 'Artículo', color: '#1565c0', url: 'https://www.anar.org/' },
    { icon: '💻', title: 'Nuevas Formas de Acoso Digital', desc: 'Ghosting, exclusión digital, deepfakes y otras modalidades de acoso que debes conocer.', type: 'Artículo', color: '#c62828', url: 'https://intef.es/' },
    { icon: '🎭', title: 'Dinámicas de Convivencia', desc: 'Actividades prácticas para mejorar la cohesión del grupo y detectar exclusiones en el aula.', type: 'Actividad', color: '#00897b', url: 'https://www.educacionfpydeportes.gob.es/mc/sgctie/convivencia-escolar.html' },
    { icon: '📊', title: 'Indicadores de detección temprana', desc: 'Checklist para identificar posibles víctimas o agresores en las primeras semanas de curso.', type: 'Herramienta', color: '#ef6c00', url: 'https://convivencia.educacion.gob.es/portada.html' },
    { icon: '🖥️', title: 'Manual de uso de la plataforma', desc: 'Cómo gestionar el panel de docente, responder casos anónimos y activar el protocolo.', type: 'Manual', color: '#4a148c', url: 'https://drive.google.com/file/d/1D9_EzJCFYgSNZKPeaFnSE2iet751eDQB/view' },
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
    { title: 'Canal de la Policía Nacional (TikTok)', duration: '0:45', type: 'Sensibilización', icon: '🎬', desc: 'Referente en España por usar un lenguaje directo y moderno para prevenir el acoso y delitos en red.', url: 'https://www.tiktok.com/@policia/video/7621256018697129238' },
    { title: 'Campaña «Tú eres el mejor cortafuegos» (INCIBE)', duration: '1:30', type: 'Sensibilización', icon: '🛡️', desc: 'Vídeos cortos y directos diseñados para que el alumnado empatice con la ciberseguridad.', url: 'https://www.incibe.es/menores/materiales/material-audiovisual-de-is4k' },
    { title: 'Guías Rápidas de Configuración de Privacidad (IS4K)', duration: '2:00', type: 'Tutorial', icon: '📱', desc: 'Manuales visuales sobre cómo silenciar a acosadores y reportar contenido en Instagram, TikTok y WhatsApp.', url: 'https://www.incibe.es/sites/default/files/contenidos/materiales/Campanas/is4k-guia-rrss.pdf' },
    { title: 'Video-Tutoriales de la AEPD', duration: '3:15', type: 'Tutorial', icon: '💻', desc: 'Guías paso a paso sobre el derecho al olvido y cómo denunciar contenido sensible.', url: 'https://www.aepd.es/areas-de-actuacion/internet-y-redes-sociales/derecho-al-olvido' },
    { title: 'Jornadas para Familias de INCIBE-IS4K', duration: '45:00', type: 'Webinar', icon: '👨‍👩‍👧', desc: 'Charlas grabadas con expertos sobre mediación parental y riesgos digitales.', url: 'https://www.incibe.es/menores/familias/formacion' },
    { title: 'Fundación ANAR - Centro de Formación', duration: '30:00', type: 'Webinar', icon: '🎓', desc: 'Contenido especializado en psicología del adolescente y detección precoz de maltrato.', url: 'https://www.anar.org/unete-a-nosotros/formacion-de-las-lineas-de-ayuda-anar/' },
  ];

  openResource(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
