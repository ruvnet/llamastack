import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from '@/lib/supabase'

const ImageUpload = () => {
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [tags, setTags] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) {
      alert('Please select a file')
      return
    }

    try {
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`${Date.now()}_${file.name}`, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(data.path)

      const { data: { user } } = await supabase.auth.getUser()

      const { error: insertError } = await supabase
        .from('images')
        .insert({
          user_id: user.id,
          url: publicUrl,
          caption,
          tags: tags.split(',').map(tag => tag.trim())
        })

      if (insertError) throw insertError

      alert('Image uploaded successfully!')
      setFile(null)
      setCaption('')
      setTags('')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <Input type="file" onChange={handleFileChange} accept="image/*" />
      <Input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <Button type="submit">Upload Image</Button>
    </form>
  )
}

export default ImageUpload