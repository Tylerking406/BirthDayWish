// NotificationIcon.js (example)
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, IconButton } from '@mui/material';
import { useNotification } from '../context/NotificationContext.js'; // Import Notification Context

const NotificationIcon = () => {
  const { notificationCount } = useNotification(); // Get notification count from context

  return (
    <IconButton color="inherit">
      <Badge badgeContent={notificationCount} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

export default NotificationIcon;
