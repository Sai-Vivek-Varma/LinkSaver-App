import axios from "axios";
import * as cheerio from "cheerio";

export const fetchUrlMetadata = async (url) => {
  try {
    console.log(`Fetching metadata for: ${url}`);
    const response = await axios.get(url, {
      timeout: 5000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const $ = cheerio.load(response.data);
    const title = $("title").text().trim() || getDomainName(url);
    const favicon =
      getFaviconUrl($('link[rel="icon"]').attr("href"), url) ||
      `${new URL(url).origin}/favicon.ico`;

    return {
      success: true,
      title: title,
      favicon: favicon,
      url: url,
    };
  } catch (error) {
    console.error("Metadata fetch error:", error.message);
    return {
      success: false,
      title: getDomainName(url),
      favicon: "",
      url: url,
      error: error.message,
    };
  }
};

const getDomainName = (url) => {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    return hostname.charAt(0).toUpperCase() + hostname.slice(1);
  } catch {
    return url;
  }
};

const getFaviconUrl = (href, baseUrl) => {
  if (!href) return null;

  try {
    if (href.startsWith("http")) return href;
    const base = new URL(baseUrl);
    return href.startsWith("/")
      ? `${base.origin}${href}`
      : new URL(href, baseUrl).href;
  } catch {
    return null;
  }
};
