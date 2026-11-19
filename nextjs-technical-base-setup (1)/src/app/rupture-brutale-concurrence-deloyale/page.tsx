import type { Metadata } from "next";
import ExpertisePage from "@/components/ExpertisePage";
import { buildPageMetadata } from "@/lib/seo";
import { EXPERTISE_PAGE_CONTENT } from "@/content/expertise-pages";

const ENTRY = EXPERTISE_PAGE_CONTENT["rupture-brutale-concurrence-deloyale"];

export const metadata: Metadata = buildPageMetadata({
  title: ENTRY.title,
  description: ENTRY.description,
  path: ENTRY.path,
  type: "article",
});

export default function Page() {
  return <ExpertisePage data={ENTRY.data} />;
}
