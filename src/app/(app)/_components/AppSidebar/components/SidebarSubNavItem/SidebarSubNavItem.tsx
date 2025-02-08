import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarSubNavItemProps } from "./SidebarSubNavItem.types";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const SidebarSubNavItem = ({
  title,
  url,
  isActive,
}: SidebarSubNavItemProps) => {
  const router = useRouter();

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
