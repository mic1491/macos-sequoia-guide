const assets = {
  quickVideo: "1.MacOS 強制升級-安裝開機檔到硬碟(假如你的設備還能開機).mp4",
  fullVideo: "2.老Mac強制升級MacOS 13、14、15(一刀未剪版).mp4",
  youtubeQuick: "https://youtu.be/cfpvIxjr-6w",
  youtubeFull: "https://youtu.be/iPLQd7OE0NU",
  pdf: "3.在不受支持的 Mac 上安装 macOS Sequoia (簡易版).pdf",
  oclpPkg: "https://github.com/dortania/OpenCore-Legacy-Patcher/releases/latest/download/OpenCore-Patcher.pkg",
  oclpRelease: "https://github.com/dortania/OpenCore-Legacy-Patcher/releases/latest",
  oclpDocs: "https://dortania.github.io/OpenCore-Legacy-Patcher/",
  oclpHelper: "下載並安裝OpenCorePatcher.command",
};

const steps = [
  {
    number: "03",
    title: "安裝開機檔",
    short: "OpenCore 到硬碟",
    video: assets.quickVideo,
    youtube: assets.youtubeQuick,
    summary: "如果原本系統還能開機，可以先把 OpenCore 開機檔安裝到硬碟，降低每次都依賴 USB 的麻煩。",
    tasks: [
      "在 OpenCore Legacy Patcher 選擇 Build and Install OpenCore。",
      "安裝目標選內建硬碟的 EFI 分割區，避免誤選外接碟。",
      "重新開機時按住 Option，選擇 EFI Boot 進入開機選單。",
      "確認能看到 macOS 安裝項目後，再進入正式安裝。",
    ],
    resources: [
      { label: "下載並啟動 OCLP 安裝器", detail: "macOS 腳本", href: assets.oclpHelper },
      { label: "官方 OCLP 安裝器", detail: "最新版 pkg", href: assets.oclpPkg },
      { label: "OCLP 官方教學", detail: "文件", href: assets.oclpDocs },
      { label: "開機檔教學", detail: "影片", href: assets.quickVideo },
    ],
  },
  {
    number: "04",
    title: "執行 macOS 安裝",
    short: "格式化與安裝",
    video: assets.fullVideo,
    youtube: assets.youtubeFull,
    summary: "進入安裝程式後，依需求選擇保留資料升級或清除安裝。新手建議先備份，再按影片步驟操作。",
    tasks: [
      "從 EFI Boot 進入 macOS 安裝程式。",
      "需要清除安裝時，先在磁碟工具程式確認目標硬碟名稱。",
      "選擇 APFS 格式，並確認不是 USB 隨身碟。",
      "等待多次重新開機，過程中持續選擇 OpenCore/EFI Boot。",
    ],
    resources: [
      { label: "OCLP 最新版頁面", detail: "官方 GitHub", href: assets.oclpRelease },
      { label: "完整一刀未剪版", detail: "影片", href: assets.fullVideo },
      { label: "簡易 PDF", detail: "文件", href: assets.pdf },
    ],
  },
  {
    number: "05",
    title: "第一次進系統",
    short: "卡頓屬正常",
    video: assets.fullVideo,
    youtube: assets.youtubeFull,
    summary: "第一次登入後，畫面卡頓、Wi-Fi 或藍牙暫時不可用都可能發生。先完成後續修補，不要急著重灌。",
    tasks: [
      "登入桌面後等待系統完成背景設定。",
      "若跳出 OpenCore Legacy Patcher 提示，依畫面開始安裝修補；若沒有跳出，可自行開啟 OCLP 執行 Post-Install Root Patch。",
      "Wi-Fi 或藍牙不能用時，先使用有線網路、USB 分享網路或離線修補檔。",
      "不要在 root patch 完成前判斷效能是否正常。",
    ],
    resources: [
      { label: "下載並啟動 OCLP 安裝器", detail: "macOS 腳本", href: assets.oclpHelper },
      { label: "官方 OCLP 安裝器", detail: "最新版 pkg", href: assets.oclpPkg },
      { label: "OCLP 官方教學", detail: "Post-Install", href: assets.oclpDocs },
      { label: "完整一刀未剪版", detail: "影片", href: assets.fullVideo },
    ],
  },
  {
    number: "06",
    title: "安裝驅動與收尾",
    short: "Root Patch",
    video: assets.fullVideo,
    youtube: assets.youtubeFull,
    summary: "完成 Post-Install Root Patch 後重開機，檢查顯示、音效、網路、藍牙和睡眠功能。",
    tasks: [
      "開啟 OpenCore Legacy Patcher，執行 Post-Install Root Patch。",
      "依提示輸入密碼並等待安裝完成。",
      "重新開機後檢查解析度、顯示加速、Wi-Fi、藍牙與音效。",
      "確認一切正常後，保留 USB 安裝碟一段時間作為救援工具。",
    ],
    resources: [
      { label: "OCLP 官方教學", detail: "文件", href: assets.oclpDocs },
      { label: "完整一刀未剪版", detail: "影片", href: assets.fullVideo },
      { label: "簡易 PDF", detail: "文件", href: assets.pdf },
    ],
  },
];

