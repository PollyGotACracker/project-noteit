// "Mac" 은 "like Mac" 보다 나중에 판단
// "Linux" 는 가장 나중에 판단
const OSList = [
  { key: ["Android"], value: "Android" },
  { key: ["webOS"], value: "webOS" },
  { key: ["like Mac"], value: "iOS" },
  { key: ["Mac"], value: "macOS" },
  { key: ["BlackBerry"], value: "BlackBerry" },
  { key: ["Win"], value: "Windows" },
  { key: ["Linux"], value: "Linux" },
];

// ["Chrome", "Safari"] 는 다른 브라우저보다 나중에, ["Safari"] 보다 먼저 판단
const browserList = [
  { key: ["Edg"], value: "Microsoft Edge" },
  { key: ["Firefox"], value: "Firefox" },
  { key: ["Opera"], value: "Opera" },
  { key: ["Whale"], value: "Whale" },
  { key: ["SamsungBrowser"], value: "Samsung Browser" },
  { key: ["Chrome", "Safari"], value: "Chrome" },
  { key: ["Safari"], value: "Safari" },
  { key: ["Trident"], value: "Internet Explorer" },
  { key: ["IEMobile"], value: "IEMobile" },
];

const mobileList = [
  "Android",
  "iPhone",
  "iPod",
  "BlackBerry",
  "Windows CE",
  "SAMSUNG",
  "LG",
  "MOT",
  "SonyEricsson",
];

const checkUserAgent = (target) => {
  const agent = window.navigator.userAgent;
  if (Array.isArray(target)) {
    return target.every((text) => agent.includes(text));
  }
  if (typeof target === "string") {
    return agent.includes(target);
  }
};

export const getOS = () => {
  for (let os of OSList) {
    if (checkUserAgent(os.key)) return os.value;
  }
  return "Unknown OS";
};

export const getBrowser = () => {
  for (let browser of browserList) {
    if (checkUserAgent(browser.key)) return browser.value;
  }
  return "Unknown Browser";
};

export const checkMobile = () => {
  for (let mobile of mobileList) {
    if (checkUserAgent(mobile)) return true;
  }
  return false;
};
