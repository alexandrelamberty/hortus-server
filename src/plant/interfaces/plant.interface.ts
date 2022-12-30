export interface Plant {
  _id: string;
  name: string;
  binomial: string;
  family: string;
  genus: string;
  species: string;
  subspecies?: string;
  variety?: string;
  forma?: string;
  cultivar?: string;
  hybrid?: string;
  color?: string;
  common_names?: Array<string>;
  image: string;
}
