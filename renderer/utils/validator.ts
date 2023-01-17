export const blankCheck = (type: string, value: string, rest?: string) => {
  console.log("value", value, "rest", rest);

  if (!value.trim() && !rest?.trim()) {
    return { error: `${type} 입력해 주세요.`, isvalid: false };
  }
  return { error: "", isvalid: true };
};

export const signUpErrors = (error: string) => {
  switch (error) {
    case "auth/email-already-in-use":
      return { type: "email", error: "이미 가입된 계정입니다." };
    case "auth/weak-password":
      return { type: "password", error: "6자 이상 입력해주세요." };
    case "auth/missing-email":
      return { type: "email", error: "이메일을 입력해 주세요." };
    case "auth/invalid-email":
      return { type: "email", error: "이메일 형식이 아닙니다." };
  }
};

export const loginErrors = (error: string) => {
  switch (error) {
    case "auth/wrong-password":
      return {
        type: "password",
        error: "아이디와 비밀번호가 일치하지 않습니다.",
      };

    case "auth/user-not-found":
      return {
        type: "password",
        error: "가입된 계정이 아닙니다.",
      };

    case "auth/invalid-email":
      return {
        type: "email",
        error: "이메일 형식이 아닙니다.",
      };
  }
};
