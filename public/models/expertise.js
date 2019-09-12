class Expertise extends RModel {

	static get EMOJI_MAIN () { return '🏅' }
	static get EMOJI_LIST () { return '🏅' }
	static get EMOJI_LIST_GLOBAL () { return '🌎🏅' }
	static get EMOJI_VISUALIZE () { return '👁️' }

	static get EMOJI_ATTRIBUTE () { return Player.EMOJI_ATTRIBUTE }
	static get EMOJI_NAME () { return '🏷' }
	static get EMOJI_MULTIPLIER () { return '❌' }
	static get EMOJI_DESCRIPTION () { return '📄' }
	static get EMOJI_RULE () { return '📃' }

	static get EMOJI_TEMPORARY_MODIFIER () { return '⌛' }
	static get EMOJI_TOTAL_POINTS () { return '💯' }

	// traduções dos campos
	static get fieldTranslations () {
		return {
			'name': t('Nome'),
			'multiplier': t('Multiplicador')
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
			},
			'multiplier': {
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
				attributeId: Modifier.DEXTERY,
				multiplier: 0.2,
				name: t('Acrobacia'),
				description: t('')
			},
			{
				id: 2,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				multiplier: 0.2,
				name: t('Furtividade'),
				description: t('')
			},
			{
				id: 3,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				multiplier: 0.5,
				name: t('Cavalgar'),
				description: t('')
			},
			{
				id: 4,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				multiplier: 0.4,
				name: t('Pilotar'),
				description: t('')
			},
			{
				id: 5,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				multiplier: 0.2,
				name: t('Ladinagem'),
				description: t('')
			},
			{
				id: 6,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				multiplier: 0.3,
				name: t('Armas brancas'),
				description: t('')
			},
			{
				id: 7,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				multiplier: 0.3,
				name: t('Armas de fogo'),
				description: t('')
			},
			{
				id: 8,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				multiplier: 0.5,
				name: t('Abrir fechadura'),
				description: t('')
			},
			{
				id: 9,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				multiplier: 0.2,
				name: t('Atletismo'),
				description: t('')
			},

			{
				id: 10,
				isGlobal: true,
				attributeId: Modifier.AGILITY,
				multiplier: 0.3,
				name: t('Iniciativa'),
				description: t('')
			},
			{
				id: 11,
				isGlobal: true,
				attributeId: Modifier.AGILITY,
				multiplier: 0.4,
				name: t('Stress motivador'),
				description: t('Verificar o quanto consegue de bônus de agilidade em situações de stress.'),
				rule: t('Será feito um teste de chance multiplicando com esse modificador para ver o quanto de bônus de agilidade é dado, podendo ser negativo também o resultado. Irá aumentar o desempenho, ou simplesmente travar de vez se falhar no teste')
			},

			{
				id: 12,
				isGlobal: true,
				attributeId: Modifier.CONSTITUTION,
				multiplier: 0.6,
				name: t('Último suspiro'),
				description: t('Verificar se consegue ter uma última ação rápida ao zerar sua vida de alguma forma heróica (e que seja possível a ação escolhida)')
			},

			{
				id: 13,
				isGlobal: true,
				attributeId: Modifier.INTELIGENCE,
				multiplier: 0.2,
				name: t('Relacionar informações'),
				description: t('')
			},
			{
				id: 14,
				isGlobal: true,
				attributeId: Modifier.INTELIGENCE,
				multiplier: 0.2,
				name: t('Investigação'),
				description: t('')
			},
			{
				id: 15,
				isGlobal: true,
				attributeId: Modifier.INTELIGENCE,
				multiplier: 0.2,
				name: t('Ofício'),
				description: t('')
			},
			{
				id: 16,
				isGlobal: true,
				attributeId: Modifier.INTELIGENCE,
				multiplier: 0.2,
				name: t('Conhecimentos gerais'),
				description: t('')
			},
			{
				id: 17,
				isGlobal: true,
				attributeId: Modifier.INTELIGENCE,
				multiplier: 0.3,
				name: t('Natureza'),
				description: t('')
			},
			{
				id: 18,
				isGlobal: true,
				attributeId: Modifier.INTELIGENCE,
				multiplier: 0.3,
				name: t('História'),
				description: t(''),
				rule: t('Pode incluir conhecimento sobre mágias inclusive, pois isso está em livros e é possível de ser pesquisado.')
			},
			{
				id: 19,
				isGlobal: true,
				attributeId: Modifier.INTELIGENCE,
				multiplier: 0.3,
				name: t('Geografia'),
				description: t('')
			},

			{
				id: 20,
				isGlobal: true,
				attributeId: Modifier.WISDOM,
				multiplier: 0.2,
				name: t('Intuição'),
				description: t('')
			},
			{
				id: 21,
				isGlobal: true,
				attributeId: Modifier.WISDOM,
				multiplier: 0.2,
				name: t('Sobrevivência'),
				description: t('')
			},
			{
				id: 22,
				isGlobal: true,
				attributeId: Modifier.WISDOM,
				multiplier: 0.3,
				name: t('Cura'),
				description: t('Habilidade de se curar, ou curar alguém com primeiros socorros apenas para estabilizar até um socorro melhor.')
			},
			{
				id: 23,
				isGlobal: true,
				attributeId: Modifier.WISDOM,
				multiplier: 0.2,
				name: t('Percepção'),
				description: t('')
			},
			{
				id: 24,
				isGlobal: true,
				attributeId: Modifier.WISDOM,
				multiplier: 0.2,
				name: t('Religião'),
				description: t('')
			},
			{
				id: 25,
				attributeId: Modifier.WISDOM,
				multiplier: 0.2,
				name: t('Animais'),
				description: t('')
			},

			{
				id: 26,
				isGlobal: true,
				attributeId: Modifier.CHARISMA,
				multiplier: 0.2,
				name: t('Atuação'),
				description: t('Teatro, fingir algo, se passar por alguém...')
			},
			{
				id: 27,
				isGlobal: true,
				attributeId: Modifier.CHARISMA,
				multiplier: 0.2,
				name: t('Lábia'),
				description: t('Obter informações, convencer pessoas, mentir...')
			},
			{
				id: 28,
				isGlobal: true,
				attributeId: Modifier.CHARISMA,
				multiplier: 0.2,
				name: t('Intimidação'),
				description: t('')
			},

			{
				id: 29,
				isGlobal: true,
				attributeId: Modifier.MAGIC,
				multiplier: 0.2,
				name: t('Sentir magia'),
				description: t('Sentir poderes mágicos ao redor e definir o seu tipo')
			},
			{
				id: 30,
				isGlobal: true,
				attributeId: Modifier.MAGIC,
				multiplier: 0.2,
				name: t('Energia'),
				description: t('Fogo, eletricidade, temperatura... Tudo que envolva energia sem movimento de materia')
			},
			{
				id: 31,
				isGlobal: true,
				attributeId: Modifier.MAGIC,
				multiplier: 0.2,
				name: t('Materia'),
				description: t('Controlar a materia, seu movimento, sua organização')
			},
			{
				id: 32,
				isGlobal: true,
				attributeId: Modifier.MAGIC,
				multiplier: 0.2,
				name: t('Dimensional'),
				description: t('Perceber e atuar em outras dimensões. Essa é a que mais exige poderes de todas')
			},
			{
				id: 33,
				isGlobal: true,
				attributeId: Modifier.MAGIC,
				multiplier: 0.2,
				name: t('Mente'),
				description: t('Ler e até mesmo controlar mentes. Controlar mentes exige muito esforço, poder e treino.')
			},

			{
				id: 34,
				isGlobal: true,
				attributeId: Modifier.SANITY,
				multiplier: 0.2,
				name: t('Resistência ao assustador'),
				description: t('Ter mais auto controle sobre o que te assusta.'),
				rule: t('Diminui ou anula a perda de sanidade em situações que se perderia a sanidade. Diminui penalidade de amedrontamento. Não funciona para intimidação.')
			},
			{
				id: 35,
				isGlobal: true,
				attributeId: Modifier.SANITY,
				multiplier: 0.2,
				name: t('Auto controle'),
				description: t('Não perder a paciência ou se entusiasmar demais com algo que poderia prejudicar a razão.'),
				rule: t('Ajuda contra intimidação e provocações. Ajuda também contra não se entusiasmar demais com alguma oferta boa demais que possa ser uma enganação')
			},
			{
				id: 36,
				isGlobal: true,
				attributeId: Modifier.SANITY,
				multiplier: 0.2,
				name: t('Concentração'),
				description: t('Ajuda a fazer algo de concentração mais rápido. Aumenta o foco')
			},
			{
				id: 37,
				isGlobal: true,
				attributeId: Modifier.SANITY,
				multiplier: 0.2,
				name: t('Auto ajuda'),
				description: t('Em situações desanimadoras, consegue manter mais a calma e até se animar a continuar tentando algo'),
				rule: t('Diminui as penalidades de re-teste')
			},

			{
				id: 38,
				isGlobal: true,
				attributeId: Modifier.CHARISMA,
				multiplier: 0.2,
				name: t('Liderança'),
				description: t('Os outros sentem em você um senso de liderança'),
				rule: t('')
			},
			{
				id: 39,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				multiplier: 0.2,
				name: t('Briga'),
				description: t('Habilidade de se sair bem em uma briga.')
			},
		];
	}

	// retornar todas as expertises
	static getAllExpertises (options = {}) {
		let expertises = this.getAll(options);

		return expertises;
	}

	// retornar 1 expertise pelo id
	static getExpertise (expertiseId) {
		let options = { 'filters': { id: expertiseId } };

		let expertises = this.getAll(options);

		// se nao achou, procurar nos estáticos
		if (expertises.length == 0) {
			expertises = Expertise.getAllStatic(options);
		}

		return expertises[0];
	}

	// pegar todos os atributos utilizados pelas pericias
	static getAllAttributes () {

		// retirar força enquanto nao tem nenhuma pericia
		return Player.ALL_ATTRIBUTES;
	}

	// setup de expertises, carregar as globais no local
	static setup () {
		console.log('Criando perícias...'); // deixar esse console.log

		let allExpertises = Expertise.getStaticAll();

		// criar pericias baseadas nas globais e salvar no local
		allExpertises.forEach(function (expertise) {

			let expertiseId = expertise['id'];

			let expertiseName = expertise['name'];
			let expertiseAttributeId = expertise['attributeId'];
			let expertiseMultiplier = expertise['multiplier'];
			let expertiseDescription = expertise['description'];
			let expertiseRule = expertise['rule'];

			let localExpertise = new Expertise({
				'name': expertiseName,
				'attributeId': expertiseAttributeId,
				'multiplier': expertiseMultiplier,
				'description': expertiseDescription,
				'rule': expertiseRule,
				'isGlobal': false
			});

			localExpertise.saveExpertise();
		});
		console.log('Finalizado criação de perícias iniciais'); // deixar esse console.log
	}


	// salvar a pericia (editar ou criar uma nova)
	saveExpertise () {

		return this.save();
	}
}

RModel.models['Expertise'] = Expertise;
