import { Hono } from "hono"
import { ronin, type Bindings, type Variables } from "hono-ronin"
import { cors } from "hono/cors"

const app = new Hono<{
	Bindings: Bindings
	Variables: Variables
}>()
	.use("*", ronin(), cors())
	.get("/", async (c) => {
		const { get } = c.var.ronin
		const [airdrops, ads, global] = await Promise.all([
			get.airdrops(),
			get.ads(),
			get.global(),
		])
		return c.json({ airdrops, ads, global })
	})
	.post("/wallet-connected", async (c) => {
		const { create, get, set } = c.var.ronin
		const walletAddress = c.req.query("wallet-address")
		const telegramId = c.req.query("telegram-id")
		console.log(walletAddress, "wallet address")
		console.log(telegramId, "telegram id")
		if (!walletAddress || !telegramId) {
			throw new Error("Missing wallet address or telegram id")
		}
		let user = await get.user.with({
			telegramId,
		})
		if (!user) {
			user = await create.user.with({
				telegramId,
			})
		}

		await create.connection.with({
			walletAddress,
			user: user.id,
		})
		return c.json({ walletAddress })
	})

export default app
export type AppType = typeof app
