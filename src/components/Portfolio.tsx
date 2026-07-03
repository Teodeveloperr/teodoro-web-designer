"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Portfolio.module.css";

type ThemeKey = "A" | "B";

const THEMES: Record<ThemeKey, Record<string, string>> = {
  A: {
    "--font-display": "var(--font-sora), sans-serif",
    "--font-body": "var(--font-manrope), sans-serif",
    "--radius": "22px",
    "--panel": "rgba(255,255,255,0.03)",
    "--panel-2": "rgba(255,255,255,0.014)",
    "--border": "rgba(255,255,255,0.08)",
    "--border-acc": "rgba(0,255,148,0.28)",
    "--grid-op": "0",
    "--aurora-op": "1",
    "--hero-align": "center",
    "--hero-items": "center",
    "--card-pad": "30px",
    "--muted": "#7f8c85",
    "--dim": "#465049",
  },
  B: {
    "--font-display": "var(--font-space-grotesk), sans-serif",
    "--font-body": "var(--font-jetbrains-mono), monospace",
    "--radius": "2px",
    "--panel": "rgba(0,255,148,0.025)",
    "--panel-2": "rgba(0,255,148,0.012)",
    "--border": "rgba(0,255,148,0.18)",
    "--border-acc": "rgba(0,255,148,0.42)",
    "--grid-op": "1",
    "--aurora-op": "0.28",
    "--hero-align": "left",
    "--hero-items": "flex-start",
    "--card-pad": "26px",
    "--muted": "#6f8a7d",
    "--dim": "#3f5249",
  },
};

const SKILLS = [
  { label: "UI / UX Design", accent: true },
  { label: "Webflow", accent: false },
  { label: "Motion", accent: false },
  { label: "Branding", accent: true },
  { label: "Front-end", accent: false },
  { label: "SEO", accent: false },
  { label: "WordPress", accent: false },
  { label: "Prototipagem", accent: true },
  { label: "Responsivo", accent: false },
];

const STACK = ["Figma", "Framer", "Webflow", "WordPress", "GSAP", "JavaScript", "Tailwind", "After Effects"];

const SERVICES = [
  { icon: "🎨", title: "Design de Sites", text: "Interfaces sob medida, do wireframe ao pixel final, pensadas para converter visitantes em clientes." },
  { icon: "⚙️", title: "Desenvolvimento", text: "Sites rápidos e responsivos em Webflow, WordPress ou código, com performance e SEO de verdade." },
  { icon: "✦", title: "Identidade Visual", text: "Logo, paleta, tipografia e sistema visual completo para uma marca coerente em todos os pontos." },
  { icon: "🎬", title: "Motion & Animação", text: "Micro-interações e animações que dão vida à navegação e prendem a atenção do usuário." },
  { icon: "🔎", title: "Otimização & SEO", text: "Velocidade, acessibilidade e ranqueamento — para o seu site ser encontrado e amado pelo Google." },
  { icon: "💡", title: "Consultoria UX", text: "Análise da sua presença digital com um plano claro de melhorias focadas em resultado." },
];

const PROJECTS = [
  {
    url: "mariaexpressaju.com.br",
    href: "https://mariaexpressaju.com.br/",
    img: "/images/proj-maria.png",
    name: "Maria Expressaju",
    type: "Site de Empresa · Institucional",
  },
  {
    url: "lucianadegnone.com.br",
    href: "https://lucianadegnone.com.br/",
    img: "/images/proj-luciana.png",
    name: "Luciana Degnone",
    type: "Site de Autora · Portfólio literário",
  },
  {
    url: "maferaescritora.com.br",
    href: "https://maferaescritora.com.br/",
    img: "/images/proj-mafera.png",
    name: "Mafera Escritora",
    type: "Site de Autora · Blog & obras",
  },
  {
    url: "humbertohermenegildo.com.br",
    href: "https://humbertohermenegildo.com.br/",
    img: "/images/proj-humberto.png",
    name: "Humberto Hermenegildo",
    type: "Site de Autor · Acadêmico",
  },
  {
    url: "meassessorialiteraria.com.br",
    href: "https://meassessorialiteraria.com.br/",
    img: "/images/proj-me.png",
    name: "ME Assessoria Literária",
    type: "Institucional · Assessoria para escritores",
  },
  {
    url: "raimundoleao.com.br",
    href: "https://raimundoleao.com.br/",
    img: "/images/proj-raimundo.png",
    name: "Raimundo Leão",
    type: "Site de Autor · Médico e escritor",
  },
];

