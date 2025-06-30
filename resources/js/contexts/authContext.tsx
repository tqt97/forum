import { User } from '@/types';
import { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useAuth = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useAuth must be used within a UserProvider');
    }
    return context;
};
