import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import TurdownService from 'turndown';

const baseUrl = 'https://www.grupdestudisfenomenologics.org';

const activitiesIndexPageDetails = {
  path: '/ca/node/50',
  pages: 4,
};

const getMarkdown = htmlText => new TurdownService().turndown(htmlText);

const getPageRawText = async url =>
  fetch(url).then(response => {
    const msg = `Fetched: ${url}`;
    console.info(msg);
    if (!response.ok) {
      console.log(response);
      const msg = `${response.status} - ${response.statusText}`;
      throw new Error(msg);
    } else {
      return response.text();
    }
  });

const parseActivityPage = pageData => {
  const { url, pageRawText } = pageData;
  const $ = cheerio.load(pageRawText);
  const title = getMarkdown(
    $('#page-title')
      .first()
      .html()
  );
  const createdAt = $('[property="dc:date dc:created"]').attr('content');
  const body = getMarkdown(
    $('.field-name-body')
      .first()
      .html()
  );
  return {
    url,
    title,
    createdAt,
    body,
  };
};

const parseActivitiesIndexPage = async ({ pageRawText }) => {
  const $ = cheerio.load(pageRawText);
  const activityPageBodies = await Promise.all(
    $('.view-actualitat h2 a')
      .toArray()
      .map(anchor => `${baseUrl}${$(anchor).attr('href')}`)
      .map(url =>
        getPageRawText(url).then(pageRawText => ({
          pageRawText,
          url,
        }))
      )
  );

  const activities = activityPageBodies.map(parseActivityPage);

  return {
    title: getMarkdown(
      $('#page-title')
        .first()
        .html()
    ),
    introText: getMarkdown(
      $('.field-type-text-with-summary')
        .first()
        .html()
    ),
    activities,
  };
};

const getActivities = async () => {
  const { path } = activitiesIndexPageDetails;
  const activitiesPagesBodies = await Promise.all(
    [...new Array(activitiesIndexPageDetails.pages).keys()].map(i => {
      const url = `${baseUrl}${path}?page=${i}`;
      return getPageRawText(url).then(pageRawText => ({
        url,
        pageRawText,
      }));
    })
  );
  const activityIndexPages = await Promise.all(
    activitiesPagesBodies.map(parseActivitiesIndexPage)
  );
  return activityIndexPages.reduce(
    (
      { activities: previousActivities = [] },
      { title, introText, activities }
    ) => ({
      url: `${baseUrl}${path}`,
      title,
      introText,
      activities: [...previousActivities, ...activities],
    }),
    {}
  );
};

const saveFile = ({ filePath, contents }) =>
  new Promise((resolve, reject) => {
    const absoluteFilePath = `${path.resolve()}${filePath}`;
    console.log(absoluteFilePath);
    fs.writeFile(absoluteFilePath, contents, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

const saveActivities = activities => {
  const filePath = '/data/raw/activities.json';
  const contents = JSON.stringify(activities, null, 2);
  return saveFile({ filePath, contents });
};

getActivities()
  .then(pageContents => {
    console.log(pageContents);
    return pageContents;
  })
  .then(saveActivities)
  .catch(err => {
    console.error(err);
  });
