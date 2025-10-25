import TheNav from "./TheNav";
function TheHeader() {
  return ( 
    <header>
      <div className="logo">
        <img src="../assets/react.svg" alt="logo" />
      </div>
      <TheNav />
    </header>
  );
}

export default TheHeader;