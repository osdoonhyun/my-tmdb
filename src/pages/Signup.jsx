import { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import AuthFormContainer from '../components/AuthFormContainer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../actions/userActions';

const emailList = [
  '@naver.com',
  '@hanmail.net',
  '@daum.net',
  '@gmail.com',
  '@naver.com',
  '@hotmail.com',
];

const agreeList = [
  '만 14세 이상입니다(필수)',
  '이용약관(필수)',
  '개인정보수집 및 이용동의(필수)',
  '개인정보 마케팅 활용 동의(선택)',
  '이벤트, 쿠폰, 특가 알림 메일 및 SMS 등 수신(선택)',
];

export default function Signup() {
  const [email, setEmail] = useState('');
  const [emailCategory, setEmailCategory] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');

  const [isMarketingAgree, setIsMarketingAgree] = useState(false);
  const [isEventAgree, setIsEventAgree] = useState(false);

  const [isVerification, setIsVerification] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userSignup = useSelector((state) => state.userSignup);
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const { loading, error, success } = userSignup;

  useEffect(() => {
    if (email !== '' && emailCategory !== '') {
      setBtnDisable(true);
    }
  }, [email, emailCategory]);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
    if (success) {
      navigate('/login');
    }
  }, [userInfo, success, navigate]);

  const signUpHandler = async (e) => {
    e.preventDefault();

    dispatch(signupUser(email + emailCategory, password, userName));
  };

  return (
    <AuthFormContainer title='SignUp'>
      {loading && <Spinner />}
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={signUpHandler}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>이메일</Form.Label>
          <Row className='mb-2'>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridState'>
              <Form.Select
                defaultValue='Choose...'
                value={emailCategory}
                onChange={(e) => setEmailCategory(e.target.value)}
              >
                <option>선택해주세요</option>
                {emailList.map((email, index) => (
                  <option key={index}>{email}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
        </Form.Group>

        <Button
          onClick={() => setIsVerification(true)}
          className='mb-3'
          variant='primary'
          disabled={btnDisable ? false : true}
        >
          이메일 인증하기
        </Button>

        {isVerification && (
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Text className='text-muted'>
              이메일로 전송된 인증코드를 입력해주세요.
            </Form.Text>
            <Form.Control
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              type='password'
              placeholder='인증코드 6자리 입력'
            />
            <Button className='mt-3' variant='primary' type='submit'>
              확인
            </Button>
          </Form.Group>
        )}

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>비밀번호</Form.Label>
          <br />

          <Form.Text className='text-muted'>
            영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </Form.Text>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='비밀번호'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            placeholder='비밀번호 확인'
          />
        </Form.Group>

        <Form.Group
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className='mb-3'
          controlId='formBasicPassword'
        >
          <Form.Label>닉네임</Form.Label>
          <br />
          <Form.Text className='text-muted'>
            다른 유저와 겹치지 않도록 입력해주세요. (2~15자)
          </Form.Text>
          <Form.Control type='text' placeholder='별명 (2~15자)' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Label>약관 동의</Form.Label>
          <Form.Check type='checkbox' label='전체동의' />
          {agreeList.map((agree, index) => (
            <Form.Check key={index} type='checkbox' label={agree} />
          ))}
        </Form.Group>
        <div className='d-flex justify-content-center'>
          <Button variant='primary' type='submit' className='w-100 mt-3'>
            회원가입
          </Button>
        </div>
      </Form>
    </AuthFormContainer>
  );
}
