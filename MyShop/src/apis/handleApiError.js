function handleApiError(err) {
  console.log("API ERROR: ", err);
  const message = err.response?.data?.message || "알 수 없는 오류가 발생했습니다";
  throw new Error(message);
}

export default handleApiError;
