import jwt from 'jsonwebtoken';

const VerifyToken = (authToken) => {
  const secertKey = process.env.NEXT_PUBLIC_jwt_key;
  // console.log('======>',authToken);
  // console.log('======>',secertKey);
  const v = jwt.verify(authToken,secertKey);
  return v;
}

export default VerifyToken
