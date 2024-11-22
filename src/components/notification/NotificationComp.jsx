import React from 'react'
import classes from "./NotificationComp.module.css";
import { format } from 'date-fns';

const NotificationComp = ({ notification }) => {
  const { date, time } = notification.scheduleTiming || {};
  const date1 = new Date(`2024-01-01T${time}`);

  const time12 = format(date1, 'hh:mm:ss a'); // 'hh' for 12-hour, 'a' for AM/PM
  console.log(time12); // Output: 08:27:00 PM

  return (
    <div className={classes.notification}>
      <h4>{notification?.title}</h4>
      <p>{notification?.description}</p>
      <p><b>Scheduled time: </b> {date && format(new Date(date), "dd/MM/yyyy")} {time12}</p>
      {/* <p><b>Created Time: </b> {notification?.createdAt && format(new Date(notification?.createdAt), "dd/MM/yyyy")}</p> */}
    </div>
  )
}

export default NotificationComp