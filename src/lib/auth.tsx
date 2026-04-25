"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
export type UserRole = "normal" | "fighter" | "gym";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  // Fighter-specific
  weightClass?: string;
  gymId?: string;
  gymName?: string;
  fighterId?: string;
  verified?: boolean;          // cédula verified
  // Gym-specific
  gymCity?: string;
  gymProvince?: string;
}

interface AuthContextValue {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setVerified: () => void;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  // Fighter
  weightClass?: string;
  gymId?: string;
  gymName?: string;
  fighterId?: string;
  // Gym
  gymCity?: string;
  gymProvince?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────
const STORAGE_KEY = "mma_ec_user";

function loadUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveUser(u: UserProfile | null) {
  if (typeof window === "undefined") return;
  if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  else localStorage.removeItem(STORAGE_KEY);
}

// ── Context ────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(loadUser());
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    // ── Hardcoded Demo Users ──
    if (email === "fan@mmaecuador.com") {
      const p: UserProfile = { id: "demo_fan", name: "Fanático Demo", email, role: "normal" };
      saveUser(p); setUser(p); return;
    }
    if (email === "peleador@mmaecuador.com") {
      const p: UserProfile = { id: "demo_fighter", name: "Peleador Demo", email, role: "fighter", verified: false, weightClass: "Welter", gymId: "1", gymName: "Team Oyama" };
      saveUser(p); setUser(p); return;
    }
    if (email === "gym@mmaecuador.com") {
      const p: UserProfile = { id: "demo_gym", name: "Gym Demo", email, role: "gym", gymCity: "Guayaquil", gymProvince: "Guayas" };
      saveUser(p); setUser(p); return;
    }

    // Checking localStorage if not a hardcoded demo user
    const stored = loadUser();
    if (stored && stored.email === email) {
      setUser(stored);
      return;
    }
    throw new Error("Usuario no encontrado. Prueba: fan@mmaecuador.com");
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const profile: UserProfile = {
      id: `u_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      verified: false,
      ...(data.role === "fighter" && {
        weightClass: data.weightClass,
        gymId: data.gymId,
        gymName: data.gymName,
        fighterId: `f_${Date.now()}`,
      }),
      ...(data.role === "gym" && {
        gymId: `g_${Date.now()}`,
        gymName: data.name,
        gymCity: data.gymCity,
        gymProvince: data.gymProvince,
      }),
    };
    saveUser(profile);
    setUser(profile);
  }, []);

  const logout = useCallback(() => {
    saveUser(null);
    setUser(null);
  }, []);

  const setVerified = useCallback(() => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, verified: true };
      saveUser(updated);
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, setVerified }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
