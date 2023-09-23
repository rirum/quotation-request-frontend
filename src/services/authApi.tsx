import api from './api';

export async function signIn(email: string, password: string) {
  const response = await api.post('/user/signin', { email, password });
  return response.data;
}
