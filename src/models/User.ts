import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 4, select: false },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export type UserAttrs = InferSchemaType<typeof UserSchema>;
export type UserDoc = HydratedDocument<UserAttrs>;

const User = mongoose.model("User", UserSchema);

export default User;
