import cheerio from 'cheerio';
import TurdownService from 'turndown';
import moment from 'moment';
import yaml from 'yaml';
import caseFormater from 'case';
import unidecode from 'unidecode';

import { getPageRawText } from './get';
import config from './config';

const { baseUrl } = config;

const getMarkdown = htmlText => new TurdownService().turndown(htmlText);

const parseActivityPage = pageData => {
  const { originUrl, pageRawText, languageCode } = pageData;
  const contentType = 'activity';
  const $ = cheerio.load(pageRawText);
  const createdAt = $('[property="dc:date dc:created"]').attr('content');
  const title = getMarkdown(
    $('#page-title')
      .first()
      .html()
  );
  const visible = true;
  const frontMatterData = {
    contentType,
    createdAt,
    languageCode,
    visible,
    title
  };
  const body = getMarkdown(
    $('.field-name-body')
      .first()
      .html()
  );

  const frontMatter = `---\n${yaml.stringify(frontMatterData)}---`;
  const fileContents = `${frontMatter}\n\n${body}`;
  const formatedCreatedAt = moment(createdAt).format('YYYY-MM-DD');

  const filePathPrefix = `/data/collections/${languageCode}/activities/${formatedCreatedAt}/`;

  const kebabedTitle = unidecode(caseFormater.kebab(title)).replace('"', '');
  // .substring(0, 64);
  const filePath = `${filePathPrefix}${kebabedTitle}.md`;

  return {
    originUrl,
    title,
    createdAt,
    body,
    filePath,
    fileContents
  };
};

const buildIndexPageData = ({ originUrl, languageCode, title, body }) => {
  const contentType = 'page';
  const pageCode = 'activities';

  const frontMatterData = {
    contentType,
    languageCode,
    pageCode,
    title
  };

  const frontMatter = `---\n${yaml.stringify(frontMatterData)}---`;
  const fileContents = `${frontMatter}\n\n${body}`;

  const filePathPrefix = `/data/collections/${languageCode}/pages/`;
  const filePath = `${filePathPrefix}activities.md`;

  return {
    originUrl,
    title,
    body,
    filePath,
    fileContents
  };
};

const parseActivitySectionVersionPage = async sectionVersionPageData => {
  const { languageCode, originUrl, contents } = sectionVersionPageData;
  const $ = cheerio.load(contents);

  const title = getMarkdown(
    $('#page-title')
      .first()
      .html()
  );

  const body = getMarkdown(
    $('.field-type-text-with-summary')
      .first()
      .html()
  );

  const index = buildIndexPageData({
    originUrl,
    languageCode,
    title,
    body
  });

  const activityPagesData = await Promise.all(
    $('.view-actualitat h2 a')
      .toArray()
      .map(anchor => `${baseUrl}${$(anchor).attr('href')}`)
      .map(url =>
        getPageRawText(url).then(pageRawText => ({
          originUrl: url,
          languageCode,
          pageRawText
        }))
      )
  );

  const activities = activityPagesData.map(parseActivityPage);

  return {
    index,
    activities
  };
};

const parseActivitySectionVersion = async sectionVersionData => {
  const { languageCode, pages } = sectionVersionData;
  const parsedPages = await Promise.all(
    pages.map(parseActivitySectionVersionPage)
  );
  const contents = parsedPages.reduce(
    (parsedPages, { index, activities }) => ({
      index,
      activities: [...parsedPages.activities, ...activities]
    }),
    {
      activities: []
    }
  );
  return {
    languageCode,
    ...contents
  };
};

const parseActivitiesSection = async sectionData => {
  const { name, versions } = sectionData;
  const parsedVersions = await Promise.all(
    versions.map(parseActivitySectionVersion)
  );
  return {
    name,
    versions: parsedVersions
  };
};

export default parseActivitiesSection;
