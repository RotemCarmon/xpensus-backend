export interface Group {
  id: number;
  name: string;
  description?: string;
  color?: string;
  image?: string;
  status: GroupStatus;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;

}


export enum GroupStatus {
  ARCHIVED = 'archived',
  ACTIVE = 'active',
}