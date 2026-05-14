import { useState, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────
  CONSTANTS
───────────────────────────────────────── */
const ADMIN_PWD   = "Raphael2232";
const SK_BRANDS   = "rr_v6_brands";
const SK_SITE     = "rr_v6_site";
const SK_REQUESTS = "rr_v6_requests";
const SK_RTYPES   = "rr_v6_rtypes";

const DEFAULT_REPAIR_TYPES = [
 { id:"ecran_o",  label:"Écran Origine",          icon:"📱" },
 { id:"ecran_c",  label:"Écran Compatible",        icon:"🖥️" },
 { id:"batterie", label:"Batterie",                icon:"🔋" },
 { id:"dock",     label:"Dock de charge",          icon:"⚡" },
 { id:"chassis",  label:"Châssis / Vitre arrière", icon:"🔲" },
 { id:"cam_av",   label:"Caméra avant",            icon:"🤳" },
 { id:"cam_ar",   label:"Caméra arrière",          icon:"📷" },
];

let _c = 0;
const uid = () => `u${Date.now()}${_c++}${Math.random().toString(36).slice(2,5)}`;
const pr  = (a,b,c,d,e,f,g) => ({
 ecran_o:a??null, ecran_c:b??null, batterie:c??null,
 dock:d??null, chassis:e??null, cam_av:f??null, cam_ar:g??null,
});

/* ─────────────────────────────────────────
  DEFAULT BRANDS & MODELS
───────────────────────────────────────── */
const DEFAULT_BRANDS = [
 {
   id:"apple", name:"Apple",
   logo:"https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
   accent:"#1d1d1f", bgGrad:"linear-gradient(135deg,#f5f5f7 0%,#e2e2e7 100%)",
   models:[
     {id:uid(),name:"iPhone 17 Pro Max",   order:1,  prices:pr(499,299,119,79,189,99,229)},
     {id:uid(),name:"iPhone 17 Pro",       order:2,  prices:pr(449,269,109,79,169,89,199)},
     {id:uid(),name:"iPhone 17 Plus",      order:3,  prices:pr(399,249,99,69,149,79,179)},
     {id:uid(),name:"iPhone 17",           order:4,  prices:pr(369,229,89,69,139,79,169)},
     {id:uid(),name:"iPhone 17e",          order:5,  prices:pr(329,199,79,59,119,69,149)},
     {id:uid(),name:"iPhone Air",          order:6,  prices:pr(349,219,89,69,129,79,159)},
     {id:uid(),name:"iPhone 16 Pro Max",   order:7,  prices:pr(459,279,109,75,179,95,219)},
     {id:uid(),name:"iPhone 16 Pro",       order:8,  prices:pr(419,259,99,75,159,85,189)},
     {id:uid(),name:"iPhone 16 Plus",      order:9,  prices:pr(369,239,89,65,139,75,169)},
     {id:uid(),name:"iPhone 16",           order:10, prices:pr(339,209,79,65,129,75,159)},
     {id:uid(),name:"iPhone 16e",          order:11, prices:pr(299,189,69,55,109,65,139)},
     {id:uid(),name:"iPhone 15 Pro Max",   order:12, prices:pr(429,259,99,69,169,89,199)},
     {id:uid(),name:"iPhone 15 Pro",       order:13, prices:pr(389,239,89,69,149,79,179)},
     {id:uid(),name:"iPhone 15 Plus",      order:14, prices:pr(339,219,79,59,129,69,159)},
     {id:uid(),name:"iPhone 15",           order:15, prices:pr(309,199,69,59,119,69,149)},
     {id:uid(),name:"iPhone 14 Pro Max",   order:16, prices:pr(389,239,89,65,159,85,189)},
     {id:uid(),name:"iPhone 14 Pro",       order:17, prices:pr(359,219,79,65,139,75,169)},
     {id:uid(),name:"iPhone 14 Plus",      order:18, prices:pr(309,199,69,55,119,65,149)},
     {id:uid(),name:"iPhone 14",           order:19, prices:pr(279,179,69,55,109,65,139)},
     {id:uid(),name:"iPhone 13 Pro Max",   order:20, prices:pr(349,209,79,59,149,79,169)},
     {id:uid(),name:"iPhone 13 Pro",       order:21, prices:pr(319,199,69,59,129,69,149)},
     {id:uid(),name:"iPhone 13 mini",      order:22, prices:pr(249,159,59,49,99,59,129)},
     {id:uid(),name:"iPhone 13",           order:23, prices:pr(289,179,69,55,119,65,139)},
     {id:uid(),name:"iPhone 12 Pro Max",   order:24, prices:pr(319,189,69,55,139,69,159)},
     {id:uid(),name:"iPhone 12 Pro",       order:25, prices:pr(289,179,59,55,119,59,139)},
     {id:uid(),name:"iPhone 12 mini",      order:26, prices:pr(219,149,49,45,89,55,119)},
     {id:uid(),name:"iPhone 12",           order:27, prices:pr(259,169,59,49,109,59,129)},
     {id:uid(),name:"iPhone SE (3e gén.)", order:28, prices:pr(189,129,49,45,79,49,109)},
     {id:uid(),name:"iPhone 11 Pro Max",   order:29, prices:pr(289,169,59,49,129,59,139)},
     {id:uid(),name:"iPhone 11 Pro",       order:30, prices:pr(259,159,49,49,109,55,129)},
     {id:uid(),name:"iPhone 11",           order:31, prices:pr(219,139,49,45,99,55,119)},
     {id:uid(),name:"iPhone XS Max",       order:32, prices:pr(259,149,49,45,119,55,129)},
     {id:uid(),name:"iPhone XS",           order:33, prices:pr(229,139,45,45,99,49,119)},
     {id:uid(),name:"iPhone XR",           order:34, prices:pr(199,129,45,39,89,49,109)},
     {id:uid(),name:"iPhone X",            order:35, prices:pr(219,139,45,45,99,49,119)},
     {id:uid(),name:"iPhone SE (2e gén.)", order:36, prices:pr(169,109,39,39,69,45,89)},
     {id:uid(),name:"iPhone 8 Plus",       order:37, prices:pr(149,99,39,35,69,45,89)},
     {id:uid(),name:"iPhone 8",            order:38, prices:pr(129,89,35,35,59,39,79)},
     {id:uid(),name:"iPhone 7 Plus",       order:39, prices:pr(129,89,35,35,59,39,79)},
     {id:uid(),name:"iPhone 7",            order:40, prices:pr(109,75,29,29,49,35,69)},
     {id:uid(),name:"iPhone 6S Plus",      order:41, prices:pr(99,65,29,25,45,29,59)},
     {id:uid(),name:"iPhone 6S",           order:42, prices:pr(89,59,25,25,39,29,55)},
     {id:uid(),name:"iPhone 6 Plus",       order:43, prices:pr(89,59,25,25,39,29,55)},
     {id:uid(),name:"iPhone 6",            order:44, prices:pr(79,49,25,25,35,25,49)},
   ]
 },
 {
   id:"samsung", name:"Samsung",
   logo:"https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
   accent:"#1428a0", bgGrad:"linear-gradient(135deg,#eef2ff 0%,#d8e0ff 100%)",
   models:[
     {id:uid(),name:"Galaxy S25 Ultra",   order:1,  prices:pr(489,289,119,79,189,99,229)},
     {id:uid(),name:"Galaxy S25+",        order:2,  prices:pr(419,259,99,69,159,89,199)},
     {id:uid(),name:"Galaxy S25",         order:3,  prices:pr(359,229,89,65,139,79,169)},
     {id:uid(),name:"Galaxy S24 Ultra",   order:4,  prices:pr(459,279,109,75,179,95,219)},
     {id:uid(),name:"Galaxy S24+",        order:5,  prices:pr(389,249,99,69,149,85,189)},
     {id:uid(),name:"Galaxy S24",         order:6,  prices:pr(329,219,89,65,129,75,159)},
     {id:uid(),name:"Galaxy S24 FE",      order:7,  prices:pr(279,189,79,59,109,65,139)},
     {id:uid(),name:"Galaxy S23 Ultra",   order:8,  prices:pr(419,259,99,69,169,89,199)},
     {id:uid(),name:"Galaxy S23+",        order:9,  prices:pr(349,219,89,65,139,79,169)},
     {id:uid(),name:"Galaxy S23",         order:10, prices:pr(299,199,79,59,119,69,149)},
     {id:uid(),name:"Galaxy S23 FE",      order:11, prices:pr(249,169,69,55,99,59,129)},
     {id:uid(),name:"Galaxy S22 Ultra",   order:12, prices:pr(379,239,89,65,159,85,189)},
     {id:uid(),name:"Galaxy S22+",        order:13, prices:pr(309,199,79,59,129,75,159)},
     {id:uid(),name:"Galaxy S22",         order:14, prices:pr(269,179,69,55,109,65,139)},
     {id:uid(),name:"Galaxy S21 Ultra",   order:15, prices:pr(349,219,79,59,149,79,179)},
     {id:uid(),name:"Galaxy S21+",        order:16, prices:pr(279,189,69,55,119,69,149)},
     {id:uid(),name:"Galaxy S21",         order:17, prices:pr(239,169,65,49,99,59,129)},
     {id:uid(),name:"Galaxy S21 FE",      order:18, prices:pr(199,149,59,49,89,55,119)},
     {id:uid(),name:"Galaxy S20 Ultra",   order:19, prices:pr(319,199,79,55,139,75,169)},
     {id:uid(),name:"Galaxy S20+",        order:20, prices:pr(259,169,65,49,109,65,139)},
     {id:uid(),name:"Galaxy S20",         order:21, prices:pr(219,149,59,45,89,59,119)},
     {id:uid(),name:"Galaxy S20 FE",      order:22, prices:pr(179,129,55,45,79,55,109)},
     {id:uid(),name:"Galaxy Z Fold 6",    order:23, prices:pr(699,null,149,99,249,129,269)},
     {id:uid(),name:"Galaxy Z Fold 5",    order:24, prices:pr(649,null,139,99,229,119,249)},
     {id:uid(),name:"Galaxy Z Fold 4",    order:25, prices:pr(599,null,129,89,209,109,229)},
     {id:uid(),name:"Galaxy Z Fold 3",    order:26, prices:pr(549,null,119,89,189,99,209)},
     {id:uid(),name:"Galaxy Z Flip 6",    order:27, prices:pr(389,null,119,79,179,99,189)},
     {id:uid(),name:"Galaxy Z Flip 5",    order:28, prices:pr(359,null,109,75,159,89,169)},
     {id:uid(),name:"Galaxy Z Flip 4",    order:29, prices:pr(319,null,99,69,139,79,149)},
     {id:uid(),name:"Galaxy Z Flip 3",    order:30, prices:pr(289,null,89,65,119,75,139)},
     {id:uid(),name:"Galaxy A55",         order:31, prices:pr(199,139,59,49,89,59,109)},
     {id:uid(),name:"Galaxy A54",         order:32, prices:pr(179,129,55,45,79,55,99)},
     {id:uid(),name:"Galaxy A35",         order:33, prices:pr(159,109,49,39,69,49,89)},
     {id:uid(),name:"Galaxy A34",         order:34, prices:pr(149,99,45,39,65,45,85)},
     {id:uid(),name:"Galaxy A15",         order:35, prices:pr(109,79,39,35,49,39,69)},
     {id:uid(),name:"Galaxy A14",         order:36, prices:pr(99,69,35,29,45,35,65)},
   ]
 },
 {
   id:"xiaomi", name:"Xiaomi",
   logo:"https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg",
   accent:"#ff6900", bgGrad:"linear-gradient(135deg,#fff4ee 0%,#ffdfc9 100%)",
   models:[
     {id:uid(),name:"Xiaomi 15 Ultra",    order:1,  prices:pr(389,239,99,69,159,89,199)},
     {id:uid(),name:"Xiaomi 15 Pro",      order:2,  prices:pr(349,219,89,65,139,79,179)},
     {id:uid(),name:"Xiaomi 15",          order:3,  prices:pr(299,189,79,59,119,69,149)},
     {id:uid(),name:"Xiaomi 14 Ultra",    order:4,  prices:pr(359,229,99,69,149,89,189)},
     {id:uid(),name:"Xiaomi 14 Pro",      order:5,  prices:pr(319,199,89,65,129,79,169)},
     {id:uid(),name:"Xiaomi 14",          order:6,  prices:pr(279,179,79,59,109,69,149)},
     {id:uid(),name:"Xiaomi 13 Ultra",    order:7,  prices:pr(329,209,89,65,139,79,179)},
     {id:uid(),name:"Xiaomi 13 Pro",      order:8,  prices:pr(289,189,79,59,119,69,159)},
     {id:uid(),name:"Xiaomi 13",          order:9,  prices:pr(249,169,69,55,99,59,139)},
     {id:uid(),name:"Xiaomi 13T Pro",     order:10, prices:pr(269,179,75,59,109,65,149)},
     {id:uid(),name:"Xiaomi 13T",         order:11, prices:pr(229,159,65,49,89,59,129)},
     {id:uid(),name:"Xiaomi 12 Pro",      order:12, prices:pr(269,179,75,55,109,65,149)},
     {id:uid(),name:"Xiaomi 12",          order:13, prices:pr(229,159,65,49,89,59,129)},
     {id:uid(),name:"Xiaomi 12T Pro",     order:14, prices:pr(249,169,69,55,99,65,139)},
     {id:uid(),name:"Xiaomi 12T",         order:15, prices:pr(209,149,59,45,79,55,119)},
     {id:uid(),name:"Redmi Note 13 Pro+", order:16, prices:pr(219,149,65,49,89,59,129)},
     {id:uid(),name:"Redmi Note 13 Pro",  order:17, prices:pr(189,129,55,45,75,55,109)},
     {id:uid(),name:"Redmi Note 13",      order:18, prices:pr(159,109,45,39,65,45,89)},
     {id:uid(),name:"Redmi Note 12 Pro+", order:19, prices:pr(199,139,59,45,79,55,119)},
     {id:uid(),name:"Redmi Note 12 Pro",  order:20, prices:pr(169,119,49,39,69,49,99)},
     {id:uid(),name:"Redmi Note 12",      order:21, prices:pr(139,99,39,35,55,45,85)},
     {id:uid(),name:"Poco X6 Pro",        order:22, prices:pr(199,139,59,49,79,55,109)},
     {id:uid(),name:"Poco X6",            order:23, prices:pr(169,119,49,39,69,49,99)},
     {id:uid(),name:"Poco F6 Pro",        order:24, prices:pr(229,159,69,55,89,65,129)},
     {id:uid(),name:"Poco F6",            order:25, prices:pr(189,139,59,45,75,55,109)},
   ]
 },
 {
   id:"google", name:"Google",
   logo:"https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
   accent:"#4285f4", bgGrad:"linear-gradient(135deg,#e8f0fe 0%,#c8dcfd 100%)",
   models:[
     {id:uid(),name:"Pixel 10 Pro XL",  order:1,  prices:pr(389,239,99,69,159,89,199)},
     {id:uid(),name:"Pixel 10 Pro",     order:2,  prices:pr(349,219,89,65,139,79,179)},
     {id:uid(),name:"Pixel 10",         order:3,  prices:pr(299,189,79,59,119,69,149)},
     {id:uid(),name:"Pixel 10a",        order:4,  prices:pr(249,169,65,49,99,59,129)},
     {id:uid(),name:"Pixel 9 Pro XL",   order:5,  prices:pr(369,229,99,69,149,85,189)},
     {id:uid(),name:"Pixel 9 Pro",      order:6,  prices:pr(329,209,89,65,129,75,169)},
     {id:uid(),name:"Pixel 9 Pro Fold", order:7,  prices:pr(599,null,139,89,219,109,229)},
     {id:uid(),name:"Pixel 9",          order:8,  prices:pr(279,179,79,59,109,65,149)},
     {id:uid(),name:"Pixel 9a",         order:9,  prices:pr(229,159,65,49,89,59,129)},
     {id:uid(),name:"Pixel 8 Pro",      order:10, prices:pr(309,199,89,65,129,75,169)},
     {id:uid(),name:"Pixel 8",          order:11, prices:pr(259,169,75,55,109,65,149)},
     {id:uid(),name:"Pixel 8a",         order:12, prices:pr(209,149,59,45,89,55,129)},
     {id:uid(),name:"Pixel 7 Pro",      order:13, prices:pr(279,179,79,59,119,69,159)},
     {id:uid(),name:"Pixel 7",          order:14, prices:pr(229,159,65,49,99,59,139)},
     {id:uid(),name:"Pixel 7a",         order:15, prices:pr(189,139,55,45,79,55,119)},
     {id:uid(),name:"Pixel 6 Pro",      order:16, prices:pr(249,169,69,55,109,65,149)},
     {id:uid(),name:"Pixel 6",          order:17, prices:pr(199,139,59,45,89,55,129)},
     {id:uid(),name:"Pixel 6a",         order:18, prices:pr(169,119,49,39,69,49,109)},
     {id:uid(),name:"Pixel 5",          order:19, prices:pr(179,129,55,45,79,49,119)},
     {id:uid(),name:"Pixel 5a",         order:20, prices:pr(159,109,49,39,65,45,99)},
     {id:uid(),name:"Pixel 4 XL",       order:21, prices:pr(169,119,49,39,79,49,109)},
     {id:uid(),name:"Pixel 4",          order:22, prices:pr(149,99,45,35,65,45,99)},
     {id:uid(),name:"Pixel 4a",         order:23, prices:pr(129,89,39,35,55,39,89)},
   ]
 },
 {
   id:"honor", name:"Honor",
   logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/HONOR_Logo_2020.svg/320px-HONOR_Logo_2020.svg.png",
   accent:"#cf0a2c", bgGrad:"linear-gradient(135deg,#fff0f0 0%,#fdd0d0 100%)",
   models:[
     {id:uid(),name:"Honor Magic7 Pro",  order:1,  prices:pr(319,199,89,65,129,79,169)},
     {id:uid(),name:"Honor Magic7",      order:2,  prices:pr(279,179,79,59,109,69,149)},
     {id:uid(),name:"Honor Magic7 Lite", order:3,  prices:pr(199,139,59,45,79,55,109)},
     {id:uid(),name:"Honor Magic6 Pro",  order:4,  prices:pr(299,189,85,65,119,75,159)},
     {id:uid(),name:"Honor Magic6",      order:5,  prices:pr(259,169,75,55,99,65,139)},
     {id:uid(),name:"Honor Magic6 Lite", order:6,  prices:pr(179,129,55,45,75,55,99)},
     {id:uid(),name:"Honor Magic5 Pro",  order:7,  prices:pr(279,179,79,59,109,69,149)},
     {id:uid(),name:"Honor Magic V3",    order:8,  prices:pr(549,null,129,89,199,99,219)},
     {id:uid(),name:"Honor Magic V2",    order:9,  prices:pr(499,null,119,85,179,95,199)},
     {id:uid(),name:"Honor 200 Pro",     order:10, prices:pr(249,169,69,55,99,65,139)},
     {id:uid(),name:"Honor 200",         order:11, prices:pr(209,149,59,45,79,55,119)},
     {id:uid(),name:"Honor 200 Lite",    order:12, prices:pr(169,119,49,39,65,49,99)},
     {id:uid(),name:"Honor 90 Pro",      order:13, prices:pr(229,159,65,49,89,59,129)},
     {id:uid(),name:"Honor 90",          order:14, prices:pr(189,139,55,45,75,55,109)},
     {id:uid(),name:"Honor X9b",         order:15, prices:pr(159,109,45,39,65,45,89)},
     {id:uid(),name:"Honor X8b",         order:16, prices:pr(139,95,39,35,55,39,79)},
     {id:uid(),name:"Honor X7b",         order:17, prices:pr(119,85,35,29,49,35,69)},
   ]
 },
 {
   id:"oppo", name:"Oppo",
   logo:"https://upload.wikimedia.org/wikipedia/commons/6/61/Oppo_Logo.svg",
   accent:"#1b5e20", bgGrad:"linear-gradient(135deg,#f0fdf4 0%,#c6f6d5 100%)",
   models:[
     {id:uid(),name:"Find X8 Pro",   order:1,  prices:pr(349,219,99,69,139,79,179)},
     {id:uid(),name:"Find X8",       order:2,  prices:pr(299,189,89,65,119,69,159)},
     {id:uid(),name:"Find X7 Ultra", order:3,  prices:pr(379,239,99,75,149,85,189)},
     {id:uid(),name:"Find X7 Pro",   order:4,  prices:pr(329,209,89,69,129,79,169)},
     {id:uid(),name:"Find X7",       order:5,  prices:pr(279,179,79,59,109,69,149)},
     {id:uid(),name:"Find X6 Pro",   order:6,  prices:pr(299,189,85,65,119,75,159)},
     {id:uid(),name:"Find N3",       order:7,  prices:pr(529,null,129,89,199,99,219)},
     {id:uid(),name:"Find N3 Flip",  order:8,  prices:pr(349,null,109,79,149,89,169)},
     {id:uid(),name:"Reno12 Pro",    order:9,  prices:pr(229,159,69,55,89,65,129)},
     {id:uid(),name:"Reno12",        order:10, prices:pr(189,139,59,45,75,55,109)},
     {id:uid(),name:"Reno11 Pro",    order:11, prices:pr(209,149,65,49,85,59,119)},
     {id:uid(),name:"Reno11",        order:12, prices:pr(169,119,55,45,69,49,99)},
     {id:uid(),name:"Reno10 Pro+",   order:13, prices:pr(239,159,69,55,89,59,129)},
     {id:uid(),name:"Reno10 Pro",    order:14, prices:pr(199,139,59,45,79,55,109)},
     {id:uid(),name:"Reno10",        order:15, prices:pr(159,109,49,39,65,45,89)},
     {id:uid(),name:"A98",           order:16, prices:pr(179,129,55,45,75,55,99)},
     {id:uid(),name:"A78",           order:17, prices:pr(149,99,45,35,59,45,89)},
     {id:uid(),name:"A58",           order:18, prices:pr(119,85,39,29,49,35,69)},
     {id:uid(),name:"A38",           order:19, prices:pr(99,69,29,25,39,29,59)},
   ]
 },
];

/* ─────────────────────────────────────────
  GLOBAL CSS
───────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Outfit',sans-serif;background:#eef2f7;color:#0f1b2d;min-height:100vh}
input,select,textarea,button{font-family:inherit}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#c5d3e0;border-radius:10px}
:root{
 --bl:#005BFF;--bl2:#0044CC;--bl3:#E8F0FF;--bl4:#c7d9ff;
 --g50:#f8fafc;--g100:#f1f5f9;--g200:#e2e8f0;--g300:#cbd5e1;
 --g400:#94a3b8;--g500:#64748b;--g600:#475569;--g700:#334155;
 --g800:#1e293b;--g900:#0f172a;
 --gn:#059669;--gnBg:#d1fae5;
 --rd:#dc2626;--rdBg:#fee2e2;
 --or:#d97706;--orBg:#fef3c7;
 --sh1:0 1px 4px rgba(0,0,0,.07),0 1px 2px rgba(0,0,0,.04);
 --sh2:0 4px 20px rgba(0,91,255,.09),0 2px 8px rgba(0,0,0,.06);
 --sh3:0 14px 48px rgba(0,91,255,.2),0 4px 16px rgba(0,0,0,.1);
 --r8:8px;--r12:12px;--r16:16px;--r20:20px;--r24:24px;
}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:scale(1)}}
@keyframes slideDown{from{opacity:0;max-height:0}to{opacity:1;max-height:2000px}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.aU{animation:fadeUp .38s cubic-bezier(.16,1,.3,1) both}
.aI{animation:fadeIn .25s ease both}
.aS{animation:scaleIn .32s cubic-bezier(.16,1,.3,1) both}

/* Brand tile */
.bt{
 cursor:pointer;border-radius:var(--r20);overflow:hidden;
 box-shadow:var(--sh2);border:2.5px solid transparent;
 transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s ease,border-color .2s;
 background:#fff;
}
.bt:hover{transform:translateY(-8px) scale(1.03);box-shadow:var(--sh3)}
.bt:active{transform:translateY(-2px) scale(.99)}

/* Model row */
.mr{
 background:#fff;border-radius:var(--r12);border:1.5px solid var(--g200);
 box-shadow:var(--sh1);overflow:hidden;
 transition:border-color .18s,box-shadow .18s,transform .18s;
}
.mr:hover{border-color:#93c5fd;box-shadow:var(--sh2);transform:translateX(3px)}
.mr.open{border-color:#3b82f6;box-shadow:0 4px 20px rgba(59,130,246,.18)}

/* Price chip */
.pc{
 background:#fff;border:1.5px solid var(--g200);border-radius:14px;
 padding:14px 15px;transition:transform .16s,box-shadow .16s,border-color .16s;
}
.pc:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,91,255,.14);border-color:#93c5fd}

/* Suggestion open btn */
.sb{
 margin-top:9px;background:none;border:1.5px dashed #93c5fd;border-radius:8px;
 color:var(--bl);font-size:11px;font-weight:700;cursor:pointer;
 display:flex;align-items:center;gap:5px;padding:6px 10px;width:100%;
 justify-content:center;transition:background .15s,border-color .15s;
}
.sb:hover{background:#eff6ff;border-color:#3b82f6}

/* Tags */
.tag{display:inline-flex;align-items:center;gap:4px;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:700}
.tg{background:var(--gnBg);color:var(--gn)}
.tr{background:var(--rdBg);color:var(--rd)}
.to{background:var(--orBg);color:var(--or)}
.tb{background:var(--bl3);color:var(--bl2)}
`;

/* ─────────────────────────────────────────
  ICONS
───────────────────────────────────────── */
const I = (c,s=16,w=2) =>
 <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
   strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">{c}</svg>;

const ISearch  = () => I(<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>);
const ILock    = () => I(<><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>);
const IBell    = () => I(<><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>);
const IPlus    = () => I(<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,16,2.5);
const ITrash   = () => I(<><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></>,15);
const IEdit    = () => I(<><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,15);
const ICheck   = () => I(<polyline points="20 6 9 17 4 12"/>,16,2.5);
const IX       = () => I(<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>);
const IChevD   = () => I(<polyline points="6 9 12 15 18 9"/>);
const IChevU   = () => I(<polyline points="18 15 12 9 6 15"/>);
const IGrid    = () => I(<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>);
const ISettings= () => I(<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>);
const IEye     = () => I(<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>);
const IBack    = () => I(<><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>);
const IArrowU  = () => I(<polyline points="18 15 12 9 6 15"/>,13,2.5);
const IArrowD  = () => I(<polyline points="6 9 12 15 18 9"/>,13,2.5);

/* ─────────────────────────────────────────
  BTN
───────────────────────────────────────── */
function Btn({children,variant="primary",size="md",full,disabled,onClick,style:s={}}){
 const V={
   primary:  {bg:"var(--bl)",   c:"#fff",       b:"none"},
   secondary:{bg:"var(--g100)", c:"var(--g700)", b:"none"},
   outline:  {bg:"transparent", c:"var(--bl)",   b:"1.5px solid var(--bl)"},
   danger:   {bg:"var(--rdBg)", c:"var(--rd)",   b:"none"},
   success:  {bg:"var(--gnBg)", c:"var(--gn)",   b:"none"},
   ghost:    {bg:"transparent", c:"var(--g500)", b:"none"},
   white:    {bg:"#fff",        c:"var(--bl)",   b:"1px solid var(--g200)"},
 };
 const S={
   sm:{p:"5px 10px", fs:"12px", r:"7px",  fw:600},
   md:{p:"8px 16px", fs:"13px", r:"9px",  fw:600},
   lg:{p:"11px 22px",fs:"14px", r:"11px", fw:700},
 };
 const v=V[variant]||V.primary, sz=S[size]||S.md;
 return(
   <button disabled={disabled} onClick={onClick} style={{
     display:"inline-flex",alignItems:"center",gap:"6px",
     padding:sz.p,fontSize:sz.fs,borderRadius:sz.r,fontWeight:sz.fw,
     background:v.bg,color:v.c,border:v.b,
     width:full?"100%":"auto",justifyContent:full?"center":"flex-start",
     opacity:disabled?.4:1,whiteSpace:"nowrap",flexShrink:0,
     cursor:disabled?"not-allowed":"pointer",transition:"opacity .15s,transform .12s",...s
   }}
   onMouseDown={e=>{if(!disabled)e.currentTarget.style.transform="scale(.96)"}}
   onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
   onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
> {children}</button>
 );
}

/* ─────────────────────────────────────────
  MODAL
───────────────────────────────────────── */
function Modal({title,onClose,children,width=520}){
 return(
   <div style={{position:"fixed",inset:0,background:"rgba(15,27,45,.65)",backdropFilter:"blur(12px)",
     zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}
     onClick={e=>e.target===e.currentTarget&&onClose()}>
     <div className="aS" style={{background:"#fff",borderRadius:"var(--r24)",width:"100%",maxWidth:width,
       maxHeight:"90vh",display:"flex",flexDirection:"column",boxShadow:"0 32px 100px rgba(0,0,0,.28)"}}>
       <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
         padding:"20px 24px 16px",borderBottom:"1px solid var(--g100)"}}>
         <h3 style={{fontSize:"16px",fontWeight:700}}>{title}</h3>
         <button onClick={onClose} style={{background:"var(--g100)",border:"none",borderRadius:"8px",
           padding:"6px 7px",display:"flex",cursor:"pointer"}}><IX/></button>
       </div>
       <div style={{overflowY:"auto",padding:"20px 24px 24px",flex:1}}>{children}</div>
     </div>
   </div>
 );
}

/* ─────────────────────────────────────────
  FIELD
───────────────────────────────────────── */
function Field({label,hint,...props}){
 return(
   <div style={{marginBottom:"14px"}}>
     {label&&<label style={{display:"block",fontSize:"11px",fontWeight:700,color:"var(--g500)",
       textTransform:"uppercase",letterSpacing:".6px",marginBottom:"5px"}}>{label}</label>}
     {hint&&<p style={{fontSize:"11px",color:"var(--g400)",marginBottom:"5px"}}>{hint}</p>}
     <input {...props} style={{width:"100%",background:"var(--g50)",border:"1.5px solid var(--g200)",
       borderRadius:"9px",padding:"9px 12px",fontSize:"14px",color:"var(--g900)",outline:"none",
       boxSizing:"border-box",...props.style}}/>
   </div>
 );
}

/* ═══════════════════════════════════════════
  SUGGESTION FORM  (sous chaque prix)
  Fix: callback stable via prop directe
═══════════════════════════════════════════ */
function SuggestionForm({brandId,brandName,modelId,modelName,repairTypeId,repairTypeLabel,currentPrice,onSuggest}){
 const [open,   setOpen]   = useState(false);
 const [name,   setName]   = useState("");
 const [price,  setPrice]  = useState("");
 const [comment,setComment]= useState("");
 const [status, setStatus] = useState("idle"); // idle | error | sent

 function reset(){
   setName(""); setPrice(""); setComment(""); setStatus("idle"); setOpen(false);
 }

 function handleSend(){
   if(!name.trim()){ setStatus("error"); return; }
   const req = {
     id: uid(),
     date: new Date().toISOString(),
     status: "pending",
     senderName: name.trim(),
     suggestedPrice: price.trim() !== "" ? Number(price) : null,
     comment: comment.trim(),
     brandId, brandName,
     modelId, modelName,
     repairTypeId, repairTypeLabel,
     currentPrice,
   };
   onSuggest(req);           // appel direct — toujours stable via useCallback au root
   setStatus("sent");
   setTimeout(reset, 2400);
 }

 if(!open) return(
   <button className="sb" onClick={()=>setOpen(true)}>
     ✏️ Suggérer un prix
   </button>
 );

 if(status==="sent") return(
   <div style={{marginTop:"10px",padding:"11px 14px",background:"var(--gnBg)",borderRadius:"10px",
     color:"var(--gn)",fontSize:"12px",fontWeight:700,textAlign:"center"}}>
     ✅ Demande envoyée !
   </div>
 );

 return(
   <div className="aI" style={{marginTop:"10px",background:"var(--bl3)",borderRadius:"12px",
     padding:"14px",border:"1.5px solid var(--bl4)"}}>
     <p style={{fontSize:"12px",fontWeight:800,color:"var(--bl2)",marginBottom:"10px"}}>
       💬 Suggérer une modification de prix
     </p>

     {/* Nom */}
     <div style={{marginBottom:"8px"}}>
       <input value={name} onChange={e=>{setName(e.target.value);setStatus("idle");}}
         placeholder="Votre nom *"
         style={{width:"100%",border:`1.5px solid ${status==="error"&&!name.trim()?"var(--rd)":"var(--bl4)"}`,
           borderRadius:"8px",padding:"8px 10px",fontSize:"12px",background:"#fff",
           color:"var(--g900)",outline:"none",boxSizing:"border-box"}}/>
       {status==="error"&&!name.trim()&&(
         <p style={{color:"var(--rd)",fontSize:"11px",marginTop:"3px",fontWeight:600}}>⚠ Nom obligatoire</p>
       )}
     </div>

     {/* Prix suggéré */}
     <input type="number" value={price} onChange={e=>setPrice(e.target.value)}
       placeholder={`Prix suggéré €  (actuel : ${currentPrice!=null?currentPrice+"€":"—"})`}
       style={{width:"100%",border:"1.5px solid var(--bl4)",borderRadius:"8px",padding:"8px 10px",
         fontSize:"12px",background:"#fff",color:"var(--g900)",outline:"none",
         boxSizing:"border-box",marginBottom:"8px"}}/>

     {/* Commentaire */}
     <textarea value={comment} onChange={e=>setComment(e.target.value)}
       placeholder="Commentaire / motif de la demande…" rows={3}
       style={{width:"100%",border:"1.5px solid var(--bl4)",borderRadius:"8px",padding:"8px 10px",
         fontSize:"12px",background:"#fff",color:"var(--g900)",outline:"none",
         boxSizing:"border-box",resize:"vertical",fontFamily:"'Outfit',sans-serif",marginBottom:"10px"}}/>

     <div style={{display:"flex",gap:"8px"}}>
       <Btn size="sm" onClick={handleSend}><ICheck/> Envoyer</Btn>
       <Btn size="sm" variant="ghost" onClick={reset}>Annuler</Btn>
     </div>
   </div>
 );
}

/* ═══════════════════════════════════════════
  PRIX GRILLE  (dans l'accordéon modèle)
═══════════════════════════════════════════ */
function PricesGrid({model,brand,repairTypes,onSuggest}){
 return(
   <div className="aI" style={{padding:"14px 16px 18px",borderTop:"2px solid var(--g100)"}}>
     <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(168px,1fr))",gap:"10px"}}>
       {repairTypes.map(rt=>{
         const price = model.prices[rt.id];
         return(
           <div key={rt.id} className="pc">
             <div style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"7px"}}>
               <span style={{fontSize:"20px",lineHeight:1}}>{rt.icon}</span>
               <span style={{fontSize:"11px",fontWeight:700,color:"var(--g500)",lineHeight:1.2}}>{rt.label}</span>
             </div>
             <div style={{fontSize:"26px",fontWeight:900,letterSpacing:"-1.5px",lineHeight:1,
               color:price!=null?"var(--bl)":"var(--g300)",fontFamily:"'DM Mono',monospace"}}>
               {price!=null?`${price}€`:"—"}
             </div>
             {/* SUGGESTION FORM — onSuggest passé directement */}
             <SuggestionForm
               brandId={brand.id}
               brandName={brand.name}
               modelId={model.id}
               modelName={model.name}
               repairTypeId={rt.id}
               repairTypeLabel={rt.label}
               currentPrice={price}
               onSuggest={onSuggest}
             />
           </div>
         );
       })}
     </div>
   </div>
 );
}

/* ═══════════════════════════════════════════
  MODEL ROW (accordéon)
═══════════════════════════════════════════ */
function ModelRow({model,brand,repairTypes,onSuggest,delay=0}){
 const [open,setOpen] = useState(false);
 const vals  = Object.values(model.prices).filter(v=>v!=null);
 const minP  = vals.length ? Math.min(...vals) : null;

 return(
   <div className={`mr aU${open?" open":""}`} style={{animationDelay:`${delay}s`}}>
     {/* Header cliquable */}
     <div onClick={()=>setOpen(o=>!o)}
       style={{padding:"14px 18px",display:"flex",alignItems:"center",
         justifyContent:"space-between",cursor:"pointer",userSelect:"none",
         background:open?"#ebf1ff":"#fff",transition:"background .2s"}}>
       <div style={{display:"flex",alignItems:"center",gap:"11px"}}>
         <div style={{width:"9px",height:"9px",borderRadius:"50%",flexShrink:0,
           background:open?"var(--bl)":"var(--g300)",transition:"background .2s"}}/>
         <span style={{fontWeight:700,fontSize:"14px",color:"var(--g900)"}}>{model.name}</span>
       </div>
       <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
         {minP!=null&&!open&&(
           <span style={{fontSize:"12px",color:"var(--g400)",fontWeight:500,
             fontFamily:"'DM Mono',monospace"}}>dès {minP}€</span>
         )}
         <div style={{width:"30px",height:"30px",borderRadius:"8px",display:"flex",
           alignItems:"center",justifyContent:"center",transition:"all .2s",
           background:open?"var(--bl)":"var(--g100)",color:open?"#fff":"var(--g500)",
           transform:open?"rotate(180deg)":"none"}}>
           <IChevD/>
         </div>
       </div>
     </div>
     {/* Grille prix */}
     {open&&(
       <PricesGrid model={model} brand={brand} repairTypes={repairTypes} onSuggest={onSuggest}/>
     )}
   </div>
 );
}

/* ═══════════════════════════════════════════
  PUBLIC VIEW
  Écran 1 : grille de tuiles marques
  Écran 2 : liste de modèles d'une marque
═══════════════════════════════════════════ */
function PublicView({brands,siteName,repairTypes,onSuggest,onAdminClick}){
 const [screen, setScreen] = useState("brands"); // "brands"|"models"
 const [brandId,setBrandId] = useState(null);
 const [search, setSearch]  = useState("");

 const brand = brands.find(b=>b.id===brandId);

 // Résultats de recherche cross-marque
 const searchResults = search.trim().length>1
   ? brands.flatMap(b=>
       [...b.models].sort((a,x)=>a.order-x.order)
         .filter(m=>m.name.toLowerCase().includes(search.toLowerCase()))
         .map(m=>({model:m,brand:b}))
     )
   : [];

 function openBrand(id){
   setBrandId(id); setScreen("models"); setSearch("");
   window.scrollTo({top:0,behavior:"smooth"});
 }
 function goBack(){
   setScreen("brands"); setBrandId(null);
 }

 return(
   <div style={{minHeight:"100vh",background:"#eef2f7"}}>
     <style>{CSS}</style>

     {/* ── HEADER ── */}
     <header style={{background:"var(--bl)",boxShadow:"0 2px 28px rgba(0,91,255,.38)",
       position:"sticky",top:0,zIndex:100}}>
       <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 20px"}}>
         <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:"66px"}}>
           <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
             {screen==="models"&&(
               <button onClick={goBack} style={{background:"rgba(255,255,255,.18)",border:"1px solid rgba(255,255,255,.25)",
                 borderRadius:"10px",color:"#fff",padding:"8px 10px",cursor:"pointer",display:"flex",
                 marginRight:"4px",transition:"background .15s"}}
                 onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.28)"}
                 onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.18)"}>
                 <IBack/>
               </button>
             )}
             <div style={{width:"40px",height:"40px",background:"rgba(255,255,255,.2)",borderRadius:"11px",
               display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",flexShrink:0}}>
               🛠️
             </div>
             <div>
               <div style={{fontWeight:900,fontSize:"18px",color:"#fff",letterSpacing:"-.5px"}}>{siteName}</div>
               <div style={{fontSize:"10px",color:"rgba(255,255,255,.65)",fontWeight:500}}>
                 {screen==="models"&&brand
                   ? <><span style={{opacity:.6}}>Marques</span>{" › "}<span>{brand.name}</span></>
                   : "Tarifs de réparation smartphone"}
               </div>
             </div>
           </div>
           <button onClick={onAdminClick}
             style={{background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.25)",
               borderRadius:"10px",color:"#fff",padding:"8px 16px",fontSize:"12px",fontWeight:700,
               display:"flex",alignItems:"center",gap:"7px",cursor:"pointer"}}>
             <ILock/> Admin
           </button>
         </div>
         {/* Barre de recherche */}
         <div style={{paddingBottom:"16px"}}>
           <div style={{position:"relative"}}>
             <span style={{position:"absolute",left:"14px",top:"50%",transform:"translateY(-50%)",
               color:"rgba(255,255,255,.5)",pointerEvents:"none",display:"flex"}}><ISearch/></span>
             <input value={search} onChange={e=>setSearch(e.target.value)}
               placeholder="Rechercher un modèle dans toutes les marques…"
               style={{width:"100%",background:"rgba(255,255,255,.15)",
                 border:"1.5px solid rgba(255,255,255,.25)",borderRadius:"10px",
                 padding:"11px 16px 11px 44px",fontSize:"14px",color:"#fff",
                 outline:"none",boxSizing:"border-box"}}
               onFocus={e=>e.target.style.background="rgba(255,255,255,.22)"}
               onBlur={e=>e.target.style.background="rgba(255,255,255,.15)"}
             />
           </div>
         </div>
       </div>
     </header>

     {/* ── MAIN ── */}
     <main style={{maxWidth:"1200px",margin:"0 auto",padding:"28px 20px 80px"}}>

       {/* ── RÉSULTATS DE RECHERCHE ── */}
       {search.trim().length>1&&(
         <div className="aI">
           <p style={{color:"var(--g500)",fontSize:"13px",marginBottom:"18px",fontWeight:500}}>
             {searchResults.length} résultat{searchResults.length!==1?"s":""} pour{" "}
             <strong>« {search} »</strong>
           </p>
           {searchResults.length===0
             ? <div style={{textAlign:"center",padding:"60px 0",color:"var(--g400)"}}>
                 <div style={{fontSize:"48px",marginBottom:"12px"}}>🔍</div>
                 <p style={{fontWeight:600,fontSize:"15px"}}>Aucun modèle trouvé</p>
               </div>
             : <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                 {searchResults.map(({model,brand:b},i)=>(
                   <div key={model.id} className="aU" style={{animationDelay:`${i*0.022}s`}}>
                     <div style={{display:"inline-flex",alignItems:"center",gap:"7px",
                       background:"var(--bl3)",borderRadius:"7px",padding:"4px 12px",marginBottom:"5px"}}>
                       <img src={b.logo} alt="" style={{height:"15px",objectFit:"contain"}}
                         onError={e=>e.target.style.display="none"}/>
                       <span style={{fontSize:"11px",fontWeight:700,color:"var(--bl2)"}}>{b.name}</span>
                     </div>
                     <ModelRow model={model} brand={b} repairTypes={repairTypes}
                       onSuggest={onSuggest} delay={i*0.022}/>
                   </div>
                 ))}
               </div>
           }
         </div>
       )}

       {/* ── GRILLE DES TUILES MARQUES ── */}
       {!search.trim()&&screen==="brands"&&(
         <div className="aI">
           <h2 style={{fontSize:"22px",fontWeight:800,color:"var(--g800)",marginBottom:"6px"}}>
             Choisissez votre marque
           </h2>
           <p style={{fontSize:"13px",color:"var(--g400)",marginBottom:"28px"}}>
             Cliquez sur une marque pour explorer ses modèles et tarifs.
           </p>
           <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))",gap:"18px"}}>
             {brands.map((b,i)=>(
               <div key={b.id} className={`bt aU`} style={{animationDelay:`${i*0.06}s`}}
                 onClick={()=>openBrand(b.id)}
                 onMouseEnter={e=>e.currentTarget.style.borderColor=b.accent||"var(--bl)"}
                 onMouseLeave={e=>e.currentTarget.style.borderColor="transparent"}>
                 {/* Zone colorée logo */}
                 <div style={{background:b.bgGrad,padding:"26px 20px 22px",
                   display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"}}>
                   <div style={{width:"88px",height:"56px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                     <img src={b.logo} alt={b.name}
                       style={{maxWidth:"88px",maxHeight:"52px",objectFit:"contain",
                         filter:"drop-shadow(0 2px 6px rgba(0,0,0,.15))"}}
                       onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}
                     />
                     <div style={{display:"none",width:"54px",height:"54px",background:b.accent||"var(--bl)",
                       borderRadius:"14px",alignItems:"center",justifyContent:"center",
                       fontSize:"22px",fontWeight:900,color:"#fff"}}>
                       {b.name[0]}
                     </div>
                   </div>
                 </div>
                 {/* Bandeau info */}
                 <div style={{background:"#fff",padding:"13px 18px 15px",
                   borderTop:`3px solid ${b.accent||"var(--bl)"}`}}>
                   <div style={{fontWeight:800,fontSize:"16px",color:"var(--g900)",marginBottom:"4px"}}>
                     {b.name}
                   </div>
                   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                     <span style={{fontSize:"12px",color:"var(--g400)"}}>
                       {b.models.length} modèle{b.models.length>1?"s":""}
                     </span>
                     <span style={{fontSize:"12px",fontWeight:800,color:b.accent||"var(--bl)"}}>
                       Voir →
                     </span>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       )}

       {/* ── LISTE DES MODÈLES D'UNE MARQUE ── */}
       {!search.trim()&&screen==="models"&&brand&&(
         <div className="aI">
           {/* Header marque */}
           <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"24px",
             background:"#fff",borderRadius:"var(--r16)",padding:"20px 24px",
             boxShadow:"var(--sh2)",borderLeft:`5px solid ${brand.accent||"var(--bl)"}`}}>
             <div style={{width:"72px",height:"50px",display:"flex",alignItems:"center",justifyContent:"center"}}>
               <img src={brand.logo} alt={brand.name}
                 style={{maxWidth:"72px",maxHeight:"48px",objectFit:"contain"}}
                 onError={e=>e.target.style.display="none"}/>
             </div>
             <div style={{flex:1}}>
               <h2 style={{fontWeight:800,fontSize:"22px",color:"var(--g900)"}}>{brand.name}</h2>
               <p style={{color:"var(--g400)",fontSize:"13px",marginTop:"2px"}}>
                 {brand.models.length} modèle{brand.models.length>1?"s":" disponible"} — cliquez pour afficher les tarifs
               </p>
             </div>
             <button onClick={goBack} style={{background:"var(--g100)",border:"none",borderRadius:"10px",
               padding:"10px 16px",fontSize:"13px",fontWeight:700,color:"var(--g600)",
               cursor:"pointer",display:"flex",alignItems:"center",gap:"6px"}}>
               <IBack/> Marques
             </button>
           </div>

           {/* Modèles */}
           <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
             {[...brand.models].sort((a,b)=>a.order-b.order).map((m,i)=>(
               <ModelRow key={m.id} model={m} brand={brand}
                 repairTypes={repairTypes} onSuggest={onSuggest} delay={i*0.024}/>
             ))}
           </div>
         </div>
       )}
     </main>
   </div>
 );
}

/* ═══════════════════════════════════════════
  ADMIN — ONGLET MARQUES & MODÈLES
═══════════════════════════════════════════ */
const RT_KEYS   = ["ecran_o","ecran_c","batterie","dock","chassis","cam_av","cam_ar"];
const RT_ICONS  = {ecran_o:"📱",ecran_c:"🖥️",batterie:"🔋",dock:"⚡",chassis:"🔲",cam_av:"🤳",cam_ar:"📷"};
const RT_LABELS = {ecran_o:"Écran Origine",ecran_c:"Écran Compat.",batterie:"Batterie",dock:"Dock",chassis:"Châssis/Vitre",cam_av:"Cam. avant",cam_ar:"Cam. arrière"};

function AdminBrandsTab({brands,setBrands}){
 const [activeBrandId,setActiveBrandId] = useState(brands[0]?.id||null);
 const [modal,setModal] = useState(null);
 const [form, setForm]  = useState({});

 const brand  = brands.find(b=>b.id===activeBrandId);
 const sorted = brand?[...brand.models].sort((a,b)=>a.order-b.order):[];

 // ─ brand actions
 function saveBrand(){
   if(!form.name?.trim())return;
   if(modal.type==="addBrand"){
     setBrands(bs=>[...bs,{id:uid(),name:form.name.trim(),logo:form.logo||"",
       accent:form.accent||"#005BFF",bgGrad:`linear-gradient(135deg,#f0f4ff,#dbeafe)`,models:[]}]);
   } else {
     setBrands(bs=>bs.map(b=>b.id===modal.data.id
       ?{...b,name:form.name||b.name,logo:form.logo??b.logo,accent:form.accent||b.accent}:b));
   }
   setModal(null);
 }
 function deleteBrand(id){
   if(!confirm("Supprimer cette marque et tous ses modèles ?"))return;
   setBrands(bs=>bs.filter(b=>b.id!==id));
   if(activeBrandId===id) setActiveBrandId(brands.find(b=>b.id!==id)?.id||null);
 }

 // ─ model actions
 function saveModel(){
   if(!form.name?.trim())return;
   if(modal.type==="addModel"){
     const m={id:uid(),name:form.name.trim(),order:(brand.models.length)+1,
       prices:Object.fromEntries(RT_KEYS.map(k=>[k,null]))};
     setBrands(bs=>bs.map(b=>b.id===activeBrandId?{...b,models:[...b.models,m]}:b));
   } else {
     const np={};
     RT_KEYS.forEach(k=>{const v=form[k]; np[k]=(v===""||v===undefined||v===null)?null:Number(v);});
     setBrands(bs=>bs.map(b=>b.id===activeBrandId
       ?{...b,models:b.models.map(m=>m.id===modal.data.id?{...m,name:form.name||m.name,prices:np}:m)}:b));
   }
   setModal(null);
 }
 function deleteModel(mid){
   setBrands(bs=>bs.map(b=>b.id===activeBrandId?{...b,models:b.models.filter(m=>m.id!==mid)}:b));
 }
 function moveModel(mid,dir){
   setBrands(bs=>bs.map(b=>{
     if(b.id!==activeBrandId)return b;
     const s=[...b.models].sort((a,x)=>a.order-x.order);
     const i=s.findIndex(m=>m.id===mid),ni=i+dir;
     if(ni<0||ni>=s.length)return b;
     [s[i],s[ni]]=[s[ni],s[i]];
     return{...b,models:s.map((m,idx)=>({...m,order:idx+1}))};
   }));
 }

 return(
   <div style={{display:"flex",flex:1,overflow:"hidden"}}>
     {/* Sidebar marques */}
     <div style={{width:"230px",background:"#fff",borderRight:"1px solid var(--g200)",overflowY:"auto",flexShrink:0}}>
       <div style={{padding:"14px 12px 10px",borderBottom:"1px solid var(--g100)",
         display:"flex",justifyContent:"space-between",alignItems:"center"}}>
         <span style={{fontSize:"11px",fontWeight:800,color:"var(--g500)",textTransform:"uppercase",letterSpacing:".6px"}}>
           Marques
         </span>
         <Btn size="sm" onClick={()=>{setForm({});setModal({type:"addBrand"})}}><IPlus/></Btn>
       </div>
       {brands.map(b=>(
         <div key={b.id} onClick={()=>setActiveBrandId(b.id)}
           style={{display:"flex",alignItems:"center",gap:"8px",padding:"11px 14px",cursor:"pointer",
             background:activeBrandId===b.id?"var(--bl3)":"transparent",
             borderLeft:activeBrandId===b.id?"3px solid var(--bl)":"3px solid transparent",
             transition:"all .12s"}}>
           <div style={{width:"32px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
             {b.logo
               ?<img src={b.logo} alt="" style={{maxWidth:"32px",maxHeight:"22px",objectFit:"contain"}} onError={e=>e.target.style.opacity="0"}/>
               :<span style={{fontSize:"14px",fontWeight:800,color:"var(--bl)"}}>{b.name[0]}</span>}
           </div>
           <div style={{flex:1,minWidth:0}}>
             <div style={{fontWeight:700,fontSize:"13px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
               color:activeBrandId===b.id?"var(--bl)":"var(--g800)"}}>{b.name}</div>
             <div style={{fontSize:"10px",color:"var(--g400)"}}>{b.models.length} modèles</div>
           </div>
           <div style={{display:"flex",gap:"2px",flexShrink:0}}>
             <button onClick={e=>{e.stopPropagation();setForm({name:b.name,logo:b.logo||"",accent:b.accent||"#005BFF"});setModal({type:"editBrand",data:b});}}
               style={{background:"none",border:"none",color:"var(--g400)",cursor:"pointer",padding:"3px",display:"flex"}}><IEdit/></button>
             <button onClick={e=>{e.stopPropagation();deleteBrand(b.id);}}
               style={{background:"none",border:"none",color:"var(--rd)",cursor:"pointer",padding:"3px",display:"flex"}}><ITrash/></button>
           </div>
         </div>
       ))}
     </div>

     {/* Liste modèles */}
     <div style={{flex:1,overflowY:"auto",padding:"20px 24px"}}>
       {brand?(
         <>
           <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}>
             <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
               {brand.logo&&<img src={brand.logo} alt="" style={{height:"30px",objectFit:"contain"}} onError={e=>e.target.style.display="none"}/>}
               <div>
                 <h2 style={{fontWeight:800,fontSize:"18px"}}>{brand.name}</h2>
                 <p style={{color:"var(--g400)",fontSize:"12px"}}>{brand.models.length} modèles</p>
               </div>
             </div>
             <Btn onClick={()=>{setForm({name:""});setModal({type:"addModel"})}}><IPlus/> Ajouter un modèle</Btn>
           </div>

           <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
             {sorted.map((m,idx)=>(
               <div key={m.id} style={{background:"#fff",borderRadius:"var(--r12)",boxShadow:"var(--sh1)",
                 padding:"12px 16px",display:"flex",alignItems:"flex-start",gap:"10px",
                 border:"1.5px solid var(--g100)"}}>
                 {/* Ordre */}
                 <div style={{display:"flex",flexDirection:"column",gap:"3px",paddingTop:"2px"}}>
                   <button onClick={()=>moveModel(m.id,-1)} disabled={idx===0}
                     style={{background:"var(--g100)",border:"none",borderRadius:"5px",padding:"4px 5px",
                       cursor:idx===0?"default":"pointer",opacity:idx===0?.3:1,display:"flex"}}><IArrowU/></button>
                   <button onClick={()=>moveModel(m.id,1)} disabled={idx===sorted.length-1}
                     style={{background:"var(--g100)",border:"none",borderRadius:"5px",padding:"4px 5px",
                       cursor:idx===sorted.length-1?"default":"pointer",opacity:idx===sorted.length-1?.3:1,display:"flex"}}><IArrowD/></button>
                 </div>
                 <div style={{flex:1,minWidth:0}}>
                   <div style={{fontWeight:700,fontSize:"14px",marginBottom:"8px"}}>{m.name}</div>
                   <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
                     {RT_KEYS.map(k=>(
                       <span key={k} style={{fontSize:"11px",background:"var(--g100)",borderRadius:"6px",
                         padding:"2px 8px",color:"var(--g600)",fontFamily:"'DM Mono',monospace"}}>
                         {RT_ICONS[k]} {m.prices[k]!=null?`${m.prices[k]}€`:"—"}
                       </span>
                     ))}
                   </div>
                 </div>
                 <div style={{display:"flex",gap:"6px",flexShrink:0}}>
                   <Btn size="sm" variant="secondary" onClick={()=>{
                     const f={name:m.name};
                     RT_KEYS.forEach(k=>f[k]=m.prices[k]!=null?String(m.prices[k]):"");
                     setForm(f); setModal({type:"editModel",data:m});
                   }}><IEdit/> Modifier</Btn>
                   <Btn size="sm" variant="danger" onClick={()=>deleteModel(m.id)}><ITrash/></Btn>
                 </div>
               </div>
             ))}
           </div>
         </>
       ):(
         <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"200px",color:"var(--g400)"}}>
           <p>Sélectionnez une marque</p>
         </div>
       )}
     </div>

     {/* Modals */}
     {(modal?.type==="addBrand"||modal?.type==="editBrand")&&(
       <Modal title={modal.type==="addBrand"?"Nouvelle marque":"Modifier la marque"} onClose={()=>setModal(null)}>
         <Field label="Nom *" value={form.name||""} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="ex: OnePlus"/>
         <Field label="URL du logo" value={form.logo||""} onChange={e=>setForm(f=>({...f,logo:e.target.value}))} placeholder="https://…" hint="Lien direct vers PNG ou SVG"/>
         {form.logo&&<img src={form.logo} alt="" style={{height:"36px",objectFit:"contain",marginBottom:"14px"}} onError={e=>e.target.style.display="none"}/>}
         <div style={{marginBottom:"14px"}}>
           <label style={{display:"block",fontSize:"11px",fontWeight:700,color:"var(--g500)",textTransform:"uppercase",letterSpacing:".6px",marginBottom:"5px"}}>Couleur accent</label>
           <input type="color" value={form.accent||"#005BFF"} onChange={e=>setForm(f=>({...f,accent:e.target.value}))}
             style={{width:"100%",height:"42px",border:"1.5px solid var(--g200)",borderRadius:"9px",padding:"4px 8px",cursor:"pointer"}}/>
         </div>
         <Btn full onClick={saveBrand} disabled={!form.name?.trim()}>
           <ICheck/> {modal.type==="addBrand"?"Créer la marque":"Enregistrer"}
         </Btn>
       </Modal>
     )}

     {(modal?.type==="addModel"||modal?.type==="editModel")&&(
       <Modal title={modal.type==="addModel"?"Nouveau modèle":"Modifier le modèle"} onClose={()=>setModal(null)} width={620}>
         <Field label="Nom du modèle *" value={form.name||""} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="ex: Galaxy S25 Ultra"/>
         {modal.type==="editModel"&&(
           <>
             <p style={{fontSize:"11px",fontWeight:700,color:"var(--g500)",textTransform:"uppercase",
               letterSpacing:".5px",marginBottom:"12px"}}>Prix (€) — laisser vide si non disponible</p>
             <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
               {RT_KEYS.map(k=>(
                 <Field key={k} label={`${RT_ICONS[k]} ${RT_LABELS[k]}`} type="number"
                   value={form[k]||""} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}
                   placeholder="—" style={{marginBottom:0}}/>
               ))}
             </div>
           </>
         )}
         <div style={{marginTop:"16px"}}>
           <Btn full onClick={saveModel} disabled={!form.name?.trim()}>
             <ICheck/> {modal.type==="addModel"?"Ajouter":"Enregistrer les prix"}
           </Btn>
         </div>
       </Modal>
     )}
   </div>
 );
}

