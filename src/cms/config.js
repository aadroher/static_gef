const backend = {
  name: 'github',
  repo: 'aadroher/static_gef'
};

const mediaFolder = 'static/images/uploads';
const publicFolder = '/images/uploads';

const slug = {
  encoding: 'ascii',
  clean_accents: true
};

const languages = [
  {
    languageCode: 'ca',
    name: 'Català'
  },
  {
    languageCode: 'es',
    name: 'Castellà'
  },
  {
    languageCode: 'en',
    name: 'Anglès'
  }
];

const getLanguageFilter = languageCode => ({
  field: 'languageCode',
  value: languageCode
});

const getSlug = (withDate, languageCode) =>
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

const getLanguageCodeField = defaultValue => ({
  name: 'languageCode',
  label: 'Idioma',
  widget: 'select',
  options: [
    {
      label: 'Català',
      value: 'ca'
    },
    {
      label: 'Castellà',
      value: 'es'
    },
    {
      label: 'Anglès',
      value: 'en'
    }
  ],
  default: defaultValue
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
  required: true
});

const getBodyField = () => ({
  name: 'body',
  label: 'Cos del Text',
  widget: 'markdown'
});

const getActivitiesSchema = ({ languageCode }) => ({
  name: `activities_${languageCode}`,
  label: `Activitats (${languageCode})`,
  label_singular: `Activitat (${languageCode})`,
  folder: `data/collections/${languageCode}/activities`,
  create: true,
  slug: getSlug(true),
  summary: '{{title}}',
  fields: [
    getContentTypeField('activity'),
    getCreatedAtField(),
    getLanguageCodeField(languageCode),
    getVisibleField(),
    getTitleField(),
    getBodyField()
  ]
});

const getPagesSchema = ({ languageCode }) => ({
  name: `pages_${languageCode}`,
  label: `Pàgines (${languageCode})`,
  label_singular: `Pàgina (${languageCode})`,
  folder: `data/collections/${languageCode}/pages`,
  create: false,
  slug: getSlug(false),
  fields: [
    getContentTypeField('page'),
    {
      name: 'pageCode',
      widget: 'hidden',
      required: true
    },
    getLanguageCodeField(languageCode),
    getTitleField(),
    getBodyField()
  ]
});

const getTermsSchema = ({ languageCode }) => ({
  name: `terms_${languageCode}`,
  label: `Termes (${languageCode})`,
  label_singular: `Terme (${languageCode})`,
  folder: `data/collections/${languageCode}/terms`,
  create: false,
  slug: getSlug(false),
  summary: '{{title}}',
  fields: [
    getContentTypeField('term'),
    getLanguageCodeField(languageCode),
    getTitleField(),
    getTitleField(),
    getBodyField()
  ]
});

const schemaGenerators = [getActivitiesSchema, getPagesSchema, getTermsSchema];

const collections = schemaGenerators
  .map(schemaGenerator => languages.map(schemaGenerator))
  .flat();

const config = {
  locale: 'ca',
  local_backend: true,
  publish_mode: 'editorial_workflow',
  load_config_file: false,
  backend,
  media_folder: mediaFolder,
  public_folder: publicFolder,
  slug,
  collections
};

export default config;
