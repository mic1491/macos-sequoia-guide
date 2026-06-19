# macOS Sequoia 強制安裝線上引導

這個資料夾是 GitHub Pages 線上發布包。

## 內容

- `index.html`
- `styles.css`
- `app.js`
- `3.在不受支持的 Mac 上安装 macOS Sequoia (簡易版).pdf`

線上版不放 MP4 影片，影片會改用 YouTube 不公開影片嵌入。

## 上線前要填的 YouTube 連結

請在 `app.js` 的 `assets` 內填入：

```js
youtubeQuick: "https://youtu.be/cfpvIxjr-6w",
youtubeFull: "https://youtu.be/iPLQd7OE0NU",
```

其中：

- `youtubeQuick` 對應 `1.MacOS 強制升級-安裝開機檔到硬碟(假如你的設備還能開機).mp4`
- `youtubeFull` 對應 `2.老Mac強制升級MacOS 13、14、15(一刀未剪版).mp4`

YouTube 影片需設定為「不公開」且允許嵌入。

## GitHub Pages 建議

建立一個 public repository，將本資料夾內容放到 repository 根目錄，然後到 Settings > Pages 啟用 GitHub Pages。
