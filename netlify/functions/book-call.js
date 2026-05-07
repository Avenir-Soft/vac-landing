const TELEGRAM_BOT_TOKEN =
	process.env.TELEGRAM_BOT_TOKEN ||
	'8244935192:AAFf57K5C7lrrPyWLKU6xjE021nLlVlk15s'
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-1003652371972'

const json = (statusCode, body) => ({
	statusCode,
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(body),
})

exports.handler = async event => {
	if (event.httpMethod !== 'POST') {
		return json(405, { error: 'Method not allowed' })
	}

	try {
		const { name, phone } = JSON.parse(event.body || '{}')
		const cleanName = String(name || '').trim()
		const cleanPhone = String(phone || '').trim()

		if (!cleanName || !cleanPhone) {
			return json(400, { error: 'Name and phone are required' })
		}

		const date = new Date().toLocaleString('ru-RU', {
			timeZone: 'Asia/Tashkent',
		})
		const text = [
			'Новая заявка на звонок',
			`Имя: ${cleanName}`,
			`Телефон: ${cleanPhone}`,
			`Дата: ${date}`,
			'Сайт: vac.uz',
		].join('\n')

		const response = await fetch(
			`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chat_id: TELEGRAM_CHAT_ID,
					text,
				}),
			}
		)
		const result = await response.json()

		if (!response.ok || !result.ok) {
			console.error('Telegram error:', result)
			return json(502, { error: 'Telegram request failed' })
		}

		return json(200, { ok: true })
	} catch (error) {
		console.error('Book call error:', error)
		return json(500, { error: 'Unable to send request' })
	}
}
