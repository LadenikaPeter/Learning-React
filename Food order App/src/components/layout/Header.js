import { Fragment } from "react";
import mealImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Peter Chops</h1>
        <HeaderCartButton onClick={props.showCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImage} alt="A table of meals" />
      </div>
    </Fragment>
  );
};

export default Header;
