import type { Order, OrderItem } from "@prisma/client";
import { resend } from "@/lib/resend";
import OrderConfirmationEmail from "@/emails/OrderConfirmationEmail";

type OrderWithItems = Order & { items: OrderItem[] };

export async function sendOrderConfirmationEmail(order: OrderWithItems) {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping order confirmation email.");
    return;
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Linen & Loom <onboarding@resend.dev>",
      to: order.shippingEmail,
      subject: `Order Confirmed — #${order.id}`,
      react: OrderConfirmationEmail({
        orderId: order.id,
        items: order.items.map((item) => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          imageUrl: item.imageUrl,
        })),
        total: order.total,
        shippingName: order.shippingName,
        shippingAddress: order.shippingAddress,
        shippingApartment: order.shippingApartment,
        shippingCity: order.shippingCity,
        shippingState: order.shippingState,
        shippingZip: order.shippingZip,
        shippingCountry: order.shippingCountry,
      }),
    });
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
  }
}
