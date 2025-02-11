import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { type SidebarSubNavItemProps } from "./SidebarSubNavItem.types";
import { usePathname, useRouter } from "next/navigation";

export const SidebarSubNavItem = ({ title, url }: SidebarSubNavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === url;

  const { setOpenMobile } = useSidebar();

  const handleNavigate = () => {
    router.push(url);
    setOpenMobile(false);
  };
  return (
    <SidebarMenuSubItem key={title}>
      <SidebarMenuSubButton isActive={isActive} onClick={handleNavigate}>
        {title}
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
};
