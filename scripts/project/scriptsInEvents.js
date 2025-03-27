


const scriptsInEvents = {

	async Interface_es_Event1_Act1(runtime, localVars)
	{
		window.addEventListener("message", event=>{
			const obj = event.data;
			if(obj && obj.action && obj.payload)
			{
				if(obj.action === "sign_in")
				{
					runtime.globalVars.GameAction = obj.action;
				
					runtime.globalVars.GameKey = obj.payload.app_key;
		
					runtime.globalVars.UserEmail = obj.payload.user.email;
		
					runtime.globalVars.UserFirstname = obj.payload.user.firstName;
		
					runtime.globalVars.UserLastname = obj.payload.user.lastName;
		
					runtime.globalVars.Username = obj.payload.user.username;
				}
				
				else if(obj.action === "retrieve_user_data")
				{
					//Store user game data from web app...
					runtime.globalVars.Coins = obj.payload.C25_Coin || 0;
					runtime.globalVars.Level = obj.payload.C25_Level || 1;
					runtime.globalVars.GameMode = obj.payload.gameMode || "";			
				}
			}
		})
	},

	async Interface_es_Event2_Act1(runtime, localVars)
	{
		window.parent.postMessage(
		{
		    "action": "close_app"
		},"*");
	},

	async Interface_es_Event3_Act1(runtime, localVars)
	{
		window.parent.postMessage(
		{
		    "action": "game_loaded",
			"payload": {
				"orientation": "landscape"
			}
		},"*");
	},

	async Interface_es_Event4_Act1(runtime, localVars)
	{
		window.parent.postMessage(
		{
		    "action": "open_activity",
			"payload": {
				"app_key": "shapes_pairs"
			}
		},"*");
	},

	async Interface_es_Event5_Act1(runtime, localVars)
	{
		window.parent.postMessage(
		{
		    "action": "open_feedback",
			"payload": {
				"app_id": runtime.globalVars.GameKey
			}
		},"*");
		
	},

	async Interface_es_Event6_Act1(runtime, localVars)
	{
		window.parent.postMessage(
		{
		    "action": "update_user_data",
			"payload": {
				"dataKey": localVars.dataKey,
				"value" : localVars.value
			}
		},"*");
	},

	async Interface_es_Event7_Act1(runtime, localVars)
	{
		window.parent.postMessage(
		{
		    "action": "retrieve_user_data",
			"payload": {
				"app_key": runtime.globalVars.GameKey
			}
		},"*");
	},

	async Interface_es_Event8_Act1(runtime, localVars)
	{
		window.parent.postMessage(
		{
		    "action": "open_fullgame",
			"payload": {
				"app_key": runtime.globalVars.AppId
			}
		},"*");
	},

	async Interface_es_Event9_Act1(runtime, localVars)
	{
		window.addEventListener("message", event=>{
			const obj = event.data;
			if(obj && obj.action && obj.payload)
			{
				if(obj.app.id)
				{
					runtime.globalVars.AppId = obj.app.id;
				}
			}
		})
	},

	async Levels_es_Event12_Act2(runtime, localVars)
	{
		function shuffle(array) {
		  for (let i = array.length - 1; i > 0; i--) {
		    const j = Math.floor(Math.random() * (i + 1));
		    [array[i], array[j]] = [array[j], array[i]];
		  }
		  return array;
		}
		
		let levelRange;
		switch (runtime.globalVars.CurrentLevel){
			case 1:
				levelRange = "0,4";
				break;
			case 2:
				levelRange = "5,9"
				break;
			case 3:
				levelRange = "10,14";
				break;
			case 4:
				levelRange = "15,19";
				break;
			case 5:
				levelRange = "20,25";
				break;
			case 6:
				levelRange = "0,25";
				break;
			default:
				levelRange = "0,4";
				break;
		}
		
		const numbers = [];
		const band = levelRange.split(',');
		for (let i = parseInt(band[0]); i <= parseInt(band[1]); i++) {
		  for (let j = 0; j < 3; j++) {
		    numbers.push(i);
		  }
		}
		
		runtime.globalVars.Sequence = shuffle(numbers).join(',');
		runtime.globalVars.LevelRoundLimit = numbers.length;
	},

	async Dailytask_es_Event6_Act1(runtime, localVars)
	{
		window.parent.postMessage(
		{
		    "action": "daily_task_completed",
			"payload": {}
		},"*");
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

