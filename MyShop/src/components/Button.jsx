// 공통 버튼 컴포넌트
const Button = ({
  children,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
  ...props
}) => {
  // 공통 스타일
  const baseStyles =
    "w-full px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  // variant에 따라 다른 스타일 적용
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-green-400",
    secondary: "bg-green-500 text-white hover:bg-green-600 focus:ring-blue-400",
    SignIn:
      "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed",
  };

  // 최종 스타일
  const buttonStyles = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <button
      type={type} // 버튼 타입
      disabled={disabled} // 비활성화 여부
      className={buttonStyles} // 최종 스타일 적용
      {...props} // 나머지 속성들 전달
    >
      {children}
    </button>
  );
};

export default Button;
