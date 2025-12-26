import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Copy, CheckCircle, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface SetupCode {
  schoolId: string;
  classroomId: string;
  teacherId: string;
  deploymentType: string;
}

const TeacherSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [setupCode, setSetupCode] = useState<SetupCode | null>(null);
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    schoolName: "",
    teacherName: "",
    teacherEmail: "",
    classroomName: "",
    deploymentType: "trial",
  });

  const generateCode = (prefix: string) => {
    return `${prefix}_${Math.random().toString(36).substring(2, 10)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if email already exists
      const { data: existingTeacher } = await supabase
        .from('teachers')
        .select('id')
        .eq('email', formData.teacherEmail)
        .maybeSingle();

      if (existingTeacher) {
        toast({
          title: "Email already registered",
          description: "This email is already associated with a teacher account. Please login instead.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // First, get or create a district and school
      let districtId: string;
      let schoolId: string;

      // Check for existing school with similar name
      const { data: existingSchool } = await supabase
        .from('schools')
        .select('id, district_id')
        .ilike('name', formData.schoolName)
        .maybeSingle();

      if (existingSchool) {
        schoolId = existingSchool.id;
        districtId = existingSchool.district_id;
      } else {
        // Create new district and school (simplified for demo)
        const { data: newDistrict, error: districtError } = await supabase
          .from('districts')
          .insert({ name: `${formData.schoolName} District` })
          .select('id')
          .single();

        if (districtError) throw districtError;
        districtId = newDistrict.id;

        const { data: newSchool, error: schoolError } = await supabase
          .from('schools')
          .insert({ 
            name: formData.schoolName, 
            district_id: districtId,
            building_code: generateCode('school')
          })
          .select('id')
          .single();

        if (schoolError) throw schoolError;
        schoolId = newSchool.id;
      }

      // Generate unique codes
      const teacherCode = generateCode('teacher');
      const classroomCode = generateCode('classroom');

      // Create teacher record
      const { data: newTeacher, error: teacherError } = await supabase
        .from('teachers')
        .insert({
          name: formData.teacherName,
          email: formData.teacherEmail,
          school_id: schoolId,
          teacher_code: teacherCode,
        })
        .select('id')
        .single();

      if (teacherError) throw teacherError;

      // Calculate trial end date
      const trialEndDate = formData.deploymentType === 'trial' 
        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        : null;

      // Create classroom
      const { error: classroomError } = await supabase
        .from('classrooms')
        .insert({
          teacher_id: newTeacher.id,
          name: formData.classroomName,
          classroom_code: classroomCode,
          deployment_type: formData.deploymentType,
          trial_end_date: trialEndDate,
        });

      if (classroomError) throw classroomError;

      // Set the setup code
      setSetupCode({
        schoolId: `school_${schoolId.substring(0, 8)}`,
        classroomId: classroomCode,
        teacherId: teacherCode,
        deploymentType: formData.deploymentType,
      });

      toast({
        title: "Registration successful!",
        description: "Your classroom has been created. Copy the setup code below.",
      });

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (!setupCode) return;
    
    const codeText = `schoolId: ${setupCode.schoolId}
classroomId: ${setupCode.classroomId}
teacherId: ${setupCode.teacherId}
deploymentType: ${setupCode.deploymentType}`;
    
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Copied!",
      description: "Setup code copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Teacher Registration
          </h1>
          <p className="text-muted-foreground">
            Create your LanguageBridge classroom and get your extension setup code
          </p>
        </div>

        {!setupCode ? (
          <Card>
            <CardHeader>
              <CardTitle>Create Your Classroom</CardTitle>
              <CardDescription>
                Fill in your details to get started with LanguageBridge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input
                    id="schoolName"
                    placeholder="Lincoln Elementary School"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teacherName">Your Name</Label>
                  <Input
                    id="teacherName"
                    placeholder="Jane Smith"
                    value={formData.teacherName}
                    onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teacherEmail">Email Address</Label>
                  <Input
                    id="teacherEmail"
                    type="email"
                    placeholder="jane.smith@school.edu"
                    value={formData.teacherEmail}
                    onChange={(e) => setFormData({ ...formData, teacherEmail: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="classroomName">Classroom Name</Label>
                  <Input
                    id="classroomName"
                    placeholder="ESL Class - Room 305"
                    value={formData.classroomName}
                    onChange={(e) => setFormData({ ...formData, classroomName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deploymentType">Deployment Type</Label>
                  <Select
                    value={formData.deploymentType}
                    onValueChange={(value) => setFormData({ ...formData, deploymentType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select deployment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trial">Trial (7 days free)</SelectItem>
                      <SelectItem value="school">School License</SelectItem>
                      <SelectItem value="district">District License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Classroom"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-green-700 dark:text-green-400">
                    Registration Complete!
                  </CardTitle>
                </div>
                <CardDescription>
                  Copy the setup code below and paste it into your Chrome extension
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm relative">
                  <pre className="whitespace-pre-wrap">
{`Extension Setup Code (Copy & Paste):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
schoolId: ${setupCode.schoolId}
classroomId: ${setupCode.classroomId}
teacherId: ${setupCode.teacherId}
deploymentType: ${setupCode.deploymentType}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={handleCopyCode}
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Setup Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                  <li>Install the LanguageBridge Chrome extension (unlisted link from your school)</li>
                  <li>Right-click the extension icon → Options</li>
                  <li>Paste these values into the "School Setup" section</li>
                  <li>Click "Save" - Your classroom is now being tracked!</li>
                </ol>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setSetupCode(null);
                  setFormData({
                    schoolName: "",
                    teacherName: "",
                    teacherEmail: "",
                    classroomName: "",
                    deploymentType: "trial",
                  });
                }}
              >
                Create Another Classroom
              </Button>
              <Button
                className="flex-1"
                onClick={() => navigate('/teacher-dashboard')}
              >
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TeacherSignup;