/* ═══════════════════════════════════════════
  ADMIN — ONGLET DEMANDES
═══════════════════════════════════════════ */
function AdminRequestsTab({requests,setRequests,setBrands}){
 const pending = requests.filter(r=>r.status==="pending");
 const done    = requests.filter(r=>r.status!=="pending");

 function accept(req){
   if(req.suggestedPrice!=null&&req.brandId&&req.modelId&&req.repairTypeId){
     setBrands(bs=>bs.map(b=>b.id!==req.brandId?b:{
       ...b,models:b.models.map(m=>m.id!==req.modelId?m:{
         ...m,prices:{...m.prices,[req.repairTypeId]:req.suggestedPrice}
       })
     }));
   }
   setRequests(rs=>rs.map(r=>r.id===req.id?{...r,status:"accepted"}:r));
 }
 function refuse(id){
   setRequests(rs=>rs.map(r=>r.id===id?{...r,status:"refused"}:r));
 }

 const Card=({req})=>(
   <div style={{background:"#fff",borderRadius:"var(--r16)",padding:"18px 20px",boxShadow:"var(--sh1)",
     opacity:req.status==="pending"?1:.65,
     borderLeft:`4px solid ${req.status==="accepted"?"var(--gn)":req.status==="refused"?"var(--rd)":"var(--or)"}`}}>
     <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"10px"}}>
       <div style={{flex:1,minWidth:"200px"}}>
         <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",marginBottom:"6px"}}>
           <span style={{fontWeight:800,fontSize:"15px"}}>{req.senderName}</span>
           <span className={`tag ${req.status==="pending"?"to":req.status==="accepted"?"tg":"tr"}`}>
             {req.status==="pending"?"⏳ En attente":req.status==="accepted"?"✅ Acceptée":"❌ Refusée"}
           </span>
         </div>
         <div style={{color:"var(--bl)",fontWeight:600,fontSize:"13px",marginBottom:"4px"}}>
           {req.brandName} · {req.modelName}
         </div>
         <div style={{color:"var(--g600)",fontSize:"12px",marginBottom:"6px"}}>
           {req.repairTypeLabel} — Actuel :{" "}
           <strong>{req.currentPrice!=null?`${req.currentPrice}€`:"—"}</strong>
           {req.suggestedPrice!=null&&<> → Suggéré :{" "}
             <strong style={{color:"var(--gn)"}}>{req.suggestedPrice}€</strong></>}
         </div>
         {req.comment&&(
           <div style={{background:"var(--g50)",borderRadius:"8px",padding:"8px 12px",fontSize:"12px",
             color:"var(--g700)",fontStyle:"italic",borderLeft:"3px solid var(--g300)"}}>
             « {req.comment} »
           </div>
         )}
         <div style={{color:"var(--g400)",fontSize:"11px",marginTop:"6px"}}>
           {new Date(req.date).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})}
         </div>
       </div>
       {req.status==="pending"&&(
         <div style={{display:"flex",gap:"8px",flexShrink:0}}>
           <Btn size="sm" variant="success" onClick={()=>accept(req)}>
             <ICheck/> Accepter{req.suggestedPrice!=null?" & appliquer":""}
           </Btn>
           <Btn size="sm" variant="danger" onClick={()=>refuse(req.id)}><IX/> Refuser</Btn>
         </div>
       )}
     </div>
   </div>
 );

 return(
   <div style={{padding:"24px",overflowY:"auto",flex:1}}>
     <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"24px"}}>
       <h2 style={{fontWeight:800,fontSize:"20px"}}>Demandes de modification</h2>
       {pending.length>0&&<span className="tag to">{pending.length} en attente</span>}
     </div>

     {pending.length>0&&(
       <div style={{marginBottom:"28px"}}>
         <p style={{fontSize:"12px",fontWeight:800,color:"var(--or)",textTransform:"uppercase",
           letterSpacing:".5px",marginBottom:"12px"}}>⏳ En attente ({pending.length})</p>
         <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
           {[...pending].sort((a,b)=>new Date(b.date)-new Date(a.date)).map(r=><Card key={r.id} req={r}/>)}
         </div>
       </div>
     )}

     {done.length>0&&(
       <div>
         <p style={{fontSize:"12px",fontWeight:800,color:"var(--g500)",textTransform:"uppercase",
           letterSpacing:".5px",marginBottom:"12px"}}>Historique ({done.length})</p>
         <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
           {[...done].sort((a,b)=>new Date(b.date)-new Date(a.date)).map(r=><Card key={r.id} req={r}/>)}
         </div>
       </div>
     )}

     {requests.length===0&&(
       <div style={{textAlign:"center",padding:"80px 0",color:"var(--g400)"}}>
         <div style={{fontSize:"52px",marginBottom:"14px"}}>📭</div>
         <p style={{fontWeight:600,fontSize:"16px"}}>Aucune demande pour l'instant</p>
         <p style={{fontSize:"13px",marginTop:"6px"}}>Les suggestions de prix apparaîtront ici.</p>
       </div>
     )}
   </div>
 );
}

