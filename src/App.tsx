import './App.css'
import Dropdown from './components/dropdown/dropdown'

function App() {
  return (
    <section className='w-full'>
      <Dropdown
        id='dropdown'
        name='dropdown'
        label='Dropdown Component'
        multiselect
        withSearch
        options={[
          {
            id: 'option-1',
            label: 'Option 1',
            value: 'option-1'
          },
          {
            id: 'option-2',
            label: 'Option 2',
            value: 'option-2'
          },
          {
            id: 'option-3',
            label: 'Option 3',
            value: 'option-3'
          },
          {
            id: 'option-4',
            label: 'Option 4',
            value: 'option-4'
          }
        ]}
      />
    </section>
  )
}

export default App
