# North Star - Mac Native Deployment Guide

## 🎯 Architecture

**Full Stack Running on Mac:**
```
User → Public Tunnel → Next.js (Mac:3000) → OpenClaw Gateway (Mac:18789) → Tara Agent
```

**Benefits vs Vercel:**
- ✅ No build time limits (Vercel free tier exhausted)
- ✅ Zero latency between Next.js and Gateway (same machine)
- ✅ Full control over deployment
- ✅ No cold starts
- ✅ Zero hosting cost

---

## ✅ Current Status

### Services Running

| Service | Status | Port | Launch Agent |
|---------|--------|------|--------------|
| OpenClaw Gateway | ✅ Running | 18789 | `ai.openclaw.gateway` |
| Next.js Production | ✅ Running | 3000 | `com.northstar.web` |
| Cloudflare Tunnel | ⚠️ Warming Up | N/A | Manual (see below) |

### Test Results

**Local API (localhost:3000):**
```bash
$ curl http://localhost:3000/api/chat -d '{"message":"Hi Tara!"}'

✅ {"reply":"Hey! ✨ I'm Tara, your astrology guide..."}
```

**Gateway Direct (localhost:18789):**
```bash
$ curl http://localhost:18789/v1/chat/completions \
  -H 'Authorization: Bearer <token>' \
  -H 'x-openclaw-agent-id: astro' \
  -d '{"model":"openclaw:astro","messages":[{"role":"user","content":"test"}]}'

✅ Tara responds correctly
```

---

## 🚀 Deployment Steps Completed

### 1. Build Next.js Production Bundle

```bash
cd /Users/ay/code/northstar
npm run build
```

**Output:** `.next/` directory with optimized production build

---

### 2. Install as macOS Service

**LaunchAgent:** `~/Library/LaunchAgents/com.northstar.web.plist`

```bash
# Load service
launchctl load ~/Library/LaunchAgents/com.northstar.web.plist

# Verify running
launchctl list | grep northstar

# Check logs
tail -f /tmp/northstar-web.log
```

**Service Features:**
- ✅ Auto-start on login
- ✅ Auto-restart on crash
- ✅ Runs in production mode (`NODE_ENV=production`)
- ✅ Logs to `/tmp/northstar-web.log`

**Commands:**
```bash
# Stop service
launchctl unload ~/Library/LaunchAgents/com.northstar.web.plist

# Restart service
launchctl unload ~/Library/LaunchAgents/com.northstar.web.plist
launchctl load ~/Library/LaunchAgents/com.northstar.web.plist

# View logs
tail -f /tmp/northstar-web.log
tail -f /tmp/northstar-web-error.log
```

---

### 3. Public Access Options

#### Option A: Named Cloudflare Tunnel (Recommended)

**Pros:**
- Free, unlimited bandwidth
- HTTPS included
- Persistent URL
- Reliable connection
- Can add authentication/firewall rules

**Setup:**

```bash
# 1. Authenticate (opens browser)
cloudflared tunnel login

# 2. Create named tunnel
cloudflared tunnel create northstar-web

# 3. Create config file
mkdir -p ~/.cloudflared
cat > ~/.cloudflared/config.yml <<EOF
tunnel: northstar-web
credentials-file: ~/.cloudflared/<TUNNEL-ID>.json

ingress:
  - hostname: chat.northstarastro.com
    service: http://localhost:3000
  - service: http_status:404
EOF

# 4. Route DNS (requires Cloudflare-managed domain)
cloudflared tunnel route dns northstar-web chat.northstarastro.com

# 5. Run tunnel
cloudflared tunnel run northstar-web

# 6. Install as service (optional)
sudo cloudflared service install
```

**URL:** `https://chat.northstarastro.com`

---

#### Option B: Quick Cloudflare Tunnel (Testing Only)

**Pros:**
- Instant setup (no auth required)
- Free

**Cons:**
- ⚠️ Ephemeral URL (changes on restart)
- ⚠️ Less reliable
- ⚠️ Takes 2-3 minutes to stabilize

**Setup:**

```bash
# Start tunnel
cloudflared tunnel --url http://localhost:3000 > /tmp/tunnel-web.log 2>&1 &

# Get URL
tail -20 /tmp/tunnel-web.log | grep trycloudflare.com

# Example URL: https://ion-libs-james-sensitivity.trycloudflare.com
```

