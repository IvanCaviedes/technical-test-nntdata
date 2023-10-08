import { CountryService } from '@ntt-data/services/country/country.service';
import { Country } from '@ntt-data/services/country/country.types';

export interface NoteMock {
  id: string;
  titulo: string;
  description: string;
  country: string;
  color: string;
}

export const notes: NoteMock[] = [
  {
    id: '1',
    titulo: 'Reunión de Estrategia',
    description:
      'Discutir la estrategia de marketing para el próximo trimestre y definir los objetivos clave. Analizar los datos del mercado y proponer estrategias de penetración en nuevos segmentos.',
    country: 'Estados Unidos',
    color: 'blue',
  },
  {
    id: '2',
    titulo: 'Investigación de Mercado',
    description:
      'Realizar análisis de mercado detallados para identificar nuevas oportunidades de negocio. Evaluar la competencia y analizar las tendencias del mercado para informar las decisiones estratégicas de la empresa.',
    country: 'Canadá',
    color: 'orange',
  },
  {
    id: '3',
    titulo: 'Desarrollo de Producto Innovador',
    description:
      'Liderar el equipo de desarrollo en la creación de un producto innovador que resuelva problemas reales de los clientes. Realizar investigaciones de usuario, prototipos y pruebas para garantizar la viabilidad del producto en el mercado.',
    country: 'Reino Unido',
    color: 'pink',
  },
  {
    id: '4',
    titulo: 'Presentación de Ventas Estratégicas',
    description:
      'Preparar una presentación de ventas estratégicas para persuadir a los clientes potenciales. Utilizar técnicas de storytelling y demostraciones efectivas para mostrar el valor del producto o servicio ofrecido.',
    country: 'Alemania',
    color: 'teal',
  },
  {
    id: '5',
    titulo: 'Planificación de Evento Corporativo',
    description:
      'Organizar un evento corporativo para celebrar los logros del equipo y fortalecer la colaboración entre departamentos. Coordinar la logística, gestionar proveedores y crear una experiencia memorable para los asistentes.',
    country: 'Francia',
    color: 'red',
  },
  {
    id: '6',
    titulo: 'Optimización de Procesos Internos',
    description:
      'Identificar áreas de mejora en los procesos internos de la empresa. Implementar soluciones eficientes para aumentar la productividad y reducir los costos operativos. Colaborar con equipos interdepartamentales para asegurar una transición fluida.',
    country: 'España',
    color: 'blue',
  },
  {
    id: '7',
    titulo: 'Estrategia de Marketing Digital',
    description:
      'Diseñar una estrategia de marketing digital integral para aumentar la visibilidad de la marca en línea. Utilizar SEO, redes sociales y campañas publicitarias para atraer tráfico de calidad y generar leads.',
    country: 'Italia',
    color: 'orange',
  },
  {
    id: '8',
    titulo: 'Desarrollo de Contenidos Creativos',
    description:
      'Crear contenido creativo y relevante para las plataformas digitales de la empresa. Desarrollar campañas de contenido multimedia, blogs y videos para aumentar la participación del usuario y fortalecer la presencia en línea.',
    country: 'Australia',
    color: 'pink',
  },
  {
    id: '9',
    titulo: 'Gestión de Relaciones con Clientes',
    description:
      'Implementar sistemas de gestión de relaciones con clientes (CRM) para mejorar la interacción con los clientes. Analizar datos de clientes para personalizar las ofertas y proporcionar un servicio excepcional que fomente la fidelidad del cliente.',
    country: 'Japón',
    color: 'teal',
  },
  {
    id: '10',
    titulo: 'Estrategia de Expansión Internacional',
    description:
      'Desarrollar una estrategia de expansión internacional para penetrar nuevos mercados globales. Realizar análisis de mercado, evaluar la competencia y establecer alianzas estratégicas para asegurar el éxito en mercados extranjeros.',
    country: 'China',
    color: 'red',
  },
];
