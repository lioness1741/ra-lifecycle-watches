export const calcOfsetDate = (offset: number) => {
    const onwDate = new Date();
    const UTCDate = new Date(new Date().getTime() + onwDate.getTimezoneOffset() * 60 * 1000);
    const initialState = new Date(new Date().setHours(UTCDate.getHours() + offset));
  
    return initialState;
  };