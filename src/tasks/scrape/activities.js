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
  const $ = cheerio.load(pageRawText);
  const title = getMarkdown(
    $('#page-title')
      .first()
      .html()
  );
  const createdAt = $('[property="dc:date dc:created"]').attr('content');
  const visible = true;
  const frontMatterData = {
    createdAt,
    languageCode,
    visible,
    title,
  };
  const body = getMarkdown(
    $('.field-name-body')
      .first()
      .html()
  );

  const frontMatter = `---\n${yaml.stringify(frontMatterData)}---`;
  const fileContents = `${frontMatter}\n\n${body}`;
  const filePathPrefix = '/data/collections/activities/';
  const formatedCreatedAt = moment(createdAt).format('YYYY-MM-DD');
  const kebabedTitle = `${unidecode(caseFormater.kebab(title))}.md`;
  const filePath = `${filePathPrefix}${formatedCreatedAt}-${languageCode}-${kebabedTitle}`;

  return {
    originUrl,
    title,
    createdAt,
    body,
    filePath,
    fileContents,
  };
};

const parseActivitySectionVersionPage = async sectionVersionPageData => {
  const { languageCode, contents } = sectionVersionPageData;
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

  const activityPagesData = await Promise.all(
    $('.view-actualitat h2 a')
      .toArray()
      .map(anchor => `${baseUrl}${$(anchor).attr('href')}`)
      .map(url =>
        getPageRawText(url).then(pageRawText => ({
          originUrl: url,
          languageCode,
          pageRawText,
        }))
      )
  );

  const activities = activityPagesData.map(parseActivityPage);

  return {
    introText: {
      title,
      body,
    },
    activities,
  };
};

const parseActivitySectionVersion = async sectionVersionData => {
  const { languageCode, pages } = sectionVersionData;
  const parsedPages = await Promise.all(
    pages.slice(0).map(parseActivitySectionVersionPage)
  );
  const contents = parsedPages.reduce(
    (parsedPages, { introText, activities }) => ({
      introText,
      activities: [...parsedPages.activities, ...activities],
    }),
    {
      activities: [],
    }
  );
  return {
    languageCode,
    ...contents,
  };
};

const parseActivitiesSection = async sectionData => {
  const { name, versions } = sectionData;
  const parsedVersions = await Promise.all(
    versions.slice(0).map(parseActivitySectionVersion)
  );
  return {
    name,
    versions: parsedVersions,
  };
};

export default parseActivitiesSection;
