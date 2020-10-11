import unirequest from './index.js'

export function pageList(options) {
	return unirequest({
		url: 'api/applet/pageList',
		data: options
	});
}

export function detail(options) {
	return unirequest({
		url: 'api/applet/detail',
		data: options
	});
}

export function submitAnswer(options) {
	return unirequest({
		method: 'POST',
		url: 'api/applet/submitAnswer',
		data: options
	})
}