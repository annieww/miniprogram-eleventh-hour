Component({
	properties:{
		propArray:{type:Array,}
	},
	data:{
		selectShow:false,
		selectText:"Language",
	},
	methods:{
		selectToggle:function(){
			var nowShow=this.data.selectShow;
			this.setData({selectShow:!nowShow})
		},
		setText:function(e){
			var nowData=this.properties.propArray;
			var nowIdx=e.target.dataset.index;
			var nowText=nowData[nowIdx].text||nowData[nowIdx].value||nowData[nowIdx];
			this.setData({selectShow:false,selectText:nowText,});
			this.triggerEvent("select",nowData[nowIdx])
		}
	}
});
