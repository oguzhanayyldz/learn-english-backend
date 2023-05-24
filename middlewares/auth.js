import bcrypt from "bcrypt";
import User from "../models/user.js";

export const basicAuth = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const auth = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
		const username = auth[0];
		const password = auth[1];
		let user = await User.findOne({ username }).select("+password");
		if (user && (await bcrypt.compare(password, user.password))) {
			user = JSON.parse(JSON.stringify(user));
			delete user.password;
			req.user = user;
			next();
		} else {
			res.status(401).send("Invalid username or password");
		}
	} else {
		res.status(401).send("Missing authorization header");
	}
};