**Current Quick Tunnel:** `https://ion-libs-james-sensitivity.trycloudflare.com` (may not be stable yet)

---

#### Option C: ngrok

**Pros:**
- Very reliable
- Fast connection
- Good free tier

**Cons:**
- URLs expire after 2 hours on free tier
- Requires account

**Setup:**

```bash
# Install
brew install ngrok

# Authenticate (get token from ngrok.com)
ngrok config add-authtoken <YOUR_TOKEN>

# Run tunnel
ngrok http 3000
```

**URL:** Shows in ngrok console

---

#### Option D: Tailscale Funnel

**Pros:**
- Extremely reliable
- Integrates with Tailscale network
- Free

**Cons:**
- Requires Tailscale account
- Less familiar to general users

**Setup:**

```bash
# Enable Tailscale Funnel
tailscale funnel 3000

# Get URL
tailscale funnel status
```

---

## 📁 File Locations

| File/Directory | Purpose |
|----------------|---------|
| `/Users/ay/code/northstar/` | Next.js source code |
| `/Users/ay/code/northstar/.next/` | Production build output |
| `/Users/ay/code/northstar/.env.local` | Environment variables |
| `~/Library/LaunchAgents/com.northstar.web.plist` | Service config |
| `/tmp/northstar-web.log` | Application logs |
| `/tmp/northstar-web-error.log` | Error logs |
| `/tmp/tunnel-web.log` | Cloudflare Tunnel logs |

---

## 🔧 Maintenance

### Rebuild After Code Changes

```bash
cd /Users/ay/code/northstar

# Stop service
launchctl unload ~/Library/LaunchAgents/com.northstar.web.plist

# Rebuild
npm run build

# Restart service
launchctl load ~/Library/LaunchAgents/com.northstar.web.plist

# Verify
curl http://localhost:3000/api/chat -d '{"message":"test"}'
```

### Update Environment Variables

```bash
# Edit .env.local
nano /Users/ay/code/northstar/.env.local

# Restart service to apply changes
launchctl unload ~/Library/LaunchAgents/com.northstar.web.plist
launchctl load ~/Library/LaunchAgents/com.northstar.web.plist
```

### Monitor Logs

```bash
# Real-time application logs
tail -f /tmp/northstar-web.log

# Real-time error logs
tail -f /tmp/northstar-web-error.log

# Tunnel logs (if using Cloudflare)
tail -f /tmp/tunnel-web.log

# OpenClaw Gateway logs
tail -f /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log
```

---

## 🔒 Security

### Current Setup

- ✅ Services bind to localhost only (not exposed to LAN)
- ✅ Gateway requires Bearer token authentication
- ✅ Tunnel provides HTTPS termination
- ⚠️ No rate limiting yet
- ⚠️ No tunnel authentication yet

### Recommended Additions

**1. Add Rate Limiting**

Install Upstash Redis (free tier):

```bash
npm install @upstash/ratelimit @upstash/redis
```

Create `src/middleware.ts`:

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
});

export async function middleware(request: Request) {
  if (request.url.includes('/api/chat')) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const { success } = await ratelimit.limit(ip);
    
    if (!success) {
      return new Response('Too Many Requests', { status: 429 });
    }
  }
}
```

**2. Cloudflare Access (Named Tunnel Only)**

Add authentication to tunnel:

```yaml
# ~/.cloudflared/config.yml
ingress:
  - hostname: chat.northstarastro.com
    service: http://localhost:3000
    originRequest:
      noTLSVerify: true
```

Then configure Cloudflare Access in dashboard to require:
- Email verification
- Google OAuth
- GitHub OAuth
- etc.

---

## 🐛 Troubleshooting

### Service Not Starting

```bash
# Check if port 3000 is already in use
lsof -i :3000

# Kill process using port 3000
kill -9 <PID>

# Check service logs
tail -50 /tmp/northstar-web-error.log

# Verify npm is in PATH
which npm
# Should show: /usr/local/bin/npm
```

---

### Tunnel Not Connecting

**Quick Tunnel:**
```bash
# Restart tunnel
pkill cloudflared
cloudflared tunnel --url http://localhost:3000 > /tmp/tunnel-web.log 2>&1 &

# Wait 2-3 minutes for DNS propagation
sleep 120
curl https://<TUNNEL-URL>/
```

**Named Tunnel:**
```bash
# Check config
cat ~/.cloudflared/config.yml

