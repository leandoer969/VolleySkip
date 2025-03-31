# VolleySkip+ Bookmarklet

Version = 1.0.0

Browser = **Chrome**

**VolleySkip+** is a lightweight bookmarklet that overlays a draggable control panel on webpages with video elements. It provides enhanced video controls such as skip (backward/forward), play/pause, playback speed adjustment, and loop mode functionality.

## Features

- **Draggable Overlay:** Easily reposition the control panel by dragging its top row.
- **Video Controls:**
  - **Skip:** Jump 5 seconds backward (⏪) or forward (⏩).
  - **Play/Pause:** Toggle play/pause with the button (⏯️) or the spacebar.
  - **Playback Speed:** Adjust speed using the 🚀 dropdown.
  - **Loop Mode:** Toggle loop mode with the loop button (🔁). When enabled, it sets a 10‑second loop (from current time minus 10 seconds up to the current time).
- **Help Overlay:** Hover over the info icon (ℹ️) to see usage instructions and hotkeys.
- **Draggability:** The control panel is moved by dragging the top row, which is divided into three parts:
  - **Top Left:** Displays the bold "VolleySkip+ 🎛️" title.
  - **Top Middle:** Acts as a placeholder (empty in full view).
  - **Top Right:** Displays the info icon.

> **Note:** We have removed the minimize functionality in this version.  
> **TODO:** In a future release, consider re-adding a minimized view where the top-middle displays dynamic details (time, speed, loop info) instead of being empty.

## Installation

### As a Bookmarklet

