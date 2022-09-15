import Mock from "mockjs";

Mock.mock("/dev/app/chat/session/page", "post", (options: any) => {
	const data = Mock.mock({
		"list|10": [
			{
				id: "@id",
				nickName: "@name",
				createTime: "@datetime(yy-MM-dd HH:mm:ss)",
				text: "@cparagraph(2)",
				content() {
					return JSON.stringify({
						text: this.text,
						imageUrl: Mock.Random.image("40x40", Mock.Random.color(), "#FFF", "png"),
					});
				},
				"contentType|0-1": 0,
				avatar() {
					return Mock.Random.image(
						"40x40",
						Mock.Random.color(),
						"#FFF",
						"png",
						this.nickName[0]
					);
				},
			},
		],
	});

	return {
		code: 1000,
		data: {
			list: data.list,
			pagination: {},
		},
	};
});
