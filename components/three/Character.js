'use client';
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { T, textTexture } from './toon';
import { poseTargets, aimHead, damp } from './rig';

const C = {
  skin: '#D8956B', skinDark: '#C27F57', hair: '#15171D', tee: '#E9A93A', pants: '#B9BFC7', pocket: '#A7AEB7',
  shoe: '#F3F5F7', sole: '#C8CED6', frame: '#2B2420', white: '#FFFFFF', pupil: '#1C1A1A', lips: '#8E4636', band: '#1E2430', plate: '#BFC8D2',
};

const FREQ = { idle: 1.3, walk: 0, run: 0, ninja: 0, sit: 0, wave: 1 };

function roundedRing(w, h, r, t) {
  const s = new THREE.Shape();
  const rr = (shape, x, y, W, H, R) => {
    shape.moveTo(x + R, y); shape.lineTo(x + W - R, y); shape.quadraticCurveTo(x + W, y, x + W, y + R);
    shape.lineTo(x + W, y + H - R); shape.quadraticCurveTo(x + W, y + H, x + W - R, y + H);
    shape.lineTo(x + R, y + H); shape.quadraticCurveTo(x, y + H, x, y + H - R);
    shape.lineTo(x, y + R); shape.quadraticCurveTo(x, y, x + R, y);
  };
  rr(s, -w / 2, -h / 2, w, h, r);
  const hole = new THREE.Path(); rr(hole, -w / 2 + t, -h / 2 + t, w - 2 * t, h - 2 * t, Math.max(0.005, r - t));
  s.holes.push(hole);
  return new THREE.ExtrudeGeometry(s, { depth: 0.018, bevelEnabled: false });
}

let G;
function geos() {
  if (G) return G;
  const cap = (r, l, seg = 6) => new THREE.CapsuleGeometry(r, l, 3, seg * 2);
  G = {
    thigh: cap(0.115, 0.26), shin: cap(0.1, 0.26), cuff: new THREE.CylinderGeometry(0.105, 0.11, 0.07, 12),
    pocket: new THREE.BoxGeometry(0.05, 0.13, 0.13), shoe: new THREE.SphereGeometry(0.12, 14, 10), sole: new THREE.BoxGeometry(0.19, 0.04, 0.3),
    pelvis: new THREE.CylinderGeometry(0.27, 0.25, 0.22, 16), torso: cap(0.27, 0.3, 8), neck: new THREE.CylinderGeometry(0.075, 0.085, 0.14, 10),
    sleeve: new THREE.CylinderGeometry(0.115, 0.135, 0.22, 14), upper: cap(0.068, 0.18), fore: cap(0.06, 0.18), hand: new THREE.SphereGeometry(0.075, 10, 8),
    head: new THREE.SphereGeometry(0.3, 24, 18), ear: new THREE.SphereGeometry(0.065, 10, 8), nose: new THREE.SphereGeometry(0.045, 10, 8),
    eye: new THREE.SphereGeometry(0.055, 14, 10), pupil: new THREE.SphereGeometry(0.03, 10, 8), brow: new THREE.BoxGeometry(0.13, 0.03, 0.03),
    stache: new THREE.BoxGeometry(0.12, 0.016, 0.02), smile: new THREE.TorusGeometry(0.05, 0.012, 6, 16, Math.PI),
    grin: new THREE.CircleGeometry(0.07, 20, Math.PI, Math.PI), teeth: new THREE.PlaneGeometry(0.1, 0.022), oh: new THREE.CircleGeometry(0.04, 16), flat: new THREE.BoxGeometry(0.08, 0.016, 0.01),
    lens: roundedRing(0.17, 0.125, 0.035, 0.022), bridge: new THREE.BoxGeometry(0.05, 0.018, 0.018), temple: new THREE.BoxGeometry(0.016, 0.018, 0.24),
    hair: new THREE.IcosahedronGeometry(0.13, 1), cap: new THREE.SphereGeometry(0.31, 22, 16), band: new THREE.TorusGeometry(0.305, 0.03, 8, 32), plate: new THREE.PlaneGeometry(0.2, 0.085), tail: new THREE.PlaneGeometry(0.06, 0.32),
  };
  return G;
}

