export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "DZD",
  }).format(number)
}

export const getUniqueValues = (data, type) => {
  const unique = data.map((item) => item[type])
  return ["all", ...new Set(unique)]
}
