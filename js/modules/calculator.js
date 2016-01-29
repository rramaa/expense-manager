Box.Application.addModule('calculator',function(context){
	'use strict';
	var moduleElement;
	return{
		init:function(){
			moduleElement=context.getElement();
			this.createCalculator();
		},
		createCalculator:function(){

		},
		destroy:function(){
			$(moduleElement).text("");
			moduleElement=null;
		}
	};
});