import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User { id: string; username: string; displayName?: string; email?: string; roles?: string[]; }
interface AuthContextType { user: User | null; token: string | null; login: (u: string, p: string) => Promise<void>; logout: () => void; isAuthenticated: boolean; }
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('accessToken'));

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (username: string, password: string) => {
    const res = await fetch('/api/v1/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
    if (!res.ok) throw new Error('نام کاربری یا رمز عبور incorrect است');
    const data = await res.json();
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.accessToken);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);