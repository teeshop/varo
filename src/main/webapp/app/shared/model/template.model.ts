export interface ITemplate {
  id?: number;
  caption?: string;
  templateContentType?: string;
  template?: any;
}

export const defaultValue: Readonly<ITemplate> = {};
