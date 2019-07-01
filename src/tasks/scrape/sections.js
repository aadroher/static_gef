import parseActivitiesSection from './activities';
import { getPageRawText } from './get';

const getPage = async ({ baseUrl, languageCode, node, i }) => {
  const originUrl = `${baseUrl}/${languageCode}/node/${node}?page=${i}`;
  const contents = await getPageRawText(originUrl);
  return {
    originUrl,
    languageCode,
    node,
    i,
    contents,
  };
};

const getLanguageVersions = ({ baseUrl, languageCode, node, n }) =>
  Promise.all(
    [...Array(n).keys()].map(i => getPage({ baseUrl, languageCode, node, i }))
  ).then(pages => ({ languageCode, pages }));

const fetchSections = async ({ baseUrl, languages, pages }) =>
  Promise.all(
    pages.slice(0, 1).map(async ({ name, node, n }) => {
      const versions = await Promise.all(
        languages.map(({ code: languageCode }) =>
          getLanguageVersions({ baseUrl, languageCode, node, n })
        )
      );
      return {
        name,
        versions,
      };
    })
  );

const parseSections = async sectionsData =>
  Promise.all(
    sectionsData.map(sectionData => {
      const { name } = sectionData;
      switch (name) {
        case 'activities':
          return parseActivitiesSection(sectionData);
        default:
          return Promise.resolve(sectionData);
      }
    })
  );

const getSections = async config => {
  // return fetchSections(config);
  const sectionsData = await fetchSections(config);
  const parsedSections = await parseSections(sectionsData);
  return parsedSections;
};

export default getSections;
