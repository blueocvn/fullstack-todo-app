export interface AppConfigs {
  title: string;
  baseUrl: string;
}

export const appConfigs: AppConfigs = {
  title: import.meta.env.VITE_APP_TITLE || 'Todo App',
  baseUrl: import.meta.env.VITE_BACKEND_API_URL || '',
};
