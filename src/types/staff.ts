export interface StaffMember {
  name: string;
  role: string;
  bio?: string;
  photo?: any;
  email?: string;
  phone?: string;
  twitter?: string;
  instagram?: string;
  category?: string;
  leadershipCategory?: 'Pastoral Team' | 'Ministry Leaders' | 'Support Staff' | string;
  _id?: string;
  isFeaturedPastor?: boolean;
}
