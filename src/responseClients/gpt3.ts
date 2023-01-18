import Magic from "almostmagic"

// Environment variables
require("dotenv").config()

// ChatGPT Client
const magic = new Magic({ openaiKey: process.env["OPENAI_KEY"], usdSpent: 20 })
magic.config.specs = {
    description: "An AI assistant that answers very politely and factually, to any queries. It calls itself ChatGPT.",
    outputKeys: ["reply"]
}

const history: {
    [from_id: string]: string[]
} = {}

const say = async (from_id: string, input: string) => {
    history[from_id] = history[from_id] || []
    //@ts-ignore
    const { reply } = await magic.generate(
        { input },
        { examples: history[from_id] }
    )
    //@ts-ignore
    history[from_id].push({ input, reply })
    
    return reply as string
}

const handleMessage = async (from_id: string, prompt: string) => {
    try {
        const start = Date.now()

        // Send the prompt to the API
        console.log(`[GPT-3] Received prompt from ${from_id}: ${prompt}`)
        
        const response = await say(from_id, prompt)

        console.log(`[GPT-3] Reply to ${from_id}: ${response}`)

        const end = Date.now() - start

        console.log("[GPT-3] Took " + end + "ms")

        return response
        
    } catch (error: any) {
        console.error("An error occured", error)
        return "An error occured, please contact the administrator. (" + error.message + ")"
    }
}

export default handleMessage
