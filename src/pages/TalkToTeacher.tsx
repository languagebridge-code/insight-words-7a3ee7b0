import TalkToTeacherFeature from '@/features/talk-to-teacher/TalkToTeacher';
import { TTTAuthScreen } from '@/components/talk-to-teacher/TTTAuthScreen';
import { TTTOrgScreen } from '@/components/talk-to-teacher/TTTOrgScreen';
import { useTTTAccount } from '@/components/talk-to-teacher/useTTTAccount';

// Temporary placeholder until enrolled student codes are issued per session.
const PLACEHOLDER_STUDENT_CODE = 'LB-TEST7';

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

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#2b0f28] p-3">
      <h1 className="sr-only">Talk to Teacher — live two-way voice translation</h1>
      <TalkToTeacherFeature studentCode={PLACEHOLDER_STUDENT_CODE} studentLanguage="dari" />
    </main>
  );
}
