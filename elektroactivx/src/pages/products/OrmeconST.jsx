import ProductPageLayout from "./ProductPageLayout";

export default function OrmeconST() {
  return (
    <ProductPageLayout
      breadcrumb="ORMECON ST"
      title="ORMECON ST Primer"
      subtitle="ORMECON ST is an Organic Metal primer dispersion in a specially formulated conventional lacquer system for iron, steel, and cast iron surfaces."
      description="This primer has strong bonding characteristics on metal surfaces and uses the noble metal properties of the Organic Metal to passivate and ennoble the substrate. That mechanism helps provide superior corrosion protection for industrial metallic infrastructure."
      form="Primer coating system"
      code="ORMECON ST"
      packSize="As per requirement"
      leadTime="On enquiry"
      specs={[
        { label: "Product Type", value: "Organic Metal primer" },
        { label: "Target Substrates", value: "Iron, steel, cast iron" },
        { label: "Function", value: "Passivation + corrosion protection" },
        { label: "Bonding", value: "Exceptional metal bonding" },
        { label: "Recommended Use", value: "With top coat system" },
        { label: "Industrial Role", value: "Protective primer layer" },
      ]}
      highlights={[
        "Designed specifically for ferrous metal protection.",
        "Acts through passivation and substrate ennoblement.",
        "Strong adhesion on iron and steel surfaces.",
        "Best used as part of a multi-layer coating system.",
      ]}
      applications={[
        "Steel infrastructure protection",
        "Industrial metal coating systems",
        "Corrosion prevention programs",
        "Protective coating builds for equipment and structures",
      ]}
    />
  );
}