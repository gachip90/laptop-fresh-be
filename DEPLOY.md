# Hướng dẫn Deploy trên Render

## Bước 1: Chuẩn bị Repository

1. Đảm bảo code đã được push lên GitHub/GitLab
2. Kiểm tra file `.gitignore` đã loại trừ `.env` và `node_modules`
3. Đảm bảo có file `package.json` với script `start`

## Bước 2: Tạo Database trên Render

1. Đăng nhập vào [Render.com](https://render.com)
2. Click "New +" → "PostgreSQL"
3. Điền thông tin:
   - **Name**: `laptop-fresh-db`
   - **Database**: `laptop_fresh_db`
   - **User**: `laptop_fresh_user`
   - **Region**: Chọn gần nhất (Singapore)
   - **PostgreSQL Version**: 15
   - **Plan**: Free

4. Click "Create Database"
5. Sau khi tạo xong, copy thông tin connection string

## Bước 3: Deploy Backend

1. Trong Render Dashboard, click "New +" → "Web Service"
2. Connect với GitHub repository của bạn
3. Điền thông tin:
   - **Name**: `laptop-fresh-api`
   - **Environment**: `Node`
   - **Region**: Chọn gần nhất
   - **Branch**: `main` (hoặc branch chính)
   - **Root Directory**: Để trống
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. Click "Advanced" và thêm Environment Variables:
   ```
   DB_HOST=your-db-host.render.com
   DB_PORT=5432
   DB_NAME=laptop_fresh_db
   DB_USER=laptop_fresh_user
   DB_PASS=your-db-password
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=production
   PORT=10000
   ```

5. Click "Create Web Service"

## Bước 4: Cấu hình Database Connection

1. Trong Web Service, vào tab "Environment"
2. Cập nhật các biến môi trường với thông tin từ PostgreSQL service
3. Lưu lại

## Bước 5: Kiểm tra Deploy

1. Đợi build hoàn thành (có thể mất 5-10 phút)
2. Kiểm tra logs để đảm bảo không có lỗi
3. Test API endpoint: `https://your-app-name.onrender.com/`

## Bước 6: Cấu hình Custom Domain (Tùy chọn)

1. Vào tab "Settings" của Web Service
2. Scroll xuống "Custom Domains"
3. Thêm domain của bạn (nếu có)

## Troubleshooting

### Lỗi thường gặp:

1. **Database connection failed**:
   - Kiểm tra lại thông tin DB trong Environment Variables
   - Đảm bảo database đã được tạo và running

2. **Build failed**:
   - Kiểm tra `package.json` có script `start`
   - Kiểm tra tất cả dependencies đã được install

3. **Port binding error**:
   - Đảm bảo sử dụng `process.env.PORT` trong code
   - Render sẽ tự động set PORT

### Logs:
- Vào tab "Logs" để xem chi tiết lỗi
- Có thể restart service nếu cần

## Các Platform Free Khác

### Railway
- Tương tự Render
- Có free tier cho database và web service
- Deploy dễ dàng từ GitHub

### Heroku
- Có free tier (giới hạn)
- Hỗ trợ PostgreSQL add-on
- Deploy từ GitHub

### Vercel
- Chủ yếu cho frontend
- Có thể deploy Node.js API
- Free tier rộng rãi

### Netlify
- Chủ yếu cho frontend
- Có serverless functions
- Free tier tốt

## Monitoring

Sau khi deploy thành công:
1. Monitor logs thường xuyên
2. Kiểm tra performance
3. Backup database định kỳ
4. Update dependencies khi cần 