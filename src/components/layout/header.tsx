import AuthButton from "../auth/auth-button";
import { ModeToggle } from "../shared/Theme-mode-toggle";
export default function header() {
  return (
    <header
      className="min-h-16
      border-b border-2 "
    >
      <div className="px-16 py-2 flex items-center justify-between max-w-5xl w-full mx-auto">
        <p>Logo</p>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <AuthButton />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
