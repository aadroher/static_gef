import cheerio from 'cheerio';
import TurdownService from 'turndown';
import yaml from 'yaml';
import caseFormater from 'case';
import unidecode from 'unidecode';

import { getPageRawText } from './get';
import config from './config';

const { baseUrl } = config;

const getMarkdown = htmlText => new TurdownService().turndown(htmlText);

const buildIndexPageData = ({ originUrl, languageCode, title, body }) => {
  const contentType = 'page';
  const pageCode = 'terms';

  const frontMatterData = {
    contentType,
    languageCode,
    pageCode,
    title
  };

  const frontMatter = `---\n${yaml.stringify(frontMatterData)}---`;
  const fileContents = `${frontMatter}\n\n${body}`;

  const filePathPrefix = `/data/collections/${languageCode}/pages/`;
  const filePath = `${filePathPrefix}terms.md`;

  return {
    originUrl,
    title,
    body,
    filePath,
    fileContents
  };
};

const parseTermPage = pageData => {
  const { originUrl, pageRawText, languageCode } = pageData;
  const contentType = 'term';
  const $ = cheerio.load(pageRawText);
  const title = getMarkdown(
    $('#page-title')
      .first()
      .html()
  );
  const visible = true;
  const frontMatterData = {
    contentType,
    languageCode,
    visible,
    title
  };
  const body = getMarkdown(
    $('[property="content:encoded"]')
      .first()
      .html()
  );

  const frontMatter = `---\n${yaml.stringify(frontMatterData)}---`;
  const fileContents = `${frontMatter}\n\n${body}`;

  const filePathPrefix = `/data/collections/${languageCode}/terms/`;

  const kebabedTitle = unidecode(caseFormater.kebab(title)).replace('"', '');
  const filePath = `${filePathPrefix}${kebabedTitle}.md`;

  return {
    originUrl,
    title,
    body,
    filePath,
    fileContents
  };
};

const parseVocabularySectionVersionPage = async sectionVersionPageData => {
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

  const termPagesData = await Promise.all(
    $('.view-vocabulari .views-field-title a')
      .toArray()
      .map(anchor => `${baseUrl}${$(anchor).attr('href')}`)
      .map(async url => {
        const pageRawText = await getPageRawText(url);
        return {
          originUrl: url,
          languageCode,
          pageRawText
        };
      })
  );

  const terms = termPagesData.map(parseTermPage);

  return {
    index,
    terms
  };
};

const parseVocabularySectionVersion = async sectionVersionData => {
  const { languageCode, pages } = sectionVersionData;
  const parsedPages = await Promise.all(
    pages.map(parseVocabularySectionVersionPage)
  );
  const contents = parsedPages.reduce(
    (parsedPages, { index, terms }) => ({
      index,
      terms: [...parsedPages.terms, ...terms]
    }),
    {
      terms: []
    }
  );
  return {
    languageCode,
    ...contents
  };
};

const parseVocabularySection = async sectionData => {
  const { name, versions } = sectionData;
  const parsedVersions = await Promise.all(
    versions.map(parseVocabularySectionVersion)
  );
  return {
    name,
    versions: parsedVersions
  };
};

export default parseVocabularySection;
