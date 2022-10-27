export interface ICalander {
  id?: string;
  title: string;
  medallions: IMedallion[];
}

export interface IMedallion {
  name: string;
  birthday: Date;
}
