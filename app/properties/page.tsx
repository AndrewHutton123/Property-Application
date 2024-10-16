import React from "react";
import connectDB from "@/config/database";
import Property, { PropertyModel } from "@/models/property";
import PropertyCard from "@/components/PropertyCard";
import Pagination from "@/components/Pagination";

type PageProps = {
  searchParams: {
    page: number;
    pageSize: number;
  };
};

const PropertiesPage = async ({ searchParams }: PageProps) => {
  await connectDB();

  searchParams.page = 1;
  searchParams.pageSize = 10;

  const skip = (searchParams.page - 1) * searchParams.pageSize;

  const totalPages = await Property.countDocuments({});

  const properties: PropertyModel[] = await Property.find({})
    .skip(skip)
    .limit(searchParams.pageSize);

  const showPagination = totalPages > searchParams.pageSize;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p> No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {showPagination && (
          <Pagination
            pageParams={{ ...searchParams, totalItems: totalPages }}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
