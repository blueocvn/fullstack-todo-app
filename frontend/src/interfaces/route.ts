import { IconType } from 'react-icons';

export interface AppRoute {
  title: string;
  path: string;
  icons?: IconType;
  children?: AppRoute[];
}

export interface DropdownLink {
  id: number;
  label: string;
  path?: string;
}
