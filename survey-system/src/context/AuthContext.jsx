import { createContext, useContext, useState } from "react";
 
const AuthContext = createContext(null);
 
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
 
  const login = (email, password) => {
    // Demo credentials — replace with real API call later
    if (email && password.length >= 6) {
      setUser({ email, name: email.split("@")[0] });
      return { success: true };
    }
    return { success: false, error: "Invalid email or password." };
  };
 
  const register = (name, email, password) => {
    if (name && email && password.length >= 6) {
      setUser({ email, name });
      return { success: true };
    }
    return { success: false, error: "Please fill all fields. Password must be 6+ characters." };
  };
 
  const logout = () => setUser(null);
 
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
 
export function useAuth() {
  return useContext(AuthContext);
}