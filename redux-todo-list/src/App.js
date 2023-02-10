import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal.js";
import Navbar from "./components/Navbar";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";

function App() {
  const { isOpen } = useSelector((state) => state.modal);
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
    // eslint-disable-next-line
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems("this is an example"));
  }, []);

  if (isLoading) {
    <div className="loading">
      <h1>is loading...</h1>
    </div>;
  }

  return (
    <div className="App">
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </div>
  );
}

export default App;