/* ═══════════════════════════════════════════
  ADMIN — ONGLET PARAMÈTRES
═══════════════════════════════════════════ */
function AdminSettingsTab({siteName,setSiteName,repairTypes,setRepairTypes}){
 const [nv,setNv]       = useState(siteName);
 const [saved,setSaved] = useState(false);

 function saveName(){
   setSiteName(nv.trim()||siteName);
   setSaved(true);
   setTimeout(()=>setSaved(false),2000);
 }
 function updRT(id,field,val){
   setRepairTypes(rts=>rts.map(r=>r.id===id?{...r,[field]:val}:r));
 }

 return(
   <div style={{padding:"28px",overflowY:"auto",flex:1}}>
     <h2 style={{fontWeight:800,fontSize:"20px",marginBottom:"24px"}}>Paramètres</h2>
     <div style={{maxWidth:"560px"}}>
       {/* Nom du site */}
       <div style={{background:"#fff",borderRadius:"var(--r16)",padding:"20px 24px",boxShadow:"var(--sh1)",marginBottom:"16px"}}>
         <h3 style={{fontWeight:700,fontSize:"14px",marginBottom:"16px",color:"var(--g700)"}}>🏷️ Nom du site</h3>
         <Field label="Nom affiché" value={nv} onChange={e=>setNv(e.target.value)} placeholder="Renki Reparation"/>
         <Btn onClick={saveName} variant={saved?"success":"primary"}>
           {saved?<><ICheck/> Enregistré !</>:<><ICheck/> Sauvegarder</>}
         </Btn>
       </div>

       {/* Types de réparation */}
       <div style={{background:"#fff",borderRadius:"var(--r16)",padding:"20px 24px",boxShadow:"var(--sh1)",marginBottom:"16px"}}>
         <h3 style={{fontWeight:700,fontSize:"14px",marginBottom:"6px",color:"var(--g700)"}}>🔧 Types de réparation & Icônes</h3>
         <p style={{fontSize:"12px",color:"var(--g400)",marginBottom:"14px"}}>
           Modifiez l'emoji et le libellé de chaque type. Les changements sont instantanés.
         </p>
         <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
           {repairTypes.map(rt=>(
             <div key={rt.id} style={{display:"flex",gap:"10px",alignItems:"center"}}>
               <input value={rt.icon} onChange={e=>updRT(rt.id,"icon",e.target.value)}
                 style={{width:"54px",textAlign:"center",fontSize:"20px",border:"1.5px solid var(--g200)",
                   borderRadius:"8px",padding:"6px",background:"var(--g50)",outline:"none"}}/>
               <input value={rt.label} onChange={e=>updRT(rt.id,"label",e.target.value)}
                 style={{flex:1,border:"1.5px solid var(--g200)",borderRadius:"8px",padding:"8px 12px",
                   fontSize:"13px",fontWeight:500,background:"var(--g50)",color:"var(--g900)",outline:"none"}}/>
             </div>
           ))}
         </div>
       </div>

       <div style={{background:"var(--bl3)",borderRadius:"var(--r12)",padding:"14px 18px",border:"1px solid var(--bl4)"}}>
         <p style={{fontSize:"12px",color:"var(--bl2)",fontWeight:600}}>
           💾 Toutes les données sont sauvegardées automatiquement en temps réel.
         </p>
       </div>
     </div>
   </div>
 );
}

