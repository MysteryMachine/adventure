import React, { useState } from 'react';
import css from './index.css';
import { Input, Button } from '../../components/forms';
import { Panel } from '../../components/containers';
import { Label, Body, Link } from '../../components/typography';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../actions/user-actions';

export const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={css.loginPage}>
      <Panel centered={true}>
        <Label htmlFor="email"> Email </Label>
        <Input name="email" value={email} onStateChange={setEmail} />
        <Label htmlFor="password"> Password </Label>
        <Input type="password" name="password" value={password} onStateChange={setPassword} />
        <Button onClick={() => dispatch(LOGIN(email, password))}>Login</Button>
        <Body>
          New? <Link href="/register"> Join Us! </Link>
        </Body>
      </Panel>
    </div>
  );
};
