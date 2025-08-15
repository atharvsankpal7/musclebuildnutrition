import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { isRazorpayConfigured } from '@/lib/razorpay';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // Check if Razorpay is configured
    if (!isRazorpayConfigured()) {
      return NextResponse.json({ 
        error: 'Payment gateway not configured. Please contact support.' 
      }, { status: 503 });
    }

    await connectDB();
    
    const { orderId, paymentId, signature } = await request.json();

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Find and update order
    const order = await Order.findOne({ razorpayOrderId: orderId })
      .populate('bundleId');
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    order.status = 'completed';
    order.razorpayPaymentId = paymentId;
    order.completedAt = new Date();
    await order.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Payment verified successfully',
      orderId: order._id 
    });
  } catch (error: any) {
    console.error('Error verifying bundle payment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}