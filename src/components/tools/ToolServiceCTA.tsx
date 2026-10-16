import { toolFunnels, toolContactUrl, type ToolId } from '../../data/toolFunnels';
export default function ToolServiceCTA({ tool }: { tool: ToolId }) {
 const item = toolFunnels[tool];
 return <section id={`tool-next-${tool}`} className="tool-conversion" aria-label="Tu siguiente paso profesional">
  <div className="tf-mark" aria-hidden="true">↗</div>
  <div className="tf-content"><p className="tf-eyebrow">TU SIGUIENTE PASO / {item.label}</p>
  <h3>{item.title}</h3><p className="tf-copy">{item.copy}</p>
  <a className="tf-primary" href={toolContactUrl(tool)} data-tool-funnel={tool} data-tool-service={item.interest}>Consultar disponibilidad <span aria-hidden="true">↗</span></a>
  <a className="tf-details" href={item.service}>Ver qué incluye el servicio →</a>
  <p className="tf-note">Primero confirmamos alcance, valor y disponibilidad. Enviar una consulta no confirma una cita ni realiza un cobro.</p></div>
 </section>;
}
