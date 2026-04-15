import ProductPageLayout from "./ProductPageLayout";

export default function PaniKot() {
  return (
    <ProductPageLayout
      breadcrumb="PAni-KOT"
      title="PAni-KOT Conductive Coating"
      subtitle="PAni-KOT is a ready-to-use conductive Polyaniline based coating developed for solvent-borne systems where Polyaniline Emeraldine Salt is otherwise difficult to formulate."
      description="Because Polyaniline Emeraldine Salt is insoluble in solvents and water, standard formulation is difficult. PAni-KOT provides a practical coating form for use in EMI shielding, radar absorbing coatings, anticorrosive additive systems, and custom development where conductive polymer insertion into solvent-borne systems is required."
      form="Dark green dispersion"
      code="PAni-KOT"
      packSize="500g, 1Kg"
      leadTime="15–20 days worldwide"
      specs={[
        { label: "Appearance", value: "Dark green dispersion" },
        { label: "Solid Content", value: "10% ± 1% Polyaniline" },
        { label: "Particle Size", value: "< 500 nm" },
        { label: "Type", value: "Ready-to-use conductive coating" },
        { label: "System", value: "Solvent-borne" },
        { label: "Processing", value: "Application-ready" },
      ]}
      highlights={[
        "Ready-to-use conductive coating format.",
        "Developed for solvent-borne integration.",
        "Suitable where formulation with Emeraldine Salt is otherwise difficult.",
        "Useful for both direct application and custom development work.",
      ]}
      applications={[
        "EMI shielding coating",
        "Radar absorbing coating",
        "Anticorrosive additive for paint systems",
        "Custom solvent-borne conductive applications",
      ]}
    />
  );
}