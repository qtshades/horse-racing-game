type CellRender = 'text' | 'color';

export type AppTableColumn<Key extends string = string> = {
  key: Key
  label: string
  class?: string
  render?: CellRender
};

export type AppTableRow = Record<string, unknown> & {
  key: string | number
};
