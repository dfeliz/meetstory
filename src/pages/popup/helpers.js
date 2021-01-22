const urlRegex = /https?:\/\/([^\.]+\.)?meet.google.com/;

export const isGoogleMeetURL = (tabUrl) => urlRegex.test(tabUrl)
