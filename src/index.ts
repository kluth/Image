import app from "./app"

/* LISTENING */
const PORT = 4000
// eslint-disable-next-line no-console
app.listen(PORT, (): void => console.log(`running on port ${PORT}`))