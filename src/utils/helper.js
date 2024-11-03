const getDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    
  }).replace(/[ /]/g, '-');
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
    maximumFractionDigits: 0,
  })

  return formater.format(price);
}

export const formatNumber = (price)  => {
  const formater = new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 0,
  })

  return formater.format(price);
}

export const getDaysLeft = (timestamp) => {
  const deadlineDate = new Date(timestamp);
  const todayDate = new Date();
  const diffInMilliseconds = deadlineDate - todayDate;
  let daysLeft = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
  
  return daysLeft;

}

export default {
  getDate,
  debounce,
  formatPrice,
  getDaysLeft,
  formatNumber,
}