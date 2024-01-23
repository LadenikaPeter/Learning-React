import { Link } from "react-router-dom";

const Products = [
  { id: "p1", title: "product 1" },
  { id: "p2", title: "product 2" },
  { id: "p3", title: "product 2" },
];

const ProductsPage = () => {
  return (
    <>
      <h1>The Products Page</h1>
      {Products.map((item) => {
        return (
          <li key={item.id}>
            <Link to={item.id}>{item.title}</Link>
          </li>
        );
      })}
    </>
  );
};

export default ProductsPage;
