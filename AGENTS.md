<!-- BEGIN:nextjs-agent-rules -->
# Next.js: ALWAYS read docs before coding
 
Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.
 
<!-- END:nextjs-agent-rules -->

# Application Building Context

Read these files in order before implementing or making any architectural decision:

1. `context/project-overview.md` — product definition, goals, content types, and scope
2. `context/architecture-context.md` — stack, FSD structure, routes, content model, and invariants
3. `context/ui-context.md` — theme, tokens, typography, layout, and component conventions
4. `context/code-standards.md` — TypeScript, FSD enforcement, MDX patterns, tooling, and commands
5. `context/ai-workflow-rules.md` — scoping, git workflow, and delivery approach
6. `context/progress-tracker.md` — current phase, completed work, and open questions

Update `context/progress-tracker.md` after each meaningful implementation change. If implementation changes the architecture, scope, or standards documented in any context file, update that file before continuing.
