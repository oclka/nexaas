# GitHub Secrets Configuration

This document lists all required GitHub Secrets for CI/CD workflows.

## Required Secrets

### `APP_SECRET`

**Required for:** Build, Tests, Mutation Testing  
**Description:** Secret key for cron jobs authentication and internal API security  
**Format:** String (minimum 32 characters)  
**Example:** `jfNaITZY8NVr18jf20KfBOpUjju3wv9APF29lIJp78SPFaUidNXbBIndW6elfp8T`

**How to generate:**

```bash
openssl rand -base64 48
```

**Where to configure:**

- GitHub: `Settings → Secrets and variables → Actions → New repository secret`
- Vercel: `Settings → Environment Variables`

---

## Optional Secrets

### `SENTRY_AUTH_TOKEN`

**Required for:** Build (Sentry sourcemaps upload)  
**Description:** Sentry authentication token for uploading sourcemaps  
**Where to get:** Sentry Dashboard → Settings → Auth Tokens

### `SENTRY_URL`

**Required for:** Build (Sentry configuration)  
**Description:** Sentry organization URL  
**Format:** `https://sentry.io/organizations/your-org/`

### `STRYKER_DASHBOARD_API_KEY`

**Required for:** Mutation Testing  
**Description:** Stryker Dashboard API key for mutation testing reports  
**Where to get:** https://dashboard.stryker-mutator.io/

---

## Security Best Practices

1. **Never commit secrets** to version control
2. **Use different secrets** for different environments (CI, staging, production)
3. **Rotate secrets regularly** (at least every 90 days)
4. **Use minimum 32 characters** for cryptographic secrets
5. **Enable secret scanning** with Gitleaks (already configured)

---

## Vercel Environment Variables

In addition to GitHub Secrets, configure these in Vercel:

### Production

- `APP_SECRET` (different from CI)
- `DATABASE_URL`
- `REDIS_URL`
- `SENTRY_DSN`
- `SMTP_URL` (if using email)
- `MAIL_FROM` (if using email)

### Preview/Development

Same as production, but with development/staging values.

---

## Troubleshooting

### Build fails with "APP_SECRET is required"

→ Add `APP_SECRET` to GitHub Secrets

### Gitleaks detects secrets in commits

→ Check `.gitleaks.toml` allowlist
→ Never commit real secrets, only placeholders in `.env.example`

### Tests fail in CI but pass locally

→ Ensure all required secrets are configured in GitHub
→ Check `.env.ci` doesn't contain hardcoded secrets
