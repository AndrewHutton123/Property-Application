import React from "react";
import PropertyCard from "@/components/PropertyCard";
import { getSessionUser } from "@/utils/getSessionUser";
import { PropertyModel } from "@/models/property";
import User from "@/models/user";

const SavedPropertiesPage = async () => {
  const sessionUser = await getSessionUser();

  const { bookmarks } = await User.findById(sessionUser?.userId).populate(
    "bookmarks"
  );
  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No Saved Properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property: PropertyModel) => (
              <PropertyCard property={property} key={property._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