/* ═══════════════════════════════════════════
  ADMIN DASHBOARD
═══════════════════════════════════════════ */
function AdminDashboard({brands,setBrands,requests,setRequests,siteName,setSiteName,repairTypes,setRepairTypes,onExit}){
 const [tab,setTab] = useState("brands");
 const pendingCount = requests.filter(r=>r.status==="pending").length;

 const NavItem=({id,label,icon,badge})=>(
   <button onClick={()=>setTab(id)} style={{
     width:"100%",textAlign:"left",display:"flex",alignItems:"center",gap:"9px",
     padding:"10px 14px",borderRadius:"9px",border:"none",cursor:"pointer",fontFamily:"inherit",
     background:tab===id?"var(--bl3)":"transparent",color:tab===id?"var(--bl)":"var(--g600)",
     fontWeight:tab===id?700:500,fontSize:"13px",transition:"all .12s"}}>
     {icon}{label}
     {badge>0&&<span style={{marginLeft:"auto",background:"var(--bl)",color:"#fff",borderRadius:"20px",
       padding:"1px 7px",fontSize:"11px",fontWeight:800}}>{badge}</span>}
   </button>
 );

 return(
   <div style={{display:"flex",height:"100vh",background:"var(--g50)",fontFamily:"'Outfit',sans-serif"}}>
     <style>{CSS}</style>
     <aside style={{width:"220px",background:"#fff",borderRight:"1px solid var(--g200)",
       display:"flex",flexDirection:"column",flexShrink:0}}>
       <div style={{padding:"20px 16px 14px",borderBottom:"1px solid var(--g100)"}}>
         <div style={{display:"flex",alignItems:"center",gap:"9px"}}>
           <div style={{fontSize:"22px"}}>🛠️</div>
           <div>
             <div style={{fontWeight:800,fontSize:"13px",color:"var(--bl)"}}>{siteName}</div>
             <div style={{fontSize:"10px",color:"var(--g400)"}}>Dashboard Admin</div>
           </div>
         </div>
       </div>
       <nav style={{padding:"10px",display:"flex",flexDirection:"column",gap:"2px",flex:1}}>
         <NavItem id="brands"   label="Marques & Modèles" icon={<IGrid/>}/>
         <NavItem id="requests" label="Demandes"          icon={<IBell/>} badge={pendingCount}/>
         <NavItem id="settings" label="Paramètres"        icon={<ISettings/>}/>
       </nav>
       <div style={{padding:"12px",borderTop:"1px solid var(--g100)"}}>
         <Btn variant="outline" size="sm" style={{width:"100%",justifyContent:"center"}} onClick={onExit}>
           <IEye/> Vue visiteur
         </Btn>
       </div>
     </aside>
     <main style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
       {tab==="brands"   &&<AdminBrandsTab brands={brands} setBrands={setBrands}/>}
       {tab==="requests" &&<AdminRequestsTab requests={requests} setRequests={setRequests} setBrands={setBrands}/>}
       {tab==="settings" &&<AdminSettingsTab siteName={siteName} setSiteName={setSiteName} repairTypes={repairTypes} setRepairTypes={setRepairTypes}/>}
     </main>
   </div>
 );
}

