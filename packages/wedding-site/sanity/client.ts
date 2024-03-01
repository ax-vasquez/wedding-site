import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: process.env.SANITY_PROJECT,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,
    useCdn: true, // `false` if you want to ensure fresh data
    apiVersion: `2023-05-03`,
})
