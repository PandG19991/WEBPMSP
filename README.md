# PMS房产管理系统

## 项目简介

这是一个现代化的房产管理系统（Property Management System），采用React + TypeScript + Vite构建，提供完整的房产管理解决方案。

## 功能特性

- 🏠 **房源管理** - 房源列表、详情管理、房态管理、价格管理
- 📋 **订单管理** - 订单处理、支付管理、退订与修改
- 🔗 **渠道管理** - OTA平台、小程序、AI客服系统集成
- 📊 **数据分析** - 收入趋势、入住率分析、客户来源统计
- 👥 **客户关系管理** - CRM功能、会员等级、积分系统
- 🏗️ **智能硬件** - 门锁管理、清洁服务管理、传感器监控
- 🧠 **智能决策** - 智能定价、库存分配、营销策略优化
- ⚙️ **系统管理** - 用户权限、角色管理、系统设置

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **图表库**: Recharts
- **UI组件**: Headless UI + Lucide React
- **数据模拟**: Faker.js + Antd

## 本地开发

### 环境要求
- Node.js >= 16
- npm >= 8

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 部署到 Cloudflare Pages

### 方法一：通过 Cloudflare Dashboard

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 选择 "Pages" > "Create a project"
3. 连接到您的 GitHub 仓库
4. 配置构建设置：
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (如果代码在根目录)
5. 点击 "Save and Deploy"

### 方法二：通过 Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署到 Pages
wrangler pages deploy dist --project-name=pms-system
```

## 项目结构

```
src/
├── components/          # React组件
│   ├── Admin/          # 系统管理组件
│   ├── Analytics/      # 数据分析组件
│   ├── Channels/       # 渠道管理组件
│   ├── CRM/           # 客户关系管理组件
│   ├── CustomerService/ # 客服组件
│   ├── Dashboard/      # 仪表盘组件
│   ├── DecisionAnalysis/ # 决策分析组件
│   ├── Hardware/       # 智能硬件组件
│   ├── Layout/         # 布局组件
│   ├── Orders/         # 订单管理组件
│   └── Property/       # 房源管理组件
├── App.tsx            # 主应用组件
└── main.tsx          # 应用入口

public/
├── _redirects        # SPA路由重定向配置
└── ...

dist/                # 构建输出目录
├── assets/         # 静态资源
├── index.html     # 入口HTML
└── _redirects    # 路由配置
```

## 部署注意事项

1. **SPA路由**: 项目使用客户端路由，已配置 `_redirects` 文件确保路由正常工作
2. **静态资源**: 所有资源都打包到 `dist` 目录，可直接部署到静态托管服务
3. **环境变量**: 如需要API接口，请在Cloudflare Pages中配置相应的环境变量

## 许可证

MIT License 