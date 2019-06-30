import cheerio from 'cheerio';
import TurdownService from 'turndown';

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
    title,
    createdAt,
    visible,
  };
  const body = getMarkdown(
    $('.field-name-body')
      .first()
      .html()
  );

  const frontMatter = `---\n${yaml.stringify(frontMatterData)}---`;
  const fileContents = `${frontMatter}\n\n${body}`;

  return {
    originUrl,
    title,
    createdAt,
    body,
  };
};

const parseActivitySectionVersionPage = async sectionVersionPageData => {
  console.log({ sectionVersionPageData });
  const { languageCode, contents } = sectionVersionPageData;
  const $ = cheerio.load(contents);
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

const parseActivitySectionVersion = async sectionVersionData => {
  const { languageCode, pages } = sectionVersionData;
  const parsedPages = await Promise.all(
    pages.map(parseActivitySectionVersionPage)
  );
  return parsedPages;
  console.log({ parsedPages });
  return parsedPages.map(parsedPage => ({ languageCode, ...parsedPage }));
};

const parseActivitiesSection = async sectionData => {
  const { versions } = sectionData;
  const parsedVersions = await Promise.all(
    versions.map(parseActivitySectionVersion)
  );
  // console.log(parsedVersions[0][0]);
  return parsedVersions;
};

export default parseActivitiesSection;
