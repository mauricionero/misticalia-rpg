$(document).ready(function() {

	buildMenu();
});

// monta o menu recursivamente
// se nao mandar os itens, busca como se fosse a raiz
function buildMenu (items = null) {

	let currentAdventureRoleId = Adventure.getCurrentAdventureRole();

	// se nao tem items, deduz que eh a raiz
	if (! items) {
		let items = Menu.getMenu();

		var menuContainer = $("#menu_container").html(
			$("<ul>", { id: 'menubar' }).html(
				buildMenu(items)
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

			//TODO: aceitar atributo options no menu
				// seria bom para passar filtragens e outras opcoes para as box quando abrir, daria para chamar a mesma dialog com filtros diferentes
			let options = {};

			if (this.getAttribute('single_ton')) {
				options['singleTon'] = this.getAttribute('single_ton')
			}

			Box.openDialog(this.id, this.innerHTML, options);
		});

		return;
	}

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

		if (item['roles'].includes(currentAdventureRoleId)) {

			let menuText = t(item['name']);

			// variaveis magicas
			if (item['name'] == '%ADVENTURE_NAME%') {
				menuText = Adventure.getCurrentAdventureName();
			}

			menuList.push(
				$("<li>").append(
					$("<div>", { id: item['action_id'], class: item['class'], single_ton: item['single_ton'] }).html(
						item['emoji'] + ' ' + menuText
					),
					subMenu
				)
			);
		}

	});

	return menuList;

}

// apaga o menu
function redrawMenu () {
	$('#menu_container').html('');

	buildMenu();
}
