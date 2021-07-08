import { HiOutlineCalendar, HiOutlineChat } from "react-icons/hi"
import { FaUser, FaMoneyBillAlt } from "react-icons/fa"
import { RiDashboardLine } from "react-icons/ri"

export const routes = [
  { name: "Dashboard", href: "/", icon: RiDashboardLine },
  { name: "Categories", href: "/categories", icon: HiOutlineChat },
  { name: "Products", href: "/products", icon: HiOutlineCalendar },
  { name: "Loaners", href: "/loaners", icon: FaUser },
  { name: "Loan", href: "/Loan", icon: FaMoneyBillAlt },
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
