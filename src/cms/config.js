const gitlabAppId =
  '6a0450f42ec3213087bc3459fe4695ffb11e77e9aac312228dd95eab95197acc';

const backend = {
  name: 'gitlab',
  repo: 'aadroher/gef',
  auth_type: 'implicit',
  app_id: gitlabAppId,
  branch: 'master'
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
  `${withDate ? '{{year}}-{{month}}-{{day}}' : ''}-{{slug}}`;

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
  slug: getSlug(true, languageCode),
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
  slug: getSlug(false, languageCode),
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

const schemaGenerators = [getActivitiesSchema, getPagesSchema];

const collections = schemaGenerators
  .map(schemaGenerator => languages.map(schemaGenerator))
  .flat();

const config = {
  local_backend: true,
  load_config_file: false,
  backend,
  media_folder: mediaFolder,
  public_folder: publicFolder,
  slug,
  collections
};

export default config;
