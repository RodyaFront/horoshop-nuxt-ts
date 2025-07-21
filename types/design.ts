export const DESIGN_STATUS = {
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished',
} as const;

export type DesignStatus = typeof DESIGN_STATUS[keyof typeof DESIGN_STATUS];

export interface Design {
  id: string;
  title: string;
  url: string;
  img: string[];
  status: DesignStatus;
} 