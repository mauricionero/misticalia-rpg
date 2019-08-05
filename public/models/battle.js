class Battle extends RModel {
	
	static get EMOJI_MAIN () { return '⚔️' }

	static get EMOJI_GO_WAIT () { return '⏯️' };
	static get EMOJI_NEXT_ATACKER () { return '⏭️' };
	static get EMOJI_ACTION () { return '🏃' };
	static get EMOJI_FIGHT () { return '🗡️' };
	static get EMOJI_ITEM () { return '💊' };
	static get EMOJI_ACTION_WAIT () { return '⏳' };

	static get EMOJI_TARGET () { return '🎯' };
	static get EMOJI_IMPACT () { return '💥' };

	static get EMOJI_HURT () { return '🤕' };

	static fighterNextAtackFormula () {
		return 'arredondar(MaiorDestreza * (MaiorDestreza / agilidade) )';
	}

	static fighterNextAtack (maxDextery, totalAgility) {

		let fighterMultiplier = 0;
		if (maxDextery != 0) {
			fighterMultiplier = parseFloat(maxDextery) / parseFloat(totalAgility);
		}

		let fighterNextAttack = Math.round(maxDextery * fighterMultiplier);

		return fighterNextAttack;
	}
}

RModel.models['Battle'] = Battle;
