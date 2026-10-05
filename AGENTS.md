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
- Login uses phone + password mapped to a synthetic email in `src/lib/auth.ts` (auth requires email; auto-confirm is on).
- Roles live in `user_roles` (household/company), set by the signup trigger from metadata; never on profiles.
- Companies never read household identity/address directly: open declarations come from the `open_declarations()` security-definer RPC; addresses become readable only via RLS once a declaration is in the company's tour.
- State transitions (assign, release, complete, cancel) go through security-definer RPCs, not direct UPDATEs.
- PWA is manifest-only (no service worker) until offline support is requested.
