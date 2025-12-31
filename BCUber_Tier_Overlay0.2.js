// ==UserScript==
// @name         BCUber Tier Overlay 0.2
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Hiển thị tier + tooltip ghi chú + nâng cấp cho Uber trên bc.godfat.org, được cập nhập theo cộng đồng và xskull and dr skull(Huge thanks to him)
// @author       batcatmyman
// @match        https://bc.godfat.org/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const DATA_URL = "https://raw.githubusercontent.com/batcatmyman-cpu/The-Battle-Cats-Tierlist/main/uber_tiers.json";

  const tierColor = {
    "SSS": "#ff0000",
    "SS": "#ff0000",
    "S+": "#ff7f7f",
    "S":  "#ffbf7f",
    "S-": "#ffbf7f",
    "A+": "#ffdf7f",
    "A":  "#ffff7f",
    "A-": "#ffff7f",
    "B+": "#bfff7f",
    "B":  "#7fff7f",
    "B-": "#7fff7f",
    "C+": "#7fffff",
    "C":  "#7fffff",
    "C-": "#7fffff",
    "D+": "#7fbfff",
    "D":  "#7fbfff",
    "D-": "#7fbfff",
    "E+": "#7f7fff",
    "E":  "#7f7fff",
    "E-": "#7f7fff",
    "F+": "#7f7fff",
    "F":  "#7f7fff",
    "F-": "#7f7fff"
  };

  // CSS cho tooltip
  const style = document.createElement("style");
  style.textContent = `
    .bc-badge-wrapper { position: relative; display: inline-block; margin-left: 3px; }
    .bc-badge { font-weight: 600; padding: 0 3px; border-radius: 4px; font-size: 0.8em;
                color: #000; border: 1px solid #333; box-shadow: 0 0 2px rgba(0,0,0,0.3); }
    .bc-tooltip { visibility: hidden; background: #333; color: #fff; text-align: center;
                  border-radius: 4px; padding: 2px 6px; position: absolute; z-index: 9999;
                  bottom: 125%; left: 50%; transform: translateX(-50%); white-space: nowrap;
                  opacity: 0; transition: opacity 0.2s; }
    .bc-badge-wrapper:hover .bc-tooltip { visibility: visible; opacity: 1; }
  `;
  document.head.appendChild(style);

  // Chuẩn hóa tên để bỏ tiền tố phổ biến
  function normalizeName(str) {
    return str
      .replace(/^(Mighty|Radiant|Splendid|Wrathful|Snow Angel|Yuletide|Seabreeze|Holy|Bride|Santa|First Love|Lost World|Coast|Coastal|Tropical|Beach|Pumpkin|Winter|Frosty|Blooming|Spooky)\s+/i, "")
      .replace(/[\u2019’]/g, "'")
      .trim();
  }

  function makeBadge(rankObj) {
    const wrapper = document.createElement("span");
    wrapper.className = "bc-badge-wrapper";

    const badge = document.createElement("span");
    badge.className = "bc-badge";
    badge.textContent = rankObj.upgrade
      ? ` [${rankObj.tier} → ${rankObj.upgrade}]`
      : ` [${rankObj.tier}]`;
    badge.style.background = tierColor[rankObj.tier] || "#555";
    wrapper.appendChild(badge);

    if (rankObj.note) {
      const tooltip = document.createElement("span");
      tooltip.className = "bc-tooltip";
      tooltip.textContent = rankObj.note;
      wrapper.appendChild(tooltip);
    }

    return wrapper;
  }

  fetch(DATA_URL)
    .then(r => r.json())
    .then(uberRanks => {
      document.querySelectorAll("td, a, span").forEach(el => {
        const rawName = el.textContent.trim();
        const name = normalizeName(rawName);
        if (uberRanks[name]) {
          el.appendChild(makeBadge(uberRanks[name]));
        }
      });
    });
})();
