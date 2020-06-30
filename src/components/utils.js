
export const composeEmail = (recipients, subject, body, user) => {
    const intro = user && user.name && user.location ? `My name is ${user.name}. I am a resident of ${user.location} and ` : ""
    const signature = user && user.name ?
    `Sincerely, ${user.name}` :
    'Thank You.'
    const fullBody = `${intro}${body}
    ${signature}`
    const toField = recipients ? recipients.join(", ") : ""
    return {toField, subject, fullBody}
}
