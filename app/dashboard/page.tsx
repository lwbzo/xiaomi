"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BAI_VIET_MAU } from "@/lib/du-lieu-mau";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dang-nhap");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-6">
        <p className="font-mono text-sm text-slate">Đang tải...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const tongLuotXem = BAI_VIET_MAU.reduce((tong, b) => tong + b.luot_xem, 0);
  const tongBaiViet = BAI_VIET_MAU.length;
  const chuyenMucList = Array.from(
    new Set(BAI_VIET_MAU.map((b) => b.chuyen_muc))
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      {/* Header dashboard với thông tin người dùng */}
      <div className="mb-12 flex flex-wrap items-center justify-between gap-6 border-b border-line pb-8">
        <div className="flex items-center gap-4">
          {session?.user?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt=""
              className="h-14 w-14 rounded-full border border-line"
            />
          )}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-slate">
              Xin chào
            </p>
            <h1 className="font-display text-2xl font-medium text-ink">
              {session?.user?.name ?? "Bạn"}
            </h1>
            <p className="text-sm text-ink-soft">{session?.user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-full border border-line px-5 py-2 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:border-rust hover:text-rust"
        >
          Đăng xuất
        </button>
      </div>

      {/* Thống kê tổng quan */}
      <section className="mb-14 grid gap-6 sm:grid-cols-3">
        <ThongKeCard nhan="Tổng bài viết" giaTri={tongBaiViet.toString()} />
        <ThongKeCard
          nhan="Tổng lượt xem"
          giaTri={tongLuotXem.toLocaleString("vi-VN")}
        />
        <ThongKeCard
          nhan="Chuyên mục"
          giaTri={chuyenMucList.length.toString()}
        />
      </section>

      {/* Danh sách bài viết dạng bảng quản lý */}
      <section>
        <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-slate">
          Bài viết của bạn
        </h2>
        <div className="overflow-hidden rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-paper-dim font-mono text-xs uppercase tracking-wide text-slate">
                <th className="px-5 py-3 font-medium">Tiêu đề</th>
                <th className="px-5 py-3 font-medium">Chuyên mục</th>
                <th className="px-5 py-3 font-medium">Ngày đăng</th>
                <th className="px-5 py-3 text-right font-medium">Lượt xem</th>
              </tr>
            </thead>
            <tbody>
              {BAI_VIET_MAU.map((bai) => (
                <tr
                  key={bai.id}
                  className="border-b border-line last:border-0 hover:bg-paper-dim/60 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-ink">
                    {bai.tieu_de}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-rust/10 px-3 py-1 font-mono text-xs text-rust">
                      {bai.chuyen_muc}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-slate">
                    {bai.ngay_dang}
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-ink-soft">
                    {bai.luot_xem.toLocaleString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function ThongKeCard({ nhan, giaTri }: { nhan: string; giaTri: string }) {
  return (
    <div className="torn-edge relative rounded-2xl border border-line bg-paper-dim px-6 py-6 pb-9">
      <p className="font-mono text-xs uppercase tracking-widest text-slate">
        {nhan}
      </p>
      <p className="mt-2 font-display text-4xl font-medium text-ink">
        {giaTri}
      </p>
    </div>
  );
}
