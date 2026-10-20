---
name: agentic-development
description: Use when interacting with AI Agents for coding tasks. Defines how to structure context, requests, and files for optimal AI performance.
---

# Agentic Development Guidelines

## Overview
Optimizing code for AI Agents (Antigravity, Claude, Copilot) is as important as optimizing for human readers. Agents thrive on context, modularity, and explicit intent.

## When to Use
- **Prompting**: Requesting complex features.
- **Refactoring**: Breaking down large files.
- **Context Management**: Deciding what files to @mention.

## Core Rules

### 1. Small Context Windows
**Rule**: Keep files small (< 300 lines).
- **Why**: Agents lose accuracy as context grows. Small, single-purpose files are easier for Agents to read, understand, and modify without hallucinations.

### 2. Explicit Type Definitions
**Rule**: Define Types/Interfaces usually in a separate file or top of file.
- **Why**: Agents use Types to "hallucinate correctly". If the Type says `status: 'active' | 'inactive'`, the Agent won't invent `status: 'pending'`.

### 3. Step-by-Step Instructions (Chain of Thought)
**Rule**: When asking for complex logic, break it down.
- **Bad**: "Fix the bug."
- **Good**: "1. Analyze the error log. 2. Trace the data flow in `api/auth`. 3. Propose a fix."

### 4. "Active" Comments
**Rule**: Leave comments that guide the Agent.
- **Example**: `// TODO: Implement Zod validation here matching schema X` acts as a micro-prompt for the next Agent visiting the file.

## Examples

### ❌ Anti-Pattern: The 2000-Line "Utils" File
Generic `utils.ts` files are context black holes. Agents settle in and get lost.

### ✅ Agent-Friendly Pattern: Domain-Specific Modules
- `utils/date-formatting.ts`
- `utils/currency-math.ts`
- `utils/string-parsers.ts`

Only @mention `currency-math.ts` when working on payments. Saves tokens, improves accuracy.
