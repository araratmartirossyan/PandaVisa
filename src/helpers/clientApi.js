/* eslint-disable */
const clientApi = (url) => {
	const ref = wilddog.sync()
	return ref.ref(url)
}

export {
  clientApi
}
