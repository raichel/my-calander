export interface ICalander {
  id?: string;
  medallions: IMedallion[];
  themeId: string;
}

export interface IMedallion {
  name: string;
  birthday: Date;
  medalThemeId: number;
}

export interface ICalanderTheme {
  id?: string;
  image: string;
  medallions: IMedallionTheme[];
}

export interface IMedallionTheme {
  image: string;
  fontColor: number;
  fontSize: number;
  maxChars: number;
  top: number;
  left: number;
}

export interface IOrder {
  id?: string;
  name: string;
  phone: string;
  calanderId: string;
  // city: string;
  // street: string;
  // houseNumber: number;
  // aptNumber?: number;
  // zipCode?: number;
}
