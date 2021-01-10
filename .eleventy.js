module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src");
  eleventyConfig.addPassthroughCopy("assets");
};
