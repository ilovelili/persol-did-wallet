const getLocales = () => [
  // you can choose / add the locales you want
  { countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false },
  { countryCode: 'JP', languageTag: 'ja', languageCode: 'ja', isRTL: false }
]

// use a provided translation, or return undefined to test your fallback
const findBestAvailableLanguage = () => ({ languageTag: 'en-US', isRTL: false })

const getNumberFormatSettings = () => ({
  decimalSeparator: '.',
  groupingSeparator: ','
})

const getCalendar = () => 'japanese' // or "japanese", "buddhist"
const getCountry = () => 'JP' // the country code you want
const getCurrencies = () => ['USD', 'JPY'] // can be empty array
const getTemperatureUnit = () => 'celsius' // or "fahrenheit"
const getTimeZone = () => 'Asia/Tokyo' // the timezone you want
const uses24HourClock = () => true
const usesMetricSystem = () => true

const addEventListener = jest.fn()
const removeEventListener = jest.fn()

export {
  findBestAvailableLanguage,
  getLocales,
  getNumberFormatSettings,
  getCalendar,
  getCountry,
  getCurrencies,
  getTemperatureUnit,
  getTimeZone,
  uses24HourClock,
  usesMetricSystem,
  addEventListener,
  removeEventListener
}
