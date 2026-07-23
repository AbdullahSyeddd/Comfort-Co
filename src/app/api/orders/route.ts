import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/email";

interface OrderRequestItem {
  productId: number;
  quantity: number;
}

interface ShippingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state?: string;
  zip: string;
  country: string;
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { items, shipping }: { items: OrderRequestItem[]; shipping: ShippingDetails } =
    await request.json();

  if (!items?.length) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  // Re-fetch products from the DB so prices/titles can never be tampered with client-side.
  const products = await prisma.product.findMany({
    where: { id: { in: items.map((i) => i.productId) } },
  });

  const orderItems = items.map((requested) => {
    const product = products.find((p) => p.id === requested.productId);
    if (!product) {
      throw new Error(`Product ${requested.productId} not found`);
    }
    return {
      productId: product.id,
      title: product.title,
      price: product.price,
      size: product.size,
      imageUrl: product.imageUrl,
      quantity: requested.quantity,
    };
  });

  const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingCost = subtotal > 75 ? 0 : 9;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shippingCost + tax;

  const order = await prisma.order.create({
    data: {
      userId: Number(session.user.id),
      total,
      shippingName: shipping.name,
      shippingEmail: shipping.email,
      shippingPhone: shipping.phone,
      shippingAddress: shipping.address,
      shippingApartment: shipping.apartment || null,
      shippingCity: shipping.city,
      shippingState: shipping.state || null,
      shippingZip: shipping.zip,
      shippingCountry: shipping.country,
      items: { create: orderItems },
    },
    include: { items: true },
  });

  await sendOrderConfirmationEmail(order);

  return NextResponse.json({ orderId: order.id });
}
