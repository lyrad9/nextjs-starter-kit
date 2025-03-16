"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";

enum Error {
  Configuration = "Configuration",
  Verification = "Verification",
  AccessDenied = "AccessDenied",
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{" "}
    </p>
  ),
  [Error.Verification]: (
    <p>There was a problem when trying to verify your email.</p>
  ),
  [Error.AccessDenied]: <p>You do not have access to this resource.</p>,
};

export default function AuthErrorPage() {
  const search = useSearchParams();
  const error = search.get("error") as Error;

  return (
    <Card className="flex h-screen w-full flex-col items-center justify-center">
      <CardHeader>
        <CardTitle>
          <CircleAlert
            className="me-3 -mt-0.5 inline-flex text-red-500"
            size={16}
            aria-hidden="true"
          />
          <p className="text-lg font-semibold text-red-500">
            Something went wrong
          </p>
        </CardTitle>
        <CardDescription>
          {errorMap[error] || "Please contact us if this error persists."}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
