import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <main style={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />
        <div style={{ padding: "40px 30px" }}>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
