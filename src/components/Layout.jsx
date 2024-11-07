import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ display: "flex" }}>
        <Sidebar />
        <div style={{padding:"40px 30px"}} >

        {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
