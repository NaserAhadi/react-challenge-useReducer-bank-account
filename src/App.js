import "./App.css";
import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActiveAccount: false,
};

function reducer(state, action) {
  if (!state.isActiveAccount && action.type !== "openAccount") return state;
  switch (action.type) {
    case "openAccount":
      return { ...state, isActiveAccount: true, balance: 500 };
    case "closeAccount":
      if (state.balance !== 0 || state.loan !== 0) return state;
      return initialState;
    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withdraw":
      return {
        ...state,
        balance:
          state.balance >= 50 ? state.balance - action.payload : state.balance,
      };
    case "loanRequest":
      if (state.loan !== 0) return state;
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
      };
    case "payLoan":
      if (state.loan > 0) {
        return {
          ...state,
          loan: state.loan - action.payload,
          balance: state.balance - action.payload,
        };
      }
      return state;
    default:
      throw new Error("unknown action");
  }
}

function App() {
  const [{ balance, loan, isActiveAccount }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <div className="buttons-container">
        <button
          className="btn"
          disabled={isActiveAccount}
          onClick={() => dispatch({ type: "openAccount" })}
        >
          Open account
        </button>
        <button
          disabled={!isActiveAccount}
          className="btn"
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
        >
          Deposit 150
        </button>
        <button
          disabled={!isActiveAccount}
          className="btn"
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
        >
          Withdraw 50
        </button>
        <button
          disabled={!isActiveAccount}
          className="btn"
          onClick={() => dispatch({ type: "loanRequest", payload: 5000 })}
        >
          Request a loan of 5000
        </button>
        <button
          disabled={!isActiveAccount}
          className="btn"
          onClick={() => dispatch({ type: "payLoan", payload: 5000 })}
        >
          Pay loan
        </button>
        <button
          disabled={!isActiveAccount}
          className="btn"
          onClick={() => dispatch({ type: "closeAccount" })}
        >
          Close account
        </button>
      </div>
    </div>
  );
}

export default App;
