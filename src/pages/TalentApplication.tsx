import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { Upload, ArrowLeft } from "lucide-react"
import Header from "@/components/Header"
import { useAccount, useDisconnect } from 'wagmi'
import { modal } from '@/lib/wallet-config'

const TalentApplication = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    contactEmail: '',
    phoneNumber: '',
    location: '',
    talentCategory: '',
    description: '',
    socialMediaHandles: {
      instagram: '',
      twitter: '',
      youtube: '',
      tiktok: ''
    }
  })
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const { toast } = useToast()
  const navigate = useNavigate()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const handleConnectWallet = () => {
    if (isConnected) disconnect()
    else modal.open()
  }

  useEffect(() => {
    document.title = "Apply as Talent | Talevest"
    const desc = "Apply to list your talent on Talevest and get community voting."
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = desc

    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to apply as talent.",
          variant: "destructive",
        })
        navigate('/auth')
        return
      }
      setUser(session.user)
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate('/auth')
        } else {
          setUser(session.user)
        }
      }
    )

    checkAuth()

    return () => subscription.unsubscribe()
  }, [navigate, toast])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialMediaHandles: {
        ...prev.socialMediaHandles,
        [platform]: value
      }
    }))
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        toast({
          title: "File too large",
          description: "Please select a video file smaller than 100MB.",
          variant: "destructive",
        })
        return
      }
      setVideoFile(file)
    }
  }

  const uploadVideo = async (userId: string) => {
    if (!videoFile) return null

    const fileExt = videoFile.name.split('.').pop()
    const fileName = `${userId}_${Date.now()}.${fileExt}`
    const filePath = `${userId}/${fileName}`

    const { error } = await supabase.storage
      .from('talent-videos')
      .upload(filePath, videoFile)

    if (error) {
      throw error
    }

    return { filePath, fileName }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)

    try {
      let videoUrl = null
      let videoFileName = null

      // Upload video if provided
      if (videoFile) {
        const videoData = await uploadVideo(user.id)
        if (videoData) {
          videoUrl = videoData.filePath
          videoFileName = videoData.fileName
        }
      }

      // Submit application
      const { error } = await supabase
        .from('talent_applications')
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          age: parseInt(formData.age),
          contact_email: formData.contactEmail,
          phone_number: formData.phoneNumber,
          location: formData.location,
          talent_category: formData.talentCategory,
          description: formData.description,
          social_media_handles: formData.socialMediaHandles,
          video_url: videoUrl,
          video_file_name: videoFileName,
        })

      if (error) {
        throw error
      }

      toast({
        title: "Application submitted!",
        description: "Your talent application has been submitted for review.",
      })

      navigate('/vote')
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header onConnectWallet={handleConnectWallet} isConnected={isConnected} address={address} />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/vote')}
              className="text-white hover:bg-white/10 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Voting
            </Button>
            
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Apply as Talent</h1>
              <p className="text-white/80 max-w-2xl mx-auto">
                Submit your application to be listed on Talevest and get community voting for your talent.
              </p>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Talent Application Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-white">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="age" className="text-white">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Your age"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail" className="text-white">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phoneNumber" className="text-white">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-white">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <Label htmlFor="talentCategory" className="text-white">Talent Category *</Label>
                  <Select onValueChange={(value) => handleInputChange('talentCategory', value)} required>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your talent category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description" className="text-white">Talent Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Describe your talent, achievements, and what makes you unique..."
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Social Media Handles</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="instagram" className="text-white/70 text-sm">Instagram</Label>
                      <Input
                        id="instagram"
                        value={formData.socialMediaHandles.instagram}
                        onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter" className="text-white/70 text-sm">Twitter/X</Label>
                      <Input
                        id="twitter"
                        value={formData.socialMediaHandles.twitter}
                        onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="youtube" className="text-white/70 text-sm">YouTube</Label>
                      <Input
                        id="youtube"
                        value={formData.socialMediaHandles.youtube}
                        onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="Channel name or URL"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tiktok" className="text-white/70 text-sm">TikTok</Label>
                      <Input
                        id="tiktok"
                        value={formData.socialMediaHandles.tiktok}
                        onChange={(e) => handleSocialMediaChange('tiktok', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="@username"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="video" className="text-white">Talent Video (Optional)</Label>
                  <div className="mt-2">
                    <label
                      htmlFor="video-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-white/70" />
                        {videoFile ? (
                          <p className="text-sm text-white">
                            Selected: {videoFile.name}
                          </p>
                        ) : (
                          <>
                            <p className="mb-2 text-sm text-white/70">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-white/50">MP4, MOV, AVI (MAX. 100MB)</p>
                          </>
                        )}
                      </div>
                      <input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-primary hover:bg-white/90"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default TalentApplication