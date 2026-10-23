/** Renders one of the ornament SVG strings from lib/art.ts. */
export function Svg({ html, className }: { html: string; className?: string }) {
  return <span className={className} style={className ? undefined : { display: "contents" }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />;
}
