export default function useGenres() {
	const genres = ref({
		6: {
			title: 'Всі',
			value: null,
		},
		0: {
			title: 'Бойовик',
			value: 0,
		},
		1: {
			title: 'Пригоди',
			value: 1,
		},
		2: {
			title: 'Комедії',
			value: 2,
		},
		3: {
			title: 'Драма',
			value: 3,
		},
		4: {
			title: 'Жахи',
			value: 4,
		},
		5: {
			title: 'Вестерни',
			value: 5,
		},
	});
	return {
		genres,
	};
}
