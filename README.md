# Enseignement Alpha + MYP Academic Copilot

A static GitHub Pages site with a Supabase-backed school workspace and an MCP server for connecting the MYP Academic Copilot plugin to the same authenticated school records.

## Frontend
- `index.html`: main landing page.
- `index-en.html`: learning-methods guide.
- `academic-copilot.html`: sign-in/account creation and private student dashboard.
- `academic-copilot.js`: Supabase Auth and CRUD operations for subjects, assignments, projects, and study sessions.
- `academic-copilot.css`: responsive workspace UI.

The browser uses the Supabase **publishable** key only. Never add a service-role key or server secret to this repository. The database tables have row-level security enabled with authenticated-user ownership policies; keep those policies enabled.

## Supabase project
- Project URL: `https://ueqqoyhtwnfhggrefyxq.supabase.co`
- Edge Function / MCP server: `school-workspace`
- MCP endpoint: `https://ueqqoyhtwnfhggrefyxq.supabase.co/functions/v1/school-workspace`

Before testing account creation, check Supabase Dashboard → Authentication → URL Configuration and add the deployed GitHub Pages origin (and local development origin if needed) to the allowed site URLs. Confirm email-confirmation settings match the intended sign-up flow.

## Connect the plugin / MCP client
Use `LocalMCP.mcp/mcp.json` as the portable remote MCP server configuration. The existing Edge Function advertises OAuth-protected MCP tools and uses the authenticated user's Supabase identity. A client must complete the OAuth sign-in/consent flow; the endpoint is not a service-role bypass.

Implemented MCP tools: `get_profile`, `list_records`, `upcoming_deadlines`, `create_record`, `update_record`, `delete_record`.

The Edge Function's server implementation lives in Supabase, not GitHub Pages. Deployments of its code are managed through the Supabase project. Validate the OAuth flow from the target plugin/client before claiming the connection is fully authenticated.

## Local preview
Serve this directory over HTTP rather than opening HTML via `file://`, then visit `/academic-copilot.html`.

## Security
- Publishable browser keys are expected to be public; access control must come from Supabase Auth and RLS.
- Never commit service-role keys, OAuth client secrets, or user tokens.
- Keep RLS and ownership policies enabled on every user-owned table.