"use client"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="pt-8 pb-16 border-t">
      <div className="max-w-[1100px] px-4 mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-left opacity-70">
            <h3 className="text-xl font-bold">Bucket CMS</h3>
            <p className="text-sm">Simplify Content Management</p>
          </div>
          <div className="text-right">
            <p className="text-sm">© {new Date().getFullYear()} Bucket CMS</p>
          </div>
        </div>
        <div className="py-4">
          <Link className="text-blue-600" href="/terms">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
