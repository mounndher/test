import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/content/site";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items, currentPath }: { items: Crumb[]; currentPath?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => {
      const href = item.href ?? (i === items.length - 1 ? currentPath : undefined);
      return {
        "@type": "ListItem",
        position: i + 1,
        name: item.label,
        ...(href ? { item: href === "/" ? SITE.url : `${SITE.url}${href}` } : {}),
      };
    }),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Fil d'Ariane">
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {items.map((item, i) => (
            <li key={item.label} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden="true" className="text-mute">
                  /
                </span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="eyebrow link-underline text-mute transition-colors hover:text-navy"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="eyebrow text-navy">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
