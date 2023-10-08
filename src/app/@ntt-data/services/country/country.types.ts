export interface Country {
  flags: Flags;
  name: Name;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface NativeName {
  spa: SPA;
}

export interface SPA {
  official: string;
  common: string;
}
