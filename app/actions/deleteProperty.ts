"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId: string) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId is required");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property Not Found");
  }

  //Verify owenership

  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorised");
  }

  //Extract public id from image URLs

  const publicIds = property.images.map((imageUrl: string) => {
    const imageUrlId: any = imageUrl.split("/");

    return imageUrlId.at(-1).split(".").at(0);
  });

  //Delete images from cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("propertypulse/" + publicId);
    }
  }

  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
