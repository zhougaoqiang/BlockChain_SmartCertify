
import MainMenu from "../components/sidebar/MainMenu";


const Homepage = () => {

  // const company = ['ID', 'UEN No.', 'Name', 'Address', 'Company Description'];

  return (
    <MainMenu>
      {/* <h2>
        <b>Welcome to Smart Certify</b>
      </h2> */}
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src="/Home3.png" alt="Smart Certify x Individual" style={{ width: '900px', height: '550px', objectFit: 'cover' } } />
    </div>
    </MainMenu>
  );
};

export default Homepage;
