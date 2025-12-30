import * as React from "react"
import { Input } from "@/components/ui/input"

// interface CustomInputProps {
//   title: string
//   value: string
//   onChange: (value: string) => void
//   type?: string
//   placeholder?: string
// }

export function CustomInput({ title, defaultValue = "", onChange, type = "text", placeholder, centerLabel = false, titleSize = 'text-sm' }) {
  const [value, setInputValue] = React.useState(defaultValue)
  React.useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);
  const onInputChange = (value) => {
    setInputValue(value)
    onChange(value)
  }
  return (
    <div className="space-y-2 w-full max-w-xs">
      <label
        htmlFor={title}
        className={`${titleSize} font-medium ${centerLabel ? 'block text-center w-full' : 'whitespace-nowrap'}`}
      >
        {title}
      </label>
      <Input
        id={title}
        type={type}
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  )
}

