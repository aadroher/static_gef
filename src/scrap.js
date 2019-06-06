import fetch from 'node-fetch';
import cheerio from 'cheerio';

const baseUrl = 'https://www.grupdestudisfenomenologics.org';

const activitiesIndexPageDetails = {
  path: '/ca/node/50',
  pages: 4,
};

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
  const title = $('#page-title')
    .text()
    .trim();
  const createdAt = $('[property="dc:date dc:created"]').attr('content');
  const body = $('.field-name-body')
    .text()
    .trim();
  return {
    url,
    title,
    createdAt,
    body,
  };
};

const parseActivitiesIndexPage = async pageBody => {
  const $ = cheerio.load(pageBody);
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
    title: $('#page-title')
      .text()
      .trim(),
    introText: $('.field-type-text-with-summary')
      .first()
      .text()
      .trim(),
    activities,
  };
};

const getActivities = async () => {
  const activitiesPagesBodies = await Promise.all(
    [...new Array(activitiesIndexPageDetails.pages).keys()].map(i => {
      const { path } = activitiesIndexPageDetails;
      const url = `${baseUrl}${path}?page=${i}`;
      return getPageRawText(url);
    })
  );
  // console.log(activitiesPagesBodies);
  const activityIndexPages = await Promise.all(
    activitiesPagesBodies.map(parseActivitiesIndexPage)
  );
  return activityIndexPages.reduce(
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
