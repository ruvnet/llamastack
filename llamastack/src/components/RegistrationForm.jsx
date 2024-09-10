import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!agreeTerms) {
      alert('Please agree to the Terms & Conditions')
      return
    }
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      })
      if (error) throw error
      alert('Registration successful! Please check your email to verify your account.')
      navigate('/profile')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="bg-[#28283c] border-gray-600 text-white placeholder-gray-400"
        />
        <Input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="bg-[#28283c] border-gray-600 text-white placeholder-gray-400"
        />
      </div>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-[#28283c] border-gray-600 text-white placeholder-gray-400"
      />
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-[#28283c] border-gray-600 text-white placeholder-gray-400 pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={agreeTerms}
          onCheckedChange={setAgreeTerms}
          className="border-gray-600 text-purple-500"
        />
        <label htmlFor="terms" className="text-sm text-gray-400">
          I agree to the Terms & Conditions
        </label>
      </div>
      <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white">Create account</Button>
    </form>
  )
}

export default RegistrationForm