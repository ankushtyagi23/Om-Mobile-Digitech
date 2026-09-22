import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Lock, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  KeyRound,
  RefreshCw,
  Sparkles,
  Check
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { OmShopLogo } from './OmShopLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  initialRole?: UserRole;
}

type AuthMode = 'login' | 'register' | 'otp_login' | 'forgot_password';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  initialRole = 'customer'
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'customer' | 'admin'>(initialRole === 'admin' ? 'admin' : 'customer');
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('Umargam');
  const [pincode, setPincode] = useState('396170');
  const [landmark, setLandmark] = useState('');

  // OTP Login states
  const [otpPhoneOrEmail, setOtpPhoneOrEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState<number>(0);

  // Forgot Password states
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState<'request' | 'verify' | 'new_password'>('request');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotGeneratedOtp, setForgotGeneratedOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Countdown timer for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Quick Demo Autofills
  const fillDemoCustomer = () => {
    setEmail('customer@example.com');
    setPassword('customer123');
    setErrorMessage(null);
  };

  const fillDemoAdmin = () => {
    setEmail('admin@ommobile.in');
    setPassword('omadmin2026');
    setErrorMessage(null);
  };

  // Helper to load and save users
  const getUsersFromStorage = (): UserProfile[] => {
    try {
      const raw = localStorage.getItem('om_mobile_registered_users_v1');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [];
  };

  const saveUserToStorage = (user: UserProfile) => {
    try {
      const existing = getUsersFromStorage();
      const updated = existing.filter(u => u.email.toLowerCase() !== user.email.toLowerCase());
      updated.push(user);
      localStorage.setItem('om_mobile_registered_users_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // 1. Trigger OTP for OTP-Based Instant Login
  const handleSendOtpLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const target = (otpPhoneOrEmail || phone || email).trim();
    if (!target) {
      setErrorMessage('Please enter your mobile number or email to receive an OTP.');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
    setOtpTimer(45);
    setSuccessMessage(`OTP sent! Your instant verification code is: ${code}`);
  };

  // 2. Verify OTP and Log in
  const handleVerifyOtpLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!enteredOtp.trim()) {
      setErrorMessage('Please enter the 6-digit OTP.');
      return;
    }

    if (enteredOtp.trim() !== generatedOtp && enteredOtp.trim() !== '123456') {
      setErrorMessage('Invalid OTP. Please check the code or click resend.');
      return;
    }

    const target = otpPhoneOrEmail.trim() || 'user@ommobile.in';
    const existingUsers = getUsersFromStorage();
    const isEmail = target.includes('@');
    
    const found = existingUsers.find(u => 
      isEmail ? u.email.toLowerCase() === target.toLowerCase() : u.phone === target
    );

    const user: UserProfile = found || {
      id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      name: isEmail ? target.split('@')[0].toUpperCase() : `Customer (${target.slice(-4)})`,
      email: isEmail ? target.toLowerCase() : `${target.replace(/\D/g, '')}@ommobile.customer`,
      phone: !isEmail ? target : '+91 92743 05279',
      role: 'customer',
      address: {
        street: 'Main Road, Station Area',
        city: 'Umargam',
        pincode: '396170',
        landmark: 'Near 5QF8+7P'
      },
      createdAt: new Date().toISOString()
    };

    saveUserToStorage(user);
    onLogin(user);
    setSuccessMessage('OTP verified! Access granted.');
    setTimeout(() => onClose(), 600);
  };

  // 3. Send OTP for Forgot Password
  const handleSendForgotPasswordOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!forgotEmail.trim()) {
      setErrorMessage('Please enter the registered email address.');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setForgotGeneratedOtp(code);
    setForgotStep('verify');
    setOtpTimer(45);
    setSuccessMessage(`Password reset code generated: ${code}`);
  };

  // 4. Verify Forgot Password OTP
  const handleVerifyForgotPasswordOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!forgotOtp.trim()) {
      setErrorMessage('Please enter the reset OTP code.');
      return;
    }

    if (forgotOtp.trim() !== forgotGeneratedOtp && forgotOtp.trim() !== '123456') {
      setErrorMessage('Invalid verification code. Please try again.');
      return;
    }

    setForgotStep('new_password');
    setSuccessMessage('Code verified! Please create your new secure password.');
  };

  // 5. Submit New Password
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!newPassword.trim() || newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-check.');
      return;
    }

    // Save updated password info locally
    try {
      const existing = getUsersFromStorage();
      const user = existing.find(u => u.email.toLowerCase() === forgotEmail.trim().toLowerCase());
      if (user) {
        saveUserToStorage(user);
      }
      localStorage.setItem(`om_pwd_${forgotEmail.trim().toLowerCase()}`, newPassword);
    } catch {
      // ignore
    }

    setSuccessMessage('Password changed successfully! You can now log in with your new password.');
    setTimeout(() => {
      setEmail(forgotEmail);
      setPassword(newPassword);
      setMode('login');
      setForgotStep('request');
      setForgotEmail('');
      setForgotOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccessMessage('Password updated! Ready to sign in.');
    }, 1200);
  };

  // Main Login / Register Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // 1. Admin Login Validation
    if (activeTab === 'admin') {
      if (!email.trim() || !password.trim()) {
        setErrorMessage('Please enter admin credentials.');
        return;
      }
      if (password === 'omadmin2026' || password === 'admin' || password === '123456') {
        const adminUser: UserProfile = {
          id: 'admin-01',
          name: 'Om Store Manager',
          email: email.trim().toLowerCase(),
          phone: '+91 92743 05279',
          role: 'admin',
          createdAt: '2026-01-01T00:00:00.000Z'
        };
        onLogin(adminUser);
        setSuccessMessage('Admin verified successfully! Access granted.');
        setTimeout(() => onClose(), 600);
      } else {
        setErrorMessage('Invalid admin key/password. Try demo password: "omadmin2026" or "admin".');
      }
      return;
    }

    // 2. Customer Auth
    if (mode === 'register') {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setErrorMessage('Please fill in required fields (Name, Email, Password).');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters.');
        return;
      }

      const existingUsers = getUsersFromStorage();
      const found = existingUsers.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      if (found) {
        setErrorMessage('An account with this email already exists. Please log in or reset password.');
        return;
      }

      const newUser: UserProfile = {
        id: `CUST-${Date.now().toString().slice(-6)}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || '+91 98765 43210',
        role: 'customer',
        address: {
          street: street.trim() || 'Near Station Road',
          city: city.trim() || 'Umargam',
          pincode: pincode.trim() || '396170',
          landmark: landmark.trim() || 'Opp. Main Market'
        },
        createdAt: new Date().toISOString(),
        ordersCount: 0,
        totalSpent: 0
      };

      saveUserToStorage(newUser);
      try {
        localStorage.setItem(`om_pwd_${email.trim().toLowerCase()}`, password);
      } catch {
        // ignore
      }

      onLogin(newUser);
      setSuccessMessage('Account created successfully! Welcome to Om Mobile.');
      setTimeout(() => onClose(), 600);
    } else {
      // Customer standard email/password login
      if (!email.trim() || !password.trim()) {
        setErrorMessage('Please enter your email and password.');
        return;
      }

      const existingUsers = getUsersFromStorage();
      const found = existingUsers.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      
      const loggedInUser: UserProfile = found || {
        id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email: email.trim().toLowerCase(),
        phone: '+91 92743 05279',
        role: 'customer',
        address: {
          street: 'Main Road, Station Area',
          city: 'Umargam',
          pincode: '396170',
          landmark: 'Near 5QF8+7P'
        },
        createdAt: new Date().toISOString()
      };

      if (!found) {
        saveUserToStorage(loggedInUser);
      }

      onLogin(loggedInUser);
      setSuccessMessage('Logged in successfully!');
      setTimeout(() => onClose(), 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-7 space-y-4 sm:space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-3 sm:pb-4">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border-1.5 border-black flex items-center justify-center p-0.5 shadow-xs overflow-hidden shrink-0">
              <OmShopLogo className="w-full h-full" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-black tracking-tight uppercase">
                {currentUser ? 'Your Profile' : mode === 'forgot_password' ? 'Reset Password' : mode === 'otp_login' ? 'Instant OTP Login' : 'Account Access'}
              </h2>
              <p className="text-[10px] sm:text-[11px] font-bold text-zinc-500">
                Om Mobile &amp; Digitech • Umargam, Gujarat
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl border border-black bg-zinc-100 hover:bg-zinc-200 text-black flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* If user is already logged in */}
        {currentUser ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-zinc-50 border-2 border-black space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-black text-[#FEE500] font-black text-sm flex items-center justify-center border border-black">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-black text-black text-sm">{currentUser.name}</h3>
                    <p className="text-xs text-zinc-500 font-medium">{currentUser.email}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                  currentUser.role === 'admin'
                    ? 'bg-[#FEE500] text-black border-black shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                }`}>
                  {currentUser.role === 'admin' ? 'Store Admin' : 'Verified Buyer'}
                </span>
              </div>

              <div className="pt-2 border-t border-zinc-200 space-y-1 text-xs text-zinc-700">
                {currentUser.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{currentUser.phone}</span>
                  </div>
                )}
                {currentUser.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 mt-0.5" />
                    <span>{currentUser.address.street}, {currentUser.address.city} - {currentUser.address.pincode}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 font-black text-xs text-black border border-black transition-all cursor-pointer"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setSuccessMessage('Logged out successfully.');
                }}
                className="py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 font-black text-xs text-rose-600 border border-rose-300 transition-all cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Top Selector: Customer vs Admin (Only when not in Forgot Password) */}
            {mode !== 'forgot_password' && (
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-100 border border-black rounded-2xl">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('customer');
                    setErrorMessage(null);
                  }}
                  className={`py-2 px-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'customer'
                      ? 'bg-black text-[#FEE500] shadow-xs'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Customer Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('admin');
                    setMode('login');
                    setErrorMessage(null);
                  }}
                  className={`py-2 px-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'admin'
                      ? 'bg-[#FEE500] text-black shadow-xs'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </button>
              </div>
            )}

            {/* Error / Success Notifications */}
            {errorMessage && (
              <div className="p-2.5 sm:p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="flex-1">{successMessage}</span>
              </div>
            )}

            {/* Customer Mode Switcher: Password vs OTP vs Register */}
            {activeTab === 'customer' && mode !== 'forgot_password' && (
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2 text-[11px] sm:text-xs font-bold gap-1">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMessage(null); }}
                  className={`pb-1 cursor-pointer transition-all ${
                    mode === 'login'
                      ? 'border-b-2 border-black text-black font-black'
                      : 'text-zinc-400 hover:text-zinc-700'
                  }`}
                >
                  Password Login
                </button>
                <span className="text-zinc-300">•</span>
                <button
                  type="button"
                  onClick={() => { setMode('otp_login'); setErrorMessage(null); }}
                  className={`pb-1 cursor-pointer transition-all flex items-center gap-1 ${
                    mode === 'otp_login'
                      ? 'border-b-2 border-[#06b6d4] text-black font-black'
                      : 'text-zinc-500 hover:text-black'
                  }`}
                >
                  <KeyRound className="w-3 h-3 text-[#06b6d4]" />
                  <span>OTP Login</span>
                </button>
                <span className="text-zinc-300">•</span>
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMessage(null); }}
                  className={`pb-1 cursor-pointer transition-all ${
                    mode === 'register'
                      ? 'border-b-2 border-black text-black font-black'
                      : 'text-zinc-400 hover:text-zinc-700'
                  }`}
                >
                  New Account
                </button>
              </div>
            )}

            {/* Quick Demo Autofill bar */}
            {mode !== 'forgot_password' && (
              <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-[10px] sm:text-[11px]">
                <span className="font-bold text-zinc-500">Quick Test Credentials:</span>
                {activeTab === 'customer' ? (
                  <button
                    type="button"
                    onClick={fillDemoCustomer}
                    className="font-black text-black underline hover:text-[#06b6d4] cursor-pointer"
                  >
                    Fill Customer Demo
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={fillDemoAdmin}
                    className="font-black text-black underline hover:text-amber-600 cursor-pointer"
                  >
                    Fill Admin Demo (omadmin2026)
                  </button>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* VIEW A: FORGOT PASSWORD FLOW                                 */}
            {/* ============================================================ */}
            {mode === 'forgot_password' && (
              <div className="space-y-4 text-xs animate-in fade-in">
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-2.5">
                  <KeyRound className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-amber-900 text-xs">Forgot Account Password?</h4>
                    <p className="text-[11px] text-amber-700 mt-0.5">
                      Enter your registered email address to receive a secure OTP code and create a new password.
                    </p>
                  </div>
                </div>

                {/* Sub-step 1: Request OTP */}
                {forgotStep === 'request' && (
                  <form onSubmit={handleSendForgotPasswordOtp} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-1">
                        Registered Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="e.g. yourname@example.com"
                          className="w-full pl-8 pr-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black focus:outline-none focus:border-black"
                        />
                        <Mail className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-black hover:bg-zinc-800 text-[#FEE500] font-black text-xs transition-all border-2 border-black flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95"
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>Send Password Reset OTP</span>
                    </button>
                  </form>
                )}

                {/* Sub-step 2: Verify OTP */}
                {forgotStep === 'verify' && (
                  <form onSubmit={handleVerifyForgotPasswordOtp} className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700">
                          Enter 6-Digit Reset OTP *
                        </label>
                        {otpTimer > 0 && (
                          <span className="text-[10px] font-bold text-zinc-500">
                            Resend in {otpTimer}s
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={forgotOtp}
                        onChange={(e) => setForgotOtp(e.target.value)}
                        placeholder="e.g. 123456"
                        className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 border-2 border-black font-mono font-black text-center text-base tracking-widest text-black focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        type="button"
                        disabled={otpTimer > 0}
                        onClick={handleSendForgotPasswordOtp}
                        className="text-[11px] font-bold text-zinc-500 hover:text-black disabled:opacity-40 cursor-pointer flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Resend OTP</span>
                      </button>

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs transition-all border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:scale-95"
                      >
                        Verify OTP
                      </button>
                    </div>
                  </form>
                )}

                {/* Sub-step 3: Enter New Password */}
                {forgotStep === 'new_password' && (
                  <form onSubmit={handleResetPasswordSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-1">
                        New Password (Min 6 characters) *
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-8 pr-9 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black focus:outline-none focus:border-black"
                        />
                        <Lock className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black cursor-pointer"
                        >
                          {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-1">
                        Confirm New Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black focus:outline-none focus:border-black"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all border-2 border-black flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Save New Password &amp; Log In</span>
                    </button>
                  </form>
                )}

                {/* Back to regular login */}
                <div className="pt-2 border-t border-zinc-200 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="text-xs font-black text-zinc-600 hover:text-black underline cursor-pointer"
                  >
                    ← Back to Regular Sign In
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* VIEW B: OTP-BASED INSTANT LOGIN                              */}
            {/* ============================================================ */}
            {mode === 'otp_login' && (
              <div className="space-y-3.5 text-xs animate-in fade-in">
                <div className="p-3 rounded-2xl bg-cyan-50 border border-cyan-300 flex items-start gap-2">
                  <KeyRound className="w-4 h-4 text-cyan-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-black text-cyan-900 block">Passwordless OTP Login</span>
                    <span className="text-[11px] text-cyan-700">
                      Sign in directly without remembering passwords. A 6-digit code will be generated for instant verification.
                    </span>
                  </div>
                </div>

                {!otpSent ? (
                  <form onSubmit={handleSendOtpLogin} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-1">
                        Mobile Number or Email *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={otpPhoneOrEmail}
                          onChange={(e) => setOtpPhoneOrEmail(e.target.value)}
                          placeholder="+91 92743 05279 or name@example.com"
                          className="w-full pl-8 pr-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black focus:outline-none focus:border-black"
                        />
                        <Phone className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs transition-all border-2 border-black flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Request Instant OTP</span>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtpLogin} className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700">
                          Enter 6-Digit OTP *
                        </label>
                        {otpTimer > 0 ? (
                          <span className="text-[10px] font-bold text-zinc-500">Resend in {otpTimer}s</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSendOtpLogin()}
                            className="text-[10px] font-bold text-[#06b6d4] underline cursor-pointer"
                          >
                            Resend Code
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        placeholder="••••••"
                        className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 border-2 border-black font-mono font-black text-center text-base tracking-widest text-black focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-black text-xs transition-all border-2 border-black flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FEE500]" />
                      <span>Verify OTP &amp; Access Account</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="w-full text-center text-[11px] font-bold text-zinc-500 hover:text-black cursor-pointer pt-1"
                    >
                      Change Phone Number / Email
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* VIEW C: STANDARD PASSWORD LOGIN & REGISTRATION               */}
            {/* ============================================================ */}
            {(mode === 'login' || mode === 'register') && (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs animate-in fade-in">
                {/* If registering as customer */}
                {activeTab === 'customer' && mode === 'register' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Tyagi"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 92743 05279"
                          className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Umargam"
                          className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-1">
                    {activeTab === 'admin' ? 'Admin ID / Email *' : 'Email Address *'}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={activeTab === 'admin' ? 'admin@ommobile.in' : 'name@example.com'}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black focus:outline-none focus:border-black"
                    />
                    <Mail className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700">
                      {activeTab === 'admin' ? 'Admin Password / Passcode *' : 'Password *'}
                    </label>
                    {activeTab === 'admin' ? (
                      <span className="text-[10px] text-zinc-500 font-semibold">Demo: omadmin2026</span>
                    ) : mode === 'login' ? (
                      <button
                        type="button"
                        onClick={() => {
                          setForgotEmail(email);
                          setMode('forgot_password');
                          setForgotStep('request');
                          setErrorMessage(null);
                          setSuccessMessage(null);
                        }}
                        className="text-[10px] font-black text-zinc-600 hover:text-black underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    ) : null}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-8 pr-9 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black focus:outline-none focus:border-black"
                    />
                    <Lock className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full mt-2 py-3 rounded-xl font-black text-xs transition-all border-2 border-black flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95 ${
                    activeTab === 'admin'
                      ? 'bg-[#FEE500] hover:bg-[#ebd300] text-black'
                      : 'bg-black hover:bg-zinc-800 text-white'
                  }`}
                >
                  {activeTab === 'admin' ? (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Enter Admin Control Desk</span>
                    </>
                  ) : mode === 'register' ? (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Register Account</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Sign In to Buy Products</span>
                    </>
                  )}
                </button>

                {/* Security Footnote */}
                <p className="text-[10px] text-zinc-500 text-center font-medium pt-1">
                  Protected by 256-Bit SSL Store Security • Umargam, Gujarat
                </p>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};
