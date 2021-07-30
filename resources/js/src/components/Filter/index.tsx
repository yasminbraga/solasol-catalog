import React, { ChangeEvent, useEffect, useReducer, useState } from 'react'

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

interface State {
  categories: number[]
}

interface Action {
  type: 'SELECT_CATEGORY' | 'UNSELECT_CATEGORY' | 'SELECT_ALL' | 'UNSELECT_ALL'
  value?: number | string
  values?: number[]
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

    case 'UNSELECT_ALL':
      return { ...state, categories: [] }

    case 'SELECT_ALL':
      if (!action.values) return state
      return { ...state, categories: action.values }

    default:
      return state
  }
}

const categories = [
  { id: 1, name: 'Relogio' },
  { id: 2, name: 'Chapeu' },
  { id: 3, name: 'Oculos' },
  { id: 4, name: 'Mochila' },
  { id: 5, name: 'Bolsa' },
]

const Filter: React.FC = () => {
  const [show, setShow] = useState(false)

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    console.log(state)
  }, [state])

  useEffect(() => {
    dispatch({ type: 'SELECT_ALL', values: categories.map((c) => c.id) })
  }, [])

  function handleCheckboxChange(ev: ChangeEvent<HTMLInputElement>, id: number) {
    if (ev.target.checked) {
      dispatch({ type: 'SELECT_CATEGORY', value: id })
    } else {
      dispatch({ type: 'UNSELECT_CATEGORY', value: id })
    }
  }

  function handleAllCheckboxChange(ev: ChangeEvent<HTMLInputElement>, ids: number[]) {
    if (ev.target.checked) {
      dispatch({ type: 'SELECT_ALL', values: ids })
    } else {
      dispatch({ type: 'UNSELECT_ALL' })
    }
  }

  return (
    <Container>
      <FilterContainer>
        <InputContainer>
          <BsSearch />
          <Input type="text" />
        </InputContainer>
        <Select>
          <SelectButton onClick={() => setShow((state) => !state)}>
            Categorias
            <BsChevronDown className={show ? 'reverse' : ''} />
          </SelectButton>
          {show && (
            <SelectItems>
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
