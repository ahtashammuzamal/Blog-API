export const isValidUpdate = (allowedUpdates, body) => {
  const updates = Object.keys(body);
  return updates.every((update) => allowedUpdates.includes(update));
};
