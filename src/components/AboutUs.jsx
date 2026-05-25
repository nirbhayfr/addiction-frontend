import { useEffect, useRef } from 'react';
import { Shield, Compass, Users, Star } from 'lucide-react';
import { Sprout } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(cardsRef.current.filter(Boolean), { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    });
  }, []);

  const addRef = (el, i) => { cardsRef.current[i] = el; };

  const team = [
    { name: 'Dr. Sarah Kapur', role: 'Chief Medical Director', sub: 'M.D. Addiction Psychiatry', bio: '14+ years managing acute withdrawal detoxification frameworks and dual-diagnosis trauma rehabilitation.', av: 'SK' },
    { name: 'Dr. Amit Verma', role: 'Family Reconciliation Therapist', sub: 'M.Sc. Systemic Therapy', bio: 'Specialist in boundary setting workshops, repairing trust and codependency dynamics at home.', av: 'AV' },
    { name: 'Rahul Chandra', role: 'Head Crisis Intervention Officer', sub: 'Clinical Counselor, IPC', bio: 'Coordinates 24/7 de-escalation response and counseling protocols for emergency patient safety.', av: 'RC' },
  ];

  const values = [
    { Icon: Shield, title: 'Clinical Rigor', desc: 'Protocols led by certified psychiatrists and medical doctors — never unscientific models.' },
    { Icon: Sprout, title: 'Organic Renewal', desc: 'Medical detox paired with yoga, forest air, sound alignment, and nutritious meal plans.' },
    { Icon: Compass, title: 'Compassion Over Penalty', desc: 'Dependency is a complex neural condition, not a moral failure. Every interaction is rooted in respect.' },
  ];

  return (
    <div ref={sectionRef} className="space-y-8">
      {/* Sanctuary */}
      <div ref={(el) => addRef(el, 0)} className="bg-white border border-[#c8d8cc] rounded-[40px] p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
        <div className="lg:col-span-7 space-y-5">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#4a7c59] bg-[#d4ead9] px-3 py-1 rounded inline-block">Virtual Campus Guide</span>
          <h3 className="font-sans font-extrabold text-3xl text-[#1a4731] leading-tight">Our Misty Dawn Forest Sanctuary</h3>
          <p className="text-sm text-[#5a7a63] leading-relaxed">
            ASHA is built amidst a serene, high-oxygen evergreen misty forest canopy at dawn. This deliberate setting reduces baseline cortisol, assists biological circadian rest rhythm restoration, and ensures clean breathing away from urban dependency triggers.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            {[{ val: '12+ Acres', label: 'Restorative Green Land' }, { val: '100% Private', label: 'Gated Security Facility' }].map((s, i) => (
              <div key={i} className="p-3 bg-[#f0f5f1] rounded-xl border border-[#c8d8cc]">
                <span className="block font-mono text-xl font-extrabold text-[#1a4731]">{s.val}</span>
                <span className="block text-[10px] text-[#5a7a63] uppercase font-bold mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 h-[260px] rounded-3xl overflow-hidden shadow-md">
          <img
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            alt=""
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0Qd08gDMpCOoW5YdL4CXTFf47HII9SOEZ1RfcNXgiuVCgwZ3MCsyHbqusWJL452HCQOyBMKkHsrbjOnUdjiHBTJDh7M_EJOrGciBFMy9PdXXvQRmxk0QzyM7mqYr6jvCZmjNrJjbW3zi9hCxw-kj3k8HL6x56UvoH8xVBAOdH60AKa6c11EDKN0q8jRX_uwmrmteZrt2boCp11EFFwOYvMl45wgalJ3EWG6T23VUONlCAso2QZqnoSvp4MR2Xodr1tG5kXKw3tME"
          />
        </div>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {values.map(({ Icon, title, desc }, i) => (
          <div key={i} ref={(el) => addRef(el, i + 1)} className="bg-[#f0f5f1] border border-[#c8d8cc] rounded-[32px] p-6 space-y-3 hover:-translate-y-1 transition-transform duration-300">
            <div className="p-3 bg-white w-fit rounded-xl text-[#1a4731] shadow-sm border border-[#c8d8cc]">
              <Icon className="w-5 h-5" />
            </div>
            <h5 className="font-sans font-extrabold text-lg text-[#1a4731]">{title}</h5>
            <p className="text-xs text-[#5a7a63] leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <div ref={(el) => addRef(el, 4)} className="bg-white border border-[#c8d8cc] rounded-[40px] p-6 md:p-8 space-y-6 text-left">
        <div className="flex justify-between items-center border-b border-[#c8d8cc] pb-3">
          <div>
            <span className="text-[10px] uppercase font-sans tracking-widest font-extrabold text-[#4a7c59] bg-[#d4ead9] px-2.5 py-1 rounded">Clinical Team</span>
            <h4 className="font-sans font-extrabold text-xl text-[#1a4731] mt-2">Our Compassionate Practitioners</h4>
          </div>
          <Users className="w-6 h-6 text-[#4a7c59]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {team.map((t, i) => (
            <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
              <div>
                <div className="flex gap-3.5 items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#1a4731] text-white flex items-center justify-center font-extrabold text-xs">{t.av}</div>
                  <div>
                    <h5 className="font-sans font-extrabold text-sm text-[#1a4731]">{t.name}</h5>
                    <p className="text-[10px] text-[#4a7c59] font-bold">{t.role}</p>
                    <p className="text-[9px] text-slate-400">{t.sub}</p>
                  </div>
                </div>
                <p className="text-xs text-[#5a7a63] leading-relaxed">{t.bio}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 flex gap-1 items-center text-[10px] text-emerald-700 font-extrabold">
                <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500 animate-pulse" />
                <span>On-Duty Clinical Staff</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
