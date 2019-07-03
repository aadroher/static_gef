import { inspect } from 'util';

import config from './config';
import getSections from './sections';
import { saveFile } from './save';

getSections(config)
  .then(x => {
    console.log(inspect(x, { depth: null }));
    return x;
  })
  .then(sections => {
    const { versions } = sections.find(({ name }) => name === 'activities');
    const activities = versions
      .map(({ index, activities }) => [index, ...activities])
      .flat();
    console.log(activities);
    return Promise.all(activities.map(saveFile));
  });
