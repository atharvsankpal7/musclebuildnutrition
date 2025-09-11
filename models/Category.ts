import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  title: string;
  slug: string;
  description: string;
  originalPrice: number;
  discountPrice?: number;
  categoryIds: mongoose.Types.ObjectId[];
  displayImage: string;
  categoryFiles: string[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
  },
  categoryIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
  }],
  displayImage: {
    type: String,
    required: true,
  },
  categoryFiles: [{
    type: String,
    required: true,
  }],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