const HAIR = [[0, 0.6, 0, 1.25], [0.15, 0.57, 0.08, 1], [-0.15, 0.57, 0.08, 1], [0.2, 0.5, -0.1, 1.05], [-0.2, 0.5, -0.1, 1.05], [0, 0.55, -0.17, 1.1], [0.25, 0.4, -0.05, 0.85], [-0.25, 0.4, -0.05, 0.85], [0, 0.42, -0.25, 1], [0.15, 0.4, -0.22, 0.9], [-0.15, 0.4, -0.22, 0.9], [0.08, 0.53, 0.2, 0.82], [-0.1, 0.54, 0.19, 0.86], [0.2, 0.48, 0.15, 0.72], [-0.21, 0.47, 0.14, 0.72], [0.27, 0.3, -0.1, 0.6], [-0.27, 0.3, -0.1, 0.6], [0, 0.3, -0.27, 0.8], [0.02, 0.64, 0.1, 0.9]];

const FACE = {
  confident: { mouth: 'smile', brow: 0, eye: 1 },
  laughing: { mouth: 'grin', brow: 0.03, eye: 0.45 },
  thoughtful: { mouth: 'flat', brow: -0.01, eye: 0.85, browTilt: 0.25 },
  surprised: { mouth: 'oh', brow: 0.06, eye: 1.2 },
  excited: { mouth: 'grin', brow: 0.045, eye: 1.05 },
};

function Leg({ side, refs }) {
  const g = geos();
  return (
    <group ref={refs.hip} position={[side * 0.13, 0, 0]}>
      <T g={g.thigh} c={C.pants} position={[0, -0.2, 0]} />
      <T g={g.pocket} c={C.pocket} position={[side * 0.115, -0.25, 0]} />
      <group ref={refs.knee} position={[0, -0.42, 0]}>
        <T g={g.shin} c={C.pants} position={[0, -0.17, 0]} />
        <T g={g.cuff} c={C.pocket} position={[0, -0.34, 0]} />
        <group position={[0, -0.4, 0]}>
          <T g={g.shoe} c={C.shoe} position={[0, -0.02, 0.05]} scale={[0.85, 0.6, 1.35]} />
          <T g={g.sole} c={C.sole} position={[0, -0.07, 0.05]} />
        </group>
      </group>
    </group>
  );
}

function Arm({ side, refs }) {
  const g = geos();
  return (
    <group ref={refs.shoulder} position={[side * 0.31, 0.64, 0]}>
      <T g={g.sleeve} c={C.tee} position={[0, -0.08, 0]} rotation={[0, 0, side * 0.15]} />
      <T g={g.upper} c={C.skin} position={[0, -0.21, 0]} />
      <group ref={refs.elbow} position={[0, -0.34, 0]}>
        <T g={g.fore} c={C.skin} position={[0, -0.14, 0]} />
        <T g={g.hand} c={C.skin} position={[0, -0.29, 0]} scale={[0.9, 1.1, 0.8]} />
      </group>
    </group>
  );
}

