import axios from "axios";

export const generateSummary = async (url) => {
  try {
    const target = encodeURIComponent(url);
    const response = await axios.get(`https://r.jina.ai/http://${target}`);

    let summary = response.data;

    //triming the summary if too long
    if (summary && summary.length > 500) {
      summary = summary.substring(0, 500) + "...";
    }

    //handling multi-line text
    summary = summary.replace(/\n/g, " ").trim();

    return {
      success: true,
      summary: summary || "Summary not available",
      url,
    };
  } catch (error) {
    console.log(error);
  }
};
