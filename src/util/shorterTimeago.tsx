export const shorterTimeago = (timeagoString: string): string => {
  if(
    ["second", "minute", "hour", "just now", "right now"]
    .some(x => timeagoString.includes(x))
  ) {
    return timeagoString
      .replace(" ", "")
      .replace("seconds", "s")
      .replace("second", "s")
      .replace("minutes", "m")
      .replace("minute", "m")
      .replace("hours", "h")
      .replace("hour", "h")
      .replace("justnow", "just now")
      .replace("rightnow", "right now")
  }
  else return ""
}