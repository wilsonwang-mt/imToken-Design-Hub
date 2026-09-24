import type { ReactElement } from 'react'
// Inline stroke icons · 24 grid · stroke 1.75 · round caps · currentColor (DESIGN.md §5.6)
type Name =
  | 'team' | 'system' | 'assets' | 'projects' | 'toolbox'
  | 'arrow' | 'arrowUpRight' | 'download' | 'lock' | 'slides' | 'flow' | 'github'

const paths: Record<Name, ReactElement> = {
  team: (<><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" /><circle cx="17" cy="9" r="2.4" /><path d="M16 14.4c2.3.1 4 1.6 4.5 4.1" /></>),
  system: (<><rect x="3.5" y="3.5" width="7" height="7" rx="2" /><rect x="13.5" y="3.5" width="7" height="7" rx="3.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="3.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="2" /></>),
  assets: (<><rect x="3.5" y="4.5" width="17" height="15" rx="3" /><circle cx="9" cy="10" r="1.8" /><path d="M20.5 15.5l-4.5-4.5-8.5 8.5" /></>),
  projects: (<><path d="M4 19.5V9" /><path d="M10 19.5V4.5" /><path d="M16 19.5v-7" /><path d="M3 19.5h18" /><circle cx="16" cy="9" r="1.2" /></>),
  toolbox: (<><path d="M3.5 9.5h17v9a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" /><path d="M8.5 9.5V6.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3" /><path d="M3.5 13.5h17" /><path d="M10.5 13.5v1.5h3v-1.5" /></>),
  arrow: (<><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>),
  arrowUpRight: (<><path d="M7 17L17 7" /><path d="M8.5 7H17v8.5" /></>),
  download: (<><path d="M12 4v11" /><path d="M7 10.5l5 5 5-5" /><path d="M5 19.5h14" /></>),
  lock: (<><rect x="5" y="10.5" width="14" height="9.5" rx="2.5" /><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" /></>),
  slides: (<><rect x="3.5" y="4.5" width="17" height="12" rx="2.5" /><path d="M12 16.5v3.5" /><path d="M8.5 20h7" /><path d="M10 8.5l4 2-4 2z" /></>),
  flow: (<><circle cx="6" cy="6" r="2.2" /><circle cx="18" cy="18" r="2.2" /><path d="M8.2 6H14a3.5 3.5 0 0 1 0 7h-4a3.5 3.5 0 0 0 0 7h5.8" /></>),
  github: (<><path d="M9 19c-4 1.3-4-2-5.5-2.5M14.5 21v-3.2c0-.9.1-1.3-.5-1.9 2.2-.3 4.5-1.1 4.5-5a3.9 3.9 0 0 0-1-2.7 3.6 3.6 0 0 0-.1-2.7s-.9-.3-2.8 1a9.7 9.7 0 0 0-5 0C7.7 5.2 6.8 5.5 6.8 5.5a3.6 3.6 0 0 0-.1 2.7 3.9 3.9 0 0 0-1 2.7c0 3.9 2.3 4.7 4.5 5-.6.6-.6 1.2-.5 1.9V21" /></>),
}

export default function Icon({ name, size = 20 }: { name: Name; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}
