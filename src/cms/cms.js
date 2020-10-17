window.CMS_MANUAL_INIT = true;

import CMS from 'netlify-cms-app';
import { ca, es } from 'netlify-cms-locales';

import config from './config';

CMS.init({ config });
CMS.registerLocale('ca', ca);
CMS.registerLocale('es', es);
