import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { razorpay, isRazorpayConfigured } from '@/lib/razorpay';

export async function POST(request: NextRequest) {
  try {
    // Check if Razorpay is configured
    if (!isRazorpayConfigured()) {
      return NextResponse.json({ 
        error: 'Payment gateway not configured. Please contact support.' 
      }, { status: 503 });
    }

    await connectDB();
    
    const { email, productId } = await request.json();

    // Validate input
    if (!email || !productId) {
      return NextResponse.json({ error: 'Email and product ID are required' }, { status: 400 });
    }

    // Find verified order
    const order = await Order.findOne({
      email,
      productId,
      status: 'verified',
    }).populate('productId');

    if (!order) {
      return NextResponse.json({ error: 'Order not found or not verified' }, { status: 400 });
    }

    const product = order.productId as any;
    if (!product || !product.isActive) {
      return NextResponse.json({ error: 'Product not found or inactive' }, { status: 404 });
    }

    const amount = (product.discountPrice || product.originalPrice) * 100; // Convert to paisa

    // Create Razorpay order
    const razorpayOrder = await razorpay!.orders.create({
      amount,
      currency: 'INR',
      receipt: `product_order_${order._id}`,
      notes: {
        productId: product._id.toString(),
        email: email,
        type: 'product'
      }
    });

    // Update order with Razorpay order ID and amount
    order.razorpayOrderId = razorpayOrder.id;
    order.amount = amount / 100;
    await order.save();

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      productName: product.name,
    });
  } catch (error : any) {
    console.error('Error creating product order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}