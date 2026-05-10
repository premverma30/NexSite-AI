import stripe from "../../config/stripe.js"; // Needs to be moved or path fixed
import { PLANS } from "../../config/plan.js"; // Needs to be moved or path fixed
import AppError from "../errors/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const billing = asyncHandler(async (req, res, next) => {
  const { planType } = req.body;
  const userId = req.user._id;
  const plan = PLANS[planType];
  
  if (!plan || plan.price == 0) {
    return next(new AppError("Invalid paid plan", 400));
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `NexSite.ai ${planType.toUpperCase()} plan`,
          },
          unit_amount: plan.price * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId: userId.toString(),
      credits: plan.credits,
      plan: plan.plan,
    },
    success_url: `${process.env.FRONTEND_URL}/`,
    cancel_url: `${process.env.FRONTEND_URL}/pricing`,
  });

  res.status(200).json({
    success: true,
    sessionUrl: session.url,
  });
});
