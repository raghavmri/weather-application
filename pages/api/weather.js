import axios from 'axios';
export default async function handler(req, res) {
	try {
		const { city, lat, lon } = req.query;
		if (!city && !lat && !lon) throw new Error('Missing city, lat or long');
		let params = {};
		params.appid = process.env.OPENWEATHERMAP_API;
		if (city) params.q = city;
		if (lat && lon) params = { ...params, lat, lon };

		const { data } = await axios.get(
			'https://api.openweathermap.org/data/2.5/weather',
			{
				params: params,
			}
		);
		res.json(data);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
}
