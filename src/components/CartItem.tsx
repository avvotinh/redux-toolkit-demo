import React from "react";

import { useDispatch } from "react-redux";
import { decrease, increase, removeItem } from "../features/cartSlice";
import { ChevronDown, ChevronUp } from "../icons";

interface CartItemProps {
  id: string;
  img: string;
  title: string;
  price: number;
  amount: number;
}

const CartItem = ({ id, img, title, price, amount }: CartItemProps) => {
  const dispatch = useDispatch();

  const onRemoveItem = () => {
    dispatch(removeItem(id));
  };

  const onIncrease = () => {
    dispatch(increase({ id }));
  };

  const onDecrease = () => {
    if (amount === 1) {
      dispatch(removeItem(id));

      return;
    }

    dispatch(decrease({ id }));
  };

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button className="remove-btn" onClick={onRemoveItem}>
          remove
        </button>
      </div>
      <div>
        <button className="amount-btn" onClick={onIncrease}>
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button className="amount-btn" onClick={onDecrease}>
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
