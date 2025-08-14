import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from "bcrypt";

export interface IAdmin extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role: 'owner' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminSchema: Schema<IAdmin> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['owner', 'admin'],
      default: 'admin',
    },
    isActive: {
       type: Boolean,
       default: true,
    },
  },
  { timestamps: true }
);

AdminSchema.pre<IAdmin>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


AdminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};


export const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);
