const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''
export const imgSrc = (path) => `${BASE}${path}`
