const cheerio = require("cheerio");
const axios = require("axios");
const Job = require("../models/jobModel");
const ENDPOINT = "https://ca.indeed.com/jobs?";
const pages = 40;

const scrapeIndeed = async (url) => {
  posts = [];
  try {
    const { data } = await axios.get(url);
    var $ = cheerio.load(data);
    $("div.jobsearch-SerpJobCard").each(function (index, element) {
      posts.push({
        title: $("h2.title", element).text().trim().replace("\n\nnew", ""),
        company: $("span.company", element).text().trim(),
        location: $("span.location", element).text() || "default",
      });
    });
    return posts;
  } catch (err) {
    console.log(err);
  }
};

const handleScraping = async (keyword) => {
  const words = keyword.split(" ");
  let urls = Array.from(Array(pages).keys()).map(
    (i) => `${ENDPOINT}q=${words[0]}+${words[1]}&start=${i * 10}`
  );
  try {
    for await (let url of urls) {
      const posts = await scrapeIndeed(url, company);
      //   console.log(posts);
      Job.insertMany(posts);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleScraping };
