class Background extends RModel {

	static get EMOJI_MAIN () { return '📜' }
	static get EMOJI_LIST () { return '📜' }
	static get EMOJI_LIST_GLOBAL () { return '🌎📜' }
	static get EMOJI_VISUALIZE () { return '👁️' }

	static get EMOJI_NAME () { return '🏷' }
	static get EMOJI_DESCRIPTION () { return '📄' }
	static get EMOJI_RULE () { return '📃' }

	static get EMOJI_TEMPORARY_MODIFIER () { return '⌛' }
	static get EMOJI_TOTAL_POINTS () { return '💯' }

	// traduções dos campos
	static get fieldTranslations () {
		return {
			'name': t('Nome')
		}
	}

	// validações dessa model
	validations () {
		return {
			'name': {
				'uniqueness': {
					'scope': [ 'currentAdventureId' ]
				},
				'mandatory': true
			}
		}
	}

	// retornar de forma estatica todos os dados no getAll padrao da RModel
	// aqui sao todas as perícias sugeridas e globais
	static getStaticAll () {
		return [
			{
				id: 1,
				isGlobal: true,
				name: t('Contatos'),
				description: t('')
			},
			{
				id: 2,
				isGlobal: true,
				name: t('Fama'),
				description: t('')
			},
			{
				id: 3,
				isGlobal: true,
				name: t('Aliados'),
				description: t('')
			},
			{
				id: 4,
				isGlobal: true,
				name: t('Recursos'),
				description: t('')
			}
		];
	}

	// retornar todos os antecedentes
	static getAllBackgrounds (options = {}) {
		let backgrounds = this.getAll(options); 

		return backgrounds;
	}

	// retornar 1 antecedente pelo id
	static getBackground (backgroundId) {
		let options = { 'filters': { id: backgroundId } };

		let backgrounds = this.getAll(options);

		return backgrounds[0];
	}

	// setup de antecedentes, carregar as globais no local
	static setup () {
		console.log('Criando antecedentes...'); // deixar esse console.log

		let allBackgrounds = Background.getStaticAll();

		// criar pericias baseadas nas globais e salvar no local
		allBackgrounds.forEach(function (background) {

			let backgroundId = background['id'];

			let backgroundName = background['name'];
			let backgroundDescription = background['description'];
			let backgroundRule = background['rule'];

			let localBackground = new Background({
				'name': backgroundName,
				'description': backgroundDescription,
				'rule': backgroundRule,
				'isGlobal': false
			});

			localBackground.saveBackground();
		});
		console.log('Finalizado criação de antecedentes iniciais'); // deixar esse console.log
	}


	// salvar a pericia (editar ou criar uma nova)
	saveBackground () {

		return this.save();
	}
}

RModel.models['Background'] = Background;
