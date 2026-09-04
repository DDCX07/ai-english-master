# 听力音频文件放这里

把真实的 mp3 音频文件放在这个文件夹里，文件名要和 `js/data/listening-data.js`
中每条练习的 `audioUrl` 对应，例如：

- listening-conversation-1.mp3（校园生活对话）
- listening-lecture-1.mp3（气候变化讲座）
- listening-news-1.mp3（科技大会新闻）
- ... 以此类推，共 10 个文件

## 没有音频文件也能用

如果对应的 mp3 不存在，页面会**自动切换为浏览器语音朗读模式（TTS）**，
用电脑自带的英文语音把听力原文朗读出来，同样支持：

- 播放 / 暂停
- 0.75x ~ 1.5x 变速
- 前进 / 后退 10 秒
- 原文逐句高亮、点击句子定位

建议使用 Chrome 或 Edge 浏览器，语音效果最好。
