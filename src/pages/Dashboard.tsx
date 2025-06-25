import React from 'react';
import { useFingerprint } from '../hooks/useFringerprint';
import { Fingerprint as FingerprintIcon } from 'lucide-react';

export default function UserInfo() {
  const fingerprint = useFingerprint();

  return (
    <div className="flex items-center gap-2 p-4" aria-label="User Fingerprint ID">
      <FingerprintIcon className="w-5 h-5 text-purple-600" />
      <span className="text-xs font-mono text-gray-700">
        {fingerprint ? `ID: ${fingerprint}` : '🔄 আইডি লোড হচ্ছে...'}
      </span>
    </div>
  );
}
