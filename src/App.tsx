/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import { calculateTotals, getCartItems } from "./features/cartSlice";
import { AppDispatch, RootState } from "./store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems, isLoading } = useSelector(
    (state: RootState) => state.cart
  );
  const { isOpen } = useSelector((state: RootState) => state.modal);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
