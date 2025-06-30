// import React from 'react';
// import { usePage } from '@inertiajs/react';
// import { Auth, SharedData } from '@/types';

// const AuthContext = React.createContext<Auth | null>(null);

// export const useAuth = () => {
//   const ctx = React.useContext(AuthContext);
//   if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
//   return ctx;
// };

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const { auth } = usePage<SharedData>().props;
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// }
