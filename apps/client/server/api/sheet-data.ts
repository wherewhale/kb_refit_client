export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiKey = config.public.googleSheetApiKey


  const sheetId = "1bNpGMCoW2ylIQSxIppLCrNXuqOFZyNtL2HH8Nzng2SI"
  const range = "dictionary!A1:F100"

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`

  const res = await fetch(url)
  const data = await res.json()

  return data
})