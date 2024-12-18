"use client";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
    ShoppingBag,
    Mail,
    UserCog,
    Shield,
    Smartphone,
    HardDrive,
    Cog,
    Package,
    Clapperboard,
    ChartNoAxesCombined,
    MessageCircleMore,
    Bot,
    ChevronRight,
    Store,
    SquareTerminal,
} from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

interface NavbarProps {
    storeId: string;
}

const Navbar: React.FC<NavbarProps> = ({ storeId }) => {
    const pathname = usePathname();
    if (!pathname) return null;

    const data = {
        navMain: [
            {
                title: "商店",
                url: "#",
                icon: Store,
                isActive: pathname.startsWith(`/home`),
                items: [
                    {
                        url: `/home`,
                        title: "商店首页",
                        icon: ShoppingBag,
                    }
                ],
            },
            {
                title: "商店管理系统",
                url: "",
                icon: SquareTerminal,
                isActive: pathname.startsWith(`/store/${storeId}`),
                items: [
                    {
                        title: "概述",
                        url: `/store/${storeId}`,
                        icon: ChartNoAxesCombined,
                    },
                    {
                        title: "广告",
                        url: `/store/${storeId}/billboards`,
                        icon: Clapperboard,
                    },
                    {
                        title: "产品",
                        url: `/store/${storeId}/products`,
                        icon: Store,
                    },
                    {
                        title: "订单",
                        url: `/store/${storeId}/orders`,
                        icon: Package,
                    },
                    {
                        title: "设置",
                        url: `/store/${storeId}/settings`,
                        icon: Cog,
                    },
                ],
            },
            {
                title: "消息",
                url: "#",
                icon: Mail,
                isActive: pathname.startsWith(`/home/${storeId}/conversations`),
                items: [
                    {
                        title: "个人消息",
                        url: `/home/${storeId}/conversations`,
                        icon: MessageCircleMore,
                    },
                ],
            },
            {
                title: "用户管理系统",
                url: "",
                icon: Bot,
                isActive:
                    pathname === `/user/${storeId}/server` ||
                    pathname === `/user/${storeId}/client` ||
                    pathname === `/user/${storeId}/admin` ||
                    pathname === `/user/${storeId}/settings`,
                items: [
                    {
                        title: "服务器",
                        url: `/user/${storeId}/server`,
                        icon: HardDrive,
                    },
                    {
                        title: "终端",
                        url: `/user/${storeId}/client`,
                        icon: Smartphone,
                    },
                    {
                        title: "管理员",
                        url: `/user/${storeId}/admin`,
                        icon: Shield,
                    },
                    {
                        title: "设置",
                        url: `/user/${storeId}/settings`,
                        icon: UserCog,
                    },
                ],
            },
        ],
    };

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>目录</SidebarGroupLabel>
                <SidebarMenu>
                    {data.navMain.map((item) => (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={item.isActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span className="text-base font-medium tracking-wider">
                                            {item.title}
                                        </span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items && Array.isArray(item.items) ? (
                                            item.items.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <a href={subItem.url}>
                                                            {subItem.icon && <subItem.icon className="mr-2" />}
                                                            <span className="font-medium tracking-wider">
                                                                {subItem.title}
                                                            </span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))
                                        ) : null}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
    );
};

export default Navbar;
