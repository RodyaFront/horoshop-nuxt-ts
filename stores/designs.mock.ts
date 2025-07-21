import type { Design } from '@/types/design'

export const designsMock: Design[] = [
  {
    id: '1',
    title: 'Modern Landing',
    url: 'https://example.com/design/1',
    img: [
      'https://via.placeholder.com/120x80?text=Design+1',
      'https://via.placeholder.com/120x80?text=Design+1b'
    ],
    status: 'published'
  },
  {
    id: '2',
    title: 'E-commerce UI',
    url: 'https://example.com/design/2',
    img: [
      'https://via.placeholder.com/120x80?text=Design+2'
    ],
    status: 'unpublished'
  }
] 