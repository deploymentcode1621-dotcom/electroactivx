import ProductPageLayout from "./ProductPageLayout";

export default function Masterbatch() {
  return (
    <ProductPageLayout
      breadcrumb="Masterbatch"
      title="Polyaniline Masterbatches"
      subtitle="A specialized conductive polyaniline nanoparticle dispersion in thermoplastic material, designed as a highly concentrated predispersion for easier handling and integration."
      description="ElektroactivX offers conductive polyaniline thermoplastic masterbatches such as DISPERSAL-PAni and DISPERST-PAni. The thermoplastic matrix is soluble in aromatics, ketones, esters, glycol ethers, glycol ether acetates, alcohols, and related solvents, enabling fine dispersion of conductive polyaniline across multiple systems."
      form="Dark green powder"
      code="DISPERSAL-PAni / DISPERST-PAni"
      packSize="500g, 1Kg"
      leadTime="15–20 days worldwide"
      specs={[
        { label: "Appearance", value: "Dark green powder" },
        { label: "Polyaniline Content", value: "33% ± 2%" },
        { label: "Conductivity Range", value: "25–50 S/cm" },
        { label: "Format", value: "Predispersion / masterbatch" },
        { label: "Matrix", value: "Thermoplastic resin" },
        { label: "Solvent Compatibility", value: "Broad industrial solvent range" },
      ]}
      highlights={[
        "Highly specialized conductive polymer masterbatch system.",
        "Improves handling of otherwise insoluble polyaniline.",
        "Supports fine dispersion in solvents and other media.",
        "Well suited for industrial formulations and conductive additive systems.",
      ]}
      applications={[
        "Antistatic products",
        "EMI shielding systems",
        "Conductive additives for paints",
        "Solvent-based coatings",
        "Polymer composition development",
      ]}
    />
  );
}