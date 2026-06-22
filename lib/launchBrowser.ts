import puppeteer from "puppeteer-core";

const isVercel = process.env.VERCEL === "1";

export async function launchBrowser() {
  return puppeteer.launch({
    executablePath: isVercel
      ? "/usr/bin/chromium-browser"
      : "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: isVercel ? ["--no-sandbox", "--disable-setuid-sandbox"] : [],
    headless: true,
  });
}