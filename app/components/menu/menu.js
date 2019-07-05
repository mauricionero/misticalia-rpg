$(document).ready(function() {

	var menu = Menu.getMenu();

	var menuContainer = $("#menu_container").html(
		$("<ul>", { id: 'menubar' }).html(
			buildMenu(menu)
		)
	);

	$('#menubar').menu({
		position: { my: 'left top', at: 'left bottom' },
		blur: function() {
			$(this).menu('option', 'position', { my: 'left top', at: 'left bottom' });
		},
		focus: function(e, ui) {
			if ($('#menubar').get(0) !== $(ui).get(0).item.parent().get(0)) {
				$(this).menu('option', 'position', { my: 'left top', at: 'right top' });
			}
		},
	});

	$(".open_box").click(function() {

		let options = {}

		if (this.getAttribute('single_ton')) {
			options['singleTon'] = this.getAttribute('single_ton')
		}

		Box.openDialog(this.id, this.innerHTML, options);
	});
});

// recursivo
function buildMenu (items) {

	var menuList = [];

	items.forEach(function (item) {

		let subMenu = '';

		// verificar se tem filhos
		if (item['items'].length >= 1) {

			// criar um novo menu e chamar novamente essa funcao recursiva
			subMenu = $("<ul>").html(
				buildMenu(item['items'])
			);
		}

		menuList.push(
			$("<li>").append(
				$("<div>", { id: item['action_id'], class: item['class'], single_ton: item['single_ton'] }).html(
					item['emoji'] + ' ' + t(item['name'])
				),
				subMenu
			)
		);

	});

	return menuList;

}
