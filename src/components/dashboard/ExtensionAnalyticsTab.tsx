import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Activity, Users, Zap, Clock, Download, Chrome, Calendar, Filter } from "lucide-react";
import { formatDistanceToNow, format, subDays } from "date-fns";

interface ExtensionEvent {
  id: number;
  user_id: string;
  session_id: string;
  event_name: string;
  properties: Record<string, any> | null;
  timestamp: string;
  extension_version: string | null;
  classroom_id: string | null;
  teacher_email: string | null;
  created_at: string;
}

interface ExtensionAnalyticsTabProps {
  classroomId: string;
}

const EVENT_COLORS: Record<string, string> = {
  translation: 'hsl(var(--primary))',
  tts: 'hsl(262, 83%, 58%)',
  glossary: 'hsl(142, 76%, 36%)',
  talk_to_teacher: 'hsl(24, 100%, 50%)',
  page_view: 'hsl(200, 98%, 39%)',
  default: 'hsl(var(--muted-foreground))',
};

const ExtensionAnalyticsTab = ({ classroomId }: ExtensionAnalyticsTabProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<ExtensionEvent[]>([]);
  const [dateRange, setDateRange] = useState("7");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");

  // Computed stats
  const [stats, setStats] = useState({
    todayEvents: 0,
    activeStudents: 0,
    mostUsedFeature: '',
    avgSessionLength: 0,
  });

  useEffect(() => {
    if (classroomId) {
      fetchEvents();
      setupRealtimeSubscription();
    }
  }, [classroomId, dateRange]);

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('extension-analytics-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'analytics_events',
          filter: `classroom_id=eq.${classroomId}`,
        },
        (payload) => {
          console.log('New extension event:', payload);
          setEvents((prev) => [payload.new as ExtensionEvent, ...prev]);
          toast({
            title: "📊 New Activity",
            description: "Extension event received!",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const startDate = subDays(new Date(), parseInt(dateRange));
      
      const { data, error } = await supabase
        .from('analytics_events')
        .select('*')
        .eq('classroom_id', classroomId)
        .gte('timestamp', startDate.toISOString())
        .order('timestamp', { ascending: false });

      if (error) throw error;

      const typedData: ExtensionEvent[] = (data || []).map((item) => ({
        ...item,
        properties: (item.properties as Record<string, any>) || {},
      }));
      
      setEvents(typedData);
      calculateStats(typedData);
    } catch (error) {
      console.error('Error fetching extension events:', error);
      toast({
        title: "Error",
        description: "Failed to load extension analytics.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (eventData: ExtensionEvent[]) => {
    const today = new Date().toDateString();
    const todayEvents = eventData.filter(
      (e) => new Date(e.timestamp).toDateString() === today
    ).length;

    const uniqueUsersToday = new Set(
      eventData
        .filter((e) => new Date(e.timestamp).toDateString() === today)
        .map((e) => e.user_id)
    ).size;

    // Find most used feature
    const eventCounts: Record<string, number> = {};
    eventData.forEach((e) => {
      eventCounts[e.event_name] = (eventCounts[e.event_name] || 0) + 1;
    });
    const mostUsed = Object.entries(eventCounts).sort((a, b) => b[1] - a[1])[0];

    // Calculate avg session length (estimate based on events per session)
    const sessionEvents: Record<string, { first: Date; last: Date }> = {};
    eventData.forEach((e) => {
      const ts = new Date(e.timestamp);
      if (!sessionEvents[e.session_id]) {
        sessionEvents[e.session_id] = { first: ts, last: ts };
      } else {
        if (ts < sessionEvents[e.session_id].first) sessionEvents[e.session_id].first = ts;
        if (ts > sessionEvents[e.session_id].last) sessionEvents[e.session_id].last = ts;
      }
    });

    const sessionLengths = Object.values(sessionEvents).map(
      (s) => (s.last.getTime() - s.first.getTime()) / (1000 * 60)
    );
    const avgSession = sessionLengths.length > 0
      ? Math.round(sessionLengths.reduce((a, b) => a + b, 0) / sessionLengths.length)
      : 0;

    setStats({
      todayEvents,
      activeStudents: uniqueUsersToday,
      mostUsedFeature: mostUsed?.[0] || 'N/A',
      avgSessionLength: avgSession,
    });
  };

  const getEventTypeData = () => {
    const counts: Record<string, number> = {};
    events.forEach((e) => {
      counts[e.event_name] = (counts[e.event_name] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      color: EVENT_COLORS[name] || EVENT_COLORS.default,
    }));
  };

  const getDailyData = () => {
    const dailyCounts: Record<string, number> = {};
    events.forEach((e) => {
      const date = format(new Date(e.timestamp), 'yyyy-MM-dd');
      dailyCounts[date] = (dailyCounts[date] || 0) + 1;
    });
    return Object.entries(dailyCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  const getUniqueEventTypes = () => {
    return [...new Set(events.map((e) => e.event_name))];
  };

  const getUniqueUsers = () => {
    return [...new Set(events.map((e) => e.user_id))];
  };

  const getFilteredEvents = () => {
    return events.filter((e) => {
      if (eventTypeFilter !== 'all' && e.event_name !== eventTypeFilter) return false;
      if (userFilter !== 'all' && e.user_id !== userFilter) return false;
      return true;
    });
  };

  const exportToCSV = () => {
    const filteredEvents = getFilteredEvents();
    if (filteredEvents.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no events matching your filters.",
        variant: "destructive",
      });
      return;
    }

    const headers = ['Timestamp', 'Event Type', 'User ID', 'Session ID', 'Properties', 'Extension Version'];
    const rows = filteredEvents.map((e) => [
      e.timestamp,
      e.event_name,
      e.user_id,
      e.session_id,
      JSON.stringify(e.properties),
      e.extension_version || '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => (typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell)).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `extension-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();

    toast({
      title: "Export complete!",
      description: `Exported ${filteredEvents.length} events.`,
    });
  };

  const truncateUserId = (userId: string) => {
    return userId.length > 8 ? `${userId.substring(0, 8)}...` : userId;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16 mt-2" />
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <Card className="py-12">
        <CardContent className="text-center">
          <Chrome className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Extension Events Yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Students need to link their Chrome extensions with your classroom code.
            Once connected, you'll see their activity here in real-time.
          </p>
        </CardContent>
      </Card>
    );
  }

  const filteredEvents = getFilteredEvents();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Events Today</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              {stats.todayEvents}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Students Today</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Users className="h-6 w-6 text-green-500" />
              {stats.activeStudents}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Most Used Feature</CardDescription>
            <CardTitle className="text-xl flex items-center gap-2">
              <Zap className="h-6 w-6 text-yellow-500" />
              {stats.mostUsedFeature}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Session Length</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-500" />
              {stats.avgSessionLength}m
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-40">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 Days</SelectItem>
            <SelectItem value="14">Last 14 Days</SelectItem>
            <SelectItem value="30">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
        <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            {getUniqueEventTypes().map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={userFilter} onValueChange={setUserFilter}>
          <SelectTrigger className="w-48">
            <Users className="h-4 w-4 mr-2" />
            <SelectValue placeholder="User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            {getUniqueUsers().slice(0, 20).map((userId) => (
              <SelectItem key={userId} value={userId}>
                {truncateUserId(userId)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={exportToCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Types Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Event Type Distribution</CardTitle>
            <CardDescription>Breakdown of extension events by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getEventTypeData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {getEventTypeData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Activity Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Activity</CardTitle>
            <CardDescription>Extension events over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getDailyData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => format(new Date(date), 'MMM d')}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(date) => format(new Date(date), 'EEEE, MMM d')}
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

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Last {Math.min(filteredEvents.length, 20)} extension events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Event</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.slice(0, 20).map((event) => (
                  <tr key={event.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">
                      {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        style={{
                          backgroundColor: EVENT_COLORS[event.event_name] || EVENT_COLORS.default,
                          color: 'white',
                        }}
                      >
                        {event.event_name}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      {truncateUserId(event.user_id)}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {event.properties?.language_pair ||
                        event.properties?.feature ||
                        Object.keys(event.properties || {}).join(', ') ||
                        '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="bg-muted/50">
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground text-center">
            🔒 <strong>Privacy First:</strong> User IDs are anonymous and generated by the extension.
            No student names or personal information is collected (COPPA/FERPA compliant).
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExtensionAnalyticsTab;
