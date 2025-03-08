export interface LoadingState {
  name: LoadingName | '';
  status: boolean;
}

export enum LoadingName {
  CATEGORIES = 'categories',
  TITLES = 'titles',
  CONTENT = 'content',
}
