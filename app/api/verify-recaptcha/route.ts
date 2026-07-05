import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Thiếu token reCAPTCHA" },
        { status: 400 }
      );
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      { method: "POST" }
    );
    const data = await verifyRes.json();

    // reCAPTCHA v3 trả về điểm số (score) từ 0 đến 1.
    // Điểm càng cao càng chắc chắn là người thật. Ngưỡng thường dùng: 0.5
    const isHuman = data.success && data.score >= 0.5;

    return NextResponse.json({
      success: isHuman,
      score: data.score ?? null,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Lỗi xác thực reCAPTCHA" },
      { status: 500 }
    );
  }
}
