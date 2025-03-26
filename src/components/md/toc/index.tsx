'use client'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
} from 'react'
import clsx from 'clsx'
import Island from '@/components/island'
import './index.scss'

export type TocProps = ComponentProps<'nav'>

function Nav({ className, ...props }: TocProps) {
  const [id, setId] = useState('')
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const headings = useMemo(() => {
    if (typeof document === 'undefined') return []
    const [prose] = document.getElementsByClassName('prose') || []
    return prose?.querySelectorAll('h1, h2, h3') || []
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function scroll() {
      for (const heading of Array.from(headings)) {
        const { top, bottom } = heading.getBoundingClientRect()
        if (top >= 0 && bottom <= window.innerHeight) return setId(heading.id)
      }
      for (const heading of Array.from(headings).reverse()) {
        const { bottom } = heading.getBoundingClientRect()
        if (bottom <= window.innerHeight) return setId(heading.id)
      }
    }
    if (mounted) {
      scroll() // Init
      window.addEventListener('scroll', scroll)
      return () => window.removeEventListener('scroll', scroll)
    }
  }, [headings, mounted])

  useEffect(() => {
    if (id && mounted) {
      const actives =
        ref?.current?.querySelectorAll(`li:has(> a[href="#${id}"])`) || []
      for (const active of actives) active.classList.add('active')
      const inactives =
        ref?.current?.querySelectorAll(`li:not(:has(> a[href="#${id}"]))`) || []
      for (const inactive of inactives) inactive.classList.remove('active')
    }
  }, [id, ref, mounted])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, headingId: string) => {
    e.preventDefault();
    const target = document.getElementById(headingId);

    if (target) {
      const headerOffset = 70;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY;
      const scrollPosition = targetPosition - headerOffset;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!mounted) return null;

  return (
    <div
      className="fixed top-[50%] -translate-y-[50%] right-4 cursor-pointer group z-10 flex items-center"
      ref={ref}
    >
      <nav
        className={clsx('hidden group-hover:block animate-pop-in', className)}
        {...props}
      >
        <ul className="list-none p-0 m-0">
          {Array.from(headings).map((heading) => (
            <li key={heading.id} className="m-0">
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className="text-base-content/50 hover:text-base-content no-underline truncate block font-normal"
              >
                {heading.textContent}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="animate-pop-in p-1 m-1 flex flex-col gap-1">
        {Array.from(headings).map((heading) => (
          <div
            key={heading.id}
            className={clsx('w-1 h-1 rounded-full transition-all', {
              'bg-base-content/10': heading.id !== id,
              'bg-base-content': heading.id === id,
            })}
          />
        ))}
      </div>
    </div>
  )
}

export default function Toc(props: TocProps) {
  return (
    <Island>
      <Nav {...props} />
    </Island>
  )
}
