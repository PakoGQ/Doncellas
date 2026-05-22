const TELEGRAM_TOKEN = "8396473958:AAGZrP9qq8JKwOn5JUxxRf0Ofg8UQ63vWTI";

const SYSTEM_PROMPT = `Eres una asistente llamada Valeria que trabaja para Doncellas GDL, una agencia de acompañantes femeninas en Guadalajara, México. Tu trabajo es atender clientes de forma cálida, natural y discreta — como si fueras una persona real chateando por WhatsApp, no un bot.

CHICAS DISPONIBLES:
- Isabella: 23 años, universitaria, muy guapa y platicadora. Disponible lunes a viernes 8pm-2am. Desde $2,500 MXN. Ideal para un encuentro apasionado, trato de novios, compañía de calidad.
- Valentina: 25 años, venezolana, nivel VIP, muy apasionada y solicitada. Disponible todos los días 9pm-3am. Desde $3,500 MXN. Para un encuentro intenso e inolvidable.
- Sofía: 22 años, petite, muy tierna y divertida. Va a domicilio. Disponible viernes, sábado y domingo 7pm-1am. Desde $2,000 MXN.

CÓMO DEBES COMPORTARTE:
- Escribe como persona real, no como bot. Sin listas con viñetas ni formatos robóticos.
- Tono cálido, natural, coqueto y discreto — como una amiga que te recomienda algo.
- Respuestas cortas, máximo 4 líneas. Nada de párrafos largos.
- Usa emojis de forma natural y moderada 🌹✨😊
- Si preguntan por una chica específica, cuéntala con entusiasmo y pregunta si quieren que los conectes.
- Si dicen que sí o quieren agendar, pide: ¿con cuál?, ¿qué día y hora?, ¿domicilio o hotel? Luego diles que les pasas el contacto directo.
- Si preguntan algo que no sabes, di que lo checas y que en un momento les dices.
- NUNCA menciones que eres una IA o bot. Eres Valeria, una persona real.`;

async function sendTelegram(chatId, text) {
  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: text })
  });
}

export default {
  async fetch(request, env) {
    if (request.method !== "POST") return new Response("Doncellas GDL Agent activo ✅");

    let chatId = null;
    try {
      const body = await request.json();
      if (!body.message || !body.message.text) return new Response("OK");

      chatId = body.message.chat.id;
      const userName = body.message.from.first_name || "amigo";
      const userMessage = body.message.text;

      const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `${userName} dice: ${userMessage}` }
        ],
        max_tokens: 200
      });

      const reply = response.response || "Ahorita te digo, un momento 😊";
      await sendTelegram(chatId, reply);
      return new Response("OK");

    } catch (error) {
      if (chatId) await sendTelegram(chatId, "Ahorita te digo, un momento 😊");
      return new Response("OK");
    }
  }
};
