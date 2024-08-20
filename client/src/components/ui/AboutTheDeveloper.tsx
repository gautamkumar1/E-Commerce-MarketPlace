
import Link from "next/link"
import myIMage from "../../../public/My Image Pic for website.jpg"
import { BorderBeam } from "../magicui/border-beam"
export default function AboutTheDeveloper() {
  return (
    <div className="bg-background text-foreground">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-4 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col items-start justify-center space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">About the Developer</div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Gautam Kumar</h1>
              <h2 className="text-xl font-semibold text-muted-foreground">Full-Stack Developer</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              Gautam is a passionate full-stack developer who built this website entirely by himself, handling the backend, frontend, and design. He is dedicated to creating innovative and user-friendly solutions that drive business success.
              </p>
              <div className="flex gap-4">
                <Link
                  href="https://github.com/gautamkumar1"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <GitlabIcon className="mr-2 h-5 w-5" />
                  GitHub
                </Link>
                <Link
                  href="https://www.linkedin.com/in/gautamkum4r/"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <LinkedinIcon className="mr-2 h-5 w-5" />
                  LinkedIn
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
  <img
    src={myIMage.src}
    width="400"
    height="400"
    alt="Gautam Kumar"
    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
  />
  
</div>

          </div>
        </div>
      </section>
    </div>
  )
}

function GitlabIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
    </svg>
  )
}


function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}