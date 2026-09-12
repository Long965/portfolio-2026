# Portfolio Lý Tiểu Long - 3D Interactive Website

Chào mừng đến với dự án web portfolio mang phong cách 3D (được truyền cảm hứng từ David Heckhoff). Dự án này được xây dựng với các công nghệ hiện đại bao gồm:
- **React.js (Vite)**
- **Tailwind CSS v4**
- **Three.js & React Three Fiber** (dành cho các hiệu ứng 3D)
- **Framer Motion** (dành cho các hiệu ứng chuyển động mượt mà)

Dưới đây là hướng dẫn chi tiết để bạn có thể mở và chạy dự án này trực tiếp trên **Visual Studio Code (VS Code)**.

---

## 🚀 Hướng dẫn chạy dự án trên VS Code

### 1. Yêu cầu hệ thống
Trước khi chạy, hãy đảm bảo máy tính của bạn đã cài đặt sẵn:
- **Node.js** (Khuyến nghị phiên bản 18 trở lên). Bạn có thể kiểm tra bằng cách mở terminal và gõ `node -v`.
- **VS Code** (Visual Studio Code).

### 2. Mở dự án trong VS Code
1. Mở **VS Code**.
2. Chọn **File > Open Folder...** (hoặc nhấn `Ctrl + K` sau đó `Ctrl + O`).
3. Điều hướng tới thư mục chứa dự án: `D:\Antigravity\CV\portfolio` và chọn **Select Folder**.

### 3. Mở Terminal trong VS Code
1. Trên thanh menu trên cùng của VS Code, chọn **Terminal > New Terminal** (hoặc dùng phím tắt `` Ctrl + ` ``).
2. Terminal sẽ hiển thị ở nửa dưới màn hình với đường dẫn mặc định là thư mục `portfolio`.

### 4. Cài đặt thư viện (Chỉ cần làm lần đầu tiên)
Trong cửa sổ Terminal vừa mở, gõ lệnh sau và nhấn **Enter**:
```bash
npm install
```
*Lưu ý: Quá trình này sẽ mất một chút thời gian để tải về các thư viện cần thiết (React, Three.js, Tailwind,...). Hãy chờ cho đến khi tiến trình kết thúc (không còn chạy phần trăm).*

### 5. Khởi chạy trang web
Sau khi cài đặt xong, gõ lệnh sau vào Terminal và nhấn **Enter**:
```bash
npm run dev
```

### 6. Xem kết quả
Khi lệnh trên chạy thành công, trong Terminal sẽ xuất hiện một dòng chữ tương tự như sau:
```
  ➜  Local:   http://localhost:5173/
```
Bạn chỉ cần giữ phím **Ctrl** và **Click chuột trái** vào đường link `http://localhost:5173/`, trình duyệt web sẽ tự động mở ra và hiển thị trang portfolio của bạn.

---

## 🛠️ Một số lệnh hữu ích khác

- **Tắt server**: Khi bạn muốn dừng chạy trang web, hãy nhấn chuột vào khu vực Terminal và bấm tổ hợp phím `Ctrl + C`, sau đó gõ `Y` (nếu máy hỏi) và nhấn Enter.
- **Build dự án**: Nếu bạn muốn đóng gói code để chuẩn bị đẩy lên các hosting (như Vercel, Netlify, GitHub Pages), hãy chạy lệnh:
  ```bash
  npm run build
  ```
  Code hoàn chỉnh sẽ được xuất ra thư mục `dist`.

---

## 🎨 Hướng dẫn tinh chỉnh (Dành cho nhà phát triển)
- **Đổi thông tin**: Bạn có thể vào thư mục `src/components/` để sửa đổi text ở các file `Hero.jsx`, `About.jsx`, `Projects.jsx`, `Contact.jsx`.
- **Thay mô hình 3D**: Nếu bạn có file mô hình 3D thiết kế riêng (định dạng `.glb`), bạn có thể import vào `React Three Fiber` thông qua hook `useGLTF()` để thay thế cho các khối trừu tượng hiện tại.

Chúc bạn có một trải nghiệm code tuyệt vời!
