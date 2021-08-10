// interface State {
//   categories: number[]
//   name?: string
// }

// const Types = {
//   SELECT_CATEGORY: 'filter/SELECT_CATEGORY',
//   UNSELECT_CATEGORY: 'filter/UNSELECT_CATEGORY',
//   CHANGE_NAME: 'filter/CHANGE_NAME',
// }

// interface Action {
//   type: keyof typeof Types
//   value?: number | string
// }

// const initialState: State = {
//   categories: [],
// }

// const reducer = (state: State, action: Action) => {
//   switch (action.type) {
//     case Types.SELECT_CATEGORY:
//       if (!action.value || typeof action.value === 'string') return state
//       return { ...state, categories: [...state.categories, action.value] }

//     case Types.UNSELECT_CATEGORY:
//       if (!action.value || typeof action.value === 'string') return state
//       const selectedCategories = [...state.categories]
//       const unselectedIndex = selectedCategories.findIndex((item) => item === action.value)
//       selectedCategories.splice(unselectedIndex, 1)
//       return { ...state, categories: selectedCategories }

//     case Types.CHANGE_NAME:
//       if (typeof action.value === 'number') return state
//       return { ...state, name: action.value }

//     default:
//       return state
//   }
// }
