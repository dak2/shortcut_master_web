import { User } from 'app/providers/UserProvider';

export const getCurrentUser = (contextUser: User | null): User => {
  // ref. https://stackoverflow.com/a/73853147
  const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;
  const userName = contextUser && contextUser.name ? contextUser.name : localStorage?.getItem('user_name');
  return userName ? { name: userName } : { name: null };
};
