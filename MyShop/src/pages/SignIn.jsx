import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Signin = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = email.trim() !== "" && password.trim() !== "";

  // 추후 백엔드와 연결
  const handleSingIn = (e) => {
    e.preventDefault();   // 새로고침 방지

    if (email === "test@example.com" && password === "1234") {
      alert("로그인 성공!");
      nav("/");   // Home 페이지로 이동
    } else {
      alert("이메일 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 ">
      <div className="ph:w-full dt:w-[500px] px-4 py-8 mx-auto max-w-md w-full rounded-lg shadow-md">
        <h1 className="ph:text-2xl dt:text-3xl font-bold m-8 text-center">로그인</h1>
        <form
          onSubmit={handleSingIn}
          autoComplete="on"
          noValidate
          className="ph:space-y-4 dt:space-y-6"
        >
          {/* 아이디 입력 */}
          <div>
            <label className="form-label">아이디(이메일)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              autoComplete="username"
              className="input"
              required
            />
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label className="form-label">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              autoComplete="current-password"
              className="input"
              required
            />
          </div>

          {/* 제출 버튼 : 폼이 유효하지 않으면 비활성화 됨 */}
          <Button type="submit" variant="SignIn" disabled={!isValid}>
            로그인
          </Button>
        </form>

        {/* 카카오톡 로그인 버튼 */}
        <button
          type="button"
          className="w-full h-[40px] mt-4 flex justify-center bg-kakao rounded-md cursor-pointer"
        >
          <img src="src/assets/kakao_login_medium_narrow.png" className="w-46" />
        </button>

        {/* 회원가입 페이지로 링크 */}
        <div className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?
          <Link to="/register" className="text-blue-600 hover:underline ml-3">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