const TESTIMONIALS = [
  {
    text: "O Raphael entendeu a minha essência de escritora e transformou isso num site lindo e funcional. Recebo elogios toda semana.",
    initial: "G",
    name: "Gerailson José",
    role: "Proprietário da Maria Express Aju",
  },
  {
    text: "Profissional, atencioso e criativo. Meu site ficou moderno, rápido e finalmente representa o meu trabalho como deveria.",
    initial: "L",
    name: "Luciana Degnone",
    role: "Autora",
  },
  {
    text: "Do briefing à entrega foi tudo transparente e no prazo. Recomendo de olhos fechados para quem quer se destacar.",
    initial: "H",
    name: "Humberto Hermenegildo",
    role: "Autor",
  },
  {
    text: "A ME ganhou um site à altura da nossa marca. O Raphael foi ágil, atento a cada detalhe e entregou muito além do esperado.",
    initial: "M",
    name: "Monyque Evelyn",
    role: "ME Assessoria Literária",
  },
  {
    text: "Meu site ficou elegante e transmite exatamente a história que quero contar. Trabalho impecável do começo ao fim.",
    initial: "R",
    name: "Raimundo Leão",
    role: "Médico e escritor",
  },
  {
    text: "Além de talentoso, o Raphael tem uma paciência enorme para explicar cada etapa. Fiquei tranquila do início ao lançamento.",
    initial: "M",
    name: "Mafé Escritora",
    role: "Autora",
  },
];

const WEB3FORMS_ACCESS_KEY: string = "defa7103-ded8-471d-854d-5f0358994a85";

function useRevealOnScroll(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const els = root.querySelectorAll(`.${styles.reveal}`);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealIn);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [containerRef]);
}

