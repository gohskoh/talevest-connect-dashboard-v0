import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import Header from "../components/Header"
import { Gift, Trophy, Youtube } from "lucide-react"

const Airdrop = () => {
  const [secretCode, setSecretCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [minedTVST, setMinedTVST] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [todayClaimed, setTodayClaimed] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    document.title = "Daily Airdrop | Talevest"
    const desc = "Watch our daily video and claim your TVST tokens. Earn 0.001 TVST daily by entering the secret code."
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = desc

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = window.location.href
  }, [])

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUser(user)
      await loadUserData(user.id)
    }
  }

  const loadUserData = async (userId: string) => {
    // Load mined TVST balance
    const { data: balanceData } = await supabase
      .from('user_tvst_balance')
      .select('total_mined')
      .eq('user_id', userId)
      .maybeSingle()
    
    if (balanceData) {
      setMinedTVST(parseFloat(String(balanceData.total_mined)))
    }

    // Check if already claimed today
    const today = new Date().toISOString().split('T')[0]
    const { data: claimData } = await supabase
      .from('user_airdrop_claims')
      .select('id, airdrop_codes!inner(date)')
      .eq('user_id', userId)
      .eq('airdrop_codes.date', today)
      .maybeSingle()
    
    if (claimData) {
      setTodayClaimed(true)
    }
  }

  const handleClaimAirdrop = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to claim your daily TVST.",
        variant: "destructive"
      })
      return
    }

    if (!secretCode.trim()) {
      toast({
        title: "Code Required",
        description: "Please enter the secret code from today's video.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { data, error } = await supabase
        .rpc('process_airdrop_claim', {
          p_code: secretCode.trim()
        })

      if (error) {
        throw error
      }

      const result = data as any
      if (result?.success) {
        toast({
          title: "Success!",
          description: result.message || "Successfully claimed TVST!",
        })
        setMinedTVST(prev => prev + (parseFloat(result.tvst_earned) || 0.001))
        setTodayClaimed(true)
        setSecretCode("")
      } else {
        toast({
          title: "Claim Failed",
          description: result?.error || "Invalid code or already claimed",
          variant: "destructive"
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process claim",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              <Gift className="w-4 h-4 mr-2" />
              Daily Rewards
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Daily Airdrop
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Watch our daily video and discover the secret code to earn 0.001 TVST tokens every day!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Video Section */}
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Youtube className="w-6 h-6" />
                  Today's Video
                </h2>
                <p className="text-white/70">
                  Watch today's video to get the secret code and claim your TVST!
                </p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Talevest Daily Update"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-white/70">
                    📝 Watch carefully! The secret code will be revealed during the video.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Claim Section */}
            <div className="space-y-6">
              {/* Your Balance */}
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Your Mined TVST
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      {minedTVST.toFixed(6)} TVST
                    </div>
                    <div className="text-white/70 text-sm">
                      Total earned from airdrops
                    </div>
                    {user && (
                      <Badge className="mt-3 bg-blue-600/20 text-blue-300 border-blue-500/30">
                        ✓ Authenticated
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Code Entry */}
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <h3 className="text-xl font-bold text-white">Enter Secret Code</h3>
                  <p className="text-white/70">
                    Enter the code from today's video to claim your 0.001 TVST
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter secret code..."
                      value={secretCode}
                      onChange={(e) => setSecretCode(e.target.value)}
                      disabled={!user || todayClaimed || isSubmitting}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    />
                    
                    {todayClaimed ? (
                      <div className="text-center py-3">
                        <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                          ✓ Already claimed today!
                        </Badge>
                        <p className="text-sm text-white/70 mt-2">
                          Come back tomorrow for another chance to earn TVST
                        </p>
                      </div>
                    ) : (
                      <Button
                        onClick={handleClaimAirdrop}
                        disabled={!user || !secretCode.trim() || isSubmitting}
                        className="w-full bg-white text-primary hover:bg-white/90 disabled:opacity-50"
                      >
                        {isSubmitting 
                          ? "Processing..." 
                          : !user 
                          ? "Sign in to claim" 
                          : "Claim 0.001 TVST"}
                      </Button>
                    )}

                    {!user && (
                      <div className="text-center">
                        <p className="text-sm text-white/70 mb-2">
                          Sign in to start earning TVST tokens
                        </p>
                        <Button
                          onClick={() => window.location.href = '/auth'}
                          variant="outline"
                          className="bg-transparent border-white/30 text-white hover:bg-white/10"
                        >
                          Sign In
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Daily Stats */}
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-white">0.001</div>
                      <div className="text-sm text-white/70">TVST per day</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">365</div>
                      <div className="text-sm text-white/70">Days per year</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20 text-center">
                    <div className="text-sm text-white/70">
                      Potential yearly earnings: <span className="font-bold text-white">0.365 TVST</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Information Section */}
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <h2 className="text-2xl font-bold text-white">How it Works</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Youtube className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2">1. Watch Video</h3>
                  <p className="text-sm text-white/70">
                    Watch our daily update video to learn about Talevest developments
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">#</span>
                  </div>
                  <h3 className="font-bold text-white mb-2">2. Find Code</h3>
                  <p className="text-sm text-white/70">
                    The secret code will be revealed somewhere in the video
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2">3. Claim Reward</h3>
                  <p className="text-sm text-white/70">
                    Enter the code to claim your 0.001 TVST tokens
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Airdrop