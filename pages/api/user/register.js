import connectMongoDb from "../../../utils/connectMongoDb";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";

const validateEmail = (email) => {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};

export default async function registerUser(req, res) {
	if (req.method === "POST") {
		try {
			await connectMongoDb();
			const { username, email, password } = req.body;

			if (!username || username.length < 3 || username.length > 15) {
				return res
					.status(400)
					.json(
						"Username is reqired and must be more than 3 and less than 15 character!"
					);
			}

			if (!email || !validateEmail(email)) {
				return res
					.status(400)
					.json("Email is reqired and must be valid Email address");
			}

			if (!password || password.length < 6 || password.length > 15) {
				return res
					.status(400)
					.json(
						"Password is reqired and must be more than 6 and less than 15 character!"
					);
			}

			const salt = await bcrypt.genSalt(10);
			const cashedPass = await bcrypt.hash(password, salt);

			const userData = { username, email, password: cashedPass };

			const newUser = new User(userData);

			const user = await newUser.save();

			return res.status(200).json("User has been created!");
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}
