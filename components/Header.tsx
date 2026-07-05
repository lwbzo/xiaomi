import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-2xl font-medium tracking-tight text-ink"
        >
          Ghi Chép<span className="text-rust">.</span>
        </Link>

        <nav className="flex items-center gap-6 font-mono text-sm uppercase tracking-wide text-ink-soft">
          <Link href="/" className="hover:text-rust transition-colors">
            Bài viết
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-rust transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/dang-nhap"
            className="rounded-full border border-ink px-4 py-1.5 normal-case tracking-normal text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            Đăng nhập
          </Link>
        </nav>
      </div>
    </header>
  );
}
