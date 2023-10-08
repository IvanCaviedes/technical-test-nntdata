export interface UserDaraMock {
  id: string;
  profile: string;
  username: string;
  password: string;
  country: string;
}

export const user: UserDaraMock[] = [
  {
    id: '832276cc-c5e9-4fcc-8e23-d38e2e267bc9',
    profile: 'https://api.dicebear.com/7.x/lorelei/svg?seed=andres',
    username: 'andres',
    password: '123456',
    country: 'Panama',
  },
  {
    id: '22148c0c-d788-4d49-9467-447677d11b76',
    profile: 'https://api.dicebear.com/7.x/lorelei/svg?seed=juam',
    username: 'juan',
    password: '123456',
    country: 'Colombia',
  },
  {
    id: '492e2917-760c-4921-aa5a-3201a857cd48',
    profile: 'https://api.dicebear.com/7.x/lorelei/svg?seed=pedro',
    username: 'pedro',
    password: '123456',
    country: 'Peru',
  },
  {
    id: '214a46e5-cae7-4b18-9869-eabde7c7ea52',
    profile: 'https://api.dicebear.com/7.x/lorelei/svg?seed=carlos',
    username: 'carlos',
    password: '123456',
    country: 'Chile',
  },
  {
    id: '214a46e5-cae7-4b18-9869-eabde7c7ea53',
    profile: 'https://api.dicebear.com/7.x/lorelei/svg?seed=carlos',
    username: 'alejandra',
    password: '123456',
    country: 'Paraguay',
  },
];
