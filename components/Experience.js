'use client';
import { useMemo } from 'react';
import Section from './Section';
import { experience } from '@/lib/data';
import Journey from './experience/Journey';

export default function Experience() {
  const stops = useMemo(() => [...experience].reverse(), []); // oldest first: the journey
  return (
    <Section id="work" title="The journey so far" intro="Three internships, one path: Chennai, Bengaluru, Mysuru." mood="excited" say="Three stops so far: Chennai, Bengaluru and Mysuru.">
      <Journey stops={stops} />
    </Section>
  );
}
