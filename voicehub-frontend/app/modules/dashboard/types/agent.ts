export interface Agent {
  _id: string;
  name: string;
  description: string;
  status: string;
  total: number;
  createdAt?: string;
  updatedAt?: string;
}