function useParallax(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const els = [...root.querySelectorAll<HTMLElement>("[data-parallax]")];
    if (!els.length) return;
    const onScroll = () => {
      const y = window.scrollY;
      els.forEach((el) => {
        const sp = parseFloat(el.getAttribute("data-parallax") || "0.05");
        el.style.transform = `translateY(${y * sp}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [containerRef]);
}

function useAurora(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      w = window.innerWidth;
      h = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const hues = [150, 160, 142, 168, 155];
    const blobs = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 240 + Math.random() * 220,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      hue: hues[i],
    }));
    const parts = Array.from({ length: 55 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      s: Math.random() * 1.6 + 0.4,
      v: Math.random() * 0.4 + 0.12,
    }));

    const loop = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      blobs.forEach((b) => {
        b.x += b.dx;
        b.y += b.dy;
        if (b.x < -120 || b.x > w + 120) b.dx *= -1;
        if (b.y < -120 || b.y > h + 120) b.dy *= -1;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `hsla(${b.hue},100%,55%,0.16)`);
        g.addColorStop(1, `hsla(${b.hue},100%,50%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 7);
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
      parts.forEach((p) => {
        p.y -= p.v;
        if (p.y < 0) {
          p.y = h;
          p.x = Math.random() * w;
        }
        ctx.fillStyle = `rgba(0,255,148,${0.12 + p.s * 0.14})`;
        ctx.fillRect(p.x, p.y, p.s, p.s);
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

type ChipState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  drag: boolean;
  lx: number;
  ly: number;
};

function useDraggableChips(playRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const box = playRef.current;
    if (!box) return;
    const chips = [...box.querySelectorAll<HTMLElement>("[data-chip]")];
    const states = new Map<HTMLElement, ChipState>();
    const cleanups: Array<() => void> = [];

    chips.forEach((chip, i) => {
      const ang = Math.random() * Math.PI * 2;
      const st: ChipState = {
        x: 24 + (i % 3) * 150,
        y: 24 + Math.floor(i / 3) * 84,
        vx: Math.cos(ang) * 0.6,
        vy: Math.sin(ang) * 0.6,
        drag: false,
        lx: 0,
        ly: 0,
      };
      states.set(chip, st);
      chip.style.left = st.x + "px";
      chip.style.top = st.y + "px";

      const onDown = (e: PointerEvent) => {
        st.drag = true;
        st.lx = e.clientX;
        st.ly = e.clientY;
        chip.setPointerCapture(e.pointerId);
        chip.style.cursor = "grabbing";
        chip.style.zIndex = "20";
      };
      const onMove = (e: PointerEvent) => {
        if (!st.drag) return;
        const dx = e.clientX - st.lx;
        const dy = e.clientY - st.ly;
        st.x += dx;
        st.y += dy;
        st.vx = dx;
        st.vy = dy;
        st.lx = e.clientX;
        st.ly = e.clientY;
        chip.style.left = st.x + "px";
        chip.style.top = st.y + "px";
      };
      const onUp = () => {
        st.drag = false;
        chip.style.cursor = "grab";
        chip.style.zIndex = "1";
      };

      chip.addEventListener("pointerdown", onDown);
      chip.addEventListener("pointermove", onMove);
      chip.addEventListener("pointerup", onUp);
      chip.addEventListener("pointercancel", onUp);
      cleanups.push(() => {
        chip.removeEventListener("pointerdown", onDown);
        chip.removeEventListener("pointermove", onMove);
        chip.removeEventListener("pointerup", onUp);
        chip.removeEventListener("pointercancel", onUp);
      });
    });

    let raf = 0;
    const step = () => {
      const r = box.getBoundingClientRect();
      const W = r.width;
      const H = r.height;
      chips.forEach((chip) => {
        const st = states.get(chip)!;
        if (st.drag) return;
        st.x += st.vx;
        st.y += st.vy;
        st.vx *= 0.99;
        st.vy *= 0.99;
        const sp = Math.hypot(st.vx, st.vy);
        const MIN = 0.5;
        if (sp < MIN) {
          const a = sp > 0.001 ? Math.atan2(st.vy, st.vx) : Math.random() * Math.PI * 2;
          st.vx = Math.cos(a) * MIN;
          st.vy = Math.sin(a) * MIN;
        }
        const cw = chip.offsetWidth;
        const ch = chip.offsetHeight;
        if (st.x < 0) {
          st.x = 0;
          st.vx = Math.abs(st.vx);
        }
        if (st.x > W - cw) {
          st.x = W - cw;
          st.vx = -Math.abs(st.vx);
        }
        if (st.y < 0) {
          st.y = 0;
          st.vy = Math.abs(st.vy);
        }
        if (st.y > H - ch) {
          st.y = H - ch;
          st.vy = -Math.abs(st.vy);
        }
        chip.style.left = st.x + "px";
        chip.style.top = st.y + "px";
      });
      raf = requestAnimationFrame(step);
    };
    step();

    return () => {
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
    };
  }, [playRef]);
}

export default function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playRef = useRef<HTMLDivElement>(null);
  const testiRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const [theme, setTheme] = useState<ThemeKey>("A");
  const [sendLabel, setSendLabel] = useState("Enviar mensagem →");
  const [sending, setSending] = useState(false);

  useRevealOnScroll(rootRef);
  useParallax(rootRef);
  useAurora(canvasRef);
  useDraggableChips(playRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const vars = THEMES[theme];
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }, [theme]);

  const testiScroll = (dir: number) => {
    const el = testiRef.current;
    if (!el) return;
    const card = el.querySelector("div");
    const step = card ? card.clientWidth + 20 : 380;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const sendForm = async () => {
    const nome = (nameRef.current?.value || "").trim();
    const email = (emailRef.current?.value || "").trim();
    const msg = (msgRef.current?.value || "").trim();

    if (!nome || !email || !msg) {
      setSendLabel("Preencha todos os campos");
      setTimeout(() => setSendLabel("Enviar mensagem →"), 2200);
      return;
    }

    if (WEB3FORMS_ACCESS_KEY === "SUA_ACCESS_KEY_AQUI") {
      const corpo = `Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${msg}`;
      window.location.href =
        "mailto:contato@teodorowebdesigner.com.br?subject=" +
        encodeURIComponent("Novo contato do site — " + nome) +
        "&body=" +
        encodeURIComponent(corpo);
      return;
    }

    setSending(true);
    setSendLabel("Enviando…");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Novo contato do site — " + nome,
          from_name: nome,
          name: nome,
          email,
          message: msg,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSendLabel("Mensagem enviada! ✓");
        if (nameRef.current) nameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (msgRef.current) msgRef.current.value = "";
      } else {
        setSendLabel("Erro ao enviar — tente novamente");
      }
    } catch {
      setSendLabel("Erro de conexão — tente novamente");
    }
    setSending(false);
    setTimeout(() => setSendLabel("Enviar mensagem →"), 3500);
  };

  const hideBrokenImage: React.ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.style.display = "none";
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <canvas ref={canvasRef} className={styles.auroraCanvas} />
      <div className={styles.gridOverlay} />
      <div className={styles.radialGlow} />

      {/* NAV */}
      <nav className={styles.nav}>
        <a href="#top" className={styles.navBrand}>
          <span className={styles.navBadge}>R</span>
          <span className={styles.navBrandName}>Raphael Teodoro</span>
        </a>
        <div className={styles.navLinks}>
          <a href="#sobre" className={styles.navLink}>Sobre</a>
          <a href="#servicos" className={styles.navLink}>Serviços</a>
          <a href="#projetos" className={styles.navLink}>Projetos</a>
          <a href="#contato" className={styles.navLink}>Contato</a>
        </div>
        <div className={styles.navRight}>
          <div className={styles.themeSwitch}>
            <button
              className={`${styles.themeBtn} ${theme === "A" ? styles.themeBtnActive : ""}`}
              onClick={() => setTheme("A")}
            >
              AURORA
            </button>
            <button
              className={`${styles.themeBtn} ${theme === "B" ? styles.themeBtnActive : ""}`}
              onClick={() => setTheme("B")}
            >
              TERMINAL
            </button>
          </div>
          <a href="#contato" className={styles.navCta}>Fale comigo</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className={styles.hero}>
        <div data-parallax="0.06" className={styles.badge}>
          <span className={styles.badgeDot} />
          Web Designer · Disponível para projetos
        </div>
        <h1 data-parallax="0.02" className={styles.heroTitle}>
          Transformo ideias em <span className={styles.heroAccent}>sites que convertem</span>.
        </h1>
        <p className={styles.heroText}>
          Design moderno, animado e de alta performance para marcas e autores que querem se
          destacar no digital. Do conceito ao lançamento.
        </p>
        <div className={styles.heroCtas}>
          <a href="#projetos" className={styles.btnPrimary}>Ver projetos →</a>
          <a href="#contato" className={styles.btnSecondary}>Vamos conversar</a>
        </div>

        <div className={styles.playground}>
          <div className={styles.playHeader}>
            <span className={styles.playLabel}>{"// minhas skills"}</span>
            <span className={styles.playHint}>arraste-me ✦</span>
          </div>
          <div id="play" ref={playRef} className={styles.playBox}>
            {SKILLS.map((skill) => (
              <div
                key={skill.label}
                data-chip=""
                className={`${styles.chip} ${skill.accent ? styles.chipAccent : ""}`}
              >
                {skill.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className={styles.sobre}>
        <div className={styles.reveal}>
          <div className={styles.sobreImageWrap}>
            <Image
              src="/images/sobre-raphael.png"
              alt="Raphael Teodoro em seu setup de trabalho"
              fill
              sizes="(max-width: 860px) 100vw, 40vw"
              style={{ objectFit: "cover", objectPosition: "78% center" }}
              onError={hideBrokenImage}
            />
          </div>
        </div>
        <div className={styles.reveal}>
          <span className={styles.sectionLabel}>{"// sobre mim"}</span>
          <h2 className={styles.sobreTitle}>Design com propósito, código com precisão.</h2>
          <p className={styles.sobreP}>
            Sou o Raphael, web designer apaixonado por criar experiências digitais que unem
            estética e resultado. Trabalho lado a lado com cada cliente para traduzir a essência
            da marca em interfaces vivas, rápidas e memoráveis.
          </p>
          <p className={styles.sobreP}>
            Especializado em sites para autores, negócios e marcas pessoais que querem sair do
            óbvio e conquistar o público certo.
          </p>
          <div className={styles.stats}>
            <div>
              <div className={styles.statNum}>+10</div>
              <div className={styles.statLabel}>projetos entregues</div>
            </div>
            <div>
              <div className={styles.statNum}>2</div>
              <div className={styles.statLabel}>anos de experiência</div>
            </div>
            <div>
              <div className={styles.statNum}>98%</div>
              <div className={styles.statLabel}>clientes satisfeitos</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICOS */}
      <section id="servicos" className={styles.servicos}>
        <div className={`${styles.reveal} ${styles.servicosHead}`}>
          <span className={styles.sectionLabel}>{"// serviços"}</span>
          <h2 className={styles.servicosTitle}>Tudo que sua marca precisa para brilhar online.</h2>
        </div>
        <div className={styles.serviceGrid}>
          {SERVICES.map((service) => (
            <div key={service.title} className={`${styles.reveal} ${styles.serviceCard}`}>
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceText}>{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS MARQUEE */}
      <section className={styles.marqueeSection}>
        <div className={styles.marqueeTrack}>
          {[0, 1].map((groupIdx) => (
            <div key={groupIdx} className={styles.marqueeGroup}>
              {STACK.map((item, i) => (
                <span key={`${groupIdx}-${item}`} style={{ display: "contents" }}>
                  <span className={i % 2 === 0 ? styles.marqueeItemLight : styles.marqueeItemMuted}>
                    {item}
                  </span>
                  <span className={styles.marqueeDot}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className={styles.projetos}>
        <div className={`${styles.reveal} ${styles.projetosHead}`}>
          <div>
            <span className={styles.sectionLabel}>{"// projetos selecionados"}</span>
            <h2 className={styles.projetosTitle}>Trabalhos recentes</h2>
          </div>
          <span className={styles.projCount}>06 projetos ↘</span>
        </div>
        <div className={styles.projGrid}>
          {PROJECTS.map((project) => (
            <a
              key={project.url}
              href={project.href}
              target="_blank"
              rel="noopener"
              className={`${styles.reveal} ${styles.projCard}`}
            >
              <div className={styles.projBar}>
                <span className={`${styles.dot} ${styles.dotRed}`} />
                <span className={`${styles.dot} ${styles.dotYellow}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
                <span className={styles.projUrl}>{project.url}</span>
              </div>
              <div className={styles.projImageWrap}>
                <Image
                  src={project.img}
                  alt={`Preview do site ${project.name}`}
                  fill
                  sizes="(max-width: 860px) 100vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  onError={hideBrokenImage}
                />
              </div>
              <div className={styles.projFooter}>
                <div>
                  <div className={styles.projName}>{project.name}</div>
                  <div className={styles.projType}>{project.type}</div>
                </div>
                <span className={styles.projArrow}>↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className={styles.depoimentos}>
        <div className={`${styles.reveal} ${styles.depoimentosHead}`}>
          <span className={styles.sectionLabel}>{"// depoimentos"}</span>
          <h2 className={styles.depoimentosTitle}>O que dizem meus clientes</h2>
        </div>
        <div className={styles.testiWrap}>
          <div ref={testiRef} className={styles.testiTrack}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className={styles.testiCard}>
                <div className={styles.testiQuoteMark}>&quot;</div>
                <p className={styles.testiText}>{t.text}</p>
                <div className={styles.testiAuthor}>
                  <div className={styles.avatar}>{t.initial}</div>
                  <div>
                    <div className={styles.authorName}>{t.name}</div>
                    <div className={styles.authorRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.testiNav}>
            <button aria-label="Anterior" className={styles.testiBtn} onClick={() => testiScroll(-1)}>←</button>
            <button aria-label="Próximo" className={styles.testiBtn} onClick={() => testiScroll(1)}>→</button>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className={styles.contato}>
        <div className={`${styles.reveal} ${styles.contatoBox}`}>
          <div className={styles.contatoHead}>
            <span className={styles.sectionLabel}>{"// vamos conversar"}</span>
            <h2 className={styles.contatoTitle}>Vamos criar algo juntos?</h2>
            <p className={styles.contatoP}>
              Conte sobre o seu projeto. Respondo em até 24h com as próximas etapas.
            </p>
          </div>
          <div className={styles.contatoForm}>
            <input ref={nameRef} placeholder="Seu nome" className={styles.inputField} />
            <input ref={emailRef} placeholder="Seu e-mail" className={styles.inputField} />
            <textarea
              ref={msgRef}
              placeholder="Conte sobre o seu projeto..."
              rows={4}
              className={styles.textareaField}
            />
            <button onClick={sendForm} disabled={sending} className={styles.submitBtn}>
              {sendLabel}
            </button>
          </div>
          <div className={styles.contatoLinks}>
            <a href="mailto:contato@teodorowebdesigner.com.br" className={styles.emailLink}>
              contato@teodorowebdesigner.com.br
            </a>
            <span className={styles.dividerDot}>·</span>
            <a
              href="https://www.instagram.com/teodoro.webdesigner/"
              target="_blank"
              rel="noopener"
              className={styles.socialLink}
            >
              Instagram
            </a>
            <a
              href="https://wa.me/5579991821546?text=Ol%C3%A1%20Raphael!%20Vim%20pelo%20seu%20site%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
              target="_blank"
              rel="noopener"
              className={styles.socialLink}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <span className={styles.footerBadge}>R</span>
          <span className={styles.footerName}>Raphael Teodoro</span>
        </div>
        <span className={styles.copyright}>© 2026 · Feito com café e pixels ☕</span>
        <a href="#top" className={styles.backTop}>Voltar ao topo ↑</a>
      </footer>
    </div>
  );
}
