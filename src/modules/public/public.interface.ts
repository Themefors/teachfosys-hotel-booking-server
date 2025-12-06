export interface IGeneralInfo {
  logo?: string | null;
  location: string;
  description: string;
  socials: Record<string, string>;
  address: string;
  email: string;
  phone: string;
  copy_right: string;
}

export interface ITestimonial {
  rating: number;
  review: string;
  name: string;
  team?: string | null;
}

export interface IBanner {
  picture: string;
  title: string;
  subtitle: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
