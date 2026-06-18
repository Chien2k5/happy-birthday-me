# SPEC — Trang web chúc mừng sinh nhật Mẹ Nguyệt

## 1. Objective

Tạo một trang web single-page tĩnh, đẹp và cảm xúc, để chúc mừng sinh nhật Mẹ Nguyệt. Người dùng cuối là Mẹ — chỉ cần bấm link là xem ngay, không cần đăng nhập, không cần cài gì. Triển khai miễn phí trên GitHub Pages.

**Target users:** Mẹ Nguyệt (xem trên điện thoại là chủ yếu)

---

## 2. Core Features & Acceptance Criteria

| Feature | Acceptance Criteria |
|---|---|
| Hero section | Text "Happy Birthday Mẹ Nguyệt" xuất hiện với animation typewriter hoặc fade-in; confetti rơi khi tải trang |
| Lời nhắn | Hiển thị đầy đủ lời nhắn đã cung cấp, styled như thiệp tay, có hiệu ứng scroll-reveal |
| Gallery ảnh | Hiển thị ảnh Mẹ (đặt trong thư mục `/images`), responsive grid |
| Bánh sinh nhật tương tác | Bánh CSS animated, bấm nút "Thổi nến" → nến tắt + pháo hoa nổ |
| Nhạc nền | Tự động play nhạc nhẹ nhàng khi trang load; nút mute/unmute cố định góc màn hình |
| Responsive | Đẹp trên mobile (≥320px), tablet, desktop |
| Deploy | Có thể host tĩnh trên GitHub Pages, load < 3s trên 4G |

---

## 3. Visual Design

- **Palette:** Hồng pastel (#FFB7C5, #FF8FAB) + trắng kem (#FFF9F0) + vàng gold (#D4AF37)
- **Font:** Google Fonts — "Playfair Display" (tiêu đề) + "Lato" (nội dung)
- **Tone:** Ấm áp, tình cảm, tối giản — không lòe loẹt
- **Animations:** Confetti rơi (canvas), scroll-reveal fade-up, nến flickering (CSS keyframes)

---

## 4. Project Structure

```
d:\Happy_birthday_Mẹ\
├── index.html          # Entry point duy nhất
├── css/
│   └── style.css       # Toàn bộ styles
├── js/
│   ├── main.js         # Logic chính (confetti, scroll-reveal, candle)
│   └── confetti.js     # Canvas confetti engine
├── images/
│   └── (ảnh mẹ đặt ở đây — jpg/png/webp đều được)
├── music/
│   └── birthday.mp3    # Nhạc nền (tự tìm hoặc user cung cấp)
└── SPEC.md
```

---

## 5. Tech Stack

- **HTML5 + CSS3 + Vanilla JavaScript** — không framework, không build tool
- **Không có backend** — tất cả chạy trên browser
- **Google Fonts** (CDN) — Playfair Display + Lato
- **Deploy:** GitHub Pages (branch `main`, file `index.html` ở root)

---

## 6. Lời nhắn (nội dung đã xác nhận)

> Chúc mừng sinh nhật mẹ yêu.
>
> Con chẳng giỏi nói những lời hoa mỹ, nên con chỉ mong mẹ luôn khỏe mạnh, vui vẻ và sống thật lâu bên gia đình mình.
>
> Cảm ơn mẹ vì đã luôn yêu thương, bao dung và đồng hành cùng con trong mọi giai đoạn của cuộc sống.
>
> Tuổi mới của mẹ, con chúc mẹ nhiều niềm vui, ít muộn phiền và lúc nào cũng nở nụ cười thật tươi.
>
> Con yêu mẹ rất nhiều.

---

## 7. Boundaries

**Always do:**
- Responsive-first (mobile ≥320px)
- Tất cả text tiếng Việt, đúng dấu
- Ảnh dùng lazy-loading (loading="lazy")
- Nhạc có nút tắt rõ ràng (tôn trọng trải nghiệm người dùng)

**Never do:**
- Dùng framework nặng (React, Vue, Angular)
- Yêu cầu đăng nhập hay API key
- Tự động download file nào lên máy mẹ
- Dùng autoplay video (chỉ audio)

---

## 8. Deploy Instructions (GitHub Pages)

1. Push toàn bộ thư mục lên GitHub repo (public)
2. Settings → Pages → Source: `main` branch, `/ (root)`
3. GitHub tự tạo link dạng: `https://<username>.github.io/<repo-name>/`
4. Gửi link đó cho Mẹ

---

*Spec này là tài liệu sống — cập nhật khi có thay đổi yêu cầu.*
