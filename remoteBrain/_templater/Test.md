# Today's Events

<%*
let agenda = await tp.user.gcalcli()
let split = agenda.split("\n")
tR += split.map(i => {
 const date = i.match(/([0-9]*\:[0-9]*)\s/gi)
 const event = i.match(/(\[\[)?[A-Z].*/gi)
if (date && event) {
  const formattedDate = date[0].replace(/([0-9]*):([0-9]*)/, (_, 
hours, minutes) => {
    const meridiem = Number(hours) < 12 ? "am" : "pm"
    const formattedHours = Number(hours) % 12 || 12
    return `${formattedHours}:${minutes}${meridiem}`
  })
  const formattedEvent = event[0].replace(/[\[\]\/\|]/g, "-")
  return `- ${formattedDate} [[${formattedEvent}]]`
}
}).join('\n')
%>