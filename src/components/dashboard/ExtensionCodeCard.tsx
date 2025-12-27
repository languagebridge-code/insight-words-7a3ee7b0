import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, RefreshCw, Chrome, Users, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface LinkedStudent {
  user_id: string;
  event_count: number;
  last_seen: string;
}

interface ExtensionCodeCardProps {
  classroomId: string;
  extensionCode: string | null;
  onCodeRegenerated?: (newCode: string) => void;
}

const ExtensionCodeCard = ({ classroomId, extensionCode, onCodeRegenerated }: ExtensionCodeCardProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [linkedStudents, setLinkedStudents] = useState<LinkedStudent[]>([]);
  const [linkedCount, setLinkedCount] = useState(0);
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);

  useEffect(() => {
    if (classroomId) {
      fetchLinkedStudents();
    }
  }, [classroomId]);

  const fetchLinkedStudents = async () => {
    setIsLoadingStudents(true);
    try {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('user_id, timestamp')
        .eq('classroom_id', classroomId);

      if (error) throw error;

      // Aggregate by user_id
      const userMap = new Map<string, { count: number; lastSeen: string }>();
      (data || []).forEach((event) => {
        const existing = userMap.get(event.user_id);
        if (!existing || new Date(event.timestamp) > new Date(existing.lastSeen)) {
          userMap.set(event.user_id, {
            count: (existing?.count || 0) + 1,
            lastSeen: event.timestamp,
          });
        } else {
          userMap.set(event.user_id, {
            count: existing.count + 1,
            lastSeen: existing.lastSeen,
          });
        }
      });

      const students: LinkedStudent[] = Array.from(userMap.entries())
        .map(([user_id, data]) => ({
          user_id,
          event_count: data.count,
          last_seen: data.lastSeen,
        }))
        .sort((a, b) => new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime());

      setLinkedStudents(students);
      setLinkedCount(students.length);
    } catch (error) {
      console.error('Error fetching linked students:', error);
    } finally {
      setIsLoadingStudents(false);
    }
  };

  const copyCode = async () => {
    if (!extensionCode) return;
    await navigator.clipboard.writeText(extensionCode);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Extension code copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const regenerateCode = async () => {
    setIsRegenerating(true);
    try {
      const { data, error } = await supabase.rpc('generate_classroom_code');
      if (error) throw error;

      const { error: updateError } = await supabase
        .from('classrooms')
        .update({ extension_code: data })
        .eq('id', classroomId);

      if (updateError) throw updateError;

      toast({
        title: "Code Regenerated",
        description: "New extension code has been generated. Students will need to re-link.",
      });

      onCodeRegenerated?.(data);
    } catch (error) {
      console.error('Error regenerating code:', error);
      toast({
        title: "Error",
        description: "Failed to regenerate code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  const isActive = (lastSeen: string) => {
    const hoursDiff = (Date.now() - new Date(lastSeen).getTime()) / (1000 * 60 * 60);
    return hoursDiff < 24;
  };

  const truncateUserId = (userId: string) => {
    return userId.length > 12 ? `${userId.substring(0, 12)}...` : userId;
  };

  return (
    <div className="space-y-4">
      {/* Extension Code Card */}
      <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Chrome className="h-5 w-5 text-primary" />
              <CardTitle>Chrome Extension Code</CardTitle>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {linkedCount} linked
            </Badge>
          </div>
          <CardDescription>
            Share this code with students to link their browser extensions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-background/80 backdrop-blur rounded-lg p-4 border border-border">
              <p className="text-3xl font-mono font-bold text-center tracking-widest text-primary">
                {extensionCode || 'Loading...'}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={copyCode}
                disabled={!extensionCode}
                className="h-12 w-12"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={regenerateCode}
                      disabled={isRegenerating}
                      className="h-12 w-12"
                    >
                      <RefreshCw className={`h-5 w-5 ${isRegenerating ? 'animate-spin' : ''}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Regenerate code (existing links will break)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Linked Students Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Linked Extensions
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="cursor-help">
                    Anonymous IDs
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>User IDs are anonymous for student privacy. They are generated by the extension and do not contain any personal information.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>
            Extensions that have submitted analytics to this classroom
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingStudents ? (
            <div className="text-center py-4 text-muted-foreground">Loading...</div>
          ) : linkedStudents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Chrome className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No linked extensions yet</p>
              <p className="text-sm">Students need to enter the code above in their Chrome extension</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {linkedStudents.map((student) => (
                <div
                  key={student.user_id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {student.user_id.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-mono text-sm">{truncateUserId(student.user_id)}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(student.last_seen), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{student.event_count} events</span>
                    <Badge variant={isActive(student.last_seen) ? "default" : "secondary"}>
                      {isActive(student.last_seen) ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExtensionCodeCard;