const storageKey = "sequoia-guide-progress-v2";
const isUsbMode = location.protocol === "file:";
const state = loadState();
let activeIndex = 0;

const stepList = document.querySelector("#stepList");
const taskList = document.querySelector("#taskList");
const resourceList = document.querySelector("#resourceList");
const activeTitle = document.querySelector("#activeTitle");
const activeBadge = document.querySelector("#activeBadge");
const activeHeading = document.querySelector("#activeHeading");
const activeSummary = document.querySelector("#activeSummary");
const guideVideo = document.querySelector("#guideVideo");
const youtubeFrame = document.querySelector("#youtubeFrame");
const videoBox = document.querySelector(".video-box");
const videoPlaceholder = document.querySelector("#videoPlaceholder");
const modeLabel = document.querySelector("#modeLabel");
const progressText = document.querySelector("#progressText");
const progressPercent = document.querySelector("#progressPercent");
const progressBar = document.querySelector("#progressBar");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const completeButton = document.querySelector("#completeButton");
const resetButton = document.querySelector("#resetButton");
const printButton = document.querySelector("#printButton");
const stepButtonTemplate = document.querySelector("#stepButtonTemplate");

renderStepList();
renderActiveStep();
updateProgress();

prevButton.addEventListener("click", () => setActiveStep(activeIndex - 1));
nextButton.addEventListener("click", () => setActiveStep(activeIndex + 1));
completeButton.addEventListener("click", () => {
  const step = steps[activeIndex];
  state.completed[activeIndex] = !state.completed[activeIndex];
  state.tasks[activeIndex] = state.completed[activeIndex]
    ? step.tasks.map((_, index) => index)
    : [];
  saveState();
  renderActiveStep();
  renderStepList();
  updateProgress();
});
resetButton.addEventListener("click", () => {
  state.completed = {};
  state.tasks = {};
  saveState();
  renderActiveStep();
  renderStepList();
  updateProgress();
});
printButton.addEventListener("click", () => window.print());

function renderStepList() {
  stepList.replaceChildren();
  steps.forEach((step, index) => {
    const node = stepButtonTemplate.content.firstElementChild.cloneNode(true);
    node.classList.toggle("active", index === activeIndex);
    node.classList.toggle("done", Boolean(state.completed[index]));
    node.querySelector(".step-index").textContent = step.number;
    node.querySelector("strong").textContent = step.title;
    node.querySelector("small").textContent = step.short;
    node.addEventListener("click", () => setActiveStep(index));
    stepList.append(node);
  });
}

