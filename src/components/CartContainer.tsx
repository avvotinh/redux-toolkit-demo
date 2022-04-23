import React from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { clearCart } from "../features/cartSlice";
import { openModal } from "../features/modalSlice";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, total, amount } = useSelector(
    (state: RootState) => state.cart
  );

  const onConfirmClearCartHandler = () => {
    dispatch(openModal());
  };

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item: any) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={onConfirmClearCartHandler}>
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
