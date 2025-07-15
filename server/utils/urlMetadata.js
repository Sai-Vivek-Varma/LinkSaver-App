export const fetchUrlMetadata = async (url) => {
  try {
    let title = "";
    let favicon = "";
    return {
      success: true,
      title: title || url,
      favicon,
      url,
    };
  } catch (error) {
    console.log(error);
  }
};
