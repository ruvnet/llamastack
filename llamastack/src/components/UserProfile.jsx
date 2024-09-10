import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from '@/lib/supabase'

const UserProfile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        if (error) throw error
        setProfile(data)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    try {
      const { error } = await supabase.rpc('update_profile', {
        user_id: profile.id,
        new_first_name: profile.first_name,
        new_last_name: profile.last_name,
        new_avatar_url: profile.avatar_url
      })
      if (error) throw error
      alert('Profile updated successfully!')
    } catch (error) {
      alert(error.message)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!profile) return <div>No profile data</div>

  return (
    <form onSubmit={updateProfile} className="space-y-4">
      <Input
        type="text"
        placeholder="First Name"
        value={profile.first_name || ''}
        onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Last Name"
        value={profile.last_name || ''}
        onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Avatar URL"
        value={profile.avatar_url || ''}
        onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
      />
      <Button type="submit">Update Profile</Button>
    </form>
  )
}

export default UserProfile