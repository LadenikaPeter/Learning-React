import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { Fragment, useContext, useState } from "react";
import cartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const cartCtx = useContext(cartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartRemoveItemsHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartAddItemsHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        "https://new-react-http-57475-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("A problem occured");
      }

      setIsSubmitting(false);
      setSubmitted(true);
      cartCtx.clearCart();
    } catch (error) {
      alert(error.message);
      setIsSubmitting(false);
      return;
    }
  };

  const actionButtons = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.hideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartRemoveItemsHandler.bind(null, item.id)}
            onAdd={cartAddItemsHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const modalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.hideCart} />
      )}
      {!isCheckout && actionButtons}
    </Fragment>
  );

  const isSubmittingContent = <p>Your order is being submitted</p>;

  const submittedContent = (
    <Fragment>
      <p>Successfully submitted your order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.hideCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClick={props.hideCart}>
      {!isSubmitting && !submitted && modalContent}
      {isSubmitting && isSubmittingContent}
      {submitted && !isSubmitting && submittedContent}
    </Modal>
  );
};

export default Cart;
