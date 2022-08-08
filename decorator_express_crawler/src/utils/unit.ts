export interface Result<T> {
  success: boolean;
  err?: string;
  data: T;
}

export const getResData = <T>(data: T, err?: string): Result<T> => {
  if (err) {
    return {
      success: false,
      err,
      data,
    };
  }
  return {
    success: true,
    data,
  };
};
