'use client'

import JSZip from 'jszip'
import { Button, Card, Flex, Stack, Text } from '@sanity/ui'
import { ArrayOfPrimitivesInputProps, useFormValue } from 'sanity'
import { useState } from 'react'
import { getFileUrl } from '../lib/file'
import { urlFor } from '../lib/image'

type MediaItem = {
  _key: string
  _type: string
  asset?: {
    _ref?: string
  }
  alt?: string
}

export function MediaArrayInput(props: ArrayOfPrimitivesInputProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const rawValue: unknown = props.value
  const media = Array.isArray(rawValue)
    ? rawValue.filter(
        (value): value is MediaItem =>
          typeof value === 'object' &&
          value !== null &&
          '_key' in value &&
          typeof value._key === 'string' &&
          '_type' in value &&
          typeof value._type === 'string',
      )
    : []
  const projectTitle = useFormValue(['title'])
  const downloadableMedia = media.filter(
    (item): item is MediaItem & { _type: 'image' | 'file'; asset: { _ref: string } } =>
      (item._type === 'image' || item._type === 'file') &&
      typeof item.asset?._ref === 'string',
  )

  const downloadMedia = async () => {
    setIsDownloading(true)
    setErrorMessage(null)

    try {
      const zip = new JSZip()

      for (const [index, item] of downloadableMedia.entries()) {
        const url = item._type === 'image' ? urlFor(item).url() : getFileUrl(item)
        if (!url) {
          throw new Error(`Media item ${index + 1} has no downloadable asset URL.`)
        }

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Media item ${index + 1} could not be downloaded (${response.status}).`)
        }

        const extension = item.asset._ref.split('-').at(-1)?.toLowerCase()
        const safeExtension =
          extension && /^[a-z0-9]+$/.test(extension)
            ? extension
            : item._type === 'image'
              ? 'jpg'
              : 'bin'
        const blob = await response.blob()
        zip.file(`media-${String(index + 1).padStart(2, '0')}.${safeExtension}`, blob)
      }

      const archive = await zip.generateAsync({ type: 'blob' })
      const objectUrl = URL.createObjectURL(archive)
      const link = document.createElement('a')
      const title =
        typeof projectTitle === 'string'
          ? projectTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
          : ''

      link.href = objectUrl
      link.download = `${title || 'project'}-media.zip`
      link.click()
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
    } catch (error) {
      console.error('Failed to download project media:', error)
      setErrorMessage(
        error instanceof Error ? error.message : 'The media archive could not be created.',
      )
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Stack space={3}>
      <Card padding={3} border radius={2}>
        <Flex align="center" gap={3} wrap="wrap">
          <Button
            text={isDownloading ? 'Preparing ZIP…' : `Download media (${downloadableMedia.length})`}
            onClick={downloadMedia}
            disabled={isDownloading || downloadableMedia.length === 0}
            tone="primary"
          />
          <Text size={1} muted>
            Downloads Sanity images and legacy files as a ZIP. Mux videos are not included.
          </Text>
        </Flex>
        {errorMessage && (
          <Card padding={2} radius={2} tone="critical">
            <Text size={1} role="alert">
              {errorMessage}
            </Text>
          </Card>
        )}
      </Card>
      {props.renderDefault(props)}
    </Stack>
  )
}
