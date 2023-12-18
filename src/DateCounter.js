import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  console.log(
    'the previous state is',
    state,
    'and the action',
    action,
    'has been passed'
  );
  switch (action.type) {
    case 'inc':
      /*
        Recover the properties defined for our state and
        override the piece of state we want to update
      */
      return { ...state, count: state.count + action.payload };
    case 'dec':
      return { ...state, count: state.count - action.payload };
    case 'setCount':
      return { ...state, count: action.payload };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action');
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + state.count);

  const inc = function () {
    dispatch({ type: 'inc', payload: state.step });
  };

  const dec = function () {
    dispatch({ type: 'dec', payload: state.step });
  };

  const defineCount = function (e) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    /*
      One big advantage of useReducer is that
      the payload it is not always necessary
    */
    dispatch({ type: 'reset' });
  };

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
