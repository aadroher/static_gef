import config from './config';
import getSections from './sections';
import { saveFile } from './save';

const main = async () => {
  const sections = await getSections(config);
  const { versions } = sections.find(({ name }) => name === 'activities');
  const activities = versions
    .map(({ index, activities }) => [index, ...activities])
    .flat();
  console.log(activities);
  await Promise.all(activities.map(saveFile));
};

main();
