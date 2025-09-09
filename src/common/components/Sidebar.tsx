import { useLocation, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Theme,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { getIconComponent, menuConfig, permissions } from "@/core/route";
import { useState } from "react";
import { Role } from "../interface";

// Define the Sidebar component
const Sidebar = ({ roles, theme }: { roles: Role[] | null; theme: Theme }) => {
  // Get the current location using the useLocation hook
  const location = useLocation();

  // Get the navigate function using the useNavigate hook
  const navigate = useNavigate();

  // Initialize the openSubmenus state with an empty object
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  // Define a function to toggle the open state of a submenu
  const handleToggle = (label: string) => {
    // Update the openSubmenus state by toggling the value for the given label
    setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // Get the list of roles assigned to the user
  const userRoleNames = roles?.map((role) => role.name) || [];
  // Get allowed routes based on the user's roles (check if any of the user's roles match the permission roles)
  const allowedRoutes = userRoleNames.flatMap(
    (roleName) => permissions[roleName] || [],
  );

  // Remove duplicates (if a user has multiple roles with access to the same route)
  const uniqueAllowedRoutes = Array.from(new Set(allowedRoutes));

  // Define a function to render a single menu item
  const renderMenuItem = (menu: (typeof menuConfig)[0]) => {
    // Check if the menu item has children
    const hasChildren = menu.children && menu.children.length > 0;

    // Check if the current location matches the menu item's path
    const isActive = location.pathname.startsWith(menu.path);

    // Skip menu items that the user does not have permission to access
    if (!uniqueAllowedRoutes.includes(menu.key)) {
      return null;
    }

    // Return the rendered menu item
    return (
      <div key={menu.label}>
        {/* Render a ListItem component with disablePadding */}
        <ListItem disablePadding>
          {/* Render a ListItemButton component with an onClick handler */}
          <ListItemButton
            // Call the handleToggle function if the menu item has children, otherwise navigate to the menu item's path
            onClick={() =>
              hasChildren ? handleToggle(menu.label) : navigate(menu.path)
            }
            // Set the background color based on whether the menu item is active
            style={{
              backgroundColor: isActive
                ? theme.palette.action.selected
                : "transparent",
            }}
          >
            {/* Render a ListItemIcon component with the menu item's icon */}
            <ListItemIcon>
              {getIconComponent(menu.iconKey, isActive, theme)}
            </ListItemIcon>
            {/* Render a ListItemText component with the menu item's label */}
            <ListItemText
              primary={menu.label}
              // Set the text color based on whether the menu item is active
              style={{
                color: isActive
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
              }}
            />
            {/* Render an ExpandLess or ExpandMore icon if the menu item has children */}
            {hasChildren ? (
              openSubmenus[menu.label] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : null}
          </ListItemButton>
        </ListItem>
        {/* Render a Collapse component with the submenu if the menu item has children */}
        {hasChildren && (
          <Collapse in={openSubmenus[menu.label]} timeout="auto" unmountOnExit>
            {/* Render a List component with the submenu items */}
            <List component="div" disablePadding>
              {/* Map over the submenu items and render each one */}
              {menu.children?.map((child) => {
                // Check if the current location matches the submenu item's path
                const isChildActive = location.pathname === child.path;

                // Return the rendered submenu item
                return (
                  // Render a ListItemButton component with an onClick handler
                  <ListItemButton
                    key={child.label}
                    // Add some padding to the left of the submenu item
                    sx={{ pl: 4 }}
                    // Navigate to the submenu item's path when clicked
                    onClick={() => navigate(child.path)}
                    // Set the background color based on whether the submenu item is active
                    style={{
                      backgroundColor: isChildActive
                        ? theme.palette.action.selected
                        : "transparent",
                    }}
                  >
                    {/* Render a ListItemIcon component with the submenu item's icon */}
                    <ListItemIcon>
                      {getIconComponent(child.iconKey, isChildActive, theme)}
                    </ListItemIcon>
                    {/* Render a ListItemText component with the submenu item's label */}
                    <ListItemText
                      primary={child.label}
                      // Set the text color based on whether the submenu item is active
                      style={{
                        color: isChildActive
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        )}
      </div>
    );
  };

  // Return the rendered Sidebar component
  return (
    // Render a List component with the menu items
    <List>
      {/* Map over the menuConfig array and render each menu item */}
      {menuConfig.map((menu, index) =>
        menu.label === "Master Data" || menu.label === "Area" ? (
          <div key={`${menu.label}-${index}`}>
            {renderMenuItem(menu)}
            <Divider /> {/* Divider after Master Data */}
          </div>
        ) : (
          renderMenuItem(menu)
        ),
      )}
    </List>
  );
};

// Export the Sidebar component as the default export
export default Sidebar;
