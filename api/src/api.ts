import { Hono } from "hono"
import { ronin, type Bindings, type Variables } from "hono-ronin"
import { cors } from "hono/cors"
import { bearerAuth } from "hono/bearer-auth"

const token = "secret"

const app = new Hono<{
	Bindings: Bindings
	Variables: Variables
}>()
	.use("*", ronin(), cors(), bearerAuth({ token }))
	.get("/", async (c) => {
		const { get } = c.var.ronin
		const [airdrops, ads, global] = await Promise.all([
			get.airdrops(),
			get.ads(),
			get.global(),
		])
		return c.json({ airdrops, ads, global })
	})
	.post("/wallet", async (c) => {
		const { create, get } = c.var.ronin
		const { walletAddress, telegramId, telegramUsername } = await c.req.json()
		console.log(walletAddress, "wallet address")
		console.log(telegramId, "telegram id")
		console.log(telegramUsername, "telegram username")
		if (!walletAddress || !telegramId || !telegramUsername) {
			throw new Error("Missing wallet address or telegram id")
		}
		let user = await get.user.with({
			telegramId,
		})
		if (!user) {
			user = await create.user.with({
				telegramId,
				telegramUsername,
			})
		}
		await create.connection.with({
			walletAddress,
			user: user.id,
		})
		return c.json({ walletAddress })
	})
	.onError((err, c) => {
		console.error(err.stack)
		return c.json(err)
	})

export default app
export type AppType = typeof app
