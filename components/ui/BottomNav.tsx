"use client";

import Link from "next/link";

import {
  CarFront,
  House,
  ShieldCheck,
  UserRound
} from "lucide-react";

export default function BottomNav({
  active
}: {
  active:
    "home" |
    "rider" |
    "driver" |
    "admin";
}) {
  const items = [
    {
      id: "home",
      href: "/",
      label: "Home",
      icon: House
    },
    {
      id: "rider",
      href: "/rider",
      label: "Ride",
      icon: CarFront
    },
    {
      id: "driver",
      href: "/driver",
      label: "Drive",
      icon: UserRound
    },
    {
      id: "admin",
      href: "/admin",
      label: "Safety",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="bottomNav">
      {
        items.map(item => {
          const Icon = item.icon;

          return (
            <Link
              href={item.href}
              key={item.id}
              className={
                active === item.id
                  ? "bottomNavItem active"
                  : "bottomNavItem"
              }
            >
              <Icon size={19} />

              <span>
                {item.label}
              </span>
            </Link>
          );
        })
      }
    </div>
  );
}
