"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  username: string;
  role: "Admin" | "User" | "Staff";
  profilePicture?: string | null;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  updateProfile: (username: string) => Promise<void>;
  updatePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
  updateProfilePicture: (imageData: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  // Check if user is already logged in
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, you would call your API here
      // This is a mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      if (username === "maskur" && password === "dimas2290") {
        const user = {
          id: "1",
          username: "admin",
          role: "Admin" as const,
          profilePicture: null,
        };

        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        router.push("/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, password: string, role: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, you would call your API here
      // This is a mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = {
        id: Math.random().toString(36).substring(2, 9),
        username,
        role: role as "Admin" | "User" | "Staff",
        profilePicture: null,
      };

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      router.push("/dashboard");
    } catch (err) {
      setError("An error occurred during registration");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const updateProfile = async (username: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, you would call your API here
      // This is a mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (user) {
        const updatedUser = {
          ...user,
          username,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (err) {
      setError("An error occurred while updating profile");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, you would call your API here
      // This is a mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation - in a real app, you would verify the current password
      if (currentPassword === "password" || user?.username === "admin") {
        // Password updated successfully
        return;
      } else {
        setError("Current password is incorrect");
        throw new Error("Current password is incorrect");
      }
    } catch (err) {
      setError("An error occurred while updating password");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfilePicture = async (imageData: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, you would upload the image to a storage service
      // and save the URL to the user's profile
      // This is a mock implementation that stores the image in localStorage
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (user) {
        const updatedUser = {
          ...user,
          profilePicture: imageData,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (err) {
      setError("An error occurred while updating profile picture");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    updatePassword,
    updateProfilePicture,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
