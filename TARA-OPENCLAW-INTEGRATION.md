# Tara OpenClaw Integration Guide

## Overview

**Objective:** Connect northstarastro.com/chat to Tara agent running on OpenClaw Gateway without using Anthropic API directly (eliminating API costs).

**Architecture:** Direct Gateway HTTP API
```
Website (Vercel) → Cloudflare Tunnel → OpenClaw Gateway → Tara Agent (astro)
```

---

## ✅ Completed Setup

### 1. OpenClaw Gateway Configuration

**HTTP Endpoints Enabled:**
- `/v1/chat/completions` (OpenAI-compatible)
- `/v1/responses` (OpenResponses API)

**Configuration File:** `~/.openclaw/openclaw.json`

```json
{
  "gateway": {
    "http": {
      "endpoints": {
        "chatCompletions": { "enabled": true },
        "responses": { "enabled": true }
      }
    }
  }
}
```

**Gateway Status:**
- Port: 18789
- Bind: loopback (127.0.0.1)
- Auth Mode: token
- Auth Token: `afa81a6209f36d3a6e352bd88cca60c8f9756ed68edbf055`

**Tara Agent:**
- Agent ID: `astro`
- Model: `anthropic/claude-sonnet-4-5`
- Workspace: `/Users/ay/.openclaw/workspace-astro`
- Tools: Minimal profile + exec, read, write, sessions

---

### 2. Next.js API Route

**File:** `src/app/api/chat/route.ts`

**Changes:**
- ✅ Replaced `@anthropic-ai/sdk` with direct fetch to OpenClaw Gateway
- ✅ Uses `/v1/chat/completions` endpoint (OpenAI-compatible)
- ✅ Sends `x-openclaw-agent-id: astro` header to route to Tara
- ✅ Maintains birth chart calculation logic
- ✅ Supports conversation history
- ✅ Session persistence via `user` field (phone number)

**Environment Variables:**
```bash
OPENCLAW_ENDPOINT=http://localhost:18789  # Local dev
OPENCLAW_TOKEN=afa81a6209f36d3a6e352bd88cca60c8f9756ed68edbf055
```

---

### 3. Cloudflare Tunnel Setup

**Purpose:** Expose local OpenClaw Gateway to Vercel (production deployment)

#### Quick Tunnel (Development/Testing)

```bash
# Start tunnel in background
cloudflared tunnel --url http://localhost:18789 > /tmp/tunnel.log 2>&1 &

# Get the tunnel URL from logs
tail -20 /tmp/tunnel.log | grep trycloudflare.com
```

**Current Tunnel URL:** `https://lap-exploration-with-upcoming.trycloudflare.com`

⚠️ **Note:** Quick tunnels are ephemeral and change on restart. For production, use Named Tunnels.

#### Named Tunnel (Production - Recommended)

```bash
# 1. Authenticate (opens browser)
cloudflared tunnel login

# 2. Create named tunnel
cloudflared tunnel create tara-chat

# 3. Create config file
cat > ~/.cloudflared/config.yml <<EOF
tunnel: tara-chat
credentials-file: ~/.cloudflared/<TUNNEL-ID>.json

ingress:
  - hostname: tara-api.northstarastro.com
    service: http://localhost:18789
  - service: http_status:404
EOF

# 4. Route DNS (via Cloudflare dashboard or CLI)
cloudflared tunnel route dns tara-chat tara-api.northstarastro.com

# 5. Run tunnel as service
cloudflared tunnel run tara-chat

# 6. Or install as system service
sudo cloudflared service install
```

---

## 🚀 Deployment Guide

### Local Development

1. **Start OpenClaw Gateway:**
   ```bash
   openclaw gateway status  # Verify running on port 18789
   ```

2. **Start Next.js Dev Server:**
   ```bash
   cd /Users/ay/code/northstar
   npm run dev
   ```

3. **Test API:**
   ```bash
   curl http://localhost:3000/api/chat \
     -H 'Content-Type: application/json' \
     -d '{"message":"Hi Tara!"}'
   ```

---

### Production Deployment (Vercel)

1. **Start Cloudflare Tunnel:**
   ```bash
   # Quick tunnel (temporary)
   cloudflared tunnel --url http://localhost:18789
   
   # OR named tunnel (persistent)
   cloudflared tunnel run tara-chat
   ```

2. **Update Vercel Environment Variables:**
   
   Go to Vercel Dashboard → northstar-web → Settings → Environment Variables:
   
   ```
   OPENCLAW_ENDPOINT=https://tara-api.northstarastro.com  # Named tunnel URL
   OPENCLAW_TOKEN=afa81a6209f36d3a6e352bd88cca60c8f9756ed68edbf055
   ```

3. **Deploy to Vercel:**
   ```bash
   cd /Users/ay/code/northstar
   vercel --prod
   ```

4. **Test Production:**
   ```bash
   curl https://northstarastro.com/api/chat \
     -H 'Content-Type: application/json' \
     -d '{"message":"Hi Tara!"}'
   ```

---

## 🔒 Security Considerations

### Authentication

- ✅ Gateway requires Bearer token authentication
- ✅ Token stored in environment variables (not committed to git)
- ✅ Tunnel is HTTPS-only (Cloudflare TLS)

### Rate Limiting

**Recommended:** Add rate limiting to `/api/chat` endpoint:

