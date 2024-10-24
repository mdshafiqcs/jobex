
const asyncWrapper = (asyncFn) => {
  return async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      throw error.response.data; 
    }
  };
};

export default asyncWrapper;