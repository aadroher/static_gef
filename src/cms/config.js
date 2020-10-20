const backend = {
  name: 'github',
  repo: 'aadroher/static_gef'
};

const mediaFolder = 'static/images/uploads';
const publicFolder = '/images/uploads';
const collectionsFolderPathPrefix = 'data/collections/';

const slug = {
  encoding: 'ascii',
  clean_accents: true
};

const getSlug = withDate =>
  `${withDate ? '{{year}}-{{month}}-{{day}}' : ''}_{{slug}}`;

const getContentTypeField = contentType => ({
  name: 'contentType',
  widget: 'hidden',
  default: contentType,
  required: true
});

const getCreatedAtField = () => ({
  name: 'createdAt',
  label: 'Creat el',
  widget: 'datetime'
});

const getPageCodeField = () => ({
  name: 'pageCode',
  widget: 'hidden',
  required: true
});

const getVisibleField = () => ({
  name: 'visible',
  label: 'Visible',
  widget: 'boolean',
  default: false
});

const getTitleField = () => ({
  name: 'title',
  label: 'Títol',
  widget: 'string',
  required: true,
  i18n: true
});

const getBodyField = () => ({
  name: 'body',
  label: 'Cos del Text',
  widget: 'markdown',
  i18n: true
});

const getPagesSchema = () => ({
  name: 'pages',
  label: 'Pàgines',
  label_singular: 'Pàgina',
  folder: `${collectionsFolderPathPrefix}pages`,
  create: false,
  slug: getSlug(false),
  i18n: true,
  fields: [
    getContentTypeField('page'),
    getPageCodeField(),
    getTitleField(),
    getBodyField()
  ]
});

const getActivitiesSchema = () => ({
  name: 'activities',
  label: 'Activitats',
  label_singular: 'Activitat',
  folder: `${collectionsFolderPathPrefix}activities`,
  create: true,
  slug: getSlug(true),
  summary: '{{title}}',
  i18n: true,
  fields: [
    getContentTypeField('activity'),
    getCreatedAtField(),
    getVisibleField(),
    getTitleField(),
    getBodyField()
  ]
});

const getTermsSchema = () => ({
  name: 'terms',
  label: 'Termes',
  label_singular: 'Terme',
  folder: `${collectionsFolderPathPrefix}terms`,
  create: false,
  slug: getSlug(false),
  summary: '{{title}}',
  i18n: true,
  fields: [
    getContentTypeField('term'),
    getVisibleField(),
    getTitleField(),
    getBodyField()
  ]
});

const schemaGenerators = [getActivitiesSchema, getPagesSchema, getTermsSchema];

const collections = schemaGenerators.map(generateSchema => generateSchema());

const i18nConfig = {
  i18n: {
    structure: 'multiple_folders',
    locales: ['ca', 'en', 'es'],
    default_locale: 'ca'
  }
};

const config = {
  local_backend: true,
  locale: 'ca',
  publish_mode: 'editorial_workflow',
  load_config_file: false,
  backend,
  media_folder: mediaFolder,
  public_folder: publicFolder,
  slug,
  ...i18nConfig,
  collections
};

export default config;
