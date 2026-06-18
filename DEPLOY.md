# Hướng dẫn Deploy lên GitHub Pages

## Bước 1 — Chuẩn bị ảnh và nhạc

1. Copy **ảnh Mẹ** vào thư mục `images/`  
   Đặt tên đơn giản: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, ...

2. Tải file nhạc mp3 (xem `music/README.txt`) và đặt vào `music/birthday.mp3`

---

## Bước 2 — Tạo GitHub Repository

1. Mở [github.com](https://github.com) → **New repository**
2. Tên repo: `happy-birthday-me` (hoặc bất kỳ tên nào)
3. Chọn **Public** (bắt buộc để dùng GitHub Pages miễn phí)
4. Nhấn **Create repository**

---

## Bước 3 — Push code lên GitHub

Mở Terminal (PowerShell) trong thư mục dự án, chạy:

```powershell
cd "d:\Happy_birthday_Mẹ"
git init
git add .
git commit -m "Happy Birthday Me Nguyet"
git branch -M main
git remote add origin https://github.com/TEN_BAN_CUA_BAN/happy-birthday-me.git
git push -u origin main
```

> Thay `TEN_BAN_CUA_BAN` bằng username GitHub của bạn.

---

## Bước 4 — Bật GitHub Pages

1. Vào repo trên GitHub → **Settings** → **Pages** (menu bên trái)
2. Source: chọn **Deploy from a branch**
3. Branch: `main` — Folder: `/ (root)`
4. Nhấn **Save**
5. Chờ ~1-2 phút, trang sẽ hiện link:  
   `https://TEN_BAN_CUA_BAN.github.io/happy-birthday-me/`

---

## Bước 5 — Gửi link cho Mẹ 🎉

Copy link trên và gửi cho Mẹ Nguyệt qua Zalo/Messenger.  
Mẹ chỉ cần bấm vào là xem được ngay!

---

## Cập nhật nội dung sau khi deploy

Mỗi lần muốn thay đổi (đổi ảnh, sửa lời nhắn...):

```powershell
git add .
git commit -m "cap nhat anh"
git push
```

GitHub Pages tự cập nhật sau ~1 phút.
