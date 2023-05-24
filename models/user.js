import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: { type: String, unique: true },
		password: { type: String, select: false }
	},
	{
		toJSON: {
			virtuals: true,
			transform: (doc, ret) => {
				delete ret._id;
				delete ret.__v;
			}
		},
		toObject: {
			virtuals: true,
			transform: (doc, ret) => {
				delete ret._id;
				delete ret.__v;
			}
		}
	}
);

userSchema.virtual("id").get(function () {
	return this._id.toHexString();
});


const User = mongoose.model("User", userSchema);

export default User;
