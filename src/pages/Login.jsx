// pages/Login.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, createSession } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpeg';

function Login() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mantraActive, setMantraActive] = useState(false);
  const [astraLevel, setAstraLevel] = useState(0);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);

  if (user) {
    navigate('/');
    return null;
  }

  // ============================================
  // MANTRA CHANTING EFFECT
  // ============================================
  const mantras = [
    'ॐ अग्निर्ज्योतिः',
    'ॐ तेजस्वि',
    'ॐ दीप्तिम्',
    'ॐ प्रकाशः',
    'ॐ ब्रह्मास्त्रम्',
    'ॐ शक्ति',
    'ॐ तेजः',
    'ॐ अग्निः'
  ];

  const [currentMantra, setCurrentMantra] = useState('');
  const [mantraIndex, setMantraIndex] = useState(0);

  // ============================================
  // FULL SCREEN BRAHMASTRA ANIMATION
  // ============================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let fireParticles = [];
    let lightParticles = [];
    let stars = [];
    let time = 0;

    // Full screen canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ============================================
    // FIRE PARTICLES (Astra Fire)
    // ============================================
    class FireParticle {
      constructor() {
        this.reset();
      }

      reset() {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * (canvas.width * 0.35) + 50;
        this.baseX = canvas.width / 2;
        this.baseY = canvas.height / 2 - 30;
        this.x = this.baseX + Math.cos(angle) * radius;
        this.y = this.baseY + Math.sin(angle) * radius - 20;
        this.size = Math.random() * 8 + 3;
        this.speed = Math.random() * 2 + 0.5;
        this.angle = angle;
        this.radius = radius;
        this.phase = Math.random() * Math.PI * 2;
        this.glow = Math.random() * 40 + 20;
        this.life = 0.5 + Math.random() * 0.5;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
        this.trail = [];
        this.maxTrail = 12;
        this.type = 'fire';
        this.summonProgress = 0;
      }

      update(summonLevel) {
        this.pulse += this.pulseSpeed;
        this.angle += this.speed * 0.008;
        
        if (summonLevel > 0) {
          this.summonProgress = Math.min(this.summonProgress + 0.015, 1);
          const progress = this.summonProgress * summonLevel;
          const currentRadius = this.radius * (1 - progress * 0.85);
          const targetX = this.baseX + Math.cos(this.angle + this.pulse * 0.3) * currentRadius;
          const targetY = this.baseY + Math.sin(this.angle + this.pulse * 0.3) * currentRadius - 20;
          
          this.x += (targetX - this.x) * 0.06;
          this.y += (targetY - this.y) * 0.06;
          
          this.size = 3 + this.summonProgress * 10;
          this.glow = 20 + this.summonProgress * 80;
          
          this.trail.push({ x: this.x, y: this.y, life: 1 });
          if (this.trail.length > this.maxTrail) {
            this.trail.shift();
          }
          this.trail.forEach(t => t.life -= 0.08);
        } else {
          this.x = this.baseX + Math.cos(this.angle) * this.radius;
          this.y = this.baseY + Math.sin(this.angle) * this.radius - 20;
          this.y += Math.sin(this.pulse) * 8;
          this.trail = [];
          this.summonProgress = 0;
        }
      }

      draw(ctx) {
        // Trail
        if (this.trail.length > 0) {
          this.trail.forEach((t, i) => {
            if (t.life > 0) {
              ctx.globalAlpha = t.life * 0.4;
              const gradient = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, this.size * t.life * 0.5);
              gradient.addColorStop(0, `rgba(255, 200, 50, ${t.life * 0.8})`);
              gradient.addColorStop(0.5, `rgba(255, 100, 0, ${t.life * 0.4})`);
              gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
              ctx.fillStyle = gradient;
              ctx.shadowColor = '#ff4400';
              ctx.shadowBlur = 20;
              ctx.beginPath();
              ctx.arc(t.x, t.y, this.size * t.life * 0.5, 0, Math.PI * 2);
              ctx.fill();
              ctx.shadowBlur = 0;
              ctx.globalAlpha = 1;
            }
          });
        }

        const alpha = this.life * 0.9;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = alpha;

        const intensity = 0.5 + this.summonProgress * 0.5;
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.glow * this.life * (1 + this.summonProgress));
        gradient.addColorStop(0, `rgba(255, 255, 200, ${alpha * 0.9 * intensity})`);
        gradient.addColorStop(0.2, `rgba(255, ${150 + Math.random() * 100}, 50, ${alpha * 0.7 * intensity})`);
        gradient.addColorStop(0.5, `rgba(255, ${80 + Math.random() * 80}, 0, ${alpha * 0.4 * intensity})`);
        gradient.addColorStop(0.8, `rgba(255, ${30 + Math.random() * 40}, 0, ${alpha * 0.2 * intensity})`);
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.shadowColor = '#ff4400';
        ctx.shadowBlur = this.glow * this.life * (1 + this.summonProgress * 2);
        ctx.beginPath();
        ctx.arc(0, 0, this.size * this.life * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.shadowBlur = 0;
        const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * this.life);
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.9})`);
        coreGradient.addColorStop(0.3, `rgba(255, 255, 200, ${alpha * 0.6})`);
        coreGradient.addColorStop(0.7, `rgba(255, 200, 100, ${alpha * 0.3})`);
        coreGradient.addColorStop(1, `rgba(255, 100, 0, ${alpha * 0.1})`);
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * this.life * 0.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    // ============================================
    // LIGHT PARTICLES (Astra Light)
    // ============================================
    class LightParticle {
      constructor() {
        this.reset();
      }

      reset() {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * (canvas.width * 0.4) + 80;
        this.baseX = canvas.width / 2;
        this.baseY = canvas.height / 2 - 30;
        this.x = this.baseX + Math.cos(angle) * radius;
        this.y = this.baseY + Math.sin(angle) * radius - 20;
        this.size = Math.random() * 5 + 2;
        this.speed = Math.random() * 3 + 1;
        this.angle = angle;
        this.radius = radius;
        this.phase = Math.random() * Math.PI * 2;
        this.glow = Math.random() * 50 + 30;
        this.life = 0.6 + Math.random() * 0.4;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.04 + 0.02;
        this.trail = [];
        this.maxTrail = 10;
        this.type = 'light';
        this.summonProgress = 0;
        this.sparkle = Math.random() * Math.PI * 2;
      }

      update(summonLevel) {
        this.pulse += this.pulseSpeed;
        this.sparkle += 0.05;
        this.angle += this.speed * 0.01;
        
        if (summonLevel > 0) {
          this.summonProgress = Math.min(this.summonProgress + 0.02, 1);
          const progress = this.summonProgress * summonLevel;
          const currentRadius = this.radius * (1 - progress * 0.7);
          const targetX = this.baseX + Math.cos(this.angle + this.pulse * 0.4) * currentRadius;
          const targetY = this.baseY + Math.sin(this.angle + this.pulse * 0.4) * currentRadius - 20;
          
          this.x += (targetX - this.x) * 0.08;
          this.y += (targetY - this.y) * 0.08;
          
          this.size = 2 + this.summonProgress * 6;
          this.glow = 30 + this.summonProgress * 100;
          
          this.trail.push({ x: this.x, y: this.y, life: 1 });
          if (this.trail.length > this.maxTrail) {
            this.trail.shift();
          }
          this.trail.forEach(t => t.life -= 0.06);
        } else {
          this.x = this.baseX + Math.cos(this.angle) * this.radius;
          this.y = this.baseY + Math.sin(this.angle) * this.radius - 20;
          this.y += Math.sin(this.pulse) * 6;
          this.trail = [];
          this.summonProgress = 0;
        }
      }

      draw(ctx) {
        // Trail
        if (this.trail.length > 0) {
          this.trail.forEach((t, i) => {
            if (t.life > 0) {
              ctx.globalAlpha = t.life * 0.3;
              const gradient = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, this.size * t.life * 0.4);
              gradient.addColorStop(0, `rgba(100, 220, 255, ${t.life * 0.8})`);
              gradient.addColorStop(0.5, `rgba(50, 150, 255, ${t.life * 0.4})`);
              gradient.addColorStop(1, 'rgba(0, 50, 255, 0)');
              ctx.fillStyle = gradient;
              ctx.shadowColor = '#0088ff';
              ctx.shadowBlur = 15;
              ctx.beginPath();
              ctx.arc(t.x, t.y, this.size * t.life * 0.4, 0, Math.PI * 2);
              ctx.fill();
              ctx.shadowBlur = 0;
              ctx.globalAlpha = 1;
            }
          });
        }

        const alpha = this.life * 0.85;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = alpha;

        const intensity = 0.5 + this.summonProgress * 0.5;
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.glow * this.life * (1 + this.summonProgress));
        gradient.addColorStop(0, `rgba(200, 240, 255, ${alpha * 0.9 * intensity})`);
        gradient.addColorStop(0.3, `rgba(100, 200, 255, ${alpha * 0.6 * intensity})`);
        gradient.addColorStop(0.6, `rgba(50, 150, 255, ${alpha * 0.3 * intensity})`);
        gradient.addColorStop(1, 'rgba(0, 50, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.shadowColor = '#0088ff';
        ctx.shadowBlur = this.glow * this.life * (1 + this.summonProgress * 2);
        ctx.beginPath();
        ctx.arc(0, 0, this.size * this.life * 2, 0, Math.PI * 2);
        ctx.fill();

        // Sparkle
        if (this.summonProgress > 0.3) {
          ctx.shadowBlur = 0;
          const sparkleSize = this.size * 0.5 * (0.5 + Math.sin(this.sparkle) * 0.5);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(this.sparkle) * 0.2})`;
          ctx.beginPath();
          ctx.arc(this.size * 0.3, this.size * 0.3, sparkleSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(-this.size * 0.3, -this.size * 0.3, sparkleSize * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    // ============================================
    // STARS
    // ============================================
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.twinkleSpeed = Math.random() * 0.05 + 0.02;
        this.twinkle = Math.random() * Math.PI * 2;
        this.alpha = Math.random();
      }

      update() {
        this.twinkle += this.twinkleSpeed;
        this.alpha = 0.2 + Math.sin(this.twinkle) * 0.3;
      }

      draw(ctx) {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = this.size * 3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    // Create particles
    for (let i = 0; i < 100; i++) {
      stars.push(new Star());
    }

    for (let i = 0; i < 150; i++) {
      fireParticles.push(new FireParticle());
    }

    for (let i = 0; i < 120; i++) {
      lightParticles.push(new LightParticle());
    }

    // ============================================
    // MANTRA TEXT
    // ============================================
    let mantraText = '';
    let mantraAlpha = 0;

    const renderMantra = (ctx, text, alpha) => {
      if (!text || alpha < 0.01) return;
      
      ctx.save();
      ctx.globalAlpha = alpha * 0.7;
      ctx.font = 'bold 52px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Glow
      ctx.shadowColor = '#ff6600';
      ctx.shadowBlur = 80;
      ctx.fillStyle = '#ff8844';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 100);
      
      ctx.shadowBlur = 40;
      ctx.shadowColor = '#ff4400';
      ctx.fillStyle = '#ffaa66';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 100);
      
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    // ============================================
    // MAIN ANIMATION
    // ============================================
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dark background with gradient
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2 - 30, 0,
        canvas.width / 2, canvas.height / 2 - 30, canvas.width * 0.7
      );
      bgGradient.addColorStop(0, 'rgba(30, 10, 0, 0.95)');
      bgGradient.addColorStop(0.3, 'rgba(20, 8, 0, 0.98)');
      bgGradient.addColorStop(0.7, 'rgba(10, 5, 0, 0.99)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      stars.forEach(star => {
        star.update();
        star.draw(ctx);
      });

      // Update and draw particles
      const summonLevel = astraLevel / 100;
      
      fireParticles.forEach(p => {
        p.update(summonLevel);
        p.draw(ctx);
      });

      lightParticles.forEach(p => {
        p.update(summonLevel);
        p.draw(ctx);
      });

      // ============================================
      // CENTRAL ASTRA GLOW
      // ============================================
      const coreSize = 50 + astraLevel * 3;
      const coreGlow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2 - 30, 0,
        canvas.width / 2, canvas.height / 2 - 30, coreSize + 150
      );
      const intensity = 0.15 + astraLevel / 150;
      coreGlow.addColorStop(0, `rgba(255, 200, 100, ${0.2 + astraLevel / 100})`);
      coreGlow.addColorStop(0.2, `rgba(255, 150, 50, ${0.15 + astraLevel / 150})`);
      coreGlow.addColorStop(0.5, `rgba(255, 100, 50, ${0.1 + astraLevel / 200})`);
      coreGlow.addColorStop(0.8, `rgba(200, 50, 20, ${0.05 + astraLevel / 300})`);
      coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ============================================
      // ASTRA RING
      // ============================================
      if (astraLevel > 10) {
        const ringRadius = 120 + astraLevel * 0.8;
        const rings = 3;
        for (let i = 0; i < rings; i++) {
          ctx.save();
          ctx.globalAlpha = 0.15 + astraLevel / 200 - i * 0.03;
          const color = i === 0 ? '#ff8844' : i === 1 ? '#00ccff' : '#ff4400';
          ctx.strokeStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 40 - i * 10;
          ctx.lineWidth = 2 + astraLevel / 30 - i * 0.5;
          ctx.setLineDash([15 + i * 5, 25 + i * 5]);
          ctx.lineDashOffset = -time * (2 + i) * (i === 1 ? -1 : 1);
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2 - 30, ringRadius + i * 25, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
          ctx.restore();
        }
      }

      // ============================================
      // MANTRA
      // ============================================
      if (mantraActive && currentMantra) {
        mantraAlpha = Math.min(mantraAlpha + 0.015, 0.9);
        renderMantra(ctx, currentMantra, mantraAlpha);
      } else {
        mantraAlpha = Math.max(mantraAlpha - 0.015, 0);
      }

      time++;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [astraLevel, mantraActive, currentMantra]);

  // ============================================
  // MANTRA CHANTING TIMER
  // ============================================
  useEffect(() => {
    if (!mantraActive) {
      setCurrentMantra('');
      setMantraIndex(0);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      setCurrentMantra(mantras[index % mantras.length]);
      setMantraIndex(index);
      index++;
      setAstraLevel(prev => Math.min(prev + 7, 100));
      
      if (index >= mantras.length * 2) {
        clearInterval(interval);
        setMantraActive(false);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [mantraActive]);

  // ============================================
  // OM CHANTING SOUND
  // ============================================
  const playOmChant = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioCtx;
      
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(130, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(90, audioCtx.currentTime + 1.5);
      
      filter.type = 'lowpass';
      filter.frequency.value = 400;
      
      gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 2);
      
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 2);
      
    } catch (error) {
      console.log('Audio not available');
    }
  };

  // ============================================
  // HANDLE LOGIN
  // ============================================
  const handleLogin = async (e) => {
    e.preventDefault();
    
    setMantraActive(true);
    playOmChant();
    setLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 3000));

    const result = await loginUser(userId, password);
    if (result.success) {
      const deviceInfo = {
        deviceName: navigator.userAgent || 'Unknown Device',
        deviceModel: navigator.platform || 'Unknown Platform',
        browser: navigator.userAgent || 'Unknown Browser',
        os: navigator.platform || 'Unknown OS',
        ip: 'Unknown'
      };
      
      const sessionResult = await createSession(result.user.uid, deviceInfo);
      
      if (sessionResult.success) {
        login(result.user, sessionResult.sessionId);
        navigate('/');
      } else {
        setError('Failed to create session: ' + sessionResult.error);
        setMantraActive(false);
        setAstraLevel(0);
      }
    } else {
      setError(result.error);
      setMantraActive(false);
      setAstraLevel(0);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      {/* ============================================ */}
      {/* FULL SCREEN BRAHMASTRA BACKGROUND */}
      {/* ============================================ */}
      <canvas ref={canvasRef} className="auth-bg-canvas" />
      
      {/* Astra Level Bar */}
      {astraLevel > 0 && (
        <div className="astra-level-bar">
          <div className="astra-level-fill" style={{ width: `${astraLevel}%` }} />
          <span className="astra-level-text">
            {astraLevel >= 100 ? '🔥 BRAHMASTRA ACTIVATED!' : `ॐ ${Math.floor(astraLevel)}%`}
          </span>
        </div>
      )}

      {/* ============================================ */}
      {/* LOGIN FORM - Centered */}
      {/* ============================================ */}
      <div className="auth-container">
        <div className="auth-logo-overlay">
          <div className={`auth-logo-wrapper ${astraLevel > 50 ? 'astra-active' : ''}`}>
            <img src={logo} alt="KRONOS" className="auth-logo-image" />
          </div>
          <h1 className={`auth-logo-title ${astraLevel > 70 ? 'astra-title' : ''}`}>
            KRONOS
          </h1>
          <p className="auth-logo-subtitle">
            {mantraActive ? 'ॐ ॐ ॐ' : '⚡ Device Management System'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-input-group">
            <label>👤 User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your user ID"
              required
              disabled={loading}
            />
          </div>

          <div className="auth-input-group">
            <label>🔑 Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          {error && <div className="auth-error-msg">{error}</div>}

          <button 
            type="submit" 
            className={`auth-btn ${astraLevel > 50 ? 'astra-btn' : ''}`} 
            disabled={loading}
          >
            {loading ? (
              <span className="mantra-loading">ॐ ॐ ॐ</span>
            ) : (
              <span>🔥 {astraLevel > 30 ? 'BRAHMASTRA' : 'LOGIN'}</span>
            )}
          </button>
        </form>

        
      </div>

      <style>{`
        /* ============================================ */
        /* FULL SCREEN - NO SCROLL */
        /* ============================================ */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          height: 100%;
          overflow: hidden !important;
          margin: 0;
          padding: 0;
          background: #0a0a0a;
        }

        .auth-page {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
          overflow: hidden !important;
          z-index: 9999;
        }

        /* ============================================ */
        /* FULL SCREEN CANVAS BACKGROUND */
        /* ============================================ */
        .auth-bg-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
        }

        /* ============================================ */
        /* ASTRA LEVEL BAR - Bottom */
        /* ============================================ */
        .astra-level-bar {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          max-width: 500px;
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          overflow: hidden;
          z-index: 10;
          border: 1px solid rgba(255, 150, 50, 0.05);
        }

        .astra-level-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff4400, #ff8800, #ffcc00, #ff8800, #ff4400);
          background-size: 200% 100%;
          animation: astraGlow 1s linear infinite;
          border-radius: 3px;
          transition: width 0.3s ease;
          box-shadow: 0 0 40px rgba(255, 100, 0, 0.6);
        }

        @keyframes astraGlow {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }

        .astra-level-text {
          position: absolute;
          top: -22px;
          right: 0;
          font-size: 10px;
          color: rgba(255, 200, 150, 0.7);
          font-weight: 600;
          letter-spacing: 2px;
          text-shadow: 0 0 20px rgba(255, 100, 0, 0.3);
        }

        /* ============================================ */
        /* LOGIN CONTAINER - Centered */
        /* ============================================ */
        .auth-container {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 380px;
          padding: 24px 28px 28px;
          background: rgba(240, 97, 8, 0.1);
          border-radius: 16px;
          box-shadow: 0 8px 48px rgba(0, 0, 0, 0.8), 0 0 80px rgba(255, 100, 50, 0.05);
          border: 1px solid rgba(255, 150, 50, 0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* ============================================ */
        /* LOGO */
        /* ============================================ */
        .auth-logo-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .auth-logo-wrapper {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          overflow: hidden;
          animation: logoPulse 3s ease-in-out infinite;
          box-shadow: 0 0 50px rgba(255, 150, 50, 0.15);
          border: 2px solid rgba(255, 150, 50, 0.1);
          background: rgba(0, 0, 0, 0.3);
          padding: 6px;
          margin-bottom: 6px;
          transition: all 0.5s ease;
        }

        .auth-logo-wrapper.astra-active {
          animation: astraPulse 0.6s ease-in-out infinite;
          box-shadow: 0 0 80px rgba(255, 100, 0, 0.5), 0 0 120px rgba(255, 50, 0, 0.2);
          border-color: rgba(255, 200, 50, 0.5);
        }

        @keyframes logoPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }

        @keyframes astraPulse {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 0 60px rgba(255, 100, 0, 0.4);
          }
          50% { 
            transform: scale(1.08); 
            box-shadow: 0 0 100px rgba(255, 200, 50, 0.7), 0 0 150px rgba(255, 100, 0, 0.3);
          }
        }

        .auth-logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 50%;
          filter: drop-shadow(0 0 20px rgba(255, 150, 50, 0.1));
        }

        .auth-logo-title {
          font-size: 34px;
          font-weight: 900;
          margin: 0;
          line-height: 1.1;
          background: linear-gradient(135deg, #ff6b35, #ffd93d, #ff6b35);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 4s ease-in-out infinite;
          filter: drop-shadow(0 0 30px rgba(255, 100, 50, 0.1));
          letter-spacing: 8px;
          transition: all 0.5s ease;
        }

        .auth-logo-title.astra-title {
          animation: astraTitle 0.6s ease-in-out infinite;
          filter: drop-shadow(0 0 50px rgba(255, 150, 50, 0.4));
        }

        @keyframes astraTitle {
          0%, 100% { 
            transform: scale(1);
            filter: drop-shadow(0 0 30px rgba(255, 150, 50, 0.3));
          }
          50% { 
            transform: scale(1.05);
            filter: drop-shadow(0 0 70px rgba(255, 200, 50, 0.6));
          }
        }

        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .auth-logo-subtitle {
          font-size: 11px;
          color: rgba(255, 200, 150, 0.6);
          letter-spacing: 4px;
          text-transform: uppercase;
          font-weight: 500;
          margin-top: 2px;
          transition: all 0.3s ease;
        }

        /* ============================================ */
        /* FORM */
        /* ============================================ */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .auth-input-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .auth-input-group label {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 200, 150, 0.6);
          letter-spacing: 0.5px;
        }

        .auth-input-group input {
          padding: 10px 14px;
          border: 1px solid rgba(255, 150, 50, 0.08);
          border-radius: 8px;
          background: rgba(20, 10, 5, 0.6);
          color: #e0d0c0;
          font-size: 13px;
          transition: all 0.3s;
          height: 42px;
        }

        .auth-input-group input:focus {
          outline: none;
          border-color: #ff6b35;
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.08);
          background: rgba(30, 15, 5, 0.7);
        }

        .auth-input-group input::placeholder {
          color: rgba(255, 200, 150, 0.2);
          font-size: 12px;
        }

        .auth-input-group input:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .auth-btn {
          padding: 10px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #ff6b35, #ff4400);
          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          letter-spacing: 2px;
          height: 44px;
          position: relative;
          overflow: hidden;
          text-shadow: 0 0 20px rgba(255, 200, 100, 0.2);
        }

        .auth-btn.astra-btn {
          background: linear-gradient(135deg, #ff4400, #ff8800, #ff4400);
          background-size: 200% 100%;
          animation: btnAstra 0.8s ease-in-out infinite;
          box-shadow: 0 0 50px rgba(255, 100, 0, 0.25);
        }

        @keyframes btnAstra {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
        }

        .auth-btn::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.06), transparent);
          transform: rotate(45deg);
          animation: btnShine 3s ease-in-out infinite;
        }

        @keyframes btnShine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }

        .auth-btn:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 4px 30px rgba(255, 107, 53, 0.3);
        }

        .auth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .mantra-loading {
          animation: mantraSpin 0.5s ease-in-out infinite;
          display: inline-block;
        }

        @keyframes mantraSpin {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }

        .auth-error-msg {
          padding: 8px 12px;
          background: rgba(231, 76, 60, 0.08);
          border: 1px solid rgba(231, 76, 60, 0.3);
          border-radius: 6px;
          color: #e74c3c;
          font-size: 12px;
          min-height: 36px;
          display: flex;
          align-items: center;
        }

        .auth-footer {
          margin-top: 14px;
          text-align: center;
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .auth-link {
          color: rgba(255, 200, 150, 0.4);
          text-decoration: none;
          font-size: 12px;
          transition: all 0.3s;
        }

        .auth-link:hover {
          color: #ff6b35;
          text-decoration: underline;
        }

        .auth-divider {
          color: rgba(255, 200, 150, 0.1);
        }

        /* ============================================ */
        /* RESPONSIVE */
        /* ============================================ */
        @media (max-width: 480px) {
          .auth-container {
            max-width: 92vw;
            padding: 18px 16px 20px;
          }

          .auth-logo-wrapper {
            width: 56px;
            height: 56px;
            padding: 4px;
          }

          .auth-logo-title {
            font-size: 26px;
            letter-spacing: 5px;
          }

          .auth-logo-subtitle {
            font-size: 10px;
            letter-spacing: 2px;
          }

          .auth-input-group input {
            height: 38px;
            padding: 8px 12px;
            font-size: 12px;
          }

          .auth-btn {
            height: 40px;
            font-size: 14px;
          }

          .astra-level-bar {
            width: 80%;
            bottom: 12px;
          }
        }

        @media (max-height: 650px) {
          .auth-logo-wrapper {
            width: 48px;
            height: 48px;
          }

          .auth-logo-title {
            font-size: 22px;
            letter-spacing: 4px;
          }

          .auth-logo-subtitle {
            font-size: 9px;
          }

          .auth-container {
            padding: 12px 16px 16px;
          }

          .auth-input-group input {
            height: 34px;
            padding: 6px 10px;
            font-size: 12px;
          }

          .auth-btn {
            height: 36px;
            font-size: 13px;
            padding: 6px;
          }

          .auth-form {
            gap: 8px;
          }

          .auth-logo-overlay {
            margin-bottom: 10px;
          }
        }

        @media (min-width: 1200px) {
          .auth-container {
            max-width: 420px;
            padding: 32px 40px 36px;
          }

          .auth-logo-wrapper {
            width: 88px;
            height: 88px;
          }

          .auth-logo-title {
            font-size: 40px;
            letter-spacing: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;