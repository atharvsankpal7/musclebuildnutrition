import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  originalPrice: number;
  discountPrice?: number;
  categoryIds: mongoose.Types.ObjectId[]; // Up to 8 categories
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
  categoryIds: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    required: true,
    validate: {
      validator: function (categories: mongoose.Types.ObjectId[]) {
        return Array.isArray(categories) && categories.length > 0 && categories.length <= 8;
      },
      message: 'A product must have 1-8 categories',
    },
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