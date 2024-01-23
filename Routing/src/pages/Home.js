import { Link } from "react-router-dom";

const HomePage = () => {
  //To route programmatically
  // const navigate = useNavigate();

  return (
    <>
      <h1>My Home Page</h1>
      <Link to="products">Take me to products</Link>
    </>
  );
};

export default HomePage;
