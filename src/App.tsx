import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Wallet, User, LogOut } from 'lucide-react';

const usersDb: { [key: string]: string } = {};
const walletsDb: { [key: string]: number }  = {};

const App = () => {
  const [user, setUser] = useState('');
  const [balance, setBalance] = useState(0);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [amount, setAmount] = useState('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setBalance(walletsDb[user] || 0);
    }
  }, [user]);

  const handleRegister = () => {
    if (usersDb[registerUsername]) {
      alert('Username already exists');
      return;
    }
    usersDb[registerUsername] = registerPassword;
    walletsDb[registerUsername] = 1000; // Starting balance
    alert('Registration successful');
    setIsRegisterOpen(false);
    setRegisterUsername('');
    setRegisterPassword('');
  };

  const handleLogin = () => {
    if (usersDb[loginUsername] === loginPassword) {
      setUser(loginUsername);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setUser('');
    setBalance(0);
    setLoginUsername('');
    setLoginPassword('');
  };

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      alert('Invalid amount');
      return;
    }
    walletsDb[user] += depositAmount;
    setBalance(walletsDb[user]);
    setAmount('');
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0 || withdrawAmount > balance) {
      alert('Invalid amount');
      return;
    }
    walletsDb[user] -= withdrawAmount;
    setBalance(walletsDb[user]);
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Wallet App</CardTitle>
          <CardDescription>Manage your digital wallet</CardDescription>
        </CardHeader>
        <CardContent>
          {!user ? (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Welcome, {user}!</span>
                <Button variant="outline" size="icon" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Wallet className="h-4 w-4" />
                <span>Balance: ${balance.toFixed(2)}</span>
              </div>
              <Input 
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!user ? (
            <>
              <Button onClick={handleLogin}>Login</Button>
              <AlertDialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Register</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Register</AlertDialogTitle>
                    <AlertDialogDescription>
                      Create a new account
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-username">Username</Label>
                      <Input 
                        id="reg-username"
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <Input 
                        id="reg-password"
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <AlertDialogFooter>
                    <Button onClick={handleRegister}>Register</Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
              <Button onClick={handleDeposit}>Deposit</Button>
              <Button onClick={handleWithdraw} variant="outline">Withdraw</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;