const ERROR_MESSAGE_MAP = {
  "Invalid Request": "잘못된 요청입니다. 필수 항목을 확인하세요.",
  "Invalid Type": "입력 형식이 올바르지 않습니다.",
  "Unauthorized": "로그인 정보가 유효하지 않습니다.",
  "Forbidden": "이 기능에 접근 권한이 없습니다.",
  "Not Found": "요청한 리소스를 찾을 수 없습니다.",
  "Product Not Found": "해당 상품은 존재하지 않습니다.",
  "Internal Server Error": "서버 오류가 발생했습니다.",
};

function handleApiError(err) {
  console.log("API ERROR: ", err);
  const errorCode = err.response?.data?.error;
  const message = ERROR_MESSAGE_MAP[errorCode] || "알 수 없는 오류가 발생했습니다";
  throw new Error(message);
}

export default handleApiError;
