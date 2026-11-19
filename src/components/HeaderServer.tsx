import Header from "@/components/Header";
import { getNav } from "@/lib/cms";

/** Coquille serveur : la navigation vient de la base (repli sur le contenu embarqué). */
export default async function HeaderServer() {
  const nav = await getNav("header");
  return <Header nav={nav} />;
}
