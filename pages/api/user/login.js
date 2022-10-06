import connectMongoDb from "../../../utils/connectMongoDb";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const KEY = process.env.JWT_KEY;

export default async function Login(req, res) {
	if (req.method === "POST") {
		try {
			await connectMongoDb();
			const { email, password } = req.body;
			const user = await User.findOne({ email });

			if (!user) return res.status(400).json("User not found!");

			const validatePassword = await bcrypt.compare(
				password,
				user.password
			);
			if (!validatePassword)
				return res.status(400).json("Password is wrong!");

			const payload = {
				id: user._id,
				email: user.email,
				createdAt: user.createdAt,
			};

			const token = jwt.sign(payload, KEY);

			res.status(200).json(token);
		} catch (error) {
			res.status(500).json(error);
		}
	}
}
