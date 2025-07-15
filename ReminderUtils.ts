// ReminderUtils.ts

import notifee, {
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';
import { Platform, PermissionsAndroid } from 'react-native';

// ✅ Ask for notification permission (required on Android 13+)
export async function requestPermissions() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // iOS handles internally
}

// ✅ Schedule a daily notification reminder (e.g., 9:00 PM)
export async function scheduleDailyReminder(hour: number, minute: number) {
  const now = new Date();
  const triggerTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    0
  );

  if (triggerTime <= now) {
    // If the time has already passed today, schedule for tomorrow
    triggerTime.setDate(triggerTime.getDate() + 1);
  }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: triggerTime.getTime(),
    repeatFrequency: RepeatFrequency.DAILY,
    alarmManager: true, // important for Android background delivery
  };

  await notifee.createTriggerNotification(
    {
      title: '📘 Daily Formula Reminder',
      body: 'Time to review your flashcards!',
      android: {
        channelId: 'default',
        pressAction: { id: 'default' },
      },
    },
    trigger
  );
}