function Face({ refs }) {
  const g = geos();
  return (
    <group>
      {[-1, 1].map((s) => (
        <group key={s}>
          <group ref={refs.eyes[s < 0 ? 0 : 1]} position={[s * 0.11, 0.32, 0.25]}>
            <mesh geometry={g.eye} scale={[1, 1, 0.5]}><meshBasicMaterial color={C.white} /></mesh>
            <mesh ref={refs.pupils[s < 0 ? 0 : 1]} geometry={g.pupil} position={[0, 0, 0.03]}><meshBasicMaterial color={C.pupil} /></mesh>
          </group>
          <mesh ref={refs.brows[s < 0 ? 0 : 1]} geometry={g.brow} position={[s * 0.11, 0.43, 0.27]} rotation={[0, 0, -s * 0.08]}><meshBasicMaterial color={C.hair} /></mesh>
          <T g={g.lens} c={C.frame} o={false} position={[s * 0.11, 0.32, 0.29]} />
          <mesh geometry={g.temple} position={[s * 0.205, 0.33, 0.17]}><meshBasicMaterial color={C.frame} /></mesh>
          <T g={g.ear} c={C.skin} position={[s * 0.29, 0.28, -0.02]} scale={[0.6, 1, 0.8]} />
        </group>
      ))}
      <mesh geometry={g.bridge} position={[0, 0.335, 0.3]}><meshBasicMaterial color={C.frame} /></mesh>
      <T g={g.nose} c={C.skinDark} o={false} position={[0, 0.24, 0.29]} scale={[0.9, 1.1, 0.9]} />
      <mesh geometry={g.stache} position={[0, 0.175, 0.29]}><meshBasicMaterial color={C.hair} /></mesh>
      <group position={[0, 0.115, 0.285]}>
        <mesh ref={refs.mouth.smile} geometry={g.smile} rotation={[0, 0, Math.PI]}><meshBasicMaterial color={C.lips} /></mesh>
        <group ref={refs.mouth.grin}>
          <mesh geometry={g.grin}><meshBasicMaterial color="#5A2420" /></mesh>
          <mesh geometry={g.teeth} position={[0, -0.012, 0.002]}><meshBasicMaterial color={C.white} /></mesh>
        </group>
        <mesh ref={refs.mouth.oh} geometry={g.oh} scale={[0.8, 1.15, 1]}><meshBasicMaterial color="#5A2420" /></mesh>
        <mesh ref={refs.mouth.flat} geometry={g.flat}><meshBasicMaterial color={C.lips} /></mesh>
      </group>
    </group>
  );
}

function Headband({ tails }) {
  const g = geos();
  const mark = useMemo(() => textTexture('K', { w: 128, h: 56, bg: C.plate, fg: '#15212B', font: '900 44px sans-serif' }), []);
  return (
    <group position={[0, 0.44, 0]} rotation={[0.12, 0, 0]}>
      <mesh geometry={g.band} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1.02, 0.7]}><meshToonMaterial color={C.band} /></mesh>
      <mesh geometry={g.plate} position={[0, 0, 0.31]}><meshBasicMaterial map={mark} /></mesh>
      <group ref={tails} position={[0.05, -0.02, -0.3]}>
        {[-0.05, 0.05].map((x, i) => <mesh key={x} geometry={g.tail} position={[x, -0.14, -0.04]} rotation={[0.5 + i * 0.15, 0, x * 2]}><meshBasicMaterial color={C.band} side={THREE.DoubleSide} /></mesh>)}
      </group>
    </group>
  );
}

/**
 * Stylised 3D Krish: wavy black hair, glasses, mustard tee, grey cargos, white sneakers.
 * props: pose ('idle'|'walk'|'run'|'ninja'|'sit'|'wave'), mood, look (ref {x,y} in −1…1),
 * stride (ref: gait phase driven by distance travelled; used for walk/run/ninja), headband.
 */
