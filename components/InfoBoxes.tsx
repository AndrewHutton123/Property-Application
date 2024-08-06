import Link from "next/link";
import React from "react";
import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            description="Find your dream rental property. Bookmark properties and contact owners."
            backgroundColour="bg-gray-600"
            textColour="text-white"
            buttonInfo={{
              text: "Browse Properties",
              link: "/properties",
              backgroundColour: "bg-black",
            }}
          />
          <InfoBox
            heading="For Property Owners"
            description="List your properties and reach potential tenants. Rent as an airbnb or long term."
            backgroundColour="bg-blue-600"
            textColour="text-white"
            buttonInfo={{
              text: "Add Property",
              link: "/properties/add",
              backgroundColour: "bg-blue-800",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