1. **Copy the One‑Line Code:**  
   Copy the provided one‑line bookmarklet code.

   ## One‑Line Bookmarklet Code

    ```javascript
    javascript:(function(){if(document.getElementById("vs-panel"))return;var s=document.createElement("style");s.textContent="/* TODO: Consider re-adding minimize functionality in the future. */ /* Panel container */#vs-panel{position:fixed;top:20px;right:20px;width:500px;background:rgba(10,10,10,0.9);color:#fff;font-family:sans-serif;border-radius:12px;padding:16px;z-index:9999;box-shadow:0%206px%2012px%20rgba(0,0,0,0.4);user-select:none;}#vs-full{width:100%;}#vs-top-row{display:flex;justify-content:space-between;align-items:center;cursor:move;}#vs-top-left{flex:0%200%20auto;}#vs-top-middle{flex:1;text-align:center;}#vs-top-right{flex:0%200%20auto;}#vs-title{font-weight:bold%20!important;}#vs-extra-controls{margin-top:8px;}#vs-live-info{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}#vs-playback-controls%20button,#vs-loop{padding:4px%208px;border:none;border-radius:6px;background:#333;color:#fff;cursor:pointer;transition:transform%200.1s;}#vs-playback-controls%20button:hover,#vs-loop:hover{background:#555;transform:scale(1.1);}#vs-speed-control%20select{margin-left:4px;padding:4px%208px;border:none;border-radius:6px;background:#333;color:#fff;cursor:pointer;}.active-loop{background:green%20!important;}#vs-loop-settings-container{margin-top:8px;display:none;}#vs-loop-settings{border:1px%20solid%20#555;padding:4px;border-radius:8px;display:flex;justify-content:center;align-items:center;font-family:monospace;font-size:12px;}#vs-loop-settings%20button{margin:0%202px;padding:2px%206px;font-size:12px;}#vs-loop-settings%20span{margin:0%204px;}#vs-help-overlay{position:absolute;top:40px;right:20px;background:#f0f0f0;color:#000;padding:8px;border-radius:8px;box-shadow:0%202px%206px%20rgba(0,0,0,0.3);font-size:12px;display:none;z-index:10000;white-space:pre-line;}%22;document.head.appendChild(s);var%20panel=document.createElement(%22div%22);panel.id=%22vs-panel%22;panel.style.right=%2220px%22;panel.style.top=%2220px%22;panel.innerHTML=%60%3Cdiv%20id=%22vs-full%22%3E%3Cdiv%20id=%22vs-top-row%22%3E%3Cdiv%20id=%22vs-top-left%22%3E%3Cspan%20id=%22vs-title%22%3EVolleySkip+%20%F0%9F%8E%9B%EF%B8%8F%3C/span%3E%3C/div%3E%3Cdiv%20id=%22vs-top-middle%22%3E%3C/div%3E%3Cdiv%20id=%22vs-top-right%22%3E%3Cspan%20id=%22vs-info%22%3E%E2%84%B9%EF%B8%8F%3C/span%3E%3C/div%3E%3C/div%3E%3Cdiv%20id=%22vs-extra-controls%22%3E%3Cdiv%20id=%22vs-live-info%22%3E%3Cspan%20id=%22vs-current-time%22%3E%E2%8F%B1%EF%B8%8F%2000:00%3C/span%3E%3Cdiv%20id=%22vs-playback-controls%22%3E%3Cbutton%20id=%22vs-back%22%3E%E2%8F%AA%3C/button%3E%3Cbutton%20id=%22vs-play%22%3E%E2%8F%AF%EF%B8%8F%3C/button%3E%3Cbutton%20id=%22vs-forward%22%3E%E2%8F%A9%3C/button%3E%3C/div%3E%3Cdiv%20id=%22vs-speed-control%22%3E%3Cspan%3E%F0%9F%9A%80%3C/span%3E%3Cselect%20id=%22vs-speed%22%3E%3Coption%20value=\%220.5\%22%3E0.50x%3C/option%3E%3Coption%20value=\%220.75\%22%3E0.75x%3C/option%3E%3Coption%20value=\%221\%22%20selected%3E1.00x%3C/option%3E%3Coption%20value=\%221.25\%22%3E1.25x%3C/option%3E%3Coption%20value=\%221.5\%22%3E1.50x%3C/option%3E%3Coption%20value=\%222\%22%3E2.00x%3C/option%3E%3C/select%3E%3C/div%3E%3Cbutton%20id=%22vs-loop%22%20class=\%22loop-btn\%22%3E%F0%9F%94%81%3C/button%3E%3C/div%3E%3Cdiv%20id=%22vs-loop-settings-container%22%3E%3Cdiv%20id=%22vs-loop-settings%22%3E%3Cspan%20id=\%22vs-loop-start-label\%22%3E%F0%9F%85%B0%EF%B8%8F%3C/span%3E%3Cspan%20id=\%22vs-loop-start-time\%22%3E00:00%3C/span%3E%3Cbutton%20id=\%22vs-loop-start-dec\%22%3E-%3C/button%3E%3Cbutton%20id=\%22vs-loop-start-inc\%22%3E+%3C/button%3E%3Cspan%20id=\%22vs-loop-duration\%22%3E00s%3C/span%3E%3Cbutton%20id=\%22vs-loop-end-dec\%22%3E-%3C/button%3E%3Cbutton%20id=\%22vs-loop-end-inc\%22%3E+%3C/button%3E%3Cspan%20id=\%22vs-loop-end-time\%22%3E00:00%3C/span%3E%3Cspan%20id=\%22vs-loop-end-label\%22%3E%F0%9F%85%B1%EF%B8%8F%3C/span%3E%3C/div%3E%3C/div%3E%3C/div%3E%3C/div%3E%3Cdiv%20id=\%22vs-help-overlay\%22%3E%E2%84%B9%EF%B8%8F%20%20VolleySkip+%20Guide\n%E2%80%A2%20%E2%8F%AA%20/%20%E2%8F%A9%20%E2%80%93%20Skip%205s\n%E2%80%A2%20%E2%8F%AF%EF%B8%8F%20%E2%80%93%20Play/Pause\n%E2%80%A2%20%F0%9F%9A%80%20%E2%80%93%20Change%20playback%20speed\n%E2%80%A2%20%F0%9F%94%81%20%E2%80%93%20Toggle%20Loop%20Mode\n%20%20%20%E2%86%92%20When%20active,%20set%20loop%20A%20and%20B%20using%20[-][+]%20buttons\n%E2%80%A2%20Loop%20duration%20shows%20as%20[XXs]%20in%20middle\n%E2%80%A2%20%F0%9F%85%B0%EF%B8%8F%20and%20%F0%9F%85%B1%EF%B8%8F%20mark%20loop%20start%20and%20end\n%3C/div%3E%60;document.body.appendChild(panel);var%20infoIcon=document.getElementById(%22vs-info%22),backButton=document.getElementById(%22vs-back%22),playButton=document.getElementById(%22vs-play%22),forwardButton=document.getElementById(%22vs-forward%22),speedSelect=document.getElementById(%22vs-speed%22),loopButton=document.getElementById(%22vs-loop%22),currentTimeEl=document.getElementById(%22vs-current-time%22),helpOverlay=document.getElementById(%22vs-help-overlay%22);var%20vsLoopStartDec=document.getElementById(%22vs-loop-start-dec%22),vsLoopStartInc=document.getElementById(%22vs-loop-start-inc%22),vsLoopEndDec=document.getElementById(%22vs-loop-end-dec%22),vsLoopEndInc=document.getElementById(%22vs-loop-end-inc%22);vsLoopStartDec.addEventListener(%22click%22,function(){lStart=Math.max(0,lStart-1);});vsLoopStartInc.addEventListener(%22click%22,function(){lStart=Math.min(lEnd-1,lStart+1);});vsLoopEndDec.addEventListener(%22click%22,function(){lEnd=Math.max(lStart+1,lEnd-1);});vsLoopEndInc.addEventListener(%22click%22,function(){lEnd=lEnd+1;});var%20dragging=false,offsetX=0,offsetY=0;document.getElementById(%22vs-top-row%22).addEventListener(%22mousedown%22,function(e){dragging=true;offsetX=e.clientX-panel.offsetLeft;offsetY=e.clientY-panel.offsetTop;});document.addEventListener(%22mousemove%22,function(e){if(dragging){panel.style.left=(e.clientX-offsetX)+%22px%22;panel.style.top=(e.clientY-offsetY)+%22px%22;}});document.addEventListener(%22mouseup%22,function(){dragging=false;});document.addEventListener(%22fullscreenchange%22,function(){if(document.fullscreenElement){document.fullscreenElement.appendChild(panel);}else{document.body.appendChild(panel);}});var%20video=null;function%20findVideo(){video=document.querySelector(%22video%22);}setInterval(findVideo,500);function%20formatTime(t){var%20m=Math.floor(t/60),s=Math.floor(t%2560);return%20(m%3C10?%220%22:%22%22)+m+%22:%22+(s%3C10?%220%22:%22%22)+s;}function%20formatSec(sec){sec=Math.floor(sec);return%20(sec%3C10?%220%22:%22%22)+sec+%22s%22;}var%20loopActive=false,lStart=0,lEnd=0;function%20updateLiveInfo(){if(!video)return;currentTimeEl.textContent=%22%E2%8F%B1%EF%B8%8F%20%22+formatTime(video.currentTime);speedSelect.value=video.playbackRate;if(loopActive){loopButton.classList.add(%22active-loop%22);document.getElementById(%22vs-loop-settings-container%22).style.display=%22block%22;document.getElementById(%22vs-loop-start-time%22).textContent=formatTime(lStart);document.getElementById(%22vs-loop-end-time%22).textContent=formatTime(lEnd);document.getElementById(%22vs-loop-duration%22).textContent=formatSec(lEnd-lStart);}else{loopButton.classList.remove(%22active-loop%22);document.getElementById(%22vs-loop-settings-container%22).style.display=%22none%22;}}setInterval(updateLiveInfo,500);setInterval(function(){if(loopActive&&video&&video.currentTime%3ElEnd)video.currentTime=lStart;},300);backButton.addEventListener(%22click%22,function(){if(video)video.currentTime-=5;});forwardButton.addEventListener(%22click%22,function(){if(video)video.currentTime+=5;});playButton.addEventListener(%22click%22,function(){if(video){video.paused?video.play():video.pause();}});speedSelect.addEventListener(%22change%22,function(e){if(video)video.playbackRate=parseFloat(e.target.value);});function%20toggleLoop(){if(!video)return;loopActive=!loopActive;if(loopActive){lEnd=video.currentTime;lStart=Math.max(0,video.currentTime-10);}updateLiveInfo();}loopButton.addEventListener(%22click%22,toggleLoop);document.addEventListener(%22keydown%22,function(e){if(!video||%22INPUT%20SELECT%20TEXTAREA%22.includes(e.target.tagName))return;switch(e.key){case%20%22ArrowLeft%22:video.currentTime-=5;break;case%20%22ArrowRight%22:video.currentTime+=5;break;case%20%22ArrowUp%22:video.playbackRate=Math.min(3,video.playbackRate+0.25);break;case%20%22ArrowDown%22:video.playbackRate=Math.max(0.25,video.playbackRate-0.25);break;case%20%22%20%22:video.paused?video.play():video.pause();break;case%20%22s%22:case%20%22S%22:toggleLoop();break;case%20%22a%22:case%20%22A%22:if(video)lStart=video.currentTime;break;case%20%22b%22:case%20%22B%22:if(video)lEnd=video.currentTime;break;case%20%22q%22:case%20%22Q%22:lStart=Math.max(0,lStart-1);break;case%20%22w%22:case%20%22W%22:lStart=Math.min(lEnd-1,lStart+1);break;case%20%22o%22:case%20%22O%22:lEnd=Math.max(lStart+1,lEnd-1);break;case%20%22p%22:case%20%22P%22:lEnd=lEnd+1;break;case%20%22z%22:case%20%22Z%22:if(video)video.currentTime=lStart;break;case%20%22r%22:case%20%22R%22:if(video){video.currentTime=lStart;video.play();}break;}updateLiveInfo();});infoIcon.addEventListener(%22mouseenter%22,function(){helpOverlay.style.display=%22block%22;});infoIcon.addEventListener(%22mouseleave%22,function(){helpOverlay.style.display=%22none%22;});})();
    ```

