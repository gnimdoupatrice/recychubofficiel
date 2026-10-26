<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Homepage scroll actions use IntersectionObserver and native horizontal scrolling; use role-specific sign-in links and avoid adding animation dependencies for these controls.
- Declaration display labels map to existing material IDs without changing stored rows or prices; compact AppShell is opt-in so other screens keep their layout.
- Login uses phone + password mapped to a synthetic email in `src/lib/auth.ts` (auth requires email; auto-confirm is on).
- Auth signup uses two in-memory steps with shared validation in `src/lib/auth-form.ts`; credentials never enter persistent storage or the offline outbox because account creation requires a live auth response.
- Roles live in `user_roles` (household/company), set by the signup trigger from metadata; never on profiles.
- Companies never read household identity/address directly: open declarations come from the `open_declarations()` security-definer RPC; addresses become readable only via RLS once a declaration is in the company's tour.
- State transitions (assign, release, complete, cancel) go through security-definer RPCs, not direct UPDATEs.
- Offline: query cache persisted to localStorage; writes made offline go to the outbox in `src/lib/offline.ts` and flush on reconnect. No service worker yet (app shell still needs network to open).
