import ProductPageLayout from "./ProductPageLayout";

export default function PaniEB() {
  return (
    <ProductPageLayout
      breadcrumb="PANI-EB"
      title="Polyaniline Emeraldine Base"
      subtitle="Polyaniline Emeraldine Base is a conjugated, non-conducting polymer produced by neutralizing the Emeraldine Salt form."
      description="This product is used for manufacturing ultrafine dispersions of Polyaniline and ES forms with different counter ions. It is supplied as a dark blue powder and serves as an important base material for advanced conductive polymer processing and formulation work."
      form="Dark blue powder"
      code="PANI-EB"
      packSize="25g, 50g, 100g, 250g, 500g, 1Kg"
      leadTime="10–15 days worldwide"
      specs={[
        { label: "CAS No.", value: "25233-30-1" },
        { label: "Color", value: "Dark blue powder" },
        { label: "Conductivity", value: "Non-conducting" },
        { label: "Type", value: "Conjugated polymer" },
        { label: "Primary Use", value: "Ultrafine dispersion manufacturing" },
        { label: "Supply Form", value: "Powder" },
      ]}
      highlights={[
        "Useful as a base form for conductive polymer formulation work.",
        "Supports development of ultrafine dispersions.",
        "Suitable for ES forms with different counter ions.",
        "Good fit for R&D and specialized industrial processing.",
      ]}
      applications={[
        "Ultrafine dispersion development",
        "Conductive polymer research",
        "Formulation work for specialized systems",
        "Material science experimentation",
      ]}
      accent="green"
      buttonShape="rectangle" // ✅ this is correct
    />
  );
}