import { Inngest } from "inngest";
import User from "../models/user.js";
import connectDB from "../configs/db.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Ingest Function to  save a user date in a database

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    return step.run("Create user from Clerk", async () => {
      try {
        await connectDB();
        const { id, first_name, last_name, email_addresses, image_url } = event.data;

        if (!email_addresses?.[0]?.email_address) {
          throw new Error("Missing email address in event data");
        }

        const userData = {
          _id: id,
          email: email_addresses[0].email_address,
          name: `${first_name ?? ""} ${last_name ?? ""}`,
          image: image_url
        };

        await User.create(userData);
        return { status: "created" };
      } catch (err) {
        console.error("Create failed:", err);
        throw err;
      }
    });
  }
);

// Inngest function to delete user from database

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    return step.run("Delete user from Clerk", async () => {
      try {
        await connectDB();
        const { id } = event.data;
        await User.findByIdAndDelete(id);
        return { status: "deleted" };
      } catch (err) {
        console.error("Delete failed:", err);
        throw err;
      }
    });
  }
);

// Inngest function to update user from database

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event, step }) => {
    return step.run("Update user from Clerk", async () => {
      try {
        await connectDB();
        const { id, first_name, last_name, email_addresses, image_url } = event.data;

        if (!email_addresses?.[0]?.email_address) {
          throw new Error("Missing email address in event data");
        }

        const userData = {
          _id: id,
          email: email_addresses[0].email_address,
          name: `${first_name ?? ""} ${last_name ?? ""}`,
          image: image_url
        };

        await User.findByIdAndUpdate(id, userData, { upsert: true });
        return { status: "updated" };
      } catch (err) {
        console.error("Update failed:", err);
        throw err;
      }
    });
  }
);



// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation
];