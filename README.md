# Dropdown Component

A flexible, customizable dropdown component built with React and TypeScript. Supports single and multi-select modes, with optional search functionality.

## Features

- ✅ Single and multi-select modes
- 🔍 Optional search/filter functionality
- 🎨 Customizable styling with Tailwind CSS
- ⌨️ TypeScript support
- ♿ Accessible with ARIA roles
- 📱 Responsive design
- 🎯 Highlighted search matches

## Installation

```bash
npm install
```

Make sure you have the following peer dependencies installed:

```bash
npm install react react-dom
```

If using TypeScript:
```bash
npm install --save-dev @types/react @types/react-dom
```

## Basic Usage

### Simple Dropdown

```tsx
import Dropdown from './Dropdown'

const fruits = [
  { id: '1', label: 'Apple', value: 'apple' },
  { id: '2', label: 'Banana', value: 'banana' },
  { id: '3', label: 'Cherry', value: 'cherry' },
]

function App() {
  return (
    <Dropdown
      id="fruit-select"
      name="fruit"
      label="Select a Fruit"
      options={fruits}
    />
  )
}
```

### Dropdown with Search

```tsx
<Dropdown
  id="fruit-select"
  name="fruit"
  label="Select a Fruit"
  options={fruits}
  withSearch={true}
/>
```

### Multi-Select Dropdown

```tsx
<Dropdown
  id="fruit-select"
  name="fruits"
  label="Select Multiple Fruits"
  options={fruits}
  multiselect={true}
/>
```

### Multi-Select with Search

```tsx
<Dropdown
  id="fruit-select"
  name="fruits"
  label="Select Multiple Fruits"
  options={fruits}
  multiselect={true}
  withSearch={true}
/>
```

### With onChange Handler

```tsx
const handleChange = (event: React.ChangeEvent) => {
  console.log('Selection changed:', event)
  // Handle your logic here
}

<Dropdown
  id="fruit-select"
  name="fruit"
  label="Select a Fruit"
  options={fruits}
  onChange={handleChange}
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | ✅ Yes | - | Unique identifier for the dropdown |
| `name` | `string` | ✅ Yes | - | Name attribute for the select element |
| `label` | `string` | ✅ Yes | - | Label text displayed above the dropdown |
| `options` | `Option[]` | ✅ Yes | - | Array of options to display |
| `multiselect` | `boolean` | No | `false` | Enable multiple selection |
| `withSearch` | `boolean` | No | `false` | Enable search/filter functionality |
| `onChange` | `function` | No | - | Callback function triggered on selection change |

### Option Interface

```typescript
interface Option {
  id: string       // Unique identifier for the option
  label: string    // Display text for the option
  value: string    // Value of the option
}
```

## Examples

### Country Selector

```tsx
const countries = [
  { id: 'us', label: 'United States', value: 'us' },
  { id: 'uk', label: 'United Kingdom', value: 'uk' },
  { id: 'ca', label: 'Canada', value: 'ca' },
  { id: 'au', label: 'Australia', value: 'au' },
]

<Dropdown
  id="country-select"
  name="country"
  label="Select Your Country"
  options={countries}
  withSearch={true}
/>
```

### Skills Selector

```tsx
const skills = [
  { id: 'js', label: 'JavaScript', value: 'javascript' },
  { id: 'ts', label: 'TypeScript', value: 'typescript' },
  { id: 'react', label: 'React', value: 'react' },
  { id: 'vue', label: 'Vue', value: 'vue' },
  { id: 'angular', label: 'Angular', value: 'angular' },
]

<Dropdown
  id="skills-select"
  name="skills"
  label="Select Your Skills"
  options={skills}
  multiselect={true}
  withSearch={true}
  onChange={(e) => console.log('Selected skills:', e)}
/>
```

### Dynamic Options from API

```tsx
import { useEffect, useState } from 'react'
import Dropdown from './Dropdown'

function UserSelector() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(data => {
        const formattedUsers = data.map(user => ({
          id: user.id.toString(),
          label: user.name,
          value: user.id.toString()
        }))
        setUsers(formattedUsers)
      })
  }, [])

  return (
    <Dropdown
      id="user-select"
      name="user"
      label="Select a User"
      options={users}
      withSearch={true}
    />
  )
}
```

## Styling

This component uses Tailwind CSS for styling. Make sure you have Tailwind CSS configured in your project.

### Required Tailwind Configuration

Add these utilities to your `tailwind.config.js` if they're not already included:

```javascript
module.exports = {
  theme: {
    extend: {
      spacing: {
        '0.75': '0.1875rem',
        '1.5': '0.375rem',
        '1.75': '0.4375rem',
        '3.75': '0.9375rem',
      },
    },
  },
}
```

### Custom Styling

You can customize the appearance by modifying the className props in the component or by overriding the Tailwind classes.

## Accessibility

The component includes:
- Proper ARIA roles (`role="select"`, `role="option"`)
- Screen reader support with `.sr-only` class
- Keyboard navigation support
- Semantic HTML structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Storybook

To view the component in Storybook:

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`

## Development

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

## Common Issues

### Search Not Working
Make sure `withSearch={true}` is set as a prop.

### Options Not Displaying
Verify that your options array follows the correct format with `id`, `label`, and `value` properties.

### Multi-Select Not Working
Ensure `multiselect={true}` is set as a prop.

### Styling Issues
Confirm that Tailwind CSS is properly configured in your project.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ using React and TypeScript