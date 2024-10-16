import React from "react";
import connectDB from "@/config/database";
import Message from "@/models/message";
import "@/models/property";
import { getSessionUser } from "@/utils/getSessionUser";
import MessageCard from "@/components/MessageCard";

const MessagesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  const userId = sessionUser?.userId;

  if (!userId) {
    throw new Error("User Id is required");
  }

  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name");

  const unreadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name");

  const messages = [...unreadMessages, ...readMessages];

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard message={message} key={message._id} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
