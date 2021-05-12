import { createContext } from 'react';

export const AppCreateContext = createContext({});   //定义全局变量

export const reducer = (state, actions) => {
  switch (actions.type) {
    case 'change':
      return { ...state, ...actions.value };
    default:
      break;
  }
}

export const createContextAction = (value) => {
  return {
    type: 'change',
    value: value,
  }
}

