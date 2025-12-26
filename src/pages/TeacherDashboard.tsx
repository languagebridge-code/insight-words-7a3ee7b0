import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Users, FileText, Clock, Globe, TrendingUp, LogOut, Calendar } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface AnalyticsData {
  totalTranslations: number;
  avgCharacters: number;
  tierDistribution: { tier1: number; tier2: number; tier3: number };
  languagePairs: Record<string, number>;
  hourlyUsage: Record<string, number>;
  dailyUsage: Array<{ date: string; count: number }>;
}

interface ClassroomInfo {
  id: string;
  name: string;
  classroom_code: string;
  deployment_type: string;
  trial_end_date: string | null;
}

const TIER_COLORS = ['#8b5cf6', '#a855f7', '#c084fc'];
const LANGUAGE_NAMES: Record<string, string> = {
  'en': 'English',
  'es': 'Spanish',
  'ur': 'Urdu',
  'ar': 'Arabic',
  'zh': 'Chinese',
  'hi': 'Hindi',
  'vi': 'Vietnamese',
  'ko': 'Korean',
  'fr': 'French',
  'de': 'German',
};

const TeacherDashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [classrooms, setClassrooms] = useState<ClassroomInfo[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState<string>("");
  const [dateRange, setDateRange] = useState("7");
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Find teacher by email
      const { data: teacher, error } = await supabase
        .from('teachers')
        .select(`
          id, name, email,
          schools (name, district_id)
        `)
        .eq('email', email)
        .maybeSingle();

      if (error || !teacher) {
        toast({
          title: "Teacher not found",
          description: "No account found with this email. Please register first.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Get classrooms for this teacher
      const { data: classroomData, error: classroomError } = await supabase
        .from('classrooms')
        .select('id, name, classroom_code, deployment_type, trial_end_date')
        .eq('teacher_id', teacher.id);

      if (classroomError) throw classroomError;

      setTeacherName(teacher.name);
      setSchoolName((teacher.schools as any)?.name || 'Unknown School');
      setClassrooms(classroomData || []);
      if (classroomData && classroomData.length > 0) {
        setSelectedClassroom(classroomData[0].id);
      }
      setIsAuthenticated(true);
      
      toast({
        title: "Welcome back!",
        description: `Logged in as ${teacher.name}`,
      });

    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClassroom && isAuthenticated) {
      fetchAnalytics();
    }
  }, [selectedClassroom, dateRange, isAuthenticated]);

  const fetchAnalytics = async () => {
    if (!selectedClassroom) return;
    
    setIsLoading(true);
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(dateRange));

      const { data, error } = await supabase
        .from('analytics_daily')
        .select('*')
        .eq('classroom_id', selectedClassroom)
        .gte('session_date', startDate.toISOString().split('T')[0])
        .lte('session_date', endDate.toISOString().split('T')[0])
        .order('session_date', { ascending: true });

      if (error) throw error;

      // Aggregate analytics
      let totalTranslations = 0;
      let totalCharacters = 0;
      let tier1 = 0, tier2 = 0, tier3 = 0;
      const languagePairs: Record<string, number> = {};
      const hourlyUsage: Record<string, number> = {};
      const dailyUsage: Array<{ date: string; count: number }> = [];

      (data || []).forEach((day) => {
        totalTranslations += day.translation_count || 0;
        totalCharacters += day.total_characters || 0;
        tier1 += day.tier1_count || 0;
        tier2 += day.tier2_count || 0;
        tier3 += day.tier3_count || 0;

        // Aggregate language pairs
        const dayLangPairs = day.language_pairs as Record<string, number> || {};
        Object.entries(dayLangPairs).forEach(([pair, count]) => {
          languagePairs[pair] = (languagePairs[pair] || 0) + (count as number);
        });

        // Aggregate hourly usage
        const dayHourly = day.hourly_usage as Record<string, number> || {};
        Object.entries(dayHourly).forEach(([hour, count]) => {
          hourlyUsage[hour] = (hourlyUsage[hour] || 0) + (count as number);
        });

        dailyUsage.push({
          date: day.session_date,
          count: day.translation_count || 0,
        });
      });

      setAnalytics({
        totalTranslations,
        avgCharacters: totalTranslations > 0 ? Math.round(totalCharacters / totalTranslations) : 0,
        tierDistribution: { tier1, tier2, tier3 },
        languagePairs,
        hourlyUsage,
        dailyUsage,
      });

    } catch (error) {
      console.error('Analytics fetch error:', error);
      toast({
        title: "Failed to load analytics",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatLanguagePair = (pair: string) => {
    const [from, to] = pair.split('-');
    return `${LANGUAGE_NAMES[from] || from} → ${LANGUAGE_NAMES[to] || to}`;
  };

  const getHourlyData = () => {
    if (!analytics) return [];
    return Object.entries(analytics.hourlyUsage)
      .map(([hour, count]) => ({
        hour: `${hour}:00`,
        count,
      }))
      .sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
  };

  const getTierData = () => {
    if (!analytics) return [];
    const total = analytics.tierDistribution.tier1 + analytics.tierDistribution.tier2 + analytics.tierDistribution.tier3;
    return [
      { name: 'Tier 1 (Basic)', value: analytics.tierDistribution.tier1, percentage: total > 0 ? ((analytics.tierDistribution.tier1 / total) * 100).toFixed(1) : 0 },
      { name: 'Tier 2 (Academic)', value: analytics.tierDistribution.tier2, percentage: total > 0 ? ((analytics.tierDistribution.tier2 / total) * 100).toFixed(1) : 0 },
      { name: 'Tier 3 (Advanced)', value: analytics.tierDistribution.tier3, percentage: total > 0 ? ((analytics.tierDistribution.tier3 / total) * 100).toFixed(1) : 0 },
    ];
  };

  const selectedClassroomInfo = classrooms.find(c => c.id === selectedClassroom);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12 max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Login</CardTitle>
              <CardDescription>
                Enter your email to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane.smith@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Don't have an account?{" "}
                <a href="/teacher-signup" className="text-primary hover:underline">
                  Register here
                </a>
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">LanguageBridge Dashboard</h1>
            <div className="flex flex-wrap gap-2 mt-2 text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" /> {teacherName}
              </span>
              <span>•</span>
              <span>{schoolName}</span>
              {selectedClassroomInfo && (
                <>
                  <span>•</span>
                  <span>{selectedClassroomInfo.name}</span>
                  <Badge variant={selectedClassroomInfo.deployment_type === 'trial' ? 'secondary' : 'default'}>
                    {selectedClassroomInfo.deployment_type}
                  </Badge>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={selectedClassroom} onValueChange={setSelectedClassroom}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select classroom" />
              </SelectTrigger>
              <SelectContent>
                {classrooms.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="14">Last 14 Days</SelectItem>
                <SelectItem value="30">Last 30 Days</SelectItem>
                <SelectItem value="90">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading analytics...</div>
        ) : !analytics || analytics.totalTranslations === 0 ? (
          <Card className="py-12">
            <CardContent className="text-center">
              <Globe className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Data Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your classroom hasn't recorded any translations yet. Make sure the Chrome extension is configured with your classroom code.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Translations</CardDescription>
                  <CardTitle className="text-3xl">{analytics.totalTranslations.toLocaleString()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 mr-1" />
                    In selected period
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Avg Text Length</CardDescription>
                  <CardTitle className="text-3xl">{analytics.avgCharacters} chars</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Per translation
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Active Students*</CardDescription>
                  <CardTitle className="text-3xl">~{Math.ceil(analytics.totalTranslations / 50)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    *Estimated from usage
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tier Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    📊 Tier Usage Distribution
                  </CardTitle>
                  <CardDescription>
                    Which reading levels are students selecting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getTierData().map((tier, index) => (
                      <div key={tier.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{tier.name}</span>
                          <span className="font-medium">{tier.percentage}% ({tier.value})</span>
                        </div>
                        <Progress 
                          value={parseFloat(tier.percentage as string)} 
                          className="h-3"
                          style={{ '--progress-background': TIER_COLORS[index] } as any}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
                    💡 <strong>Insight:</strong> {
                      analytics.tierDistribution.tier2 > analytics.tierDistribution.tier1 + analytics.tierDistribution.tier3
                        ? "Most students prefer academic-level content. Consider providing more challenging materials."
                        : analytics.tierDistribution.tier1 > analytics.tierDistribution.tier2
                          ? "Many students are using basic tier. They may need additional scaffolding."
                          : "Students are exploring various reading levels. Great for differentiated learning!"
                    }
                  </div>
                </CardContent>
              </Card>

              {/* Language Pairs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🌍 Language Pairs Used
                  </CardTitle>
                  <CardDescription>
                    Translation directions used by students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.languagePairs)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 5)
                      .map(([pair, count]) => {
                        const total = Object.values(analytics.languagePairs).reduce((a, b) => a + b, 0);
                        const percentage = ((count / total) * 100).toFixed(0);
                        return (
                          <div key={pair}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{formatLanguagePair(pair)}</span>
                              <span className="font-medium">{count} ({percentage}%)</span>
                            </div>
                            <Progress value={parseFloat(percentage)} className="h-2" />
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Peak Usage Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    ⏰ Peak Usage Times
                  </CardTitle>
                  <CardDescription>
                    When students need help most
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={getHourlyData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
                    💡 <strong>Tip:</strong> Schedule extra support during peak hours!
                  </div>
                </CardContent>
              </Card>

              {/* Daily Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    📈 Daily Usage Trend
                  </CardTitle>
                  <CardDescription>
                    Translation activity over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={analytics.dailyUsage}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Privacy Notice */}
            <Card className="bg-muted/50">
              <CardContent className="py-4">
                <p className="text-sm text-muted-foreground text-center">
                  🔒 <strong>Privacy First:</strong> All data is aggregated at the classroom level. 
                  No individual student information is collected or stored (COPPA/FERPA compliant).
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TeacherDashboard;
