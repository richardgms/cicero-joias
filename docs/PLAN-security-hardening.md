# Plan: Security Hardening

> **Goal**: Elevate project security posture by implementing defense-in-depth strategies, standardizing authentication, and securing configuration.

## 1. Context & Analysis

### Current State
- **Authentication**: Clerk is used. `middleware.ts` protects admin routes broadly.
- **Authorization**: Custom helper `checkAdminAuth` exists but is not used consistency (e.g., `page-visibility/route.ts` duplicates logic).
- **Configuration**: `next.config.js` lacks HTTP security headers (HSTS, X-Frame-Options, etc.).
- **Validation**: Zod is used in most places, but comprehensive coverage is verified.
- **Dependencies**: Need to ensure no critical vulnerabilities exist.

### Objectives
1.  **Secure Headers**: Implement strict HTTP headers to prevent XSS, clickjacking, and sniffing.
2.  **Standardize Auth**: Refactor all admin routes to use the single source of truth `checkAdminAuth`.
3.  **Hardening**: Ensure strict input validation and rate limiting preparedness.

---

## 2. Task Breakdown

### Phase 1: Configuration Security (A02: Misconfiguration)
- [ ] **Implement Security Headers** (`next.config.js`)
    - Add `X-DNS-Prefetch-Control`
    - Add `X-XSS-Protection`
    - Add `X-Frame-Options` (DENY/SAMEORIGIN)
    - Add `X-Content-Type-Options` (nosniff)
    - Add `Referrer-Policy`
    - Add `Strict-Transport-Security` (HSTS)
    - *Agent*: `backend-specialist`

### Phase 2: Codebase Standardization (A01: Access Control)
- [ ] **Refactor Admin Auth**
    - Audit `app/api/admin/page-visibility/route.ts`
    - Replace duplicate auth logic with `checkAdminAuth()` import
    - Verify consistent error responses (401 vs 403)
    - *Agent*: `backend-specialist`

### Phase 3: Validation & Dependencies (A03: Supply Chain)
- [ ] **Dependency Audit**
    - Run `npm audit`
    - Review high severity issues
- [ ] **Input Validation Review**
    - Ensure all `POST/PUT` endpoints use Zod schemas
    - *Agent*: `security-auditor`

---

## 3. Verification Plan

### Automated Checks
- [ ] Run `npm audit` -> Result should be clear of Critical issues.
- [ ] Check Headers -> Use `curl -I <url>` to verify new headers appear.

### Manual Verification
- [ ] Test Admin Login -> Verify blocking works.
- [ ] Test `page-visibility` endpoint -> Ensure it still works for admins and blocks non-admins after refactor.

---

## 4. Agent Assignments

| Task | Agent | Skill |
|------|-------|-------|
| Headers Config | `backend-specialist` | `nodejs-best-practices` |
| Auth Refactor | `backend-specialist` | `clean-code` |
| Security Review | `security-auditor` | `vulnerability-scanner` |
