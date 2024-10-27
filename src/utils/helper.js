const getDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/\//g, '-');
}

function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const formatPrice = (price)  => {
  const formater = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  return formater.format(price);
}

export default {
  getDate,
  debounce,
  formatPrice,
}