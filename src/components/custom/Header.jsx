import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (token) => getUserProfile(token),
    onError: (error) => console.error("Login Failed:", error),
    scope: 'openid profile email',
  });

  const getUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: 'application/json',
          },
        }
      );
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      setOpenDialog(false);
    } catch (error) {
      console.error("Fetching user failed:", error);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <header className="bg-blue-50 border-b px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="h-10" />
      </a>

      {/* Right Side */}
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <a href="/createtrip">
              <Button variant="outline" className="rounded-full text-indigo-600 border-indigo-600 hover:bg-indigo-50">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full text-indigo-600 border-indigo-600 hover:bg-indigo-50">
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger asChild>
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt="User"
                    className="h-9 w-9 rounded-full ring-2 ring-indigo-600 cursor-pointer"
                  />
                ) : (
                  <div className="h-9 w-9 bg-gray-200 rounded-full animate-pulse" />
                )}
              </PopoverTrigger>
              <PopoverContent className="w-44 text-center p-4">
                <p className="text-sm font-medium text-slate-800 mb-2">{user?.name}</p>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => setOpenDialog(true)}
            className="rounded-full px-6 bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
          >
            Sign In
          </Button>
        )}
      </div>

      {/* Dialog for Google Sign In */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogDescription className="flex flex-col items-center">
              <img src="/logo.svg" alt="Logo" className="h-10 mb-4" />
              <h2 className="font-bold text-lg mb-1 text-slate-800">Sign In with Google</h2>
              <p className="text-sm text-slate-500 text-center">
                Use your Google account to sign in and access the AI Doctor features.
              </p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-2 items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <FcGoogle className="h-6 w-6" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
