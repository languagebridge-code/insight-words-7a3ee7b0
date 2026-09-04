import TalkToTeacherFeature from '@/features/talk-to-teacher/TalkToTeacher';
import { InstallAppButton } from '@/features/talk-to-teacher/InstallAppButton';

// Temporary placeholder until enrolled student codes are issued per session.
const PLACEHOLDER_STUDENT_CODE = 'LB-TEST7';

export default function TalkToTeacher() {
  return (
    <main className="lb-ttt-page min-h-screen flex items-center justify-center bg-[#2b0f28] p-3">
      <h1 className="sr-only">Talk to Teacher — live two-way voice translation</h1>
      <div className="ttt-install-anchor">
        <InstallAppButton />
      </div>
      <TalkToTeacherFeature studentCode={PLACEHOLDER_STUDENT_CODE} studentLanguage="dari" />
    </main>
  );
}
