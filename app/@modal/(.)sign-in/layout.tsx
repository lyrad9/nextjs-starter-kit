"use client";
import { Dialog } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function SignInModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      {children}
    </Dialog>
  );
}
