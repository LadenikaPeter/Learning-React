import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loggedOut } from "../store/Auth";

const Header = () => {
  const authState = useSelector((state) => state.auth.isAuthenticated);
  const dispatchFn = useDispatch();

  const logoutHandler = () => {
    dispatchFn(loggedOut());
  };

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {authState && (
        <nav>
          <ul>
            <li>
              <a href="/">My Products</a>
            </li>
            <li>
              <a href="/">My Sales</a>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
