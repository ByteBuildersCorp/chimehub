import Mongoose, {Schema, Document} from "mongoose";


export interface Message extends Document {
  content: string,
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

export interface User extends Document {
  email: string;
  username: string;
  password: string;
  verificationCode: string;
  verificationCodeExpires: Date;
  IsUserCodeIsVerified: boolean;
  IsUserAcceptingMessages: boolean;
  Messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],

  },
  verificationCode: {
    required: [true,"Verification Code is required"],
  },
  verificationCodeExpires: {
    type: Date,
    required: [true, "Verification Code is required"],
  },
  IsUserCodeIsVerified:{
    type: Boolean,
    default: false
  },
  IsUserAcceptingMessages: {
    type: Boolean,
    default: true
  },
  Messages: [MessageSchema]
})
 const UserModel = (Mongoose.models.User as Mongoose.Model<User>)|| Mongoose.model<User>("User", UserSchema);

export default UserModel;
