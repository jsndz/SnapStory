export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: string;
  user: User | string;
  createdAt: string;
  updatedAt: string;
  tag?: Tag | string;
}

export interface Tag {
  _id: string;
  title: string;
}

export interface Comment {
  _id: string;
  content: string;
  user: User | string;
  blog: string;
  createdAt: string;
}
