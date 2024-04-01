// @mui
import { enUS, frFR } from '@mui/material/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: 'flagpack:gb-nir',
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: 'flagpack:fr',
  },
];

export const defaultLang = allLangs[0]; // English