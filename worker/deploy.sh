#!/usr/bin/env bash
# ============================================================
# 一键部署 AI 学案 Worker
# 用法：
#   cd /home/ding/projects/ai-english-master/worker
#   bash deploy.sh            # 首次部署请先按 README 提示设置密钥
# ============================================================
set -e
cd "$(dirname "$0")"

# 1. 设置智谱密钥（只在第一次需要；value 从本地文件 .zhipu_key 读，不进聊天记录）
if [ ! -f .zhipu_key_set ]; then
  if [ -f .zhipu_key ]; then
    cat .zhipu_key | tr -d '[:space:]' | npx wrangler secret put ZHIPU_API_KEY
    touch .zhipu_key_set
    echo "✅ ZHIPU_API_KEY 已设置"
  else
    echo "⚠️  未找到 .zhipu_key 文件。请先："
    echo "    1. 到 https://open.bigmodel.cn 注册并创建 API Key"
    echo "    2. 把 Key 存进这个文件： echo '你的Key' > .zhipu_key"
    echo "    3. 确认 .zhipu_key 在 .gitignore 里（不要提交到 git！）"
    exit 1
  fi
fi

# 2. 部署
npx wrangler deploy

# 3. 提示
echo ""
echo "部署完成后，把输出里的 workers.dev 地址填进 frontend/ai-lesson.html 的 WORKER_URL"
