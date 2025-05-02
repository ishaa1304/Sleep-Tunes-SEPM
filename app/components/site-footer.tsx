import Link from "next/link"
import { MoonIcon } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <MoonIcon className="h-6 w-6" />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SleepTunes. All rights reserved.</p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="/cookies" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Cookies
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}