/* ═══════════════════════════════════════════
  LOGIN
═══════════════════════════════════════════ */
function Login({onSuccess}){
 const [pwd,setPwd] = useState("");
 const [err,setErr] = useState(false);
 function tryLogin(){
   if(pwd===ADMIN_PWD){onSuccess();}
   else{setErr(true);setPwd("");setTimeout(()=>setErr(false),1600);}
 }
 return(
   <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#003DA5,#005BFF 55%,#4D94FF)",
     display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",fontFamily:"'Outfit',sans-serif"}}>
     <style>{CSS}</style>
     <div className="aS" style={{background:"#fff",borderRadius:"var(--r24)",padding:"44px 40px",
       width:"100%",maxWidth:"380px",boxShadow:"0 32px 100px rgba(0,0,0,.3)",textAlign:"center"}}>
       <div style={{fontSize:"48px",marginBottom:"16px"}}>🔐</div>
       <h2 style={{fontWeight:800,fontSize:"22px",color:"var(--g900)",marginBottom:"6px"}}>Accès administrateur</h2>
       <p style={{color:"var(--g400)",fontSize:"13px",marginBottom:"28px"}}>
         Entrez votre mot de passe pour accéder au dashboard
       </p>
       <input type="password" placeholder="Mot de passe" value={pwd}
         onChange={e=>setPwd(e.target.value)} onKeyDown={e=>e.key==="Enter"&&tryLogin()}
         style={{width:"100%",background:err?"#fff5f5":"var(--g50)",
           border:`1.5px solid ${err?"var(--rd)":"var(--g200)"}`,borderRadius:"10px",
           padding:"12px 16px",fontSize:"14px",color:"var(--g900)",outline:"none",
           boxSizing:"border-box",marginBottom:"8px",transition:"border-color .2s"}}
         autoFocus/>
       {err&&<p style={{color:"var(--rd)",fontSize:"12px",fontWeight:600,marginBottom:"8px"}}>
         Mot de passe incorrect
       </p>}
       <Btn full size="lg" onClick={tryLogin}><ILock/> Se connecter</Btn>
     </div>
   </div>
 );
}

