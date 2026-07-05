"use client";

import { signIn, useSession } from "next-auth/react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DangNhap() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { status } = useSession();
  const router = useRouter();
  const [dangXuLy, setDangXuLy] = useState(false);
  const [loi, setLoi] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const xuLyDangNhap = async () => {
    setLoi(null);
    setDangXuLy(true);

    if (!executeRecaptcha) {
      setLoi("reCAPTCHA chưa sẵn sàng, vui lòng thử lại sau vài giây.");
      setDangXuLy(false);
      return;
    }

    try {
      // Lấy token reCAPTCHA v3 (chạy ẩn, không cần người dùng thao tác)
      const token = await executeRecaptcha("dang_nhap");

      // Gửi token lên server để xác thực trước khi cho đăng nhập
      const res = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();

      if (!data.success) {
        setLoi("Hệ thống nghi ngờ đây là bot. Vui lòng thử lại.");
        setDangXuLy(false);
        return;
      }

      await signIn("google", { callbackUrl: "/dashboard" });
    } catch {
      setLoi("Có lỗi xảy ra, vui lòng thử lại.");
      setDangXuLy(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 py-14 text-center">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-slate">
        Chào mừng trở lại
      </p>
      <h1 className="font-display text-3xl font-medium text-ink">
        Đăng nhập để tiếp tục
      </h1>
      <p className="mt-4 text-ink-soft">
        Đăng nhập bằng tài khoản Google để lưu bài viết yêu thích và xem
        dashboard cá nhân của bạn.
      </p>

      <button
        onClick={xuLyDangNhap}
        disabled={dangXuLy}
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-ink bg-ink px-6 py-3 font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {dangXuLy ? (
          "Đang xử lý..."
        ) : (
          <>
            <GoogleIcon />
            Đăng nhập với Google
          </>
        )}
      </button>

      {loi && (
        <p className="mt-4 text-sm text-rust" role="alert">
          {loi}
        </p>
      )}

      <p className="mt-8 font-mono text-[11px] text-slate">
        Trang này được bảo vệ bởi reCAPTCHA. Áp dụng{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-rust"
        >
          Chính sách quyền riêng tư
        </a>{" "}
        và{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-rust"
        >
          Điều khoản dịch vụ
        </a>{" "}
        của Google.
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.56 2.7-3.86 2.7-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.86v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.17.29-1.7V4.97H.86A9 9 0 0 0 0 9c0 1.45.35 2.83.86 4.03l3.09-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .86 4.97l3.09 2.33C4.66 5.17 6.65 3.58 9 3.58Z"
      />
    </svg>
  );
}