const Character = forwardRef(function Character({ pose = 'idle', mood = 'confident', look, stride, headband = false, ...props }, outer) {
  const g = geos();
  const root = useRef(), body = useRef(), spine = useRef(), neck = useRef(), tails = useRef();
  const mk = () => ({ hip: useRef(), knee: useRef() });
  const L = mk(), R = mk();
  const aL = { shoulder: useRef(), elbow: useRef() }, aR = { shoulder: useRef(), elbow: useRef() };
  const face = { eyes: [useRef(), useRef()], pupils: [useRef(), useRef()], brows: [useRef(), useRef()], mouth: { smile: useRef(), grin: useRef(), oh: useRef(), flat: useRef() } };
  const st = useRef({ t: 0, cur: {}, yaw: 0, pitch: 0, blink: 2.5, eye: 1, brow: 0 });
  useImperativeHandle(outer, () => root.current);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const s = st.current;
    s.t += dt;
    const phase = FREQ[pose] ? s.t * FREQ[pose] * Math.PI : (stride?.current ?? s.t * 5);
    const tgt = poseTargets(pose, phase);
    const k = pose === 'idle' ? 6 : 14;
    for (const key of ['hipL', 'hipR', 'kneeL', 'kneeR', 'shoulderL', 'shoulderR', 'elbowL', 'elbowR', 'lean', 'bob', 'twist', 'armOut', 'armOutR']) {
      s.cur[key] = damp(s.cur[key] ?? 0, tgt[key] ?? (key === 'armOutR' ? tgt.armOut ?? 0 : 0), k, dt);
    }
    const c = s.cur;
    L.hip.current.rotation.x = c.hipL; R.hip.current.rotation.x = c.hipR;
    L.knee.current.rotation.x = c.kneeL; R.knee.current.rotation.x = c.kneeR;
    aL.shoulder.current.rotation.set(c.shoulderL, 0, -c.armOut); aR.shoulder.current.rotation.set(c.shoulderR, 0, c.armOutR || c.armOut);
    aL.elbow.current.rotation.x = c.elbowL; aR.elbow.current.rotation.x = c.elbowR;
    body.current.position.y = c.bob;
    spine.current.rotation.x = c.lean; spine.current.rotation.y = c.twist;

    const aim = aimHead(look?.current?.x ?? 0, look?.current?.y ?? 0);
    s.yaw = damp(s.yaw, aim.yaw, 7, dt); s.pitch = damp(s.pitch, aim.pitch, 7, dt);
    neck.current.rotation.set(s.pitch - c.lean * 0.6, s.yaw * 0.75, 0);
    spine.current.rotation.y += s.yaw * 0.2;
    face.pupils.forEach((p) => { p.current.position.x = s.yaw * 0.035; p.current.position.y = -s.pitch * 0.03; });

    const f = FACE[mood] ?? FACE.confident;
    s.blink -= dt;
    const blinking = s.blink < 0.12;
    if (s.blink < 0) s.blink = 2.5 + Math.random() * 2.5;
    s.eye = damp(s.eye, blinking ? 0.08 : f.eye, 18, dt);
    s.brow = damp(s.brow, f.brow, 10, dt);
    face.eyes.forEach((e) => e.current.scale.set(1, s.eye, 1));
    face.brows.forEach((b, i) => { b.current.position.y = 0.43 + s.brow + (i === 1 ? (f.browTilt ?? 0) * 0.06 : 0); });
    for (const m of ['smile', 'grin', 'oh', 'flat']) face.mouth[m].current.visible = f.mouth === m;
    if (tails.current) tails.current.rotation.x = 0.2 + Math.sin(s.t * 9) * 0.15 + c.lean * 1.2;
  });

  return (
    <group ref={root} {...props}>
      <group ref={body}>
        <group position={[0, 0.95, 0]}>
          <Leg side={-1} refs={L} /><Leg side={1} refs={R} />
          <group ref={spine}>
            <T g={g.pelvis} c={C.pants} position={[0, 0.06, 0]} />
            <T g={g.torso} c={C.tee} position={[0, 0.36, 0]} scale={[1, 1, 0.72]} />
            <T g={g.neck} c={C.skin} position={[0, 0.78, 0]} />
            <Arm side={-1} refs={aL} /><Arm side={1} refs={aR} />
            <group ref={neck} position={[0, 0.84, 0]} scale={1.18}>
              <T g={g.head} c={C.skin} position={[0, 0.3, 0]} scale={[0.95, 1.05, 0.95]} />
              <Face refs={face} />
              <T g={g.cap} c={C.hair} position={[0, 0.39, -0.075]} scale={[1.02, 0.98, 1.02]} />
              {HAIR.map(([x, y, z, sc], i) => {
                const v = new THREE.Vector3(x, y - 0.3, z).normalize().multiplyScalar(0.33);
                return <T key={i} g={g.hair} c={C.hair} position={[v.x, 0.3 + v.y + 0.02, v.z - 0.02]} scale={sc} rotation={[i * 0.7, i * 1.3, i * 0.4]} />;
              })}
              {headband && <Headband tails={tails} />}
            </group>
          </group>
        </group>
      </group>
    </group>
  );
});

export default Character;
