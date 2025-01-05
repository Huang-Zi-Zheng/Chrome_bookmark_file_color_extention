import React from 'react'
import { Button } from '@/components/ui/button'

interface ColorPickerProps {
  color: string
  onColorChange: (color: string) => void
  onApplyColor: () => void
}

export default function ColorPicker({ color, onColorChange, onApplyColor }: ColorPickerProps) {
  return (
    <div className="flex items-center">
      <input
        type="color"
        value={color}
        onChange={(e) => onColorChange(e.target.value)}
        className="mr-2"
      />
      <Button onClick={onApplyColor}>Apply Color</Button>
    </div>
  )
}

