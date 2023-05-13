// deno-lint-ignore-file no-explicit-any
export type Post = {
  id: string;
  title: string;
  description?: string;
  cover?: string;
  createdAt: string;
  lastEditedAt: string;
  blocks: any[];
};
