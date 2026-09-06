import Link from "next/link";

export default function Nav({
  active = "home"
}: {
  active?: string;
}) {
  const links = [
    ["home", "/", "Home"],
    ["rider", "/rider", "Rider"],
    ["driver", "/driver", "Driver"],
    ["admin", "/admin", "Admin"]
  ];

  return (
    <header className="nav">

      <Link href="/" className="brand">
        <div className="logo">R</div>

        <div>
          <div className="brandName">
            RideFi
          </div>

          <div className="brandSub">
            Move cheaper. Earn more.
          </div>
        </div>
      </Link>

      <nav className="navLinks">
        {links.map(
          ([key, href, label]) => (
            <Link
              key={key}
              href={href}
              className={
                active === key
                  ? "navPill active"
                  : "navPill"
              }
            >
              {label}
            </Link>
          )
        )}
      </nav>

    </header>
  );
}
