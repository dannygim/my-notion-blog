// deno-lint-ignore-file no-explicit-any
export type Page = {
  id: string;
  title: string;
  cover?: string;
  createdAt: string;
  lastEditedAt: string;
  blocks: any[];
};
