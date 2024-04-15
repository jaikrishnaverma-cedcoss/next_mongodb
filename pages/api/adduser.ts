// pages/api/addUser.js

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		try {
			// Extract user data from request body
			const { username, email } = req.body;

			// Connect to MongoDB
			const client = await clientPromise;
			const db = client.db("tracktrack");

			// Insert user into the database
			const result = await db
				.collection("users")
				.insertOne({ username, email });

			// Respond with success message
			res.status(201).json({ message: "User added successfully" });
		} catch (error) {
			// Respond with error message
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	} else {
		// Respond with method not allowed error
		res.setHeader("Allow", ["POST"]);
		res.status(405).json({ message: `Method ${req.method} Not Allowed` });
	}
};
