import fetch from 'node-fetch';

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

const getPage = async ({ baseUrl, code, node, i }) => {
  const url = `${baseUrl}/${code}/node/${node}?page=${i}`;
  const contents = await getPageRawText(url);
  return {
    url,
    contents,
  };
};

const getLanguageVersions = ({ baseUrl, code, node, n }) =>
  Promise.all(
    [...Array(n).keys()].map(i => getPage({ baseUrl, code, node, i }))
  ).then(pages => ({ code, pages }));

const fetchPages = async ({ baseUrl, languages, pages }) =>
  Promise.all(
    pages.map(async ({ node, n, ...rest }) => {
      const versions = await Promise.all(
        languages.map(({ code }) =>
          getLanguageVersions({ baseUrl, code, node, n })
        )
      );
      return {
        ...rest,
        versions,
      };
    })
  );

export default fetchPages;
