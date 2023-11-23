export { default } from "next-auth/middleware"

export const config = { matcher: ["/", "/repositories", "/dashboard", "/workflow", "/benchmark", "/team", "/register/team"] }