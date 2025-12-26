// ==UserScript==
// @name         Battle Cats Uber Tier Overlay
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Thêm hạng Uber từ JSON vào bc.godfat.org với màu sắc
// @author       Batcatmyman/Duong
// @match        https://bc.godfat.org/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const DATA_URL = "https://raw.githubusercontent.com/batcatmyman-cpu/The-Battle-Cats-Tierlist/main/uber_tiers.json";

  const tierColor = {
    "SS": "#ff0000",
    "S+": "#ff7f7f",
    "S":  "#ffbf7f",
    "A+": "#ffdf7f",
    "A":  "#ffff7f",
    "B+": "#bfff7f",
    "B":  "#7fff7f",
    "C":  "#7fffff",
    "D":  "#7fbfff",
    "F":  "#7f7fff"
  };

  function makeBadge(rank) {
    const span = document.createElement("span");
    span.textContent = `${rank}`;
    span.style.fontWeight = "500";
    span.style.marginLeft = "4px";
    span.style.padding = "0 4px";
    span.style.borderRadius = "4px";
    span.style.fontSize = "0.8em";
    span.style.background = tierColor[rank] || "#555";
    span.style.color = "#000";
    span.style.verticalAlign = "middle";
    span.style.border = "1px solid #333"; // viền màu xám đậm
    span.style.boxShadow = "0 0 2px rgba(0,0,0,0.3)"; // bóng nhẹ cho đẹp
    return span;
  }

  fetch(DATA_URL)
    .then(r => r.json())
    .then(uberRanks => {
      document.querySelectorAll("td, a, span").forEach(el => {
        const name = el.textContent.trim();
        if (uberRanks[name]) {
          el.appendChild(makeBadge(uberRanks[name]));
        }
      });
    });
})();
