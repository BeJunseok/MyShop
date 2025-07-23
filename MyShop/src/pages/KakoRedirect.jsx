import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { fetchKakaoToken } from "../apis/auth";
import toast from "react-hot-toast";

const KakaoRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setTokens } = useAuthStore();

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      toast("인가 코드가 없습니다", { duration: 3000, icon: "🚨" });
      navigate("/signin");
      return;
    }

    const kakaoLogin = async () => {
      try {
        const { accessToken, refreshToken } = await fetchKakaoToken(code);
        setTokens(accessToken, refreshToken);
        navigate("/");
      } catch (err) {
        console.log(err);
        toast("로그인 실패", { duration: 3000, icon: "🚨" });
        navigate("/signin");
      }
    };

    kakaoLogin();
  }, []);

  return <div>로그인 처리 중 ...</div>;
};

export default KakaoRedirect;
