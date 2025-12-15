import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  Users,
  BookOpen,
  MessageSquare,
  Volume2,
  TrendingUp,
  Clock,
  Globe,
  Sparkles,
} from "lucide-react";
import { mockAnalyticsData, mockFeatureUsage, mockLanguageDistribution, mockProgressData } from "@/lib/mockDashboardData";

const DashboardContent = () => {
  const stats = [
    {
      title: "Total Student Sessions",
      value: "1,247",
      change: "+12%",
      icon: Users,
      description: "This month",
    },
    {
      title: "Translations Used",
      value: "8,432",
      change: "+23%",
      icon: Globe,
      description: "Across all languages",
    },
    {
      title: "Avg. Session Time",
      value: "18 min",
      change: "+5%",
      icon: Clock,
      description: "Per student",
    },
    {
      title: "Talk to Teacher",
      value: "342",
      change: "+18%",
      icon: MessageSquare,
      description: "Conversations",
    },
  ];

  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(142, 76%, 36%)", "hsl(38, 92%, 50%)", "hsl(280, 65%, 60%)", "hsl(200, 80%, 50%)", "hsl(350, 80%, 55%)", "hsl(170, 60%, 45%)"];

  return (
    <div className="space-y-6">
      {/* Demo Banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-primary" />
        <div>
          <p className="text-sm font-medium text-foreground">Demo Mode Active</p>
          <p className="text-xs text-muted-foreground">
            Displaying sample data. Connect your Chrome extension to see real classroom analytics.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600">
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Feature Usage */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Feature Usage</CardTitle>
            <CardDescription>How students use LanguageBridge tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockFeatureUsage} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="name" type="category" width={120} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Language Distribution */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Language Distribution</CardTitle>
            <CardDescription>Home languages of students using LanguageBridge</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockLanguageDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {mockLanguageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Over Time */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Usage Trends</CardTitle>
          <CardDescription>Student engagement over the past 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockProgressData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  name="Sessions"
                />
                <Line
                  type="monotone"
                  dataKey="translations"
                  stroke="hsl(142, 76%, 36%)"
                  strokeWidth={2}
                  dot={false}
                  name="Translations"
                />
                <Line
                  type="monotone"
                  dataKey="vocabulary"
                  stroke="hsl(38, 92%, 50%)"
                  strokeWidth={2}
                  dot={false}
                  name="Vocabulary"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>Latest student interactions with LanguageBridge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalyticsData.slice(0, 5).map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {activity.type === "translation" && <Globe className="h-5 w-5 text-primary" />}
                  {activity.type === "simplification" && <BookOpen className="h-5 w-5 text-green-600" />}
                  {activity.type === "vocabulary" && <Sparkles className="h-5 w-5 text-amber-500" />}
                  {activity.type === "talk_to_teacher" && <MessageSquare className="h-5 w-5 text-purple-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.language} • {activity.time}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.grade}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
