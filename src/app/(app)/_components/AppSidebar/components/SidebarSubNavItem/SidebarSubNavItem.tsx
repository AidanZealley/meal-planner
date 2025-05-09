import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { type SidebarSubNavItemProps } from "./SidebarSubNavItem.types";
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
      <SidebarMenuSubButton
        isActive={isActive}
        onClick={handleNavigate}
        className="cursor-default"
      >
        {title}
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
};
