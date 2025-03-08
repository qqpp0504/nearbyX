# nearbyX 專案

![Website Screenshot](src/assets/screenshot/screenshot.png)

本專案網址 (GitHub page)：https://qqpp0504.github.io/nearbyX/

nearbyX，一個使用 Google Maps API 來顯示地圖、搜尋附近地點並繪製路線的仿 Google map 專案，在此專案中，可以選擇四種地點類型進行搜索指定半徑（公尺）以內的所有店家。並且可以查看店家資訊、顧客評論等。

<br>

## 索引

- [功能展示](#功能展示)
- [使用技能與第三方套件](#使用技能與第三方套件)
- [開發工具與部署](#開發工具與部署)

<br>

## 功能展示

- **顯示地圖**：取得使用者當前位置，並且以使用者當前位置做為座標中心。

- **搜尋附近地點**：選取四種地點類型（餐廳、超商、加油站、咖啡廳）來進行搜索範圍內的搜尋，可搜索指定半徑（公尺）以內的所有店家。

- **查看店家資訊**：透過獲取 Google Maps API 提供的 Places API 來顯示商家資訊與顧客對商家的評論。

- **繪製路線**：根據選擇的目的地，繪製從使用者當前位置到目的地的步行路線。

<br>

## 使用技能與第三方套件

### 前端技術

1. **HTML**  
   使用 HTML 建立頁面結構。

2. **CSS3 & Tailwind CSS**  
   使用 Tailwind CSS 作為主要的樣式框架，並配合原生 CSS 進行便利且快速的樣式設計。

3. **JavaScript (ES6+)**  
   使用現代 JavaScript 功能來處理前端邏輯。

4. **React**  
   使用 React 開發組件化的 UI，提升開發效率並實現動態內容渲染。

5. **React Hooks**  
   透過 React Hooks 管理狀態與副作用，確保地圖能夠正確渲染與更新。

6. **EventEmitter (自訂事件系統)**  
   讓不同組件之間可以透過事件進行溝通，如觸發搜尋或繪製路線。

### 第三方套件

- **Swiper**：滑動式輪播 (Carousel) 套件，在本專案的詳細商家資訊中，有使用此套件來展示商家圖片。

<br>

## 開發工具與部署

使用 Vite 作為構建工具。 透過 Github 平台進行部署。
