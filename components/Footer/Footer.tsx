import Link from 'next/link'
import FacebookIcon from '@/components/Icon/FacebookIcon'
import Icon from '@/components/Icon/Icon'
import InstagramIcon from '@/components/Icon/InstagramIcon'
import Logo from '@/components/Logo/Logo'
import type { SiteSettings } from '@/lib/cms/types'

export default function Footer({ site }: { site: SiteSettings }) {
  return (
    <footer className="bg-navy">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm sm:col-span-2 lg:col-span-1">
          <Logo inverted />
          <p className="mt-6 text-sm/6 text-white/60">{site.claim}. Fußball, Handball, Tanzen und Turnen für alle Generationen.</p>
          <address className="mt-6 space-y-2 text-sm/6 text-white/80 not-italic">
            <p className="flex gap-2">
              <Icon name="location_on" className="mt-0.5 size-5 shrink-0 text-white/40" />
              <span>
                {site.legalName}
                <br />
                {site.address.street}, {site.address.zip} {site.address.city}
              </span>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="flex gap-2 transition-colors hover:text-white">
                <Icon name="mail" className="size-5 shrink-0 text-white/40" />
                {site.email}
              </a>
            </p>
          </address>
          <ul className="mt-6 flex gap-3">
            {site.socials.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  className="flex size-10 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
                >
                  <span className="sr-only">{social.platform === 'instagram' ? 'Instagram' : 'Facebook'}</span>
                  {social.platform === 'instagram' ? <InstagramIcon className="size-5" /> : <FacebookIcon className="size-5" />}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {site.footerLinks.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="text-xs font-semibold tracking-[0.25em] text-white/50 uppercase">{column.title}</p>
            <ul className="mt-4 space-y-3 text-sm/6">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-white/70 transition-colors hover:text-white">
                      {link.label}
                      <Icon name="open_in_new" className="size-3.5" />
                    </a>
                  ) : (
                    <Link href={link.href} className="text-white/70 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm/6 text-white/50 sm:flex-row sm:justify-between lg:px-8">
          <p>
            &copy; {site.legalName} · {site.hashtag}
          </p>
          <ul className="flex gap-6">
            {site.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
