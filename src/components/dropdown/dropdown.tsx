import { useCallback, useMemo, useRef, useState } from "react"

interface DropdownProps {
  label: string
  name: string
  id: string
  options: {
    id: string
    label: string
    value: string
  }[]
  onChange?: (event: React.ChangeEvent) => void
  multiselect?: boolean
  withSearch?: boolean
}
const Dropdown = ({
  id,
  name,
  label,
  options,
  multiselect,
  withSearch,
  onChange
}: DropdownProps) => {
  const selectRef = useRef<HTMLSelectElement | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [openOption, setOpenOption] = useState(false)
  const [selectedOption, setSelectedOption] = useState<{id: string; label: string; value: string}[]>([])

  const filteredOptions = useMemo(() => options.filter(({ label }) => !!label.toLowerCase().includes(inputValue.toLowerCase())), [options, inputValue])

  const highlightText = (text: string, search: string) => {
    if (!search) return text
    
    const index = text.toLowerCase().indexOf(search.toLowerCase())
    if (index === -1) return text
    
    const before = text.slice(0, index)
    const match = text.slice(index, index + search.length)
    const after = text.slice(index + search.length)
    
    return (
      <>
        {before}
        <span className="bg-blue-300 font-semibold">{match}</span>
        {after}
      </>
    )
  }

  const optionsData = useMemo(() => {
    return filteredOptions.map(item => {
      return {
        ...item,
        label: highlightText(item.label, inputValue)
      }
    })
  }, [filteredOptions, inputValue])

  const handleOpen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    console.trace('handleOpen called')
    setOpenOption((prevState) => {
      return !prevState
    })
  }, [])
  
  const handleSelect = useCallback((value: string) => {
  console.log('handleSelect called with', value)
  const { current } = selectRef
  
  if (current) {
    const matchingOption = Array.from(current.querySelectorAll('option')).find(
      item => item.value === value
    )
    
    if (matchingOption) {
      setSelectedOption(data => {
        if (!multiselect) {
          return [
            {
              id: matchingOption.id,
              label: matchingOption.text,
              value: matchingOption.value
            }
          ]
        }

        // Multiselect: add if not exists
        if (!data.some(({ value: dataValue }) => dataValue === value)) {
          return [
            ...data,
            {
              id: matchingOption.id,
              label: matchingOption.text,
              value: matchingOption.value
            }
          ]
        }
        
        return data
      })
    }
  }

  if (!multiselect) {
    setOpenOption(false)
  }
}, [multiselect])

const handleRemove = useCallback((value: string) => {
  console.log('=== handleRemove called ===', value)
  console.log(new Error().stack)  // See where it's called from
  setSelectedOption(data => data.filter(({ value: dataValue }) => dataValue !== value))
}, [])
  

  return(
    <section className="relative flex flex-col gap-1 text-left">
    <label>{label}</label>
      <div onClick={handleOpen} className="w-full flex gap-2 h-8 px-2 py-1 border rounded-sm bg-white border-gray-500 mb-1">
        { !multiselect && selectedOption && selectedOption[0]?.label }
        {
          multiselect && selectedOption && selectedOption.map((data, index) => (
            <button
              key={`${data}-${index}`}
              onMouseDown={(e: React.MouseEvent) => {
                e.preventDefault()
                e.stopPropagation()
                handleRemove(data.value)
              }}
              className="text-sm color-black border border-gray-500 rounded-sm px-2 flex gap-2 py-2 items-center"
            >
              <div className="relative w-4 h-4 bg-white border border-gray-500 rounded-full  before:absolute before:w-px before:h-3.75 before:bg-gray-500 before:rotate-45 after:absolute after:w-px after:h-3.75 after:bg-gray-500 after:-rotate-45 before:left-1.75 after:left-1.5 before:top-0 after:top-0"/>
              {data.label}
            </button>
          ))
        }
      </div>
      {
        openOption && (
          <section className="absolute border border-gray-500 bg-white top-full left-0 right-0 z-1">
            {
              openOption && withSearch && (
                <div className="relative">
                  <div className="border-2 border-gray-500 rounded-full w-4 h-4 absolute top-1.5 left-1.5 after:w-0.5 after:rotate-[-55deg] after:absolute after:-right-0.75 after:top-2 after:h-2 after:bg-gray-500"/>
                  <input
                    id={`${id}-search`}
                    name={`${id}-search`}
                    className="w-full h-8 px-7 py-2 border-b border-gray-500 focus:outline-none"
                    onChange={(e) => setInputValue(() => e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    value={inputValue}
                  />
                  {
                    inputValue && <div
                    className="bg-gray-500 rounded-full w-4 h-4 absolute top-1.5 right-1.5 before:block after:block before:absolute after:absolute before:w-3 before:top-1/2 before:right-0.5 after:top-1/2 after:right-0.5 before:h-px before:bg-white after:w-3 after:h-px after:bg-white before:rotate-45 after:-rotate-45"
                    role="button"
                    onClick={() => setInputValue(() => '')}
                  />
                  }
                </div>
              )
            }
            <ul role="select">
              {
                optionsData.map(option => (
                  <li
                    key={option.id}
                    role="option"
                    className="px-1 hover:bg-blue-300"
                    onClick={(event: React.MouseEvent) => {
                      event.stopPropagation()
                      handleSelect(option.value)
                    }}
                  >
                    {option.label}
                  </li>
                ))
              }
            </ul>
          </section>
        )
      }
      <select
        id={id}
        name={name}
        className="sr-only invisible"
        ref={selectRef}
        multiple={multiselect}
        value={selectedOption?.[0]?.value}
        {...(onChange && { onChange })}
      >
        {
          filteredOptions.map(option => (
            <option
              key={`option-${option.id}`}
              id={option.id}
              value={option.value}
              {...(multiselect && {
                selected: selectedOption.some(item => item.id === option.id)
              })}
            >
              {option.label}
            </option>
          ))
        }
      </select>
    </section>
  )
}

export default Dropdown