// import { FaIntercom, FaJira, FaSlack } from "react-icons/fa"
import { HiOutlineCalendar, HiOutlineChat, HiOutlineFolder } from "react-icons/hi"
import { RiDashboardLine } from "react-icons/ri"
import { BiBasket } from "react-icons/bi"

export const routes = [
  { name: "Dashboard", href: "/", icon: RiDashboardLine },
  { name: "Categories", href: "/categories", icon: HiOutlineChat },
  { name: "Products", href: "/products", icon: HiOutlineCalendar },
  { name: "Loaners", href: "/loaners", icon: HiOutlineFolder },
  { name: "Store", href: "/store", icon: BiBasket },
]

export const integrations = [
  // {
  //   name: "Jira",
  //   scheme: "telegram",
  //   icon: FaJira,
  // },
  // {
  //   name: "Slack",
  //   scheme: "orange",
  //   icon: FaSlack,
  // },
  // {
  //   name: "Intercom",
  //   scheme: "blue",
  //   icon: FaIntercom,
  // },
]
