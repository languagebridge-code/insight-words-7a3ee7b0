import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import logo from '@/assets/languagebridge-logo-light.svg';

const INDIVIDUAL_PREVIEW = 'INDIVIDUAL-PREVIEW';

interface Org {
  pilot_id: string;
  name: string;
}

interface Props {
  userId: string;
  onComplete: () => void;
}

export function TTTOrgScreen({ userId, onComplete }: Props) {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from('pilot_organizations')
      .select('pilot_id, name')
      .eq('is_active', true)
      .order('name')
      .then(({ data, error }) => {
        if (error) toast.error('Could not load the organization list.');
        setOrgs((data as Org[]) ?? []);
        setLoading(false);
      });
  }, []);

  const districts = orgs.filter((o) => o.pilot_id !== INDIVIDUAL_PREVIEW);

  const handleSave = async () => {
    if (!selected) {
      toast.error('Please choose an option to continue.');
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: userId, pilot_id: selected }, { onConflict: 'id' });
    setSaving(false);
    if (error) {
      toast.error('Could not save your selection. Please try again.');
      return;
    }
    onComplete();
  };

  const optionStyle = (value: string) => ({
    borderColor: selected === value ? '#742a69' : '#f5eaf4',
    background: selected === value ? '#f5eaf4' : '#ffffff',
    color: '#4a1a45',
  });

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #742a69 0%, #f37030 80%, #ffc755 100%)' }}
    >
      <header className="px-4 py-4 flex justify-center">
        <img src={logo} alt="LanguageBridge" className="h-8" />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md rounded-2xl p-6 shadow-xl" style={{ background: '#ffffff' }}>
          <h1 className="text-2xl font-bold" style={{ color: '#4a1a45' }}>
            Where are you using LanguageBridge?
          </h1>
          <p className="text-sm mt-1 mb-5" style={{ color: '#742a69' }}>
            Choose your school district, or let us know you&rsquo;re just exploring.
          </p>

          {loading ? (
            <p className="text-sm" style={{ color: '#742a69' }}>
              Loading options&hellip;
            </p>
          ) : (
            <div className="space-y-2">
              {districts.map((org) => (
                <button
                  key={org.pilot_id}
                  type="button"
                  onClick={() => setSelected(org.pilot_id)}
                  className="w-full text-left rounded-lg border-2 px-4 py-3 font-medium transition-colors"
                  style={optionStyle(org.pilot_id)}
                >
                  {org.name}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setSelected(INDIVIDUAL_PREVIEW)}
                className="w-full text-left rounded-lg border-2 px-4 py-3 font-medium transition-colors"
                style={optionStyle(INDIVIDUAL_PREVIEW)}
              >
                I&rsquo;m not part of a school pilot, just exploring LanguageBridge
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading}
            className="w-full rounded-lg py-3 mt-5 font-semibold text-white disabled:opacity-60"
            style={{ background: 'linear-gradient(90deg, #f37030 0%, #ffc755 100%)' }}
          >
            {saving ? 'Saving\u2026' : 'Continue'}
          </button>
        </div>
      </main>
    </div>
  );
}
