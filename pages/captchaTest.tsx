import HCaptcha from "react-hcaptcha";

export default function captchaTest() {
  return (
    <>
      <h1>captcha (plz solv)</h1>
      <HCaptcha sitekey="c1faf44c-5e51-4c47-90f7-61157052d727" onVerify={console.log} />
    </>
  );
}
