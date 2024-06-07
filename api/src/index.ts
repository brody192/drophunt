import { Hono } from "hono"
import { ronin, type Bindings, type Variables } from "hono-ronin"
// import "@ronin/drophunt"

const app = new Hono<{
	Bindings: Bindings
	Variables: Variables
}>()

app.use("*", ronin())

app.get("/", async (c) => {
	const { get } = c.var.ronin

	const [airdrops, ads, global] = await Promise.all([
		get.airdrops(),
		get.ads(),
		get.global(),
	])
	airdrops.map((airdrop) => {
		console.log(airdrop.name)
	})
	return c.json({ airdrops, ads, global })
})

// export type homeGetReturn = typeof

export default app
