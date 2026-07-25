"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export type ProductFormState =
  | {
      errors?: Record<string, string>;
      message?: string;
    }
  | undefined;

function parseProductForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "");
  const size = String(formData.get("size") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const inStock = formData.get("inStock") === "on";

  const errors: Record<string, string> = {};
  if (!title) errors.title = "Title is required.";
  if (!size) errors.size = "Size is required.";
  if (!imageUrl) {
    errors.imageUrl = "Image URL is required.";
  } else {
    try {
      const parsed = new URL(imageUrl);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        errors.imageUrl = "Please enter a valid HTTP/HTTPS URL.";
      }
    } catch {
      errors.imageUrl = "Please enter a valid HTTP/HTTPS URL.";
    }
  }

  const price = Number(priceRaw);
  if (!priceRaw || Number.isNaN(price) || price <= 0) {
    errors.price = "Enter a valid price greater than 0.";
  }

  return {
    data: { title, description: description || null, price, size, imageUrl, inStock },
    errors,
  };
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();
  const { data, errors } = parseProductForm(formData);
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await prisma.product.create({ data });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect("/admin/products");
}

export async function updateProduct(
  id: number,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();
  const { data, errors } = parseProductForm(formData);
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await prisma.product.update({ where: { id }, data });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath(`/product/${id}`);
  redirect("/admin/products");
}

export async function deleteProduct(id: number): Promise<{ error?: string }> {
  await requireAdmin();

  try {
    await prisma.product.delete({ where: { id } });
  } catch {
    return { error: "Can't delete — this product is part of an existing order." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return {};
}
