import config from './config';
import getSections from './sections';
import { saveFile } from './save';

const supportedCollections = ['activities', 'vocabulary'];

const main = async () => {
  const sections = await getSections(config);
  const [
    { versions: activitiesVersions },
    { versions: vocabularyVersions }
  ] = sections.filter(({ name }) => supportedCollections.includes(name));

  const activities = activitiesVersions
    .map(({ index, activities }) => [index, ...activities])
    .flat();
  await Promise.all(activities.map(saveFile));
  const terms = vocabularyVersions
    .map(({ index, terms }) => [index, ...terms])
    .flat();
  await Promise.all(terms.map(saveFile));
};

main();
