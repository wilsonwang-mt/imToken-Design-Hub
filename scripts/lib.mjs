// audit.mjs 和 scaffold.mjs 共用的路径、配置和样式前缀规则。
import { readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const CONFIG = JSON.parse(readFileSync(join(ROOT, 'scripts/audit.config.json'), 'utf8'))
export const SLUG_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/
export const PREFIX_RE = /^[a-z]{2,6}$/

/** 不能用作项目样式前缀的名字：配置里的保留字 + app/globals.css 里每个 class 的第一段（.glass、.proj-card → glass、proj） */
export function reservedPrefixes() {
  const css = readFileSync(join(ROOT, 'app/globals.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
  const heads = [...css.matchAll(/\.([a-z][a-z0-9]*)(?=[-\s.:,{>+~[)#]|$)/gm)].map((m) => m[1])
  return new Set([...CONFIG.reservedPrefixes, ...heads])
}
