import React from "react";
import connectDB from "@/config/database";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Property from "@/models/property";

type PageProps = {
  searchParams: {
    location: string;
    propertyType: string;
  };
};

const SearchResultsPage = async ({ searchParams }: PageProps) => {
  await connectDB();

  const locationPattern = new RegExp(searchParams.location, "i");

  let query: any = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  if (searchParams.propertyType && searchParams.propertyType !== "All") {
    const typePattern = new RegExp(searchParams.propertyType, "i");

    query.type = typePattern;
  }

  const properties = await Property.find(query);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back To Properties
          </Link>
          <h1 className="text 2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>No Search Results</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
