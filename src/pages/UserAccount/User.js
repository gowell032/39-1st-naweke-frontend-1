import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.scss';

function User({ userData }) {
  const { title, text, url, button } = userData;
  const [inputValue, setInputValue] = useState({ id: '', pw: '' });
  const navigate = useNavigate();
  const [validId, setValidId] = useState(false);
  const [validPw, setValidPw] = useState(false);
  const [termsAgree, setTermsAgree] = useState(false);

  const handleInput = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const { id, pw } = inputValue;

  const loginAccess = () => {
    fetch('http', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        id: id,
        password: pw,
      }),
    })
      .then(response => {
        if (response.ok === true) {
          return response.json();
        }
        throw new Error('에러 발생!');
      })
      .catch(error => console.log(error))
      .then(data => {
        if (data.accessToken) {
          localStorage.setItem('token', data.accessToken);
          navigate('/main');
        }
      });
  };

  const signUpAccess = () => {
    console.log(123);
  };

  useEffect(() => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
    !regExp.test(inputValue.id) ? setValidId(false) : setValidId(true);
  }, [inputValue.id]);

  useEffect(() => {
    const regExp =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    !regExp.test(inputValue.pw) ? setValidPw(false) : setValidPw(true);
  }, [inputValue.pw]);

  const validator = validId === true && validPw === true && termsAgree === true;

  return (
    <div className="signup">
      <div className="signupInner">
        <div className="logo">
          <img src="/images/nike.png" alt="logo" />
        </div>
        <h2>{title}</h2>
        <form className="signupInput">
          {title === '이제 나위키의 멤버가 되어볼까요?' && (
            <>
              <div className="singupName">
                <input type="text" placeholder="이름" />
              </div>
              <input
                type="date"
                name="birth"
                placeholder="생년월일"
                min="1900-01-01"
                max="2022-11-16"
              />
            </>
          )}
          <input
            type="text"
            name="id"
            placeholder="아이디"
            onChange={handleInput}
            id="userId"
          />

          {/* 아이디 유효성 표시 */}
          {button === '계정만들기' &&
            (validId === true ? (
              <label htmlFor="userId" style={{ color: 'green' }}>
                8~20자 영어, 숫자 포함
              </label>
            ) : (
              <label htmlFor="userId" style={{ color: 'red' }}>
                8~20자 영어, 숫자 포함하세요
              </label>
            ))}
          <input
            type="password"
            name="pw"
            placeholder="비밀번호"
            onChange={handleInput}
            id="userPw"
            style={{ marginTop: '15px' }}
          />

          {/* 패스워드 유효성 표시 */}
          {button === '계정만들기' &&
            (validPw === true ? (
              <label htmlFor="userPw" style={{ color: 'green' }}>
                8~20자 영문, 숫자, 특수문자 포함
              </label>
            ) : (
              <label htmlFor="userPw" style={{ color: 'red' }}>
                8~20자 영문, 숫자, 특수문자를 포함하세요
              </label>
            ))}
        </form>

        {/* 이용약관 */}
        <div className="serviceTerms">
          {button === '계정만들기' && (
            <>
              <input type="checkbox" id="terms" />
              <label
                htmlFor="terms"
                onClick={() => {
                  setTermsAgree(!termsAgree);
                }}
              >
                <span>
                  나위키의 개인 정보 처리 방침 및 이용약관에 동의합니다.
                </span>
              </label>
            </>
          )}
        </div>
        {button === '로그인' ? (
          <button
            type="button"
            className="signupBtn"
            disabled={!(inputValue.pw.length > 0)}
            onClick={loginAccess}
          >
            {button}
          </button>
        ) : (
          <button
            type="button"
            className="signupBtn"
            disabled={!validator}
            onClick={signUpAccess}
          >
            {button}
          </button>
        )}
        <Link to={url} className="link">
          {text}
        </Link>
      </div>
    </div>
  );
}

export default User;
