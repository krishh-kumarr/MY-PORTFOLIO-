'use client';
import { useEffect } from 'react';
import { useAvatar } from './AvatarProvider';

export default function SetMood({ mood, say }) {
  const { setBase } = useAvatar();
  useEffect(() => { setBase({ mood, say }); }, [mood, say, setBase]);
  return null;
}
