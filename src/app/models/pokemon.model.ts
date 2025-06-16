export interface Pokemon {
  id: string;
  name: string;
  image: string;
  height?: number;
  weight?: number;
  base_experience?: number;
  types?: string[];
  abilities?: string[];
  stats?: {
    name: string;
    value: number;
  }[];
}
