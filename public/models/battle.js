class Battle extends RModel {

	static get EMOJI_GO_WAIT () { return '⏯️' };
	static get EMOJI_ACTION () { return '🏃' };
	static get EMOJI_FIGHT () { return '🗡️' };
	static get EMOJI_ITEM () { return '💊' };
	static get EMOJI_ACTION_WAIT () { return '⏳' };

	static get EMOJI_TARGET () { return '🎯' };
	static get EMOJI_IMPACT () { return '💥' };

	static get EMOJI_HURT () { return '🤕' };

}

RModel.models['Battle'] = Battle;