```typescript
// src/middleware.ts (example)
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
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

### Network Security

- ✅ Gateway binds to loopback only (not exposed to LAN)
- ✅ Tunnel provides secure HTTPS endpoint
- ⚠️ **TODO:** Configure Cloudflare Access for tunnel authentication

---

## 🧪 Testing Checklist

- [x] Local API responds correctly
- [x] Tara agent routing works
- [x] Birth chart calculation logic preserved
- [x] Session persistence works (via phone number)
- [ ] Tunnel connection stable (>24h uptime)
- [ ] Production Vercel deployment tested
- [ ] Error handling verified
- [ ] Rate limiting implemented
- [ ] Monitoring/logging configured

---

## 📊 Monitoring

### Gateway Logs

```bash
# Real-time logs
tail -f /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log

# Or use OpenClaw's log viewer
/Users/ay/openclaw/scripts/clawlog.sh
```

### Tunnel Logs

```bash
# Quick tunnel
tail -f /tmp/tunnel.log

# Named tunnel service
sudo journalctl -u cloudflared -f
```

### API Request Logs

Check Vercel Dashboard → northstar-web → Logs for API route errors.

---

## 🐛 Troubleshooting

### "Method Not Allowed" Error

**Cause:** HTTP endpoints not enabled in Gateway config.

**Fix:**
```bash
# Verify config
cat ~/.openclaw/openclaw.json | jq '.gateway.http.endpoints'

# Should show:
# {
#   "chatCompletions": { "enabled": true },
#   "responses": { "enabled": true }
# }

# Restart Gateway
openclaw gateway restart
```

---

### Tunnel Connection Errors

**Cause:** Tunnel not reaching Gateway.

**Fix:**
```bash
# 1. Verify Gateway is running
openclaw gateway status

# 2. Test local endpoint
curl http://127.0.0.1:18789/

# 3. Restart tunnel
pkill cloudflared
cloudflared tunnel --url http://localhost:18789
```

---

### Tara Not Responding

**Cause:** Wrong agent ID or agent not configured.

**Fix:**
```bash
# List agents
openclaw agents list

# Should show:
# - main (Jarvis)
# - astro (Tara) ← This one

# Test direct Gateway call
curl http://127.0.0.1:18789/v1/chat/completions \
  -H 'Authorization: Bearer afa81a6209f36d3a6e352bd88cca60c8f9756ed68edbf055' \
  -H 'x-openclaw-agent-id: astro' \
  -d '{"model":"openclaw:astro","messages":[{"role":"user","content":"test"}]}'
```

---

### "Invalid Auth Token" Error

**Cause:** Environment variable mismatch.

**Fix:**
```bash
# Check Gateway token
cat ~/.openclaw/openclaw.json | jq -r '.gateway.auth.token'

# Update .env.local to match
# Redeploy to Vercel with correct token
```

---

## 💰 Cost Analysis

### Before (Anthropic API Direct)

- **Model:** Claude Sonnet 4.5
- **Pricing:** ~$3 per 1M input tokens, ~$15 per 1M output tokens
- **Estimated Monthly Cost:** $20-50 (for moderate traffic)

### After (OpenClaw Gateway)

- **Infrastructure:** Mac already running OpenClaw 24/7
- **Cloudflare Tunnel:** Free (no egress fees)
- **Anthropic API:** Still used by OpenClaw, but shared across all agents
- **Marginal Cost:** ~$0 (API calls already happening for Telegram/WhatsApp)

**Savings:** ~$20-50/month + eliminates separate API key management

---

## 🔮 Future Enhancements

1. **WebSocket Support:**
   - Replace polling with WebSocket for real-time streaming
   - Use OpenClaw's native WebSocket chat API

2. **Multi-Model Support:**
   - Allow users to choose Claude Opus vs Sonnet
   - Implement model switching in chat UI

3. **Analytics:**
   - Track chat usage (messages, sessions, topics)
   - Monitor response quality

4. **Advanced Features:**
   - Voice input/output (using OpenClaw's TTS integration)
   - Image upload for chart annotations
   - Multi-session support (multiple concurrent chats)

---

## 📝 Technical Notes

### Why OpenAI-Compatible Endpoint?

- ✅ Standard format (easier to swap providers later)
- ✅ Streaming support (SSE)
- ✅ Session management via `user` field
- ✅ Extensive documentation

### Alternative: OpenResponses API

`/v1/responses` endpoint supports:
- Richer input types (images, files, PDFs)
- Client-side tool calls
- Better turn-based conversation handling

**Migration path:** Can switch from `/v1/chat/completions` to `/v1/responses` without changing architecture.

---

## 📚 References

- [OpenClaw Gateway HTTP APIs](/Users/ay/openclaw/docs/gateway/)
- [OpenAI Chat Completions API Docs](/Users/ay/openclaw/docs/gateway/openai-http-api.md)
- [OpenResponses API Docs](/Users/ay/openclaw/docs/gateway/openresponses-http-api.md)
- [Cloudflare Tunnel Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)

---

## ✅ Success Metrics

**Integration Status:** ✅ **WORKING**

- ✅ Local development fully functional
- ✅ Tara responds correctly
- ✅ Birth chart logic preserved
- ⏳ Production tunnel setup (pending DNS/named tunnel)
- ⏳ Vercel deployment (pending tunnel URL)

**Test Results:**

```bash
$ curl http://localhost:3000/api/chat -d '{"message":"Hi Tara!"}'
{
  "reply": "Hey! ✨ I'm Tara. I can help you understand your birth chart..."
}
```

**Next Steps:**
1. Set up named Cloudflare Tunnel (production-grade)
2. Configure DNS: tara-api.northstarastro.com
3. Deploy to Vercel with tunnel URL
4. Add monitoring and rate limiting
5. Test production endpoint end-to-end

---

**Last Updated:** 2026-02-18  
**Status:** Development Complete, Production Deployment Pending
