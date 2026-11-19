/**
 * Renders a subtle, non-visual HTML comment marker next to client data points
 * that require lawyer verification prior to final production deployment.
 */
export default function AuditComment({ text }: { text: string }) {
  const sanitized = text.replace(/--/g, "—");
  return (
    <span
      hidden
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: `<!-- ${sanitized} -->` }}
    />
  );
}
