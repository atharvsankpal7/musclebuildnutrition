import Razorpay from 'razorpay';

// Create Razorpay instance only when environment variables are available
export const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

// Helper function to check if Razorpay is configured
export const isRazorpayConfigured = () => {
  return !!razorpay;
};