2. **Create a New Bookmark:**
   - **Chrome:** Right-click the bookmarks bar and select “Add page…”.

3. **Paste the Code:**  
   Paste the one‑line code into the URL or Location field of the bookmark.

4. **Name Your Bookmark:**  
   For example, name it “VolleySkip+ Bookmarklet.”

5. **Usage:**  
   Navigate to a webpage with a video and click the bookmark to inject the control panel.

## Usage Instructions

- **Skip Controls:**  
  - Click ⏪ to skip 5 seconds backward.
  - Click ⏩ to skip 5 seconds forward.
- **Play/Pause:**  
  - Click ⏯️ or press the spacebar to toggle play/pause.
- **Playback Speed:**  
  - Select a desired speed from the 🚀 dropdown.
- **Loop Mode:**  
  - Click the loop button (🔁) or press "S" to toggle loop mode. When enabled, it loops the last 10 seconds of the video.
- **Draggability:**  
  - Drag the top row (which is divided into left, middle, and right sections) to move the panel.
- **Help Overlay:**  
  - Hover over the info icon (ℹ️) to display the usage instructions and hotkeys.


## 🐞 Bugs / TODO

We're currently looking for a solution to improve how the control panel behaves when the user navigates away from the VBTV video player.

**Known issue:**  
If you leave the player (e.g. by navigating to another page or closing the player), the VolleySkip+ panel may remain visible but becomes unresponsive.

We're exploring ways to detect player state changes and automatically clean up or reattach the panel. Suggestions and PRs are welcome!

## License

**MIT License**

Copyright (c) [2025] [Leandoer969]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contributing

Contributions, bug reports, and feature suggestions are welcome. Please submit pull requests or open issues on GitHub.

## Repository

You can view and clone the full source code at:  
https://github.com/leandoer969/VolleySkip
