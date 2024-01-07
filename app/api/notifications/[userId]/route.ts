import { retrieveNotificationsByUserId } from "@/services/notificationService";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { userId: string } }) {
  try {
    const { userId } = route.params;
    const notifications = await retrieveNotificationsByUserId(userId);

    // In reality, we should hide notifications after they are seen
    // Ex:
    // await User.findByIdAndUpdate(userId, {
    //   $set: { hasNewNotifications: false },
    // });

    return NextResponse.json(notifications);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  route: { params: { userId: string } }
) {
  try {
    const { userId } = route.params;
    // TODO: Implement deleting notifications
    // await Notification.deleteMany({ user: userId });

    // await User.findByIdAndUpdate(
    //   userId,
    //   {
    //     $set: { hasNewNotifications: false },
    //   },
    //   { new: true }
    // );

    return NextResponse.json({ message: "Notifications deleted" });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
