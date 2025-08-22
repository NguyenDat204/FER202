export const favInitial = {
  items: [], // danh sách id sản phẩm yêu thích
};

export function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE": {
      const id = action.payload;
      const exists = state.items.includes(id);
      return {
        ...state,
        items: exists ? state.items.filter((x) => x !== id) : [...state.items, id],
      };
    }
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}
