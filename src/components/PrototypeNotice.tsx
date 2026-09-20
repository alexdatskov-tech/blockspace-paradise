import { useEffect, useState } from "react";
import { Info, X } from "lucide-react";

const STORAGE_KEY = "blockforge:prototype-notice-dismissed";

/**
 * Says plainly that this build is a prototype.
 *
 * The checkout collects a root password and quotes a total, which looks exactly
 * like a real order form — so the page has to tell visitors up front that
 * nothing is provisioned and no payment is taken. Remove this component once
 * the checkout is wired to real provisioning and a payment processor.
 */
export function PrototypeNotice() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    // Rendered only after mount so the server and client markup agree.
    try {
      setDismissed(window.localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Storage can be unavailable in a private window; dismissing for this
      // page view is good enough.
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="panel-strong mx-auto flex max-w-3xl items-start gap-3 px-4 py-3">
        <Info className="mt-0.5 size-4 shrink-0 text-gold" />
        <p className="min-w-0 flex-1 text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">This is a prototype.</span> You can click
          through the whole flow, but no server is provisioned and no payment is taken.
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss prototype notice"
          className="-m-1 shrink-0 rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
