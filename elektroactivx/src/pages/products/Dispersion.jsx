import ProductPageLayout from "./ProductPageLayout";

export default function Dispersion() {
  return (
    <ProductPageLayout
      breadcrumb="Dispersion"
      title="Conductive Polymer Dispersion"
      subtitle="Conducting polymers such as Polyaniline have strong potential for industrial and commercial use, but their very high charge density and surface tension make them difficult to disperse and process."
      description="ElektroactivX has developed process-friendly conductive polymer dispersion technology using thermoplastic resin polyaniline blends and masterbatch systems. This enables easier incorporation into solvent systems and polymer compositions, while also supporting improved conductivity in many applications."
      form="Dispersion / process technology"
      code="Technology Platform"
      packSize="Application dependent"
      leadTime="As per requirement"
      specs={[
        { label: "Material Base", value: "Polyaniline" },
        { label: "Particle Form", value: "Nanoscopic dispersed particles" },
        { label: "Typical Size", value: "Around 100 nm" },
        { label: "Processing Benefit", value: "Improved handling and dispersion" },
        { label: "Use Case", value: "Industrial solvent and polymer systems" },
        { label: "Focus", value: "Conductivity + compatibility" },
      ]}
      highlights={[
        "Designed to solve the processing challenge of conductive polymers in industrial systems.",
        "Supports easier incorporation into multiple solvent systems and polymer media.",
        "Useful where both dispersion quality and conductivity matter.",
        "Built around ElektroactivX expertise in processable conductive polymer technology.",
      ]}
      applications={[
        "Anticorrosive additive systems",
        "EMI shielding formulations",
        "Antistatic solutions",
        "Radar absorbing materials",
        "Solid electrolyte capacitor development",
        "Specialized conductive coatings",
      ]}
    />
  );
}