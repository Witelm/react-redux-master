import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from "../actions/types/todo";

const initialState = {
  allIds: [],
  byIds: {},
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload;

      return {
        ...state,

        allIds: [...state.allIds, id],

        byIds: {
          ...state.byIds,

          [id]: {
            content,
            complete: false,
          },
        },
      };
    }

    case TOGGLE_TODO: {
      const { id } = action.payload;

      const targetTodo = state.byIds[id];

      return {
        ...state,

        byIds: {
          ...state.byIds,
          [id]: {
            ...targetTodo,
            completed: !targetTodo.completed,
          },
        },
      };
    }

    case DELETE_TODO: {
      const { id } = action.payload;
      const newByIds = { ...state.byIds };
      delete newByIds[id];

      return {
        ...state,
        allIds: state.allIds.filter((todoId) => todoId !== id),
        byIds: newByIds,
      };
    }

    default:
      return state;
  }
}
