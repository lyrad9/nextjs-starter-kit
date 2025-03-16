import { requiredAuth } from "@/lib/auth-helper";
export default async function PrivatePage() {
  await requiredAuth();
  return <div>Private page</div>;
}
