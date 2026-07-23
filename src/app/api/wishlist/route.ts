import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.wishlistItem.findMany({
    where: { userId: Number(session.user.id) },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    items.map((item) => ({
      id: item.id,
      productId: item.product.id,
      title: item.product.title,
      price: item.product.price,
      size: item.product.size,
      image: item.product.imageUrl,
    }))
  );
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await request.json();
  const userId = Number(session.user.id);

  const item = await prisma.wishlistItem.upsert({
    where: { userId_productId: { userId, productId: Number(productId) } },
    update: {},
    create: { userId, productId: Number(productId) },
    include: { product: true },
  });

  return NextResponse.json({
    id: item.id,
    productId: item.product.id,
    title: item.product.title,
    price: item.product.price,
    size: item.product.size,
    image: item.product.imageUrl,
  });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await request.json();
  const userId = Number(session.user.id);

  await prisma.wishlistItem.deleteMany({
    where: { userId, productId: Number(productId) },
  });

  return NextResponse.json({ ok: true });
}
