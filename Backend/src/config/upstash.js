//We will connect our Rate limiting functionality here.
import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"
import dotenv from "dotenv"
//We will set up a ratelimit object that will take 10 request per 20 seconds

dotenv.config()
const ratelimit = new Ratelimit({
    redis:Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5,"10 s")
})

export default ratelimit;
