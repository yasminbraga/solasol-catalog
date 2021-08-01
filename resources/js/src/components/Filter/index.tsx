import React, { ChangeEvent, createRef, useEffect, useReducer, useState } from 'react'

import {
  Checkbox,
  Container,
  FilterContainer,
  Input,
  InputContainer,
  Label,
  Select,
  SelectButton,
  SelectItem,
  SelectItems,
} from './styles'

import { BsChevronDown, BsSearch } from 'react-icons/bs'
import Category from '../../interfaces/Category'

interface State {
  categories: number[]
  name?: string
}

interface Action {
  type: 'SELECT_CATEGORY' | 'UNSELECT_CATEGORY' | 'CHANGE_NAME'
  value?: number | string
}

const initialState: State = {
  categories: [],
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SELECT_CATEGORY':
      if (!action.value || typeof action.value === 'string') return state
      return { ...state, categories: [...state.categories, action.value] }

    case 'UNSELECT_CATEGORY':
      if (!action.value || typeof action.value === 'string') return state
      const selectedCategories = [...state.categories]
      const unselectedIndex = selectedCategories.findIndex((item) => item === action.value)
      selectedCategories.splice(unselectedIndex, 1)
      return { ...state, categories: selectedCategories }

    case 'CHANGE_NAME':
      if (typeof action.value === 'number') return state
      return { ...state, name: action.value }

    default:
      return state
  }
}

interface FilterProps {
  onChange: (state: State) => void
  categories: Category[]
}

const Filter: React.FC<FilterProps> = ({ onChange, categories }) => {
  const [show, setShow] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)

  const selectRef = createRef<HTMLDivElement>()

  useEffect(() => {
    function onClick(ev: MouseEvent) {
      if (!selectRef.current) return
      const target = ev.target as Element

      if (!selectRef.current?.contains(target)) {
        setShow(false)
      }
    }

    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [selectRef])

  function handleCheckboxChange(ev: ChangeEvent<HTMLInputElement>, id: number) {
    if (ev.target.checked) {
      dispatch({ type: 'SELECT_CATEGORY', value: id })
    } else {
      dispatch({ type: 'UNSELECT_CATEGORY', value: id })
    }
  }

  useEffect(() => {
    onChange(state)
  }, [state])

  return (
    <Container>
      <FilterContainer>
        <InputContainer>
          <BsSearch />
          <Input
            type="text"
            onChange={(ev) => dispatch({ type: 'CHANGE_NAME', value: ev.target.value })}
            value={state?.name ?? ''}
          />
        </InputContainer>
        <Select ref={selectRef}>
          <SelectButton onClick={() => setShow((state) => !state)}>
            Categorias
            <BsChevronDown className={show ? 'reverse' : ''} />
          </SelectButton>
          {show && (
            <SelectItems>
              {categories.map((category) => {
                return (
                  <SelectItem key={category.id}>
                    <Checkbox
                      onChange={(ev) => handleCheckboxChange(ev, category.id)}
                      checked={state.categories.includes(category.id)}
                      id={`category${category.id}`}
                    />
                    <Label htmlFor={`category${category.id}`}>{category.name}</Label>
                  </SelectItem>
                )
              })}
            </SelectItems>
          )}
        </Select>
      </FilterContainer>
    </Container>
  )
}

export default Filter

// useEffect(() => {
//   dispatch({ type: 'SELECT_ALL', values: categories.map((c) => c.id) })
// }, [])

// function handleAllCheckboxChange(ev: ChangeEvent<HTMLInputElement>, ids: number[]) {
//   if (ev.target.checked) {
//     dispatch({ type: 'SELECT_ALL', values: ids })
//   } else {
//     dispatch({ type: 'UNSELECT_ALL' })
//   }
// }

/* 
<SelectItem>
  <Checkbox
    onChange={(ev) =>
      handleAllCheckboxChange(
        ev,
        categories.map(({ id }) => id)
      )
    }
    id="select_all"
    checked={categories.length === state.categories.length}
  />
  <Label htmlFor="select_all">Todas</Label>
</SelectItem> 
  */
