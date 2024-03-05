const axios = require("axios");
const { Client } = require("@notionhq/client");

require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const getNotionDB = async () => {
  const pageId = "6b70692a-4ccd-4d66-b29b-68623e6c8fc7";
  const response = await notion.pages.retrieve({ page_id: pageId });
  console.log(response);
};

getNotionDB();
