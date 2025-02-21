# 1️⃣ เลือก base image (ใช้ Alpine เพื่อลดขนาด)
FROM node:20-alpine AS builder

# 2️⃣ กำหนด working directory ใน container
WORKDIR /app

# 3️⃣ คัดลอก package.json และ lock file (เพื่อลด cache busting)
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# 4️⃣ ติดตั้ง dependencies (โดยไม่คัดลอกโค้ดทั้งหมดก่อน)
RUN pnpm install --frozen-lockfile

# 5️⃣ คัดลอกโค้ดทั้งหมดเข้า container
COPY . .

# 6️⃣ สร้าง Next.js production build
RUN pnpm run build

# 7️⃣ ใช้ node image ที่เล็กลงสำหรับ production
FROM node:20-alpine AS runner
WORKDIR /app

# 9️⃣ ตั้งค่า Environment Variables สำหรับ production
ENV NODE_ENV=production
ENV PORT=3000

# 🔟 เปิดพอร์ตที่ต้องใช้
EXPOSE 3000

# 1️⃣1️⃣ คำสั่งเริ่มรันแอป
CMD ["npm", "run", "start"]
