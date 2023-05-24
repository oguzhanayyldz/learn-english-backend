import mongoose from "mongoose";

const wordSchema = new mongoose.Schema(
	{
		word: { type: String, unique: true},
		successWord: String,
		rate: Number,
		isActive: { type: Boolean, default: true },
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
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

wordSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

const Word = mongoose.model("Word", wordSchema);

export default Word;
