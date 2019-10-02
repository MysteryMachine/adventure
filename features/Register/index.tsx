import React, { useState } from 'react';
import css from './index.css';
import { Input, Button } from '../../components/forms';
import { Panel } from '../../components/containers';
import { Label } from '../../components/typography';
import { useDispatch } from 'react-redux';
import { REGISTER } from '../../actions/user-actions';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  return (
    <div className={css.registerPage}>
      <Panel centered={true}>
        <Label htmlFor="email"> Email </Label>
        <Input name="email" value={email} onStateChange={setEmail} />
        <Label htmlFor="password"> Password </Label>
        <Input type="password" name="password" value={password} onStateChange={setPassword} />
        <Button onClick={() => dispatch(REGISTER(email, password))}>Register</Button>
      </Panel>
    </div>
  );
};
