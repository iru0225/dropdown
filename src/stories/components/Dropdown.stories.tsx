// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'
import Dropdown from "../../components/dropdown/dropdown"

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the dropdown',
    },
    name: {
      control: 'text',
      description: 'Name attribute for the select element',
    },
    id: {
      control: 'text',
      description: 'ID attribute for the select element',
    },
    multiselect: {
      control: 'boolean',
      description: 'Enable multiple selection',
    },
    withSearch: {
      control: 'boolean',
      description: 'Enable search functionality',
    },
    options: {
      control: 'object',
      description: 'Array of options for the dropdown',
    },
    onChange: {
      action: 'changed',
      description: 'Callback function when selection changes',
    },
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

const sampleOptions = [
  { id: '1', label: 'Apple', value: 'apple' },
  { id: '2', label: 'Banana', value: 'banana' },
  { id: '3', label: 'Cherry', value: 'cherry' },
  { id: '4', label: 'Date', value: 'date' },
  { id: '5', label: 'Elderberry', value: 'elderberry' },
  { id: '6', label: 'Fig', value: 'fig' },
  { id: '7', label: 'Grape', value: 'grape' },
  { id: '8', label: 'Honeydew', value: 'honeydew' },
]

const countryOptions = [
  { id: 'us', label: 'United States', value: 'us' },
  { id: 'uk', label: 'United Kingdom', value: 'uk' },
  { id: 'ca', label: 'Canada', value: 'ca' },
  { id: 'au', label: 'Australia', value: 'au' },
  { id: 'de', label: 'Germany', value: 'de' },
  { id: 'fr', label: 'France', value: 'fr' },
  { id: 'jp', label: 'Japan', value: 'jp' },
  { id: 'in', label: 'India', value: 'in' },
]

export const Default: Story = {
  args: {
    id: 'fruit-dropdown',
    name: 'fruit',
    label: 'Select a Fruit',
    options: sampleOptions,
  },
}

export const WithSearch: Story = {
  args: {
    id: 'fruit-search-dropdown',
    name: 'fruit-search',
    label: 'Select a Fruit (with search)',
    options: sampleOptions,
    withSearch: true,
  },
}

export const Multiselect: Story = {
  args: {
    id: 'fruit-multi-dropdown',
    name: 'fruit-multi',
    label: 'Select Multiple Fruits',
    options: sampleOptions,
    multiselect: true,
  },
}

export const MultiselectWithSearch: Story = {
  args: {
    id: 'fruit-multi-search-dropdown',
    name: 'fruit-multi-search',
    label: 'Select Multiple Fruits (with search)',
    options: sampleOptions,
    multiselect: true,
    withSearch: true,
  },
}

export const Countries: Story = {
  args: {
    id: 'country-dropdown',
    name: 'country',
    label: 'Select a Country',
    options: countryOptions,
    withSearch: true,
  },
}

export const LongList: Story = {
  args: {
    id: 'long-dropdown',
    name: 'long',
    label: 'Select from Many Options',
    options: Array.from({ length: 50 }, (_, i) => ({
      id: `option-${i}`,
      label: `Option ${i + 1}`,
      value: `option-${i}`,
    })),
    withSearch: true,
  },
}

export const FewOptions: Story = {
  args: {
    id: 'few-dropdown',
    name: 'few',
    label: 'Select Yes or No',
    options: [
      { id: 'yes', label: 'Yes', value: 'yes' },
      { id: 'no', label: 'No', value: 'no' },
    ],
  },
}

export const WithOnChange: Story = {
  args: {
    id: 'onchange-dropdown',
    name: 'onchange',
    label: 'Dropdown with onChange Handler',
    options: sampleOptions,
    onChange: (event: React.ChangeEvent) => {
      console.log('Selection changed:', event)
    },
  },
}

export const MultiselectCountries: Story = {
  args: {
    id: 'country-multi-dropdown',
    name: 'countries',
    label: 'Select Countries You Want to Visit',
    options: countryOptions,
    multiselect: true,
    withSearch: true,
  },
}