import React, { useState } from 'react';
import css from './index.css';
import Link from 'next/link';
import { Input, Button } from '../../components/forms';
import { Panel } from '../../components/containers';
import { Label, Body } from '../../components/typography';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className={css.loginPage}>
      <Panel centered={true}>
        <Label htmlFor="email"> Email </Label>
        <Input name="email" value={email} onStateChange={setEmail} />
        <Label htmlFor="password"> Password </Label>
        <Input type="password" name="password" value={password} onStateChange={setPassword} />
        <Button>Login</Button>
        <Body>
          New? <Link href="/register">Join us!</Link>
        </Body>
      </Panel>
    </div>
  );
};
