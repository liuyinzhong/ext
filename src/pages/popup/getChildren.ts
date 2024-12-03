function getConfigJSon() {
	return new Object({
		mode: "ECB",
		padding: "Pkcs7",
		size: 0,
		key: "",
		iv: "",
		field: ""
	});
}

export const getChildren = () => {
	return [
		{
			request: getConfigJSon(),
			response: getConfigJSon(),
			method: "GET"
		},
		{
			request: getConfigJSon(),
			response: getConfigJSon(),
			method: "POST"
		},
		{
			request: getConfigJSon(),
			response: getConfigJSon(),
			method: "PUT"
		},
		{
			request: getConfigJSon(),
			response: getConfigJSon(),
			method: "DELETE"
		}
	];
};
