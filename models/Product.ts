import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  originalPrice: number;
  discountPrice?: number;
  displayImage: string;
  productFiles: string[];
  isFeatured: boolean;
  isActive: boolean;
  isHotDeal: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<any>({
  title: {
    type: String,
    required: true,
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

  displayImage: {
    type: String,
    required: true,
  },
  productFiles: [{
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
  isHotDeal: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model<any>('Product', ProductSchema);