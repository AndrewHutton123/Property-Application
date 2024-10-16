"use server";
import connectDB from "@/config/database";
import User from "@/models/user";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookmarkStatus(propertyId: string): Promise<{
  isBookmarked: boolean;
  error: boolean;
}> {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserIid is required");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  const isBookmarked = user.bookmarks.includes(propertyId);

  return { isBookmarked, error: false };
}

export default checkBookmarkStatus;
