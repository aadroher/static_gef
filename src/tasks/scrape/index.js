import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import TurdownService from 'turndown';
import moment from 'moment';
import yaml from 'yaml';
import caseFormater from 'case';
import unidecode from 'unidecode';
import { inspect } from 'util';

import config from './config';
import getSections from './sections';

const getMarkdown = htmlText => new TurdownService().turndown(htmlText);

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

const saveActivity = async ({ title, createdAt, body }) => {
  const frontMatter = `---\n${yaml.stringify({ title })}---`;
  const fileContents = `${frontMatter}\n\n${body}`;
  console.log(fileContents);
  const filePathPrefix = '/data/collections/activities/';
  const formatedCreatedAt = moment(createdAt).format('YYYY-MM-DD');
  const kebabedTitle = `${unidecode(caseFormater.kebab(title))}.md`;
  const filePath = `${filePathPrefix}${formatedCreatedAt}-${kebabedTitle}`;
  console.log(filePath);
  return saveFile({ filePath, contents: fileContents });
};

const saveActivities = async activitiesData => {
  const activitiesDataFilePath = '/data/pages/activities.json';
  const contents = JSON.stringify(activitiesData, null, 2);
  const { activities } = activitiesData;
  await Promise.all(activities.map(saveActivity));
  return saveFile({ filePath: activitiesDataFilePath, contents });
};

// getActivities()
//   .then(pageContents => {
//     console.log(pageContents);
//     return pageContents;
//   })
//   .then(saveActivities)
//   .catch(err => {
//     console.error(err);
//   });

getSections(config)
  .then(x => inspect(x, { depth: null }))
  .then(console.log);
