
import React from 'react'
import AuthLayout from './AuthPageLayout'
import SignInForm from '@/components/auth/SignInForm'
interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}
const login = ({ status, canResetPassword }: LoginProps) => {

  return (
    <AuthLayout>
      <SignInForm status={status} canResetPassword={canResetPassword} />
    </AuthLayout>
  )
}

export default login

