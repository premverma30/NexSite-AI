import stripe from "../config/stripe.js";
import userRepository from "../repositories/user.repository.js";
import AppError from "../errors/AppError.js";
import logger from "../utils/logger.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const stripeWebhook = asyncHandler(async (req, res, next) => {
  const sig = req.headers["stripe-signature"];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    logger.error("Stripe Webhook Signature Error", error);
    return next(new AppError(`Webhook Error: ${error.message}`, 400));
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const credits = Number(session.metadata.credits);
    const plan = session.metadata.plan;

    const user = await userRepository.findById(userId);
    if (user) {
      user.credits += credits;
      user.plan = plan;
      await userRepository.createUser(user); // Mongoose handles save on existing doc
    }
  }

  res.status(200).json({ received: true });
});
