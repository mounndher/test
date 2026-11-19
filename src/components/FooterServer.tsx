import Footer from "@/components/Footer";
import { getNav } from "@/lib/cms";

/** Coquille serveur : les trois colonnes du pied de page viennent de la base. */
export default async function FooterServer() {
  const [nav, expertises, info] = await Promise.all([
    getNav("footer-nav"),
    getNav("footer-expertises"),
    getNav("footer-info"),
  ]);
  return (
    <Footer
      columns={[
        { title: "Navigation", items: nav },
        { title: "Expertises", items: expertises },
        { title: "Informations", items: info },
      ]}
    />
  );
}
