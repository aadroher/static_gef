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

export { getPageRawText };
