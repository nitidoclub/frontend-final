
import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: '41dgtqxq',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
})
