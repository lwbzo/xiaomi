import Link from "next/link";
import { BAI_VIET_MAU } from "@/lib/du-lieu-mau";
import { format } from "date-fns";

export default function TrangChu() {
  const [baiNoiBat, ...baiConLai] = BAI_VIET_MAU;

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      {/* Hero */}
      <section className="mb-16 border-b border-line pb-14">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-slate">
          Số {format(new Date(), "MM.yyyy")} — Ghi chép cá nhân
        </p>
        <h1 className="max-w-2xl font-display text-5xl font-medium leading-[1.1] tracking-tight text-ink sm:text-6xl">
          Những điều đáng để viết ra,
          <br />
          để nhớ lâu hơn một chút.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-ink-soft">
          Blog cá nhân về công nghệ, đời sống và những cuốn sách đã đọc.
          Không có gì hoàn hảo ở đây — chỉ có những gì thật.
        </p>
      </section>

      {/* Bài nổi bật */}
      <section className="mb-16">
        <Link href={`/bai-viet/${baiNoiBat.slug}`} className="group block">
          <article className="torn-edge relative overflow-hidden rounded-2xl border border-line bg-paper-dim px-8 py-10 pb-14 transition-shadow hover:shadow-lg hover:shadow-ink/5">
            <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-wide text-rust">
              <span>{baiNoiBat.chuyen_muc}</span>
              <span className="text-line">/</span>
              <span className="text-slate">
                {format(new Date(baiNoiBat.ngay_dang), "dd/MM/yyyy")}
              </span>
            </div>
            <h2 className="font-display text-3xl font-medium leading-tight text-ink group-hover:text-rust transition-colors sm:text-4xl">
              {baiNoiBat.tieu_de}
            </h2>
            <p className="mt-4 max-w-2xl text-ink-soft">{baiNoiBat.tom_tat}</p>
            <p className="mt-6 font-mono text-xs text-slate">
              {baiNoiBat.thoi_gian_doc} phút đọc · {baiNoiBat.luot_xem.toLocaleString("vi-VN")} lượt xem
            </p>
          </article>
        </Link>
      </section>

      {/* Danh sách bài viết còn lại */}
      <section>
        <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-slate">
          Bài viết khác
        </h3>
        <div className="grid gap-8 sm:grid-cols-2">
          {baiConLai.map((bai) => (
            <Link key={bai.id} href={`/bai-viet/${bai.slug}`} className="group">
              <article className="torn-edge relative h-full border-b border-line pb-8">
                <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-wide text-rust">
                  <span>{bai.chuyen_muc}</span>
                  <span className="text-line">/</span>
                  <span className="text-slate">
                    {format(new Date(bai.ngay_dang), "dd/MM/yyyy")}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-medium leading-snug text-ink group-hover:text-rust transition-colors">
                  {bai.tieu_de}
                </h2>
                <p className="mt-3 text-sm text-ink-soft">{bai.tom_tat}</p>
                <p className="mt-4 font-mono text-xs text-slate">
                  {bai.thoi_gian_doc} phút đọc
                </p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
