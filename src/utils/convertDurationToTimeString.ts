export const convertDurationToTimeString = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const secondes = duration % 60;

  const finalTime = [hours, minutes, secondes]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");

  return finalTime;
};
