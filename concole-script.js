(function () {
    if (document.getElementById("vs-panel")) return;
  
    // Create and append style
    const style = document.createElement("style");
    style.textContent = `
      /* TODO: Consider re-adding minimize functionality in the future. */
      #vs-panel {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 500px;
        background: rgba(10, 10, 10, 0.9);
        color: #fff;
        font-family: sans-serif;
        border-radius: 12px;
        padding: 16px;
        z-index: 9999;
        box-shadow: 0 6px 12px rgba(0,0,0,0.4);
        user-select: none;
      }
      #vs-full { width: 100%; }
      #vs-top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
      }
      #vs-top-left, #vs-top-right { flex: 0 0 auto; }
      #vs-top-middle { flex: 1; text-align: center; }
      #vs-title { font-weight: bold !important; }
      #vs-extra-controls { margin-top: 8px; }
      #vs-live-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      #vs-playback-controls button, #vs-loop {
        padding: 4px 8px;
        border: none;
        border-radius: 6px;
        background: #333;
        color: #fff;
        cursor: pointer;
        transition: transform 0.1s;
      }
      #vs-playback-controls button:hover, #vs-loop:hover {
        background: #555;
        transform: scale(1.1);
      }
      #vs-speed-control select {
        margin-left: 4px;
        padding: 4px 8px;
        border: none;
        border-radius: 6px;
        background: #333;
        color: #fff;
        cursor: pointer;
      }
      .active-loop { background: green !important; }
      #vs-loop-settings-container {
        margin-top: 8px;
        display: none;
      }
      #vs-loop-settings {
        border: 1px solid #555;
        padding: 4px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: monospace;
        font-size: 12px;
      }
      #vs-loop-settings button {
        margin: 0 2px;
        padding: 2px 6px;
        font-size: 12px;
      }
      #vs-loop-settings span { margin: 0 4px; }
      #vs-help-overlay {
        position: absolute;
        top: 40px;
        right: 20px;
        background: #f0f0f0;
        color: #000;
        padding: 8px;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        font-size: 12px;
        display: none;
        z-index: 10000;
        white-space: pre-line;
      }
    `;
    document.head.appendChild(style);
  
    // Panel HTML
    const panel = document.createElement("div");
    panel.id = "vs-panel";
    panel.innerHTML = `
      <div id="vs-full">
        <div id="vs-top-row">
          <div id="vs-top-left"><span id="vs-title">VolleySkip+ 🎛️</span></div>
          <div id="vs-top-middle"></div>
          <div id="vs-top-right"><span id="vs-info">ℹ️</span></div>
        </div>
        <div id="vs-extra-controls">
          <div id="vs-live-info">
            <span id="vs-current-time">⏱️ 00:00</span>
            <div id="vs-playback-controls">
              <button id="vs-back">⏪</button>
              <button id="vs-play">⏯️</button>
              <button id="vs-forward">⏩</button>
            </div>
            <div id="vs-speed-control">
              <span>🚀</span>
              <select id="vs-speed">
                <option value="0.5">0.50x</option>
                <option value="0.75">0.75x</option>
                <option value="1" selected>1.00x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.50x</option>
                <option value="2">2.00x</option>
              </select>
            </div>
            <button id="vs-loop" class="loop-btn">🔁</button>
          </div>
          <div id="vs-loop-settings-container">
            <div id="vs-loop-settings">
              <span id="vs-loop-start-label">🅰️</span>
              <span id="vs-loop-start-time">00:00</span>
              <button id="vs-loop-start-dec">-</button>
              <button id="vs-loop-start-inc">+</button>
              <span id="vs-loop-duration">00s</span>
              <button id="vs-loop-end-dec">-</button>
              <button id="vs-loop-end-inc">+</button>
              <span id="vs-loop-end-time">00:00</span>
              <span id="vs-loop-end-label">🅱️</span>
            </div>
          </div>
        </div>
      </div>
      <div id="vs-help-overlay">
        ℹ️ VolleySkip+ Guide
        • ⏪ / ⏩ – Skip 5s
        • ⏯️ – Play/Pause
        • 🚀 – Change playback speed
        • 🔁 – Toggle Loop Mode
           → When active, set loop A and B using [-][+] buttons
        • Loop duration shows as [XXs] in middle
        • 🅰️ and 🅱️ mark loop start and end
      </div>
    `;
    document.body.appendChild(panel);
  
    // Element references
    const video = () => document.querySelector("video");
    const currentTimeEl = document.getElementById("vs-current-time");
    const speedSelect = document.getElementById("vs-speed");
    const loopButton = document.getElementById("vs-loop");
    const helpOverlay = document.getElementById("vs-help-overlay");
  
    // Loop state
    let loopActive = false;
    let lStart = 0, lEnd = 0;
  
    // Loop settings buttons
    document.getElementById("vs-loop-start-dec").addEventListener("click", () => lStart = Math.max(0, lStart - 1));
    document.getElementById("vs-loop-start-inc").addEventListener("click", () => lStart = Math.min(lEnd - 1, lStart + 1));
    document.getElementById("vs-loop-end-dec").addEventListener("click", () => lEnd = Math.max(lStart + 1, lEnd - 1));
    document.getElementById("vs-loop-end-inc").addEventListener("click", () => lEnd++);
  
    // Drag functionality
    let dragging = false, offsetX = 0, offsetY = 0;
    document.getElementById("vs-top-row").addEventListener("mousedown", e => {
      dragging = true;
      offsetX = e.clientX - panel.offsetLeft;
      offsetY = e.clientY - panel.offsetTop;
    });
    document.addEventListener("mousemove", e => {
      if (dragging) {
        panel.style.left = `${e.clientX - offsetX}px`;
        panel.style.top = `${e.clientY - offsetY}px`;
      }
    });
    document.addEventListener("mouseup", () => dragging = false);
  
    // Fullscreen re-parenting
    document.addEventListener("fullscreenchange", () => {
      const container = document.fullscreenElement || document.body;
      container.appendChild(panel);
    });
  
    // Format time helpers
    const formatTime = t => {
      const m = Math.floor(t / 60);
      const s = Math.floor(t % 60);
      return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };
    const formatSec = sec => `${Math.floor(sec).toString().padStart(2, "0")}s`;
  
    // UI update loop
    setInterval(() => {
      const vid = video();
      if (!vid) return;
      currentTimeEl.textContent = `⏱️ ${formatTime(vid.currentTime)}`;
      speedSelect.value = vid.playbackRate;
      if (loopActive) {
        loopButton.classList.add("active-loop");
        document.getElementById("vs-loop-settings-container").style.display = "block";
        document.getElementById("vs-loop-start-time").textContent = formatTime(lStart);
        document.getElementById("vs-loop-end-time").textContent = formatTime(lEnd);
        document.getElementById("vs-loop-duration").textContent = formatSec(lEnd - lStart);
      } else {
        loopButton.classList.remove("active-loop");
        document.getElementById("vs-loop-settings-container").style.display = "none";
      }
    }, 500);
  
    // Loop reset
    setInterval(() => {
      const vid = video();
      if (loopActive && vid && vid.currentTime > lEnd) vid.currentTime = lStart;
    }, 300);
  
    // Control events
    document.getElementById("vs-back").addEventListener("click", () => { if (video()) video().currentTime -= 5; });
    document.getElementById("vs-forward").addEventListener("click", () => { if (video()) video().currentTime += 5; });
    document.getElementById("vs-play").addEventListener("click", () => {
      const vid = video();
      if (vid) vid.paused ? vid.play() : vid.pause();
    });
    speedSelect.addEventListener("change", e => {
      const vid = video();
      if (vid) vid.playbackRate = parseFloat(e.target.value);
    });
  
    const toggleLoop = () => {
      const vid = video();
      if (!vid) return;
      loopActive = !loopActive;
      if (loopActive) {
        lEnd = vid.currentTime;
        lStart = Math.max(0, vid.currentTime - 10);
      }
    };
    loopButton.addEventListener("click", () => {
      toggleLoop();
      updateLiveInfo();
    });
  
    // Keyboard shortcuts
    document.addEventListener("keydown", e => {
      if (!video() || ["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)) return;
      const vid = video();
      switch (e.key.toLowerCase()) {
        case "arrowleft": vid.currentTime -= 5; break;
        case "arrowright": vid.currentTime += 5; break;
        case "arrowup": vid.playbackRate = Math.min(3, vid.playbackRate + 0.25); break;
        case "arrowdown": vid.playbackRate = Math.max(0.25, vid.playbackRate - 0.25); break;
        case " ": vid.paused ? vid.play() : vid.pause(); break;
        case "s": toggleLoop(); break;
        case "a": lStart = vid.currentTime; break;
        case "b": lEnd = vid.currentTime; break;
        case "q": lStart = Math.max(0, lStart - 1); break;
        case "w": lStart = Math.min(lEnd - 1, lStart + 1); break;
        case "o": lEnd = Math.max(lStart + 1, lEnd - 1); break;
        case "p": lEnd++; break;
        case "z": vid.currentTime = lStart; break;
        case "r": vid.currentTime = lStart; vid.play(); break;
      }
      updateLiveInfo();
    });
  
    // Help tooltip
    document.getElementById("vs-info").addEventListener("mouseenter", () => {
      helpOverlay.style.display = "block";
    });
    document.getElementById("vs-info").addEventListener("mouseleave", () => {
      helpOverlay.style.display = "none";
    });
  
    function updateLiveInfo() {
      const vid = video();
      if (!vid) return;
      currentTimeEl.textContent = `⏱️ ${formatTime(vid.currentTime)}`;
      speedSelect.value = vid.playbackRate;
      if (loopActive) {
        loopButton.classList.add("active-loop");
        document.getElementById("vs-loop-settings-container").style.display = "block";
        document.getElementById("vs-loop-start-time").textContent = formatTime(lStart);
        document.getElementById("vs-loop-end-time").textContent = formatTime(lEnd);
        document.getElementById("vs-loop-duration").textContent = formatSec(lEnd - lStart);
      } else {
        loopButton.classList.remove("active-loop");
        document.getElementById("vs-loop-settings-container").style.display = "none";
      }
    }
  })();