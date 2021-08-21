import React, { ChangeEvent, createRef, useCallback, useEffect, useState } from 'react'
import { BsChevronDown, BsSearch } from 'react-icons/bs'

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

import api from '../../services/api'
import Category from '../../interfaces/Category'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addCategory, changeName, removeCategory } from '../../features/filter'

const Filter: React.FC = () => {
  const filter = useAppSelector((state) => state.filter)
  const [show, setShow] = useState(false)
  const [categories, setCategories] = useState<Category[]>()
  const appDispatch = useAppDispatch()

  const selectRef = createRef<HTMLDivElement>()

  const loadCategories = useCallback(async () => {
    try {
      const { data } = await api.get<{ categories: Category[] }>(`/categories`)
      setCategories(data.categories)
    } catch (error) {}
  }, [])

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

  useEffect(() => {
    loadCategories()
  }, [])

  function handleCheckboxChange(ev: ChangeEvent<HTMLInputElement>, id: number) {
    if (ev.target.checked) {
      appDispatch(addCategory(id))
    } else {
      appDispatch(removeCategory(id))
    }
  }

  if (!categories?.length) return null

  return (
    <Container>
      <FilterContainer>
        <InputContainer>
          <BsSearch />
          <Input
            type="text"
            onChange={(ev) => appDispatch(changeName(ev.target.value))}
            value={filter?.name ?? ''}
            autoCapitalize="off"
            autoCorrect="off"
            autoSave="on"
            disabled={!categories?.length}
          />
        </InputContainer>
        <Select ref={selectRef}>
          <SelectButton onClick={() => setShow((state) => !state)}>
            Categorias
            <BsChevronDown className={show ? 'reverse' : ''} />
          </SelectButton>
          {show && !!categories?.length && (
            <SelectItems>
              {categories.map((category) => {
                return (
                  <SelectItem key={category.id}>
                    <Checkbox
                      onChange={(ev) => handleCheckboxChange(ev, category.id)}
                      checked={filter.categories.includes(category.id)}
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
