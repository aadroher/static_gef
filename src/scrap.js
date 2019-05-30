import fetch from 'node-fetch';
import cheerio from 'cheerio';

const baseUrl = 'https://www.grupdestudisfenomenologics.org';

const activitiesPage = {
  path: '/ca/node/50',
  pages: 4,
};

const parseActivitiesPage = pageBody => {
  const $ = cheerio.load(pageBody);
  return {
    title: $('#page-title')
      .text()
      .trim(),
    introText: $('.field-type-text-with-summary')
      .first()
      .text()
      .trim(),
    activities: $('.view-actualitat h2 a')
      .toArray()
      .map(anchor => `${baseUrl}${$(anchor).attr('href')}`),
  };
};

const getPageBody = async url =>
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

const getActivities = async () => {
  const activitiesPagesBodies = await Promise.all(
    [...new Array(activitiesPage.pages).keys()].map(i => {
      const { path } = activitiesPage;
      const url = `${baseUrl}${path}?page=${i}`;
      return getPageBody(url);
    })
  );
  // console.log(activitiesPagesBodies);
  return activitiesPagesBodies.map(parseActivitiesPage).reduce(
    (
      { activities: previousActivities = [] },
      { title, introText, activities }
    ) => ({
      title,
      introText,
      activities: [...previousActivities, ...activities],
    }),
    {}
  );
};

getActivities()
  .then(pageContents => {
    console.log(pageContents);
  })
  .catch(err => {
    console.error(err);
  });
