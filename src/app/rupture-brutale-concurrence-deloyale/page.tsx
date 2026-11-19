import type { Metadata } from "next";
import ExpertisePage from "@/components/ExpertisePage";
import { buildPageMetadata } from "@/lib/seo";
import { EXPERTISE_PAGE_CONTENT } from "@/content/expertise-pages";
import { getExpertise, getPageByPath } from "@/lib/cms";

const FALLBACK = EXPERTISE_PAGE_CONTENT["rupture-brutale-concurrence-deloyale"];
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByPath(FALLBACK.path);
  return buildPageMetadata({
    title: page?.title ?? FALLBACK.title,
    description: page?.description ?? FALLBACK.description,
    path: FALLBACK.path,
    type: "article",
    noindex: page?.noindex ?? false,
  });
}

export default async function Page() {
  const expertise = await getExpertise("rupture-brutale-concurrence-deloyale");
  return <ExpertisePage data={expertise ?? FALLBACK.data} />;
}
