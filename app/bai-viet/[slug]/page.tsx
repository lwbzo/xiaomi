import { BAI_VIET_MAU } from "@/lib/du-lieu-mau";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return BAI_VIET_MAU.map((bai) => ({ slug: bai.slug }));
}

export default async function ChiTietBaiViet({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bai = BAI_VIET_MAU.find((b) => b.slug === slug);

  if (!bai) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-2xl px-6 py-14">
      <Link
        href="/"
        className="mb-10 inline-block font-mono text-xs uppercase tracking-widest text-slate hover:text-rust transition-colors"
      >
        ← Về trang chủ
      </Link>

      <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-wide text-rust">
        <span>{bai.chuyen_muc}</span>
        <span className="text-line">/</span>
        <span className="text-slate">
          {format(new Date(bai.ngay_dang), "dd/MM/yyyy")}
        </span>
      </div>

      <h1 className="font-display text-4xl font-medium leading-tight text-ink sm:text-5xl">
        {bai.tieu_de}
      </h1>

      <p className="mt-6 font-mono text-xs text-slate">
        {bai.thoi_gian_doc} phút đọc · {bai.luot_xem.toLocaleString("vi-VN")} lượt xem
      </p>

      <div className="mt-10 space-y-6 border-t border-line pt-10 text-lg leading-relaxed text-ink-soft">
        {bai.noi_dung.split("\n\n").map((doan, i) => (
          <p key={i}>{doan}</p>
        ))}
      </div>
    </article>
  );
}
