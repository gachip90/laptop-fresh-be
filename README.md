# Laptop Fresh Backend

Backend API cho ứng dụng Laptop Fresh sử dụng Node.js, Express và PostgreSQL.

## Cài đặt Local

1. Clone repository:
```bash
git clone <your-repo-url>
cd laptop-fresh-be
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file .env từ env.example:
```bash
cp env.example .env
```

4. Cập nhật thông tin database trong file .env

5. Chạy ứng dụng:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

- `GET /` - Health check
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/services` - Lấy danh sách dịch vụ
- `GET /api/blogs` - Lấy danh sách blog
- Và nhiều endpoints khác...

## Deploy trên Render

Xem hướng dẫn chi tiết trong file `DEPLOY.md` 