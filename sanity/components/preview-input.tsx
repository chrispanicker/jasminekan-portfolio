'use client'

import { useState } from 'react'
import { Button, Stack } from '@sanity/ui'
import { useFormValue } from 'sanity'
import { set } from 'sanity'

interface Props {
  value: any
  onChange: (event: any) => void
  renderDefault: (props: any) => React.ReactNode
}

export const PreviewInput = (props: Props) => {
  const { value, onChange, renderDefault } = props
  const [isLoading, setIsLoading] = useState(false)
  
  // Access the full document to get the media array
  const document = useFormValue([]) as any

  const handleAutoFill = () => {
    setIsLoading(true)

    try {
      // Get media array from the document
      const media = document?.media
      
      if (media && media.length > 0) {
        // Find the first image (skip files)
        const firstImage = media.find((item: any) => item._type === 'image')
        
        if (firstImage) {
          onChange(set(firstImage))
        } else {
          console.warn('No images found in media array')
        }
      } else {
        console.warn('No media found in document')
      }
    } catch (error) {
      console.error('Error auto-filling preview:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const hasMediaImage = document?.media?.some((item: any) => item._type === 'image')

  return (
    <Stack space={2}>
      {renderDefault(props)}
      <Button
        onClick={handleAutoFill}
        disabled={isLoading || !hasMediaImage}
        mode="ghost"
        text={hasMediaImage ? 'Autofill from Media' : 'Add images to media first'}
      />
    </Stack>
  )
}
