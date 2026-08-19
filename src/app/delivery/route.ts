import { NextResponse } from "next/server";
import { urlDelivery } from "@/lib/contato/delivery";

// 308 → pedido.anota.ai — spec-architecture.md §9 layout table.
export function GET() {
  return NextResponse.redirect(urlDelivery(), 308);
}
