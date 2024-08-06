import Link from "next/link";
import React from "react";

type InfoBoxProps = {
  heading: string;
  description: string;
  textColour: string;
  backgroundColour: string;
  buttonInfo: {
    text: string;
    link: string;
    backgroundColour: string;
  };
};

const InfoBox = ({
  description,
  heading,
  textColour = "text-gray-800",
  backgroundColour = "bg-gray-100",
  buttonInfo,
}: InfoBoxProps) => {
  return (
    <div className={`${backgroundColour} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColour} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColour} mt-2 mb-4`}>{description}</p>
      <Link
        href={buttonInfo.link}
        className={`${buttonInfo.backgroundColour} inline-block text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
