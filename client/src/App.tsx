import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { decrement, increment, incrementByAmount } from "./store/counterSlice";

import styles from "./App.module.scss";

export const App: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className={styles.app}>
        <h1>Счётчик: {count}</h1>
        <button onClick={() => dispatch(increment())}>Увеличить</button>
        <button onClick={() => dispatch(decrement())}>Уменьшить</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>
          Увеличить на 5
        </button>
      </div>
    </>
  );
};
