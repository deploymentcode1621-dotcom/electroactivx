import ProductPageLayout from "./ProductPageLayout";

export default function OrmeconAL() {
  return (
    <ProductPageLayout
      breadcrumb="ORMECON AL"
      title="ORMECON AL Primer"
      subtitle="ORMECON AL is an Organic Metal primer formulated for light metals such as aluminum, magnesium, and galvanized steel surfaces."
      description="This primer is developed for excellent bonding on light metal surfaces. The Organic Metal component helps passivate and ennoble the substrate, enabling strong corrosion protection performance in demanding industrial environments."
      
      form="Primer coating system"
      code="ORMECON AL"
      packSize="As per requirement"
      leadTime="On enquiry"

      specs={[
        { label: "Product Type", value: "Organic Metal primer" },
        { label: "Target Substrates", value: "Aluminum, magnesium, galvanized steel" },
        { label: "Function", value: "Passivation + corrosion protection" },
        { label: "Bonding", value: "Exceptional light-metal bonding" },
        { label: "Recommended Use", value: "With top coat system" },
        { label: "Industrial Role", value: "Protective primer layer" },
      ]}

      highlights={[
        "Developed for light metals and galvanized surfaces.",
        "Improves corrosion resistance through substrate passivation.",
        "Strong bonding across demanding metal applications.",
        "Suitable as part of a complete industrial coating build.",
      ]}

      applications={[
        "Aluminum surface protection",
        "Galvanized steel systems",
        "Magnesium component protection",
        "Industrial anti-corrosion coating workflows",
      ]}

      /* ✅ Changed accent color to green */
      accent="green"

      /* ✅ Added rectangular button style (make sure your layout supports this) */
      buttonShape="rectangle"
    />
  );
}