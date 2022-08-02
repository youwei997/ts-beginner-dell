export interface Result {
  success: boolean;
  err?: string;
  data: any;
}

export const getResData = (data: any, err?: string): Result => {
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
