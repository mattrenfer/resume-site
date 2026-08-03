# Deployment

The site is a **static export** (`next build` with `output: 'export'`) — it produces
a plain `out/` directory of HTML/CSS/JS that any web server can serve. On Lightsail
this is served by **Bitnami nginx** from its document root.

Deploys run automatically via GitHub Actions on every push to `main`
(`.github/workflows/deploy.yml`). For manual pushes, use `scripts/deploy.ps1`.

---

## One-time setup

### 1. GitHub repository secrets

Add these under **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value | Example |
|--------|-------|---------|
| `LIGHTSAIL_HOST` | Server hostname or static IP | `matthewrenfer.com` |
| `LIGHTSAIL_USER` | SSH user | `bitnami` |
| `LIGHTSAIL_SSH_KEY` | **Full contents** of the private key (the Lightsail `.pem`), including the `-----BEGIN/END-----` lines | _(paste key)_ |
| `LIGHTSAIL_TARGET` | nginx document root | `/opt/bitnami/nginx/html` |

> Confirm the document root on the box with: `cat /opt/bitnami/nginx/conf/nginx.conf | grep root`

### 2. Server write permissions

The `bitnami` user must be able to write to the target directory. If rsync fails
with "permission denied", run once on the server:

```bash
sudo chown -R bitnami:bitnami /opt/bitnami/nginx/html
```

### 3. nginx routing (optional but recommended)

The export uses `trailingSlash: true`, so pages are emitted as real directories
(`/writing/index.html`, `/writing/poetry/<slug>/index.html`). Bitnami's default config
serves these correctly. To return the custom 404 page for unknown paths, ensure the
server block has:

```nginx
location / {
    try_files $uri $uri/ =404;
    error_page 404 /404.html;
}
```

Reload after any nginx change: `sudo /opt/bitnami/ctlscript.sh restart nginx`

---

## How it works

1. Push to `main` → GitHub Action runs `npm install && npm run build` (on Node 24).
2. The Action tars `out/`, `scp`s it to the server, wipes `LIGHTSAIL_TARGET`,
   and extracts the new build into it (the box is EOL Debian with no rsync, so
   this replaces the old rsync step; `tar` + `ssh` are all that's needed).
3. nginx serves the new static files immediately — no restart needed.

The target is wiped and re-extracted on every deploy, so it's owned entirely by
this site — don't store unrelated files there.

## Manual deploy

```powershell
./scripts/deploy.ps1 -KeyPath C:\path\to\lightsail.pem
# optional overrides: -ServerHost <ip> -User bitnami -Target /opt/bitnami/nginx/html
```
