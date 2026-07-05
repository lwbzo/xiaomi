# Ghi Chép — Blog cá nhân

Blog cá nhân với đăng nhập Google, bảo vệ reCAPTCHA v3, và dashboard quản lý bài viết.

## Tính năng đã có

- ✅ Trang chủ hiển thị danh sách bài viết
- ✅ Trang chi tiết từng bài viết
- ✅ Đăng nhập bằng Google (NextAuth.js)
- ✅ Bảo vệ trang đăng nhập bằng reCAPTCHA v3 (chặn bot)
- ✅ Dashboard cá nhân sau khi đăng nhập (thống kê, bảng bài viết)
- ⚠️ Dữ liệu bài viết hiện là **dữ liệu mẫu** (trong `lib/du-lieu-mau.ts`) — chưa lưu vào database thật

## Bước 1: Chạy thử trên máy

```
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:3000`.

## Bước 2: Kiểm tra file `.env.local`

File này đã được điền sẵn Google Client ID/Secret và reCAPTCHA key bạn cung cấp.
**Không xóa, không push file này lên GitHub** (đã có trong `.gitignore`).

⚠️ **Quan trọng — bạn nên làm ngay:**
Vì các key đã từng xuất hiện trong cuộc trò chuyện, hãy vào lại:
- Google Cloud Console → APIs & Services → Credentials → tạo lại Client Secret
- Google reCAPTCHA Admin → Site Settings → tạo lại Secret Key

Sau đó cập nhật giá trị mới vào `.env.local` (và vào Vercel, xem Bước 4).

## Bước 3: Cấu hình Google OAuth cho đúng domain

Vào [Google Cloud Console](https://console.cloud.google.com/apis/credentials):
1. Mở OAuth Client ID bạn đã tạo (`dichvuroblox`)
2. Trong **Authorized redirect URIs**, thêm:
   - `http://localhost:3000/api/auth/callback/google` (để test ở máy)
   - `https://lwbzo.vercel.app/api/auth/callback/google` (cho web thật)
3. Trong **Authorized JavaScript origins**, thêm:
   - `http://localhost:3000`
   - `https://lwbzo.vercel.app`

## Bước 4: Đưa biến môi trường lên Vercel

Vào project trên vercel.com → **Settings → Environment Variables**, thêm từng dòng
trong file `.env.local` (trừ dòng comment `#`). Nhớ đổi:

```
NEXTAUTH_URL=https://lwbzo.vercel.app
```

(vì trên Vercel không phải localhost nữa)

## Bước 5 (tùy chọn): Kết nối Supabase để lưu dữ liệu thật

Hiện tại bài viết đang là dữ liệu mẫu cứng trong code. Để lưu thật:

1. Tạo tài khoản miễn phí tại [supabase.com](https://supabase.com)
2. Tạo project mới → vào **Settings → API** để lấy:
   - `Project URL` → điền vào `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → điền vào `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → điền vào `SUPABASE_SERVICE_ROLE_KEY` (giữ bí mật, chỉ dùng ở server)
3. Vào **SQL Editor** trong Supabase, chạy lệnh tạo bảng:

```sql
create table bai_viet (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  tieu_de text not null,
  tom_tat text,
  noi_dung text not null,
  chuyen_muc text,
  ngay_dang date default now(),
  thoi_gian_doc int default 3,
  luot_xem int default 0
);
```

4. Báo lại cho Claude khi đã có bảng này — mình sẽ nối trang chủ và dashboard
   đọc dữ liệu thật từ Supabase thay vì dữ liệu mẫu.

## Cấu trúc project

```
app/
  page.tsx                    → Trang chủ
  bai-viet/[slug]/page.tsx    → Chi tiết bài viết
  dang-nhap/page.tsx          → Đăng nhập Google + reCAPTCHA
  dashboard/page.tsx          → Dashboard cá nhân
  api/auth/[...nextauth]/     → NextAuth route
  api/verify-recaptcha/       → Xác thực reCAPTCHA phía server
components/
  Header.tsx                  → Thanh điều hướng
  Providers.tsx                → Bọc SessionProvider + reCAPTCHA
lib/
  du-lieu-mau.ts               → Dữ liệu bài viết mẫu
  supabase.ts                  → Kết nối Supabase (khi cần)
types/
  bai-viet.ts                  → Kiểu dữ liệu bài viết
```

## Đẩy lên GitHub và deploy

```
git add .
git commit -m "Blog voi dang nhap Google va reCAPTCHA"
git push
```

Vercel sẽ tự động deploy lại (nếu project này đã được kết nối trước đó,
hoặc import project mới như đã làm với `xiaomi`).