function renderActiveStep() {
  const step = steps[activeIndex];
  activeTitle.textContent = step.title;
  activeBadge.textContent = `步驟 ${step.number}`;
  activeHeading.textContent = step.title;
  activeSummary.textContent = step.summary;
  modeLabel.textContent = isUsbMode ? "USB 離線版 · 本機影片" : "線上引導版 · YouTube 影片";
  renderVideo(step);

  renderTasks();
  renderResources(step);

  prevButton.disabled = activeIndex === 0;
  nextButton.disabled = activeIndex === steps.length - 1;
  completeButton.textContent = state.completed[activeIndex] ? "取消完成" : "標記完成";
}

function renderVideo(step) {
  const youtubeId = getYoutubeId(step.youtube);
  videoBox.classList.remove("show-youtube", "show-placeholder");
  youtubeFrame.removeAttribute("src");
  videoPlaceholder.querySelector("strong").textContent = "等待 YouTube 連結";
  videoPlaceholder.querySelector("span").textContent = "線上版會在這裡播放不公開影片；USB 版仍會播放本機 MP4。";

  if (isUsbMode) {
    guideVideo.src = step.video;
    return;
  }

  guideVideo.removeAttribute("src");
  guideVideo.load();

  if (youtubeId) {
    youtubeFrame.src = `https://www.youtube.com/embed/${youtubeId}`;
    videoBox.classList.add("show-youtube");
    return;
  }

  videoBox.classList.add("show-placeholder");
}

function renderTasks() {
  const step = steps[activeIndex];
  taskList.replaceChildren();
  const checkedTasks = new Set(state.tasks[activeIndex] || []);
  step.tasks.forEach((task, index) => {
    const item = document.createElement("li");
    item.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checkedTasks.has(index);
    checkbox.setAttribute("aria-label", task);
    checkbox.addEventListener("change", () => toggleTask(index, checkbox.checked));

    const label = document.createElement("span");
    label.textContent = task;

    item.append(checkbox, label);
    taskList.append(item);
  });
}

function renderResources(step) {
  resourceList.replaceChildren();
  step.resources.filter(shouldShowResource).forEach((resource) => {
    const link = document.createElement("a");
    link.className = "resource-link";
    link.href = resource.href;
    link.target = "_blank";
    link.rel = "noreferrer";

    const label = document.createElement("strong");
    label.textContent = resource.label;
    const detail = document.createElement("span");
    detail.textContent = resource.detail;

    link.append(label, detail);
    resourceList.append(link);
  });
}

function shouldShowResource(resource) {
  if (isUsbMode) {
    return true;
  }

  return !resource.href.endsWith(".command") && !resource.href.endsWith(".mp4");
}

function toggleTask(taskIndex, checked) {
  const current = new Set(state.tasks[activeIndex] || []);
  if (checked) {
    current.add(taskIndex);
  } else {
    current.delete(taskIndex);
  }
  state.tasks[activeIndex] = [...current].sort((a, b) => a - b);
  state.completed[activeIndex] = state.tasks[activeIndex].length === steps[activeIndex].tasks.length;
  saveState();
  renderStepList();
  renderTasks();
  completeButton.textContent = state.completed[activeIndex] ? "取消完成" : "標記完成";
  updateProgress();
}

function setActiveStep(index) {
  if (index < 0 || index >= steps.length) {
    return;
  }
  activeIndex = index;
  renderStepList();
  renderActiveStep();
}

function updateProgress() {
  const doneCount = steps.filter((_, index) => state.completed[index]).length;
  const percent = Math.round((doneCount / steps.length) * 100);
  progressText.textContent = `${doneCount} / ${steps.length} 完成`;
  progressPercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

function loadState() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn("Progress could not be loaded.", error);
  }
  return { completed: {}, tasks: {} };
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function getYoutubeId(value) {
  if (!value) {
    return "";
  }

  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.replace("/", "");
    }
    if (url.searchParams.has("v")) {
      return url.searchParams.get("v");
    }
    if (url.pathname.includes("/embed/")) {
      return url.pathname.split("/embed/")[1].split("/")[0];
    }
  } catch (error) {
    return value;
  }

  return value;
}
