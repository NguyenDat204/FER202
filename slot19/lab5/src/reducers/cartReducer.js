export const cartInitial = {
  items: [],
};

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      // nếu muốn gộp số lượng, có thể kiểm tra id và tăng qty.
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ONE_BY_ID": {
      let removed = false;
      const next = state.items.filter((i) => {
        if (!removed && i.id === action.payload) {
          removed = true;
          return false;
        }
        return true;
      });
      return { ...state, items: next };
    }
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}
