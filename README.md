# AI English Master - 组件库使用指南

## 📁 项目结构

```
ai-english-master/
├── index.html              # 示例页面（可以直接在浏览器打开）
├── components/             # 组件文件夹（HTML片段）
│   ├── sidebar.html       # 侧边栏导航组件
│   ├── header.html        # 顶部导航栏组件
│   ├── card.html          # 卡片组件集合
│   └── button.html        # 按钮组件集合
├── css/
│   └── components.css     # 组件样式文件
├── js/
│   ├── data/              # 数据文件
│   │   └── menu-data.js  # 菜单配置数据
│   ├── utils/            # 工具函数
│   │   └── helpers.js    # 常用工具函数
│   └── pages/            # 各页面的JS逻辑（待添加）
└── assets/               # 图片、图标等资源
    ├── images/
    └── icons/
```

## 🚀 如何使用

### 1. 查看示例页面

直接在浏览器中打开 `index.html` 文件即可看到示例页面。

### 2. 在新页面中使用组件

#### 步骤1: 创建一个新的HTML文件

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>你的页面标题</title>

  <!-- 引入必需的CSS和JS库 -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

  <!-- 引入组件样式 -->
  <link rel="stylesheet" href="css/components.css"/>
</head>
<body>
  <!-- 你的页面内容 -->
</body>
</html>
```

#### 步骤2: 添加侧边栏

从 `components/sidebar.html` 复制 `<nav class="ai-sidebar">...</nav>` 部分，粘贴到你的页面中。

#### 步骤3: 添加顶部导航栏

从 `components/header.html` 复制 `<header class="ai-header">...</header>` 部分，粘贴到你的页面中。

#### 步骤4: 引入JavaScript文件

在 `</body>` 前添加：

```html
<!-- 菜单配置数据 -->
<script src="js/data/menu-data.js"></script>

<!-- 工具函数 -->
<script src="js/utils/helpers.js"></script>

<!-- 你的页面逻辑 -->
<script src="js/pages/your-page.js"></script>
```

## 📦 可用的组件

### 1. 按钮 (Buttons)

```html
<!-- 主按钮 -->
<button class="ai-button ai-button--primary">开始学习</button>

<!-- 次要按钮 -->
<button class="ai-button ai-button--secondary">取消</button>

<!-- 危险按钮 -->
<button class="ai-button ai-button--danger">删除</button>

<!-- 全宽按钮 -->
<button class="ai-button ai-button--primary ai-button--full">提交</button>

<!-- 图标按钮 -->
<button class="ai-icon-btn">
  <span class="material-symbols-outlined">settings</span>
</button>
```

### 2. 卡片 (Cards)

```html
<!-- 统计卡片 -->
<div class="ai-stat-card">
  <div class="flex items-center gap-3 mb-2">
    <div class="p-2 bg-primary/10 rounded-lg text-primary">
      <span class="material-symbols-outlined">local_fire_department</span>
    </div>
    <h3 class="font-title-md text-title-md">标题</h3>
  </div>
  <div class="flex items-baseline gap-2">
    <span class="font-headline-lg text-headline-lg">数字</span>
    <span class="font-label-sm text-label-sm">单位</span>
  </div>
</div>

<!-- 功能模块卡片 -->
<div class="ai-module-card">
  <div class="flex justify-between items-start">
    <div class="p-3 bg-surface-container rounded-lg text-primary">
      <span class="material-symbols-outlined text-[32px]">headset</span>
    </div>
    <span class="ai-badge">标签</span>
  </div>
  <div class="mt-4">
    <h3 class="font-title-md text-title-md">模块标题</h3>
    <p class="text-body-md text-on-surface-variant">描述</p>
  </div>
</div>
```

### 3. 输入框 (Inputs)

```html
<!-- 普通输入框 -->
<input class="ai-input" type="text" placeholder="请输入..."/>

<!-- 搜索框 -->
<div class="relative">
  <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
  <input class="ai-input ai-input--search" placeholder="搜索..." type="text"/>
</div>
```

### 4. 进度条 (Progress Bar)

```html
<div class="ai-progress-bar">
  <div class="ai-progress-bar__fill ai-progress-bar__fill--primary" style="width: 70%;"></div>
</div>
```

### 5. 徽章/标签 (Badges)

```html
<span class="ai-badge ai-badge--primary">主要</span>
<span class="ai-badge ai-badge--success">成功</span>
<span class="ai-badge ai-badge--warning">警告</span>
<span class="ai-badge ai-badge--error">错误</span>
```

### 6. 复选框 (Checkbox)

```html
<label class="flex items-center gap-3 cursor-pointer">
  <input type="checkbox" class="ai-checkbox" checked/>
  <span>选项文字</span>
</label>
```

## 🛠️ 可用的工具函数

```javascript
// 格式化数字
formatNumber(4520);  // 返回 "4,520"

// 格式化日期
formatDate(new Date(), 'YYYY-MM-DD');  // 返回 "2026-08-16"

// 计算日期差
daysBetween('2026-08-01', '2026-08-16');  // 返回 15

// 显示提示消息
showToast('操作成功！', 'success');

// 本地存储
storage.set('key', { data: 'value' });
const data = storage.get('key');

// 用户数据管理
const userData = userData.getLearningData();
const tasks = userData.getTodayTasks();
```

## 🎨 自定义样式

如果你想修改组件的样式，可以编辑 `css/components.css` 文件。

例如，修改主按钮的颜色：

```css
.ai-button--primary {
  background-color: #your-color; /* 修改这里 */
}
```

## 📝 下一步

1. 创建你自己的页面文件（如 `vocabulary.html`）
2. 从示例页面 `index.html` 复制基础结构
3. 根据需要添加组件
4. 在 `js/pages/` 中创建对应的JS文件

## ❓ 常见问题

**Q: 为什么我的样式不生效？**
A: 确保你正确引入了 `css/components.css` 文件。

**Q: 如何修改菜单项？**
A: 编辑 `js/data/menu-data.js` 文件中的 `menuItems` 数组。

**Q: 如何添加新的页面？**
A: 在 `js/data/menu-data.js` 中添加新的菜单项，并创建对应的HTML文件。

## 💡 提示

- 所有组件都支持响应式设计，在移动端也能正常显示
- 使用 Material Icons 时，可以通过 `style="font-variation-settings: 'FILL' 1;"` 来显示填充版本的图标
- 组件的样式使用 CSS 变量，方便统一修改主题颜色
