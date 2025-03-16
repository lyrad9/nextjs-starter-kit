import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Section from "@/components/layout/Section";
import { CircleAlert } from "lucide-react";
export default function Unauthorized() {
  return (
    <Section className="py-8">
      <Alert variant="destructive">
        <AlertTitle>
          <CircleAlert
            className="me-3 -mt-0.5 inline-flex opacity-60"
            size={16}
            aria-hidden="true"
          />
          Unauthorized
        </AlertTitle>
        <AlertDescription>
          You are not authorized to access this page. Please sign in to
          continue.
        </AlertDescription>
      </Alert>
    </Section>
  );
}
