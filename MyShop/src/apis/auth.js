import instance from "./instance";

export const fetchKakaoToken = async (code) => {
  const res = await instance.post("/login/kakao", {
    code,
  });

  return res.data;
};
