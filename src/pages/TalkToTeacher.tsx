import { TalkToTeacherApp } from '@/components/talk-to-teacher/TalkToTeacherApp';
import { TTTAuthScreen } from '@/components/talk-to-teacher/TTTAuthScreen';
import { TTTOrgScreen } from '@/components/talk-to-teacher/TTTOrgScreen';
import { useTTTAccount } from '@/components/talk-to-teacher/useTTTAccount';

export default function TalkToTeacher() {
  const { session, profile, loading, refreshProfile } = useTTTAccount();

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{ background: 'linear-gradient(135deg, #742a69 0%, #f37030 80%, #ffc755 100%)' }}
      >
        Loading&hellip;
      </div>
    );
  }

  if (!session?.user) return <TTTAuthScreen />;

  if (!profile?.pilot_id) {
    return <TTTOrgScreen userId={session.user.id} onComplete={refreshProfile} />;
  }

  return <TalkToTeacherApp />;
}
