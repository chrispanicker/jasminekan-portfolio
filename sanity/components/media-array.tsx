'use client'

import { useState, useRef } from 'react'
import { Stack, Box, Button, Card, Text, Flex } from '@sanity/ui'
import { TrashIcon } from '@sanity/icons'
import { PatchEvent, set, unset, insert } from 'sanity'

interface MediaItem {
  _key: string
  _type: 'image' | 'file'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

interface Props {
  value: MediaItem[] | undefined
  onChange: (event: PatchEvent) => void
  readOnly?: boolean
}

export const mediaArray = (props: Props) => {
  const { value = [], onChange, readOnly = false } = props
  const [dragOverIndex, setDragOverIndex] = useState<number | null | 'dropzone'>(null)
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const arrayValue = Array.isArray(value) ? value : []

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverIndex(index)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOverIndex(null)
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer!.effectAllowed = 'move'
    setDraggedItem(index)
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverIndex(null)

    if (draggedItem !== null && draggedItem !== targetIndex && arrayValue.length > 0) {
      const newValue = [...arrayValue]
      const [draggedItemValue] = newValue.splice(draggedItem, 1)
      newValue.splice(targetIndex, 0, draggedItemValue)
      onChange(PatchEvent.from(set(newValue)))
    }
    setDraggedItem(null)
  }

  const handleFilesDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverIndex(null)

    const files = Array.from(e.dataTransfer?.files || [])
    if (files.length > 0 && !readOnly) {
      files.forEach((file) => {
        const newItem: MediaItem = {
          _key: `${Date.now()}-${Math.random()}`,
          _type: file.type.startsWith('image/') ? 'image' : 'file',
          asset: {
            _ref: `file-${Date.now()}-${Math.random()}`,
            _type: 'reference',
          },
        }
        const newValue = [...arrayValue, newItem]
        onChange(PatchEvent.from(set(newValue)))
      })
    }
  }

  const handleDeleteItem = (index: number) => {
    const newValue = arrayValue.filter((_, i) => i !== index)
    onChange(PatchEvent.from(set(newValue)))
  }

  return (
    <Stack space={3}>
      <Box
        ref={dropZoneRef}
        onDrop={handleFilesDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOverIndex('dropzone' as any)
        }}
        onDragLeave={handleDragLeave}
        padding={4}
        style={{
          border: dragOverIndex === 'dropzone' ? '2px dashed #0066cc' : '1px dashed #999',
          borderRadius: '6px',
          backgroundColor: dragOverIndex === 'dropzone' ? 'rgba(0, 102, 204, 0.1)' : 'transparent',
          transition: 'all 150ms ease',
          cursor: readOnly ? 'default' : 'pointer',
        }}
      >
        <Text align="center" size={1} style={{ opacity: 0.6 }}>
          {arrayValue.length === 0
            ? 'Drag and drop images or files here'
            : `${arrayValue.length} item${arrayValue.length !== 1 ? 's' : ''} - drag to reorder`}
        </Text>
      </Box>

      <Stack space={2}>
        {arrayValue.map((item, index) => (
          <div
            key={item._key}
            draggable={!readOnly}
            onDragStart={(e) => handleDragStart(e as any, index)}
            onDragOver={(e) => handleDragOver(e as any, index)}
            onDragLeave={handleDragLeave as any}
            onDrop={(e) => handleDrop(e as any, index)}
            style={{
              opacity: draggedItem === index ? 0.5 : 1,
              borderTop:
                dragOverIndex === index && draggedItem !== index
                  ? '3px solid #0066cc'
                  : 'none',
              paddingTop: dragOverIndex === index && draggedItem !== index ? '8px' : '0px',
              transition: 'all 150ms ease',
            }}
          >
            <Card padding={3} border>
              <Flex justify="space-between" align="center">
                <div style={{ flex: 1 }}>
                  <Text size={1} weight="medium">
                    {item._type === 'image' ? '🖼️ Image' : '📄 File'}
                  </Text>
                  <Text size={0} style={{ opacity: 0.6, marginTop: '4px' }}>
                    {item.asset._ref}
                  </Text>
                </div>
                <Button
                  icon={TrashIcon}
                  mode="bleed"
                  tone="critical"
                  onClick={() => handleDeleteItem(index)}
                  disabled={readOnly}
                  style={{ cursor: readOnly ? 'default' : 'pointer' }}
                />
              </Flex>
            </Card>
          </div>
        ))}
      </Stack>
    </Stack>
  )
}