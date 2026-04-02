import Navbar from "./Navbar";
 
export default function AppLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f2ec" }}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
 