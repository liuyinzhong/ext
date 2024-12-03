interface typeConfigFace {
	/** 模式 */
	mode: string;
	/** 填充 */
	padding: string;
	/** 偏移量 */
	size: number;
	/** 密钥 */
	key: string;
	/** iv */
	iv: string;
	/** get请求时，用于加密入参的字段 */
	field: string;
}

interface resultFace {
	method: string;
	request: typeConfigFace;
	response: typeConfigFace;
}

export interface configsFace {
	/** 配置名称 */
	name: string;
	/** 域名 */
	http: string;
	children: Array<resultFace>;
}
