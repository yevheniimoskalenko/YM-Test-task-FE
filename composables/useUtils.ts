export default function useUtils() {
	const plainText = (html: string) => {
		if (html) {
			return html.replace(/<[^>]+>/g, '');
		}
	};

	return {
		plainText,
	};
}
