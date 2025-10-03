const headers = {
  'Content-Type': 'application/json',
};

export const successResponse = (statusCode, data) => ({
  statusCode,
  headers,
  body: JSON.stringify({
    success: true,
    data,
  }),
});

export const errorResponse = (statusCode, message) => ({
  statusCode,
  headers,
  body: JSON.stringify({
    success: false,
    message,
  }),
});
