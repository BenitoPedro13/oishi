import { restaurante } from "@/content/restaurante";

// THE ONE delivery-URL builder — spec-architecture.md §9.1.
export function urlDelivery(): string {
  return restaurante.urlDelivery;
}