# Test local connection first
curl http://localhost:3000/

# Restart tunnel
cloudflared tunnel run northstar-web
```

---

### API Errors

**Gateway Connection Errors:**
```bash
# Verify Gateway is running
openclaw gateway status

# Test Gateway directly
curl http://127.0.0.1:18789/v1/chat/completions \
  -H 'Authorization: Bearer afa81a6209f36d3a6e352bd88cca60c8f9756ed68edbf055' \
  -H 'x-openclaw-agent-id: astro' \
  -d '{"model":"openclaw:astro","messages":[{"role":"user","content":"test"}]}'

# Check environment variable
grep OPENCLAW_ENDPOINT /Users/ay/code/northstar/.env.local
# Should be: OPENCLAW_ENDPOINT=http://localhost:18789
```

**Tara Not Responding:**
```bash
# List agents
openclaw agents list

# Should show 'astro' agent

# Check API route code
grep -A 5 "TARA_AGENT_ID" /Users/ay/code/northstar/src/app/api/chat/route.ts
# Should be: const TARA_AGENT_ID = 'astro';
```

---

## 📊 Performance Comparison

| Metric | Vercel | Mac Native |
|--------|--------|------------|
| Build Time | ⚠️ Exhausted free tier | ✅ Unlimited |
| Cold Start | ~500-2000ms | ✅ 0ms (always warm) |
| API Latency | ~200-500ms (region dependent) | ✅ <50ms (localhost) |
| Cost | $0 (free tier) | ✅ $0 (hardware already running) |
| Uptime | 99.9% (Vercel SLA) | Depends on Mac uptime |
| Scalability | ✅ Automatic | ⚠️ Single instance |
| Deployment | Git push | Rebuild + restart |

---

## 💰 Cost Analysis

**Infrastructure:**
- Mac Mini: Already running 24/7 for OpenClaw
- Electricity: ~$2-3/month marginal (60W continuous)
- Tunnel: Free (Cloudflare/ngrok free tier)
- Domain: $12/year (if using custom domain)

**Total:** ~$2-3/month vs Vercel Pro ($20/month)

**Savings:** ~$17-18/month ($200+/year)

---

## 🔮 Future Enhancements

1. **Auto-deployment Script**
   ```bash
   # Create ~/bin/deploy-northstar.sh
   #!/bin/bash
   cd /Users/ay/code/northstar
   git pull origin main
   npm run build
   launchctl unload ~/Library/LaunchAgents/com.northstar.web.plist
   launchctl load ~/Library/LaunchAgents/com.northstar.web.plist
   echo "Deployment complete!"
   ```

2. **Monitoring Dashboard**
   - Uptime monitoring (UptimeRobot, Better Uptime)
   - Error tracking (Sentry)
   - Analytics (Plausible, Umami)

3. **Backup & Disaster Recovery**
   - Automated backups to iCloud/GitHub
   - Failover to cloud provider if Mac goes down

4. **Load Balancing**
   - Run multiple Next.js instances on different ports
   - Cloudflare Tunnel load balancing
   - Scale horizontally if traffic increases

---

## ✅ Success Checklist

- [x] Next.js production build compiled
- [x] Service installed and auto-starting
- [x] Local API responding correctly (localhost:3000)
- [x] Gateway integration working
- [x] Tara agent responding
- [ ] Public tunnel stable (quick tunnel warming up)
- [ ] Custom domain configured (optional)
- [ ] Rate limiting added (recommended)
- [ ] Monitoring configured (recommended)

---

## 📝 Quick Command Reference

```bash
# Check service status
launchctl list | grep northstar

# View logs
tail -f /tmp/northstar-web.log

# Restart service
launchctl unload ~/Library/LaunchAgents/com.northstar.web.plist
launchctl load ~/Library/LaunchAgents/com.northstar.web.plist

# Test API
curl http://localhost:3000/api/chat -d '{"message":"test"}'

# Start quick tunnel
cloudflared tunnel --url http://localhost:3000

# Check Gateway
openclaw gateway status

# Rebuild app
cd /Users/ay/code/northstar && npm run build
```

---

**Last Updated:** 2026-02-18  
**Status:** ✅ Fully Functional (Local) | ⏳ Public Tunnel Warming Up  
**Deployment:** Mac Native (No Vercel Dependency)