/* ═══════════════════════════════════════════
  ROOT APP
═══════════════════════════════════════════ */
export default function App(){
 const [brands,      setBrands]      = useState(DEFAULT_BRANDS);
 const [requests,    setRequests]    = useState([]);
 const [siteName,    setSiteName]    = useState("Renki Reparation");
 const [repairTypes, setRepairTypes] = useState(DEFAULT_REPAIR_TYPES);
 const [loaded,      setLoaded]      = useState(false);
 const [view,        setView]        = useState("public"); // public|login|admin
 const [adminAuth,   setAdminAuth]   = useState(false);

 // ── Chargement initial
 useEffect(()=>{
   try{const r=localStorage.getItem(SK_BRANDS);   if(r)setBrands(JSON.parse(r));}   catch{}
   try{const r=localStorage.getItem(SK_REQUESTS); if(r)setRequests(JSON.parse(r));} catch{}
   try{const r=localStorage.getItem(SK_SITE);     if(r){const d=JSON.parse(r);if(d.name)setSiteName(d.name);}} catch{}
   try{const r=localStorage.getItem(SK_RTYPES);   if(r)setRepairTypes(JSON.parse(r));} catch{}
   setLoaded(true);
 },[]);

 // ── Sauvegarde auto
 useEffect(()=>{if(loaded)try{localStorage.setItem(SK_BRANDS,   JSON.stringify(brands));}catch{}},   [brands,loaded]);
 useEffect(()=>{if(loaded)try{localStorage.setItem(SK_REQUESTS, JSON.stringify(requests));}catch{}}, [requests,loaded]);
 useEffect(()=>{if(loaded)try{localStorage.setItem(SK_SITE,     JSON.stringify({name:siteName}));}catch{}},[siteName,loaded]);
 useEffect(()=>{if(loaded)try{localStorage.setItem(SK_RTYPES,   JSON.stringify(repairTypes));}catch{}},  [repairTypes,loaded]);

 // ── Callback STABLE — ne se recréé jamais → pas de perte de référence dans SuggestionForm
 const onSuggest = useCallback((req)=>{
   setRequests(rs=>[...rs,req]);
 },[]);

 if(!loaded) return(
   <div style={{minHeight:"100vh",background:"var(--bl)",display:"flex",alignItems:"center",
     justifyContent:"center",fontFamily:"'Outfit',sans-serif"}}>
     <style>{CSS}</style>
     <div style={{textAlign:"center",color:"#fff"}}>
       <div style={{fontSize:"42px",marginBottom:"12px",animation:"pulse 1.4s infinite"}}>🛠️</div>
       <p style={{opacity:.7,fontWeight:500}}>Chargement…</p>
     </div>
   </div>
 );

 return(
   <>
     {view==="public"&&(
       <PublicView
         brands={brands}
         siteName={siteName}
         repairTypes={repairTypes}
         onSuggest={onSuggest}
         onAdminClick={()=>adminAuth?setView("admin"):setView("login")}
       />
     )}
     {view==="login"&&(
       <Login onSuccess={()=>{setAdminAuth(true);setView("admin");}}/>
     )}
     {view==="admin"&&adminAuth&&(
       <AdminDashboard
         brands={brands}           setBrands={setBrands}
         requests={requests}       setRequests={setRequests}
         siteName={siteName}       setSiteName={setSiteName}
         repairTypes={repairTypes} setRepairTypes={setRepairTypes}
         onExit={()=>setView("public")}
       />
     )}
   </>
 );
}
