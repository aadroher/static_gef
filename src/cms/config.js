const gitlabAppId =
  '6a0450f42ec3213087bc3459fe4695ffb11e77e9aac312228dd95eab95197acc';

const backend = {
  name: 'gitlab',
  repo: 'aadroher/gef',
  auth_type: 'implicit',
  app_id: gitlabAppId,
  branch: 'master',
};

const mediaFolder = 'static/images/uploads';
const publicFolder = '/images/uploads';

const slug = {
  encoding: 'ascii',
  clean_accents: true,
};

const languages = [
  {
    laguageCode: 'ca',
    name: 'Català',
  },
  {
    languageCode: 'es',
    name: 'Castellà',
  },
  {
    languageCode: 'en',
    name: 'Anglès',
  },
];

const getActivitiesSchema = ({ languageCode }) => ({
  name: `activities_${languageCode}`,
  label: `Activitats (${languageCode})`,
  label_singular: `Activitat (${languageCode})`,
  folder: 'data/collections/activities',
  filter: {
    field: 'languageCode',
    value: languageCode,
  },
  create: true,
  slug: `{{year}}-{{month}}-{{day}}-${languageCode}-{{slug}}`,
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'activity',
      required: true,
    },
    {
      name: 'createdAt',
      label: 'Creat el',
      widget: 'datetime',
    },
    {
      name: 'languageCode',
      label: 'Idioma',
      widget: 'select',
      options: [
        {
          label: 'Català',
          value: 'ca',
        },
        {
          label: 'Castellà',
          value: 'es',
        },
        {
          label: 'Anglès',
          value: 'en',
        },
      ],
      default: languageCode,
    },
    {
      name: 'visible',
      label: 'Visible',
      widget: 'boolean',
      default: false,
    },
    {
      name: 'title',
      label: 'Títol',
      widget: 'string',
      required: true,
    },
    {
      name: 'body',
      label: 'Cos del Text',
      widget: 'markdown',
    },
  ],
});

const collections = [...languages.map(getActivitiesSchema)];

const config = {
  load_config_file: false,
  backend,
  media_folder: mediaFolder,
  public_folder: publicFolder,
  slug,
  collections,
};

export default config;
