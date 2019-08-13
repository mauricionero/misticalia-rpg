class Expertise extends RModel {

	static get EMOJI_MAIN () { return '🏅' };
	static get EMOJI_LIST () { return '🏅' };
	static get EMOJI_VISUALIZE () { return '👁️' };

	static get EMOJI_ATTRIBUTE () { return Player.EMOJI_ATTRIBUTE };
	static get EMOJI_NAME () { return '🏷' };

	// retornar de forma estatica todos os dados no getAll padrao da RModel
	static getStaticAll () {
		return [
			{
				id: 1,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				name: t('Acrobacia'),
				description: t('')
			},
			{
				id: 2,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				name: t('Furtividade'),
				description: t('')
			},
			{
				id: 3,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				name: t('Cavalgar'),
				description: t('')
			},
			{
				id: 4,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				name: t('Pilotar'),
				description: t('')
			},
			{
				id: 5,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				name: t('Ladinagem'),
				description: t('')
			},
			{
				id: 6,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				name: t('Armas brancas'),
				description: t('')
			},
			{
				id: 7,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				name: t('Armas de fogo'),
				description: t('')
			},
			{
				id: 8,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				name: t('Abrir fechadura'),
				description: t('')
			},
			{
				id: 9,
				isGlobal: true,
				attributeId: Modifier.DEXTERY,
				name: t('Atletismo'),
				description: t('')
			},

			{
				id: 10,
				isGlobal: true,
				attributeId: Modifier.AGILITY,
				name: t('Iniciativa'),
				description: t('')
			},
			{
				id: 11,
				isGlobal: true,
				attributeId: Modifier.AGILITY,
				name: t('Stress motivador'),
				description: t('Verificar o quanto consegue de bônus de agilidade em situações de stress'),
				background: t('Alguém acostumado em trabalhar sob stress. Irá aumentar o desempenho, ou simplesmente travar de vez'),
				rule: t('Será feito um teste de chance multiplicando com esse modificador para ver o quanto de bônus de agilidade é dado, podendo ser negativo também o resultado.')
			},

			{
				id: 12,
				isGlobal: true,
				attributeId: Modifier.CONSTITUTION,
				name: t('Último suspiro'),
				description: t('Verificar se consegue ter uma última ação rápida ao zerar sua vida de alguma forma heróica (e que seja possível a ação escolhida)')
			},

			{
				id: 13,
				isGlobal: true,
				attributeId: Modifier.INTELIGENCE,
				name: t('Relacionar informações'),
				description: t('')
			},
			{
				id: 14,
				isGlobal: true,
				attributeId: Modifier.INTELIGENCE,
				name: t('Investigação'),
				description: t('')
			},
			{
				id: 15,
				isGlobal: true,
				attributeId: Modifier.INTELIGENCE,
				name: t('Ofício'),
				description: t('')
			},
			{
				id: 16,
				isGlobal: true,
				attributeId: Modifier.INTELIGENCE,
				name: t('Conhecimentos gerais'),
				description: t('')
			},
			{
				id: 17,
				isGlobal: true,
				attributeId: Modifier.INTELIGENCE,
				name: t('Natureza'),
				description: t('')
			},
			{
				id: 18,
				isGlobal: true,
				attributeId: Modifier.INTELIGENCE,
				name: t('História'),
				description: t(''),
				rule: t('Pode incluir conhecimento sobre mágias inclusive, pois isso está em livros e é possível de ser pesquisado.')
			},
			{
				id: 19,
				isGlobal: true,
				attributeId: Modifier.INTELIGENCE,
				name: t('História'),
				description: t('')
			},

			{
				id: 20,
				isGlobal: true,
				attributeId: Modifier.WISDOM,
				name: t('Intuição'),
				description: t('')
			},
			{
				id: 21,
				isGlobal: true,
				attributeId: Modifier.WISDOM,
				name: t('Sobrevivência'),
				description: t('')
			},
			{
				id: 22,
				isGlobal: true,
				attributeId: Modifier.WISDOM,
				name: t('Medicina'),
				description: t('')
			},
			{
				id: 23,
				isGlobal: true,
				attributeId: Modifier.WISDOM,
				name: t('Percepção'),
				description: t('')
			},
			{
				id: 24,
				isGlobal: true,
				attributeId: Modifier.WISDOM,
				name: t('Religião'),
				description: t('')
			},
			{
				id: 25,
				attributeId: Modifier.WISDOM,
				name: t('Animais'),
				description: t('')
			},

			{
				id: 26,
				isGlobal: true,
				attributeId: Modifier.CHARISMA,
				name: t('Atuação'),
				description: t('Teatro, fingir algo, se passar por alguém...')
			},
			{
				id: 27,
				isGlobal: true,
				attributeId: Modifier.CHARISMA,
				name: t('Lábia'),
				description: t('Obter informações, convencer pessoas, mentir...')
			},
			{
				id: 28,
				isGlobal: true,
				attributeId: Modifier.CHARISMA,
				name: t('Intimidação'),
				description: t('')
			},

			{
				id: 29,
				isGlobal: true,
				attributeId: Modifier.MAGIC,
				name: t('Sentir magia'),
				description: t('Sentir poderes mágicos ao redor e definir o seu tipo')
			},
			{
				id: 30,
				isGlobal: true,
				attributeId: Modifier.MAGIC,
				name: t('Energia'),
				description: t('Fogo, eletricidade, temperatura... Tudo que envolva energia sem movimento de materia')
			},
			{
				id: 31,
				isGlobal: true,
				attributeId: Modifier.MAGIC,
				name: t('Materia'),
				description: t('Controlar a materia, seu movimento, sua organização')
			},
			{
				id: 32,
				isGlobal: true,
				attributeId: Modifier.MAGIC,
				name: t('Dimensional'),
				description: t('Perceber e atuar em outras dimensões. Essa é a que mais exige poderes de todas')
			},
			{
				id: 33,
				isGlobal: true,
				attributeId: Modifier.MAGIC,
				name: t('Mente'),
				description: t('Ler e até mesmo controlar mentes. Controlar mentes exige muito esforço, poder e treino.')
			},

			{
				id: 34,
				isGlobal: true,
				attributeId: Modifier.SANITY,
				name: t('Resistência ao assustador'),
				description: t('Ter mais auto controle sobre o que te assusta.'),
				rule: t('Diminui ou anula a perda de sanidade em situações que se perderia a sanidade. Diminui penalidade de amedrontamento. Não funciona para intimidação.')
			},
			{
				id: 35,
				isGlobal: true,
				attributeId: Modifier.SANITY,
				name: t('Auto controle'),
				description: t('Não perder a paciência ou se entusiasmar demais com algo que poderia prejudicar a razão.'),
				rule: t('Ajuda contra intimidação e provocações. Ajuda também contra não se entusiasmar demais com alguma oferta boa demais que possa ser uma enganação')
			},
			{
				id: 36,
				isGlobal: true,
				attributeId: Modifier.SANITY,
				name: t('Concentração'),
				description: t('Ajuda a fazer algo de concentração mais rápido. Aumenta o foco')
			},
			{
				id: 37,
				isGlobal: true,
				attributeId: Modifier.SANITY,
				name: t('Auto ajuda'),
				description: t('Em situações desanimadoras, consegue manter mais a calma e até se animar a continuar tentando algo'),
				rule: t('Diminui as penalidades de re-teste')
			}
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

		return expertises[0];
	}

	// pegar todos os atributos utilizados pelas pericias
	static getAllAttributes () {
		return Player.ALL_ATTRIBUTES;
	}
}

RModel.models['Expertise'] = Expertise;
