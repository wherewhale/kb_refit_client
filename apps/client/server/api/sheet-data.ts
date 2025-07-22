export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiKey = config.public.googleSheetApiKey

  const sheetId = "1SYV1d7sDWfWA9MfLBJgPVlIpGbhde_ix3_xLiEfC45A"
  const range = "dictionary!A1:F5"

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`

  const res = await fetch(url)
  const data = await res.json()

  return data
